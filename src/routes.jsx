import { createBrowserRouter } from "react-router-dom"
import Brands from "./Components/Brands/Brands"
import Cart from "./Components/Cart/Cart"
import Categories from "./Components/Categories/Categories"
import Details from "./Components/Details/Details"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Products from "./Components/Products/Products"
import ProtectedRoute from "./Components/Protected/ProtectedRoute"
import Register from "./Components/Register/Register"
import Auth from "./Layouts/Auth"
import MainLayout from "./Layouts/MainLayout"
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {index:true , element:<Home/>},
      {path:'register' , element:<Register/>},
      {path:'login' , element:<Login/>},
    ]
  },
  {

    path:"/authUser",
    element:<Auth/>,
    children:[
      {index:true , element:<Home/>},
      {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'details/:id' , element:<ProtectedRoute><Details/></ProtectedRoute>},
    ]
}
])
export default router