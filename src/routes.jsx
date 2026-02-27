import { createBrowserRouter } from "react-router-dom"
import Auth from "./Layouts/Auth"
import MainLayout from "./Layouts/MainLayout"
import Brands from "./Pages/Brands/Brands"
import Cart from "./Pages/Cart/Cart"
import Categories from "./Pages/Categories/Categories"
import Details from "./Pages/Details/Details"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Products from "./Pages/Products/Products"
import Register from "./Pages/Register/Register"
import ProtectedRoute from "/src/Components/Protected/ProtectedRoute"
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