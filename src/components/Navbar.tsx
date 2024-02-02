import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'

const Navbar = () => {
  return (
    <>
      <header className="lg:h-[120px] mb-8 py-4 flex justify-center items-center bg-neutral">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="inline-block">
            <img className="block h-10 lg:h-auto" src={logo} alt="logo" />
          </Link>
          <div className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.05 11H3.95C3.42533 11 3 11.4253 3 11.95V12.05C3 12.5747 3.42533 13 3.95 13H20.05C20.5747 13 21 12.5747 21 12.05V11.95C21 11.4253 20.5747 11 20.05 11Z"
                fill="white"
              />
              <path
                d="M20.05 16H3.95C3.42533 16 3 16.4253 3 16.95V17.05C3 17.5747 3.42533 18 3.95 18H20.05C20.5747 18 21 17.5747 21 17.05V16.95C21 16.4253 20.5747 16 20.05 16Z"
                fill="white"
              />
              <path
                d="M20.05 6H3.95C3.42533 6 3 6.42533 3 6.95V7.05C3 7.57467 3.42533 8 3.95 8H20.05C20.5747 8 21 7.57467 21 7.05V6.95C21 6.42533 20.5747 6 20.05 6Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar