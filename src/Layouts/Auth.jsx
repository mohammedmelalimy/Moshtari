import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import Navbar from "../Components/Navbar/Navbar"
import SideBar from "../Components/Sidebar/SideBar"
const Auth = () => {
  return (
    <>
    <Navbar/>
    <div className="flex justify-between w-full">
      <SideBar/>
      <main className="w-full md:w-5/6 ">
        <Outlet/>
      </main>
    </div>
    <Footer/>
    </>
  )
}

export default Auth
