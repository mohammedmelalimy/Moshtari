import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { login } from "./store/slices/authSlice";
import { fetchUserCart } from "./store/thunk/cart";
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
      <RouterProvider router={router}>
      </RouterProvider> 
    </QueryClientProvider>
  )
}

export default App
