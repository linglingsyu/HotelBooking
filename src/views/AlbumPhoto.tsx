import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const key = import.meta.env.VITE_KEY
const api = `https://api.unsplash.com/photos`

const AlbumPhoto = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState({})

  useEffect(() => {
    ;(async () => {
      const result = await axios.get(`${api}/${id}?client_id=${key}`)
      setPhoto(result.data)
    })()
  }, [id])
  /* 當id改變時,重新取得API圖片 */

  return (
    <>
      <button
        type="button"
        onClick={() => {
          navigate(-1)
        }}
      >
        {' '}
        回到上一頁
      </button>
      <h2>這是單張圖片 {id}</h2>
      <img src={photo?.urls?.small} alt="" />
      <p>{photo?.description}</p>
    </>
  )
}

export default AlbumPhoto
