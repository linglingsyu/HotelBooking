import { Link } from 'react-router-dom'

const List = ({ list }) => {
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <Link to={`/album/${item.id}`}>{item.id}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
