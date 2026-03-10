import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { setToken } from '../../store/slices/authSlice';
import { loginThunk } from '../../store/thunk/authentication';
import { fetchUserCart } from '../../store/thunk/userCart';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUserCart());
      navigate('/authUser');
    }
  }, [dispatch, navigate]);

  const LoginSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      const result = await dispatch(loginThunk({ email, password })).unwrap();
      localStorage.setItem('token', result.token);
      dispatch(fetchUserCart());

      toast.success('Login successful', {
        style: {
          background: '#fff',
          color: '#000',
          fontWeight: '600',
          padding: '10px 16px',
          borderRadius: '8px'
        }
      });

      navigate('/authUser');
    } catch (err) {
      const message = err?.message || err?.response?.data?.message || 'Login failed';
      toast.error(message, { style: { background: '#f69990', color: '#fff', fontWeight: '600' } });
    } finally {
      setLoading(false);
    }
  };

  const loginForm = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().required('Email is required').email('Invalid email'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 chars')
    }),
    onSubmit: LoginSubmit
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black p-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          Welcome back to Moshtari
        </h1>
        <h5 className="mt-2 text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
          A place where you can find your dreams and explore endless opportunities.
        </h5>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-2xl bg-white dark:bg-black shadow-xl rounded-3xl p-12 sm:p-16 border border-gray-200 dark:border-gray-700">
        <form onSubmit={loginForm.handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              className="peer block w-full border-b-2 border-gray-300 dark:border-gray-600 py-4 px-0 text-sm sm:text-base bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-400 transition-colors duration-300"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
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
              className="peer block w-full border-b-2 border-gray-300 dark:border-gray-600 py-4 px-0 text-sm sm:text-base bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-400 transition-colors duration-300"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
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
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-800 text-white py-4 rounded-xl font-semibold disabled:opacity-50 transition-all duration-300 text-lg"
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="25"
                width="25"
                ariaLabel="loading"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-purple-600 dark:text-purple-400 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
          {/* <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Forgot your password?{' '}
            <span className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">
              Reset
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
