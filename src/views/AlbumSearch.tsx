import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import List from '@/components/List.tsx'

const key = import.meta.env.VITE_KEY
const api = `https://api.unsplash.com/photos/?client_id=${key}`

const AlbumSearch = () => {
  const [list, setList] = useState([])
  const [search, setSeatch] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const searchHandler = (e) => {
    e.preventDefault()
  }

  //   useEffect(() => {
  //     console.log(searchParams.get('query')) // get params
  //     setSearchParams({
  //       query: 'building'
  //     }) // 寫入params的方法
  //   }, [])

  // 當網址參數改變時 將params的值寫入search
  useEffect(() => {
    setSeatch(searchParams.get('query'))
  }, [searchParams])

  useEffect(() => {
    ;(async () => {
      if (search) {
        const result = await axios.get(api + '&query=' + search)
        setList(result.data)
      }
    })()
  }, [search])

  return (
    <>
      {search}
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Mockups, Logos..."
            defaultValue={search}
            onKeyUp={(e) => {
              e.preventDefault()
              if (e.code === 'Enter') {
                setSearchParams({
                  query: e.target.value
                })
              }
            }}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </form>

      <List list={list}></List>
    </>
  )
}

export default AlbumSearch
