import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routes";
import { login } from "./store/slices/authSlice";
import { fetchUserCart } from "./store/thunk/userCart";
import { fetchUserWishlist } from "./store/thunk/Wishlist";
const App = () => {

  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      dispatch(login({
        token: savedToken
      }));
            // Fetch cart automatically
      dispatch(fetchUserCart());
      dispatch(fetchUserWishlist());
    }
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  
  
  const queryclient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryclient}>
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
