import { Route, Routes } from 'react-router-dom'

import { SignIn, SignUp, Forgot } from '@/views/index.ts'
// import Navbar from './components/Navbar.tsx'
import Home from './views/Home.tsx'
// import About from './views/About.tsx'
// import Album from './views/Album.tsx'
// import AlbumIndex from './views/AlbumIndex.tsx'
// import AlbumPhoto from './views/AlbumPhoto.tsx'
// import AlbumSearch from './views/AlbumSearch.tsx'
// import NotFound from './views/NotFound.tsx'

function App() {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
          {/*           
         
          <Route path="/about" element={<About />} />
          <Route path="/album" element={<Album />}>
            <Route index element={<AlbumIndex />} />
            <Route path="search" element={<AlbumSearch />} />
            <Route path=":id" element={<AlbumPhoto />} />
          </Route>
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
