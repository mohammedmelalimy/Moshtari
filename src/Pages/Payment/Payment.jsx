import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/thunk/cart/clearCart';
import { cashPayment, onlinePayment } from '../../store/thunk/payment';

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Store the payment type here to be used during the onSubmit phase
  const [paymentMethod, setPaymentMethod] = useState('online');

  const submitPayment = async (values, { setSubmitting }) => {
    const payload = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city
      }
    };

    try {
      if (paymentMethod === 'cash') {
        await dispatch(cashPayment(payload)).unwrap();
        dispatch(clearCart());
        navigate('/authUser');
      } else {
        // 1. Unwrap the result to get the actual data returned by the thunk
        const res = await dispatch(onlinePayment(payload)).unwrap();

        console.log('API Response:', res); // Debugging: Check the structure here

        // 2. Access the URL correctly based on RouteMisr's structure
        if (res.status === 'success' && res.session?.url) {
          window.location.href = res.session.url;
        } else {
          console.error('Session URL missing from response', res);
        }
      }
    } catch (error) {
      console.error('Payment Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { details: '', phone: '', city: '' },
    onSubmit: submitPayment
  });

  return (
    <div className="min-h-96 my-20 flex items-center justify-center dark:bg-black p-6">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">
          Payment Information
        </h2>

        {['details', 'phone', 'city'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={`Enter your ${field}`}
            value={formik.values[field]}
            onChange={formik.handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
        ))}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            onClick={() => setPaymentMethod('cash')}
            className="w-full py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
          >
            {formik.isSubmitting && paymentMethod === 'cash' ? 'Processing...' : 'Cash Order'}
          </button>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            onClick={() => setPaymentMethod('online')}
            className="w-full py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 disabled:opacity-50"
          >
            {formik.isSubmitting && paymentMethod === 'online' ? 'Redirecting...' : 'Online Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
