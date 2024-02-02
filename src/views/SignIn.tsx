import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { AxiosError } from 'axios'
import { API } from '@/https/axios.ts'

import BG from '@/assets/images/Login_BG.png'
import Alert from '@/components/Alert'
import Navbar from '@/components/Navbar'

interface SignIn {
  email: string
  password: string
}

interface SignInFull extends SignIn {
  remember_email: boolean
}

export function SignIn() {
  const navigate = useNavigate()

  const [cookies, setCookie] = useCookies(['FreyjaToken', 'FreyjaRemeberEmail'])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alartContent, setAlartContent] = useState<string>('')

  const {
    register,
    handleSubmit,
    // setValue,
    // watch,
    trigger,
    reset,
    formState: { errors }
  } = useForm<SignInFull>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // user 已經登入 自動導向首頁
  // 未登入
  useEffect(() => {
    if (cookies?.FreyjaToken) {
      // navigate('/')
    } else {
      if (cookies.FreyjaRemeberEmail) {
        reset({
          email: cookies.FreyjaRemeberEmail
        })
      }
    }
  }, [])

  const Loading = () => {
    return (
      <>
        <a
          href="#"
          className="mb-10 block w-full bg-primary-100 text-white font-medium rounded-xl px-8 py-4 focus:outline-none  animate-pulse pointer-events-none text-center"
        >
          登入中....
        </a>
      </>
    )
  }

  const loginHandler = async (payload: SignIn) => {
    try {
      setIsLoading(true)
      const result = await API.post('/api/v1/user/login', payload)
      if (result) {
        setCookie('FreyjaToken', result.data.token)
        localStorage.setItem(
          'hotelUserData',
          JSON.stringify(result.data.result)
        )
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

  const onSubmit: SubmitHandler<SignInFull> = async (data) => {
    setAlartContent('')
    const isFormValid = await trigger()
    if (isFormValid) {
      const payload = {
        email: data.email,
        password: data.password
      }
      const result = await loginHandler(payload)
      if (result.status) {
        if (data.remember_email) {
          const expirationDate = new Date(
            new Date().setDate(new Date().getDate() + 30)
          )
          setCookie('FreyjaRemeberEmail', data.email, {
            expires: expirationDate
          })
        }
        navigate(`/`)
        return false
      } else {
        setAlartContent(result.message)
        reset()
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex bg-neutral-bg text-white h-full pb-[164px] lg:pb-0">
        <div className="hidden w-full lg:block lg:w-1/2 relative">
          <img className="w-full" src={BG} alt="" />
        </div>
        <div className="w-full lg:w-1/2 relative flex flex-col justify-center items-center lg:-mt-[120px]">
          <img
            className="w-full lg:absolute left-0 right-0 lg:top-[120px] lg:translate-y-[45px]"
            src="@/assets/images/Deco.png"
            alt=""
          />
          <div className="w-full lg:w-1/2 mx-auto px-5 lg:px-0 relative z-10">
            <p className="text-primary-100 mb-2 text-[14px]">
              享樂酒店，誠摯歡迎
            </p>
            <h1 className="font-bold text-[32px] xl:text-[48px] leading-tight tracking-[1.6px] lg:tracking-[2.8px] mb-10">
              立即開始旅程
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-[14px] mb-2 font-medium"
                  htmlFor="email"
                >
                  電子信箱
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="請輸入電子信箱"
                  {...register('email', {
                    required: { value: true, message: '請輸入電子信箱' }
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
                  className="form-control"
                  id="password"
                  autoComplete="off"
                  placeholder="請輸入密碼"
                  {...register('password', {
                    required: { value: true, message: '請輸入密碼' }
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
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center">
                  <input
                    id="remember_email"
                    type="checkbox"
                    className="w-6 h-6 text-primary-100 bg-gray-100 border-gray-300 rounded focus:ring-primary-100"
                    {...register('remember_email')}
                  />
                  <label
                    htmlFor="remember_email"
                    className="ms-2 text-sm font-medium "
                  >
                    記住帳號
                  </label>
                </div>
                <a href="#" className="font-medium text-primary-100 underline">
                  忘記密碼?
                </a>
              </div>

              {alartContent ? <Alert content={alartContent} /> : ''}

              {isLoading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="mb-10 block w-full text-neutral-60 bg-neutral-40 hover:bg-primary-100 hover:text-white font-medium rounded-xl px-8 py-4 focus:outline-none ease-linear duration-200"
                >
                  會員登入
                </button>
              )}
              <div>
                <span className="mr-2">沒有會員嗎?</span>
                <Link
                  to={'/Signup'}
                  className="font-medium text-primary-100 underline"
                >
                  前往註冊
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
