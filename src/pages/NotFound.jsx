import { FaExclamationTriangle } from "react-icons/fa"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <FaExclamationTriangle className="text-danger" size='5rem'/>
        <h1>404 NOT FOUND!</h1>
        <p>Sorry this page does not exist</p>
        <Link to='/' className="btn btn-dark">Home</Link>
    </div>
  )
}

export default NotFound