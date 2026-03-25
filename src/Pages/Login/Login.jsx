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
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUserCart());
      navigate('/authUser');
    }
  }, [dispatch, navigate]);

  const LoginSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await dispatch(loginThunk(values)).unwrap();
      localStorage.setItem('token', result.token);
      dispatch(fetchUserCart());
      toast.success('Welcome back to Moshtari!');
      navigate('/authUser');
    } catch (err) {
      const message = err?.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const loginForm = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().required('Email is required').email('Invalid email address'),
      password: yup.string().required('Password is required').min(6, 'Minimum 6 characters')
    }),
    onSubmit: LoginSubmit
  });

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-black transition-colors duration-500">
      {/* LEFT SIDE: Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden dark:bg-gray-900">
        {/* Animated Background Gradients (softer colors) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-0 right-4 w-96 h-96 bg-indigo-400 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-lg text-gray-900 dark:text-gray-100">
          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            Find your <span className="text-purple-500 dark:text-purple-400">Goal</span> here.
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Join thousands of users at Moshtari. Discover opportunities, explore dreams, and turn
            ideas into reality.
          </p>
          <div className="mt-10 flex gap-4">
            <div className="h-1 w-20 bg-purple-300 dark:bg-purple-500 rounded-full"></div>
            <div className="h-1 w-8 bg-purple-400 dark:bg-purple-600 opacity-40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-white dark:bg-black transition-colors duration-500">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 lg:mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Sign In</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={loginForm.handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-2xl outline-none transition-all
                    ${
                      loginForm.touched.email && loginForm.errors.email
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-300 focus:border-purple-600'
                    } text-gray-900 placeholder-gray-400`}
                  {...loginForm.getFieldProps('email')}
                />
              </div>
              {loginForm.touched.email && loginForm.errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{loginForm.errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <span className="text-xs text-purple-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-gray-800 border-2 rounded-2xl outline-none transition-all
                    ${
                      loginForm.touched.password && loginForm.errors.password
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-300 focus:border-purple-600'
                    } text-gray-900 placeholder-gray-400`}
                  {...loginForm.getFieldProps('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {loginForm.touched.password && loginForm.errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{loginForm.errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-purple-600 rounded" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold cursor-pointer transition-all shadow-lg shadow-purple-200 dark:shadow-none active:scale-[0.98] disabled:opacity-70 text-lg"
            >
              {loading ? (
                <ColorRing
                  visible={true}
                  height="28"
                  width="28"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                />
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-10 text-center text-gray-600 dark:text-gray-400">
            New to Moshtari?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-purple-600 dark:text-purple-400 font-bold cursor-pointer hover:text-purple-800 transition-colors"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
