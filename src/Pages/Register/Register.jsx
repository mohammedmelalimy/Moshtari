import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, easing: 'ease-in-out', once: true, offset: 120 });
    if (isRegister) {
      const timer = setTimeout(() => setIsRegister(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRegister]);

  const registerSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );
      if (response.status === 201) {
        setIsRegister(true);
        registerForm.resetForm();
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } finally {
      setLoading(false);
    }
  };

  const registerForm = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '', phone: '' },
    validationSchema: yup.object({
      name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
      email: yup.string().required('Email is required').email('Invalid email address'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      rePassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
      phone: yup.string().required('Phone is required')
    }),
    onSubmit: registerSubmit
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black p-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to Moshtari
        </h1>
        <h5 className="mt-2 text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
          Create your account and start exploring amazing products.
        </h5>
      </div>

      {/* Success Message */}
      {isRegister && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold animate-fade">
          Registered Successfully!
        </div>
      )}

      {/* Form Container */}
      <div className="w-full max-w-2xl bg-white dark:bg-black shadow-xl rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <form onSubmit={registerForm.handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="w-full px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-purple-600 outline-none transition-colors duration-300"
            />
            {registerForm.touched.name && registerForm.errors.name && (
              <p className="text-sm text-red-600 mt-1">{registerForm.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="w-full px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-purple-600 outline-none transition-colors duration-300"
            />
            {registerForm.touched.email && registerForm.errors.email && (
              <p className="text-sm text-red-600 mt-1">{registerForm.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="w-full px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-purple-600 outline-none transition-colors duration-300"
            />
            {registerForm.touched.password && registerForm.errors.password && (
              <p className="text-sm text-red-600 mt-1">{registerForm.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Confirm Password
            </label>
            <input
              id="rePassword"
              name="rePassword"
              type="password"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="w-full px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-purple-600 outline-none transition-colors duration-300"
            />
            {registerForm.touched.rePassword && registerForm.errors.rePassword && (
              <p className="text-sm text-red-600 mt-1">{registerForm.errors.rePassword}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="w-full px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-purple-600 outline-none transition-colors duration-300"
            />
            {registerForm.touched.phone && registerForm.errors.phone && (
              <p className="text-sm text-red-600 mt-1">{registerForm.errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-800 dark:bg-purple-500 dark:hover:bg-purple-700 text-white py-4 rounded-xl font-semibold disabled:opacity-50 transition-all duration-300 text-lg"
          >
            {loading ? <ColorRing height="25" width="25" colors={['#fff']} /> : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
