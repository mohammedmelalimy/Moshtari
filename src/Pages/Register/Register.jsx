import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Hide success message automatically after 2 seconds
  useEffect(() => {
    if (isRegister) {
      const timer = setTimeout(() => setIsRegister(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRegister]);

  // Formik submit handler
  const registerSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      console.log(response.data);
      
      if (response.status === 201) {
        setIsRegister(true);
        registerForm.resetForm();
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      console.log("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Formik setup
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone:""
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("First name is required")
        .min(3, "First name must be at least 3 characters"),
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email address"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      rePassword: yup
        .string()
        .required("Re-Password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
      phone: yup
        .string()
        .required("Phone is required")
    }),
    onSubmit: registerSubmit,
  });

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">

    {/* Success Message */}
    {isRegister && (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold animate-fade">
        Registered Successfully!
      </div>
    )}

    <div className="bg-white dark:bg-gray-800 w-full max-w-lg mx-auto py-2 px-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">

      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Create an Account
      </h2>

      <form onSubmit={registerForm.handleSubmit} className="space-y-6">

        {/* First Name */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 focus:border-green-600 dark:focus:border-green-500 outline-none transition-colors duration-300"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.name}
          />
          {registerForm.touched.name && registerForm.errors.name && (
            <p className="text-sm text-red-600 mt-1">{registerForm.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 focus:border-green-600 dark:focus:border-green-500 outline-none transition-colors duration-300"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.email}
          />
          {registerForm.touched.email && registerForm.errors.email && (
            <p className="text-sm text-red-600 mt-1">{registerForm.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 focus:border-green-600 dark:focus:border-green-500 outline-none transition-colors duration-300"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.password}
          />
          {registerForm.touched.password && registerForm.errors.password && (
            <p className="text-sm text-red-600 mt-1">{registerForm.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Confirm Password</label>
          <input
            id="rePassword"
            name="rePassword"
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 focus:border-green-600 dark:focus:border-green-500 outline-none transition-colors duration-300"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.rePassword}
          />
          {registerForm.touched.rePassword && registerForm.errors.rePassword && (
            <p className="text-sm text-red-600 mt-1">{registerForm.errors.rePassword}</p>
          )}
        </div>
        {/* Phone  */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Confirm Password</label>
          <input
            id="phone"
            name="phone"
            type="phone"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white
            dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-600 
            dark:focus:ring-green-500 focus:border-green-600 dark:focus:border-green-500 outline-none 
            transition-colors duration-300"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.phone}
          />
          {registerForm.touched.phone && registerForm.errors.phone && (
            <p className="text-sm text-red-600 mt-1">{registerForm.errors.phone}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 text-white bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 rounded-lg font-semibold transition-colors duration-300"
        >
          {loading ? <ColorRing height="25" width="25" colors={["#fff"]} /> : "Register"}
        </button>

      </form>
    </div>
  </div>
);


};

export default Register;
