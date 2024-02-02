import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
    /* 轉址 */
  }, [navigate])

  return <>找不到此頁面</>
}
