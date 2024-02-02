import { useOutletContext } from 'react-router-dom'

import List from '@/components/List.tsx'

const AlbumIndex = () => {
  const list = useOutletContext()

  return (
    <>
      <h2>這是相簿的首頁</h2>
      <List list={list}></List>
    </>
  )
}

export default AlbumIndex
