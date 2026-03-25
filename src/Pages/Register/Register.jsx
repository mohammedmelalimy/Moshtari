import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as yup from 'yup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, easing: 'ease-in-out', once: true });
  }, []);

  const registerSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );
      if (response.status === 201) {
        setIsRegister(true);
        toast.success('Account created successfully!');
        setTimeout(() => navigate('/login'), 2500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const registerForm = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '', phone: '' },
    validationSchema: yup.object({
      name: yup.string().required('Name is required').min(3, 'Minimum 3 characters'),
      email: yup.string().required('Email is required').email('Invalid email address'),
      password: yup.string().required('Password is required').min(6, 'Minimum 6 characters'),
      rePassword: yup
        .string()
        .required('Please confirm password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
      phone: yup
        .string()
        .required('Phone is required')
        .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
    }),
    onSubmit: registerSubmit
  });

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-black transition-colors duration-500 overflow-x-hidden">
      {/* LEFT SIDE: Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-500 dark:bg-gray-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-400 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-0 right-4 w-96 h-96 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 text-white max-w-lg" data-aos="fade-right">
          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            Join the <span className="text-indigo-300 dark:text-indigo-400">Community.</span>
          </h1>
          <p className="text-xl text-indigo-100 dark:text-indigo-200 leading-relaxed">
            Create an account to track orders, save favorites, and get personalized recommendations
            tailored just for you.
          </p>
          <div className="mt-10 flex gap-4">
            <div className="h-1.5 w-8 bg-indigo-300 dark:bg-indigo-500 rounded-full"></div>
            <div className="h-1.5 w-20 bg-indigo-400 dark:bg-indigo-600 opacity-40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-10 overflow-y-auto">
        <div className="max-w-md w-full mx-auto" data-aos="fade-up">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Please fill in your details to get started.
            </p>
          </div>

          {/* Success Overlay */}
          {isRegister && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl flex items-center gap-3 text-green-700 dark:text-green-400 animate-bounce">
              <CheckCircle2 size={24} />
              <span className="font-semibold">Redirecting to login...</span>
            </div>
          )}

          <form onSubmit={registerForm.handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-2xl outline-none transition-all placeholder-gray-400 dark:placeholder-gray-100 ${
                    registerForm.touched.name && registerForm.errors.name
                      ? 'border-red-400'
                      : 'border-gray-300 focus:border-indigo-600'
                  }`}
                  {...registerForm.getFieldProps('name')}
                />
              </div>
              {registerForm.touched.name && registerForm.errors.name && (
                <p className="text-red-500 text-xs ml-2">{registerForm.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-2xl outline-none transition-all placeholder-gray-400 dark:placeholder-gray-100 ${
                    registerForm.touched.email && registerForm.errors.email
                      ? 'border-red-400'
                      : 'border-gray-300 focus:border-indigo-600'
                  }`}
                  {...registerForm.getFieldProps('email')}
                />
              </div>
              {registerForm.touched.email && registerForm.errors.email && (
                <p className="text-red-500 text-xs ml-2">{registerForm.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number (e.g. 012...)"
                  className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-2xl outline-none transition-all placeholder-gray-400 dark:placeholder-gray-100 ${
                    registerForm.touched.phone && registerForm.errors.phone
                      ? 'border-red-400'
                      : 'border-gray-300 focus:border-indigo-600'
                  }`}
                  {...registerForm.getFieldProps('phone')}
                />
              </div>
              {registerForm.touched.phone && registerForm.errors.phone && (
                <p className="text-red-500 text-xs ml-2">{registerForm.errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Create Password"
                  className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-gray-800 border-2 rounded-2xl outline-none transition-all placeholder-gray-400 dark:placeholder-gray-100 ${
                    registerForm.touched.password && registerForm.errors.password
                      ? 'border-red-400'
                      : 'border-gray-300 focus:border-indigo-600'
                  }`}
                  {...registerForm.getFieldProps('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {registerForm.touched.password && registerForm.errors.password && (
                <p className="text-red-500 text-xs ml-2">{registerForm.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <CheckCircle2 size={18} />
                </div>
                <input
                  name="rePassword"
                  type={showRePass ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-gray-800 border-2 rounded-2xl outline-none transition-all placeholder-gray-400 dark:placeholder-gray-100 ${
                    registerForm.touched.rePassword && registerForm.errors.rePassword
                      ? 'border-red-400'
                      : 'border-gray-300 focus:border-indigo-600'
                  }`}
                  {...registerForm.getFieldProps('rePassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowRePass(!showRePass)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                >
                  {showRePass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {registerForm.touched.rePassword && registerForm.errors.rePassword && (
                <p className="text-red-500 text-xs ml-2">{registerForm.errors.rePassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-[0.98] disabled:opacity-70 mt-4"
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
                  Create Account <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
