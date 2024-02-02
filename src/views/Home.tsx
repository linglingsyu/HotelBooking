import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function Home() {
  const [userData, setUserData] = useState(null)
  const [cookies] = useCookies(['FreyjaToken'])

  useEffect(() => {
    ;(() => {
      if (cookies?.FreyjaToken) {
        const data = localStorage.getItem('hotelUserData')
        if (data) {
          const user = JSON.parse(data)
          setUserData(user)
        }
      }
    })()
  }, [])

  return (
    <>
      <div className="text-white ">這是首頁！</div>
      <hr />
      <div className="text-white ">
        {userData ? (
          `Hello,${userData.name} 你已登入!!`
        ) : (
          <Link className="text-white " to={'/signin'}>
            登入
          </Link>
        )}
      </div>
      <div>
        <Link className="text-white " to={'/signup'}>
          註冊
        </Link>
      </div>
    </>
  )
}
