import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
  const savedToken = localStorage.getItem('token')
  if(savedToken==null){
    return <Navigate to="/login"></Navigate>
  }
  
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute
