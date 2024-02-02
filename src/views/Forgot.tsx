import { API } from '@/https/axios.ts'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import './SignUp.css'
import BG from '@/assets/images/Login_BG.png'
import Alert from '@/components/Alert'
import Navbar from '@/components/Navbar'

type forgot = {
  email: string
  code: string
  newPassword: string
  confirm_password: string
}

type forgotAPI = {
  email: string
  code: string
  newPassword: string
}

const Loading = () => {
  return (
    <>
      <a
        href="#"
        className="mb-10 block w-full bg-primary-100 text-white font-medium rounded-xl px-8 py-4 focus:outline-none  animate-pulse pointer-events-none text-center"
      >
        Loading....
      </a>
    </>
  )
}

export function Forgot() {
  const navigate = useNavigate()

  const [step, setStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alartContent, setAlartContent] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    // reset,
    formState: { errors, touchedFields }
  } = useForm<forgot>({
    email: '',
    code: '',
    newPassword: '',
    confirm_password: ''
  })

  type generateEmailCode = {
    email: string
  }

  const generateEmailCode = async (payload: generateEmailCode) => {
    try {
      setIsLoading(true)
      const result = await API.post('/api/v1/verify/generateEmailCode', payload)
      if (result) {
        return result.data
      }
    } catch (error) {
      console.log(error)
      return error?.response?.data
    } finally {
      setIsLoading(false)
    }
  }

  const forgotHandler = async (payload: forgotAPI) => {
    try {
      setIsLoading(true)
      const result = await API.post('/api/v1/user/forgot', payload)
      if (result) {
        return result.data
      }
    } catch (error) {
      console.log(error)
      return error?.response?.data
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit: SubmitHandler<forgot> = async (data) => {
    setAlartContent('')
    const isFormValid = await trigger()
    if (isFormValid) {
      const payload = {
        email: data.email,
        code: data.code,
        newPassword: data.newPassword
      }
      const result = await forgotHandler(payload)
      if (result.status) {
        // 註冊成功
        // setTimeout(() => {
        navigate(`/signin`)

        // }, 3000)
        // reset()
      } else {
        setAlartContent(result.message)
      }
    }
  }

  const nextStep = async () => {
    const isFormValid = await trigger(['email'])
    if (isFormValid) {
      const values = getValues('email')
      const result = await generateEmailCode({ email: values })
      if (result?.status) {
        setStep(2)
      } else {
        setAlartContent(result.message)
      }
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
            src="@/assets/images/Deco.png"
            alt=""
          />
          <div className="w-full lg:w-1/2 mx-auto px-5 lg:px-0 relative z-10">
            <p className="text-primary-100 mb-2 text-[14px]">
              享樂酒店，誠摯歡迎
            </p>
            <h1 className="font-bold text-[32px] xl:text-[48px] leading-tight tracking-[1.6px] lg:tracking-[2.8px] mb-10">
              取回密碼
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
                  輸入信箱
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
                <span className="font-medium leading-tight">設定密碼</span>
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

                {isLoading ? (
                  <Loading />
                ) : (
                  <button
                    disabled={touchedFields.email ? false : true}
                    type="button"
                    className={`mb-10 block w-full text-neutral-60 bg-neutral-40  font-medium rounded-xl px-4 py-2 focus:outline-none ${
                      touchedFields.email
                        ? 'hover:bg-primary-100 hover:text-white'
                        : ''
                    } `}
                    onClick={() => {
                      nextStep()
                    }}
                  >
                    取得驗證碼
                  </button>
                )}
              </div>

              <div className={`${step !== 2 ? 'hidden' : ''}`}>
                <div className="mb-4">
                  <label
                    className="block text-[14px] mb-2 font-medium"
                    htmlFor="newPassword"
                  >
                    密碼
                  </label>
                  <input
                    type="password"
                    className="form-control p-2.5"
                    id="newPassword"
                    autoComplete="off"
                    placeholder="請輸入密碼"
                    {...register('newPassword', {
                      required: { value: true, message: '請輸入密碼' },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                        message: '至少 8 個字元、要有大小寫字母、至少一個數字'
                      }
                    })}
                  />
                  {errors.newPassword ? (
                    <p className="mt-2 text-xs text-red-600 ">
                      <span> {errors.newPassword?.message} </span>
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
                        if (watch('newPassword') != val) {
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

                <div className="mb-4">
                  <label
                    className="block text-[14px] mb-2 font-medium"
                    htmlFor="code"
                  >
                    驗證碼
                  </label>
                  <input
                    type="text"
                    className="form-control p-2.5"
                    id="code"
                    placeholder="請輸入驗證碼"
                    {...register('code', {
                      required: { value: true, message: '請輸入驗證碼' }
                    })}
                  />
                  {errors.code ? (
                    <p className="mt-2 text-xs text-red-600 ">
                      <span> {errors.code?.message} </span>
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
                    設定新密碼
                  </button>
                )}
              </div>
            </form>
            <div>
              <Link
                className="font-medium text-primary-100 underline"
                to={'/signin'}
              >
                返回登入
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
