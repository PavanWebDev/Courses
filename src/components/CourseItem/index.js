import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {itemDetails} = props
  const {id, name, logoUrl} = itemDetails
  return (
    <Link to={`/courses/${id}`}>
      <li className="item">
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
