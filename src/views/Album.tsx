// import AlbumIndex from './AlbumIndex.tsx'
import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import List from '@/components/List.tsx'

const key = import.meta.env.VITE_KEY
const api = `https://api.unsplash.com/photos/?client_id=${key}&query=coffee`

const Album = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await axios.get(api)
      setList(result.data)
    })()
  }, [])

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-4 p-3">
          <div className="space-y-2">
            <h2>相簿列表</h2>
            <Link to="search">Search</Link>
            <List list={list}></List>
          </div>
        </div>
        <div className="col-span-8 p-3">
          <div className="space-y-2">
            <Outlet context={list} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Album
