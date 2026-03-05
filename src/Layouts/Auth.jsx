import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import Navbar from "../Components/Navbar/Navbar"
const Auth = () => {
  return (
    <>
    <Navbar/>
      <main className="w-full">
        <Outlet/>
      </main>
    <Footer/>
    </>
  )
}

export default Auth
