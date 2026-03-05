import AOS from "aos";
import "aos/dist/aos.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { setToken } from "../../store/slices/authSlice";
import { loginThunk } from "../../store/thunk/authentication";
import { fetchUserCart } from "../../store/thunk/userCart";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUserCart());
      navigate("/authUser");
    }
    AOS.init({
    duration: 900,
    easing: "ease-in-out",
    once: true,
    offset: 120,
  });
  }, [dispatch,navigate]);

const LoginSubmit = async (values) => {
  const { email, password } = values;
  setLoading(true);

  try {
    // dispatch login thunk
      const resultAction = await dispatch(loginThunk({ email, password }));
    // Save token to localStorage
      localStorage.setItem("token", resultAction.payload.token);

    // Fetch cart AFTER login
    dispatch(fetchUserCart());

    // toast
    toast.success("Login successful");
    
    // Navigate after everything is ready
    navigate("/authUser");
  } catch (err) {
      const message = err?.response?.data?.message || err.message || "Login failed";
      toast.error(message);
  } finally {
    setLoading(false);
  }
};

  const loginForm = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email("Invalid email"),
      password: yup.string().required("Password is required").min(6, "Password must be at least 6 chars"),
    }),
    onSubmit: LoginSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black transition-colors duration-300" data-aos="fade-right">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Login Now
        </h2>

        <form onSubmit={loginForm.handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              className="block w-full border-b-2 border-gray-300 dark:border-gray-600 py-2.5 px-0 text-sm bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-green-700 dark:focus:border-green-500 peer transition-colors duration-300"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Email Address
            </label>
            {loginForm.touched.email && loginForm.errors.email && (
              <span className="text-red-600 text-sm">{loginForm.errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              className="block w-full border-b-2 border-gray-300 dark:border-gray-600 py-2.5 px-0 text-sm bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-green-700 dark:focus:border-green-500 peer transition-colors duration-300"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Password
            </label>
            {loginForm.touched.password && loginForm.errors.password && (
              <span className="text-red-600 text-sm">{loginForm.errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500 text-white py-2 rounded-xl disabled:opacity-50 transition-colors duration-300"
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="25"
                width="25"
                ariaLabel="loading"
                colors={["#fff","#fff","#fff","#fff","#fff"]}
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
