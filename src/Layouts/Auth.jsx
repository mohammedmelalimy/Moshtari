import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import Navbar from "../Components/Navbar/Navbar"

const Auth = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

export default Auth
