import { API } from '@/https/axios.ts'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import './SignUp.css'
import zipcode from '@/config/zipcodes.ts'
import BG from '@/assets/images/Login_BG.png'
import Deco from '@/assets/images/Deco.png'
import Alert from '@/components/Alert'
import Navbar from '@/components/Navbar'

type SignUp = {
  email: string
  password: string
  name: string
  confirm_password: string
  phone: string
  birthday_year: string
  birthday_month: string
  birthday_day: string
  address: {
    city: string
    county: string
    detail: string
  }
  check: boolean
}

type SignUpAPI = {
  email: string
  password: string
  name: string
  phone: string
  birthday: string
  address: {
    zipcode: number
    detail: string
  }
}

const Loading = () => {
  return (
    <>
      <a
        href="#"
        className="mb-10 block w-full bg-primary-100 text-white font-medium rounded-xl px-8 py-4 focus:outline-none  animate-pulse pointer-events-none text-center"
      >
        註冊中....
      </a>
    </>
  )
}

export function SignUp() {
  const navigate = useNavigate()

  const year: string[] = []
  const this_year: number = new Date().getFullYear()
  for (let i: number = 1940; i <= this_year; i++) {
    year.push(String(i))
  }

  const month: string[] = []
  const this_momth: number = 12
  for (let i: number = 1; i <= this_momth; i++) {
    month.push(String(i))
  }

  const day: string[] = []
  const this_day: number = 31
  for (let i: number = 1; i <= this_day; i++) {
    day.push(String(i))
  }

  const [cityList, setcityList] = useState<string[]>([])
  const [countyList, setcountyList] = useState<string[]>([])
  // const [city, setCity] = useState<string>('臺北市')
  // const [county, setCounty] = useState<string>('中正區')

  const [step, setStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alartContent, setAlartContent] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors }
  } = useForm<SignUp>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirm_password: '',
      phone: '',
      birthday_year: '1988',
      birthday_month: '1',
      birthday_day: '1',
      address: {
        city: '臺北市',
        county: '中正區',
        detail: ''
      },
      check: false
    }
  })

  const signUpHandler = async (payload: SignUpAPI) => {
    try {
      setIsLoading(true)
      const result = await API.post('/api/v1/user/signup', payload)
      if (result) {
        return result.data
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error?.response?.data
      } else {
        console.log('Unexpected error', error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    setAlartContent('')
    const isFormValid = await trigger()

    if (isFormValid) {
      const birthday = `${data.birthday_year}/${data.birthday_month}/${data.birthday_day}`

      const zip = zipcode.find(
        (z) => z.city === data.address.city && z.county === data.address.county
      )

      if (zip) {
        const payload = {
          email: data.email,
          password: data.password,
          name: data.name,
          phone: data.confirm_password,
          birthday: birthday,
          address: {
            zipcode: zip.zipcode,
            detail: data.address.detail
          }
        }
        const result = await signUpHandler(payload)

        if (result.status) {
          navigate(`/signin`)
        } else {
          setAlartContent(result.message)
        }
      }
    }
  }

  useEffect(() => {
    (() => {
      const cityList = new Set([...zipcode.map((code) => code.city)])
      setcityList(Array.from(cityList))

      const List = zipcode.filter((code) => code.city === '臺北市')
      const countyList = new Set([...List.map((code) => code.county)])
      setcountyList(Array.from(countyList))
    })()
  }, [])

  // 在這裡監聽 'city' 欄位的變化
  const city = watch('address.city')

  useEffect(() => {
    (() => {
      const List = zipcode.filter((code) => code.city === city)
      const countyList = new Set([...List.map((code) => code.county)])
      const result = Array.from(countyList)
      setcountyList(result)
      setValue('address.county', result[0])
    })()
  }, [city])

  const nextStep = async () => {
    const isFormValid = await trigger(['email', 'password', 'confirm_password'])
    if (isFormValid) {
      setStep(2)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex items-start bg-neutral-bg text-white h-full pb-[164px] pt-5 lg:pb-0">
        <div className="hidden w-full lg:block lg:w-1/2 relative">
          <img className="w-full" src={BG} alt="" />
        </div>
        <div className="w-full lg:w-1/2 relative flex flex-col justify-center items-center -mt-[32px] lg:mt-0">
          <img
            className="w-full absolute left-0 right-0 -top-3.5"
            src={Deco}
            alt=""
          />
          <div className="w-full lg:w-1/2 mx-auto px-5 lg:px-0 relative z-10">
            <p className="text-primary-100 mb-2 text-[14px]">
              享樂酒店，誠摯歡迎
            </p>
            <h1 className="font-bold text-[32px] xl:text-[48px] leading-tight tracking-[1.6px] lg:tracking-[2.8px] mb-10">
              立即註冊
            </h1>

            <ol className="items-center w-full flex justify-between text-neutral-60 mb-10">
              <li className="flex items-center justify-center flex-col shrink-0">
                <div
                  className={`mb-2 flex items-center justify-center w-8 h-8 border border-neutral-60 rounded-full ${
                    step === 1 ? 'active' : ''
                  }`}
                >
                  1
                </div>
                <span className="font-medium leading-tight w-auto">
                  輸入信箱及密碼
                </span>
              </li>
              <li className="flex-grow px-2">
                <div className="w-full h-[2px] rounded-lg bg-neutral-60"></div>
              </li>
              <li className="flex items-center flex-col justify-center shrink-0">
                <div
                  className={`mb-2 flex items-center justify-center w-8 h-8 border border-neutral-60 rounded-full ${
                    step === 2 ? 'active' : ''
                  }`}
                >
                  2
                </div>
                <span className="font-medium leading-tight">填寫基本資料</span>
              </li>
            </ol>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={` ${step !== 1 ? 'hidden' : ''} `}>
                <div className="mb-4">
                  <label
                    className="block text-[14px] mb-2 font-medium"
                    htmlFor="email"
                  >
                    電子信箱
                  </label>
                  <input
                    type="email"
                    className="form-control p-2.5"
                    id="email"
                    placeholder="請輸入電子信箱"
                    {...register('email', {
                      required: { value: true, message: '請輸入電子信箱' },
                      pattern: { value: /^\S+@\S+$/i, message: '格式不合法' }
                    })}
                  />
                  {errors.email ? (
                    <p className="mt-2 text-xs text-red-600 ">
                      <span> {errors.email?.message} </span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[14px] mb-2 font-medium"
                    htmlFor="password"
                  >
                    密碼
                  </label>
                  <input
                    type="password"
                    className="form-control p-2.5"
                    id="password"
                    autoComplete="off"
                    placeholder="請輸入密碼"
                    {...register('password', {
                      required: { value: true, message: '請輸入密碼' },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                        message: '至少 8 個字元、要有大小寫字母、至少一個數字'
                      }
                    })}
                  />
                  {errors.password ? (
                    <p className="mt-2 text-xs text-red-600 ">
                      <span> {errors.password?.message} </span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-10">
                  <label
                    className="block text-[14px] mb-2 font-medium"
                    htmlFor="confirm_password"
                  >
                    確認密碼
                  </label>
                  <input
                    type="password"
                    className="form-control p-2.5"
                    id="confirm_password"
                    placeholder="請再輸入一次密碼"
                    autoComplete="off"
                    {...register('confirm_password', {
                      required: { value: true, message: '請輸入確認密碼' },
                      validate: (val: string) => {
                        if (watch('password') != val) {
                          return '確認密碼錯誤'
                        }
                      }
                    })}
                  />
                  {errors.confirm_password ? (
                    <p className="mt-2 text-xs text-red-600 ">
                      <span> {errors.confirm_password?.message} </span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <button
                  type="button"
                  className="mb-10 block w-full text-neutral-60 bg-neutral-40 hover:bg-primary-100 hover:text-white font-medium rounded-xl px-8 py-4 focus:outline-none"
                  onClick={() => {
                    nextStep()
                  }}
                >
                  下一步
                </button>
              </div>

              <div className={`${step !== 2 ? 'hidden' : ''}`}>
                <div className="mb-4">
                  <label
                    className="block text-[14px] mb-2 font-medium"
                    htmlFor="name"
                  >
                    姓名
                  </label>
                  <input
                    type="text"
                    className="form-control p-2.5"
                    id="name"
                    placeholder="請輸入姓名"
                    {...register('name', {
                      required: { value: true, message: '請輸入姓名' }
                    })}
                  />
                  {errors.name ? (
                    <p className="mt-2 text-xs text-red-600 ">
                      <span> {errors.name?.message} </span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[14px] mb-2 font-medium"
                    htmlFor="phone"
                  >
                    手機號碼
                  </label>
                  <input
                    type="tel"
                    className="form-control p-2.5"
                    id="phone"
                    placeholder="請輸入手機號碼"
                    {...register('phone', {
                      required: { value: true, message: '請輸入手機號碼' }
                    })}
                  />
                  {errors.phone ? (
                    <p className="mt-2 text-xs text-red-600 ">
                      <span> {errors.phone?.message} </span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[14px]  mb-2 font-medium"
                    htmlFor="confirm_password"
                  >
                    生日
                  </label>
                  <div className="flex">
                    <div className="w-1/3 flex items-center pr-2">
                      <select
                        className="bg-white border border-gray-300 text-neutral-80 text-sm rounded-lg focus:ring-primary-60 focus:border-primary-60 block w-full p-2.5"
                        {...register('birthday_year')}
                      >
                        {year.map((y) => (
                          <option value={y} key={y}>
                            {' '}
                            {y + ' 年'}{' '}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/3 flex items-center px-2">
                      <select
                        className="bg-white border border-gray-300 text-neutral-80 text-sm rounded-lg focus:ring-primary-60 focus:border-primary-60 block w-full p-2.5"
                        {...register('birthday_month')}
                      >
                        {month.map((m) => (
                          <option value={m} key={`${m}month`}>
                            {' '}
                            {m + ' 月'}{' '}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/3 flex items-center pl-2">
                      <select
                        className="bg-white border border-gray-300 text-neutral-80 text-sm rounded-lg focus:ring-primary-60 focus:border-primary-60 block w-full p-2.5"
                        {...register('birthday_day')}
                      >
                        {day.map((m) => (
                          <option value={m} key={`${m}day`}>
                            {' '}
                            {m + ' 日'}{' '}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[14px]  mb-2 font-medium"
                    htmlFor="confirm_password"
                  >
                    地址
                  </label>

                  <div className="flex mb-4">
                    <div className="w-1/2 flex items-center pr-2">
                      <select
                        // onChange={(e) => {
                        //   setCity(e.target.value)
                        // }}
                        defaultValue="臺北市"
                        className="bg-white border border-gray-300 text-neutral-80 text-sm rounded-lg focus:ring-primary-60 focus:border-primary-60 block w-full p-2.5"
                        {...register('address.city')}
                      >
                        {cityList.map((city) => (
                          <option value={city} key={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/2 flex items-center pl-2">
                      <select
                        className="bg-white border border-gray-300 text-neutral-80 text-sm rounded-lg focus:ring-primary-60 focus:border-primary-60 block w-full p-2.5"
                        {...register('address.county')}
                        defaultValue="中正區"
                      >
                        {countyList.map((county) => (
                          <option value={county} key={county}>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full">
                    <input
                      type="text"
                      className="form-control p-2.5"
                      placeholder="請輸入詳細地址"
                      {...register('address.detail', {
                        required: { value: true, message: '請輸入詳細地址' }
                      })}
                    />
                    {errors?.address?.detail ? (
                      <p className="mt-2 text-xs text-red-600 ">
                        <span> {errors.address.detail.message} </span>
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="mb-10">
                  <div className=" flex items-center">
                    <input
                      id="check_rule"
                      type="checkbox"
                      className="w-6 h-6 text-primary-100 bg-gray-100 border-gray-300 rounded focus:ring-primary-100"
                      {...register('check', {
                        required: {
                          value: true,
                          message: '請閱讀並同意本網站個資使用規範'
                        }
                      })}
                    />
                    <label
                      htmlFor="check_rule"
                      className="ms-2 text-sm font-medium dark:text-gray-300"
                    >
                      我已閱讀並同意本網站個資使用規範
                    </label>
                  </div>
                  {errors?.check ? (
                    <p className="mt-2 text-xs text-red-600 ">
                      <span> {errors.check.message} </span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>

                {alartContent ? <Alert content={alartContent} /> : ''}

                {isLoading ? (
                  <Loading />
                ) : (
                  <button
                    type="submit"
                    className="mb-10 block w-full bg-primary-100 text-white font-medium rounded-xl px-8 py-4 focus:outline-none"
                  >
                    完成註冊
                  </button>
                )}
              </div>
            </form>
            <div>
              <span className="mr-2">已經有會員嗎?</span>
              <Link
                className="font-medium text-primary-100 underline"
                to={'/signin'}
              >
                前往登入
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
