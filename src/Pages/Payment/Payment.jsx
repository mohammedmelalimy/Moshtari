import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/thunk/cart/clearCart";
import { cashPayment, onlinePayment } from "../../store/thunk/payment";

const Payment = () => {
  const dispatch = useDispatch()
  const [Cash,setCash] = useState(false);
  
  const submitPayment = (values) => {
    if(Cash){
        dispatch(cashPayment(values));
        dispatch(clearCart());
    }else{
      dispatch(onlinePayment(values));
    };
  };

  const paymentForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: submitPayment,
  });

  return (
    <div className="min-h-96 my-20 flex items-center justify-center dark:bg-black p-6 transition-colors duration-300">
      <form
        onSubmit={paymentForm.handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 space-y-6 transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-6">
          Payment Information
        </h2>

        {/* Details */}
        <div>
          <label
            htmlFor="details"
            className="block font-medium text-slate-700 dark:text-slate-200 mb-1"
          >
            Details
          </label>
          <input
            type="text"
            id="details"
            name="details"
            placeholder="Enter your details"
            value={paymentForm.values.details}
            onChange={paymentForm.handleChange}
            onBlur={paymentForm.handleBlur}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors duration-300"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block font-medium text-slate-700 dark:text-slate-200 mb-1"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={paymentForm.values.phone}
            onChange={paymentForm.handleChange}
            onBlur={paymentForm.handleBlur}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors duration-300"
            required
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block font-medium text-slate-700 dark:text-slate-200 mb-1"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            value={paymentForm.values.city}
            onChange={paymentForm.handleChange}
            onBlur={paymentForm.handleBlur}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors duration-300"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-5">
          <button
            onClick={()=>{setCash(true);console.log("from cash")}}
            type="submit"
            className="w-full py-3 bg-slate-700 dark:bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 dark:hover:bg-slate-400 transition-colors duration-300"
          >
            Cash Order
          </button>
          <button
            type="submit"
            className="w-full py-3 bg-red-700 dark:bg-red-700 text-white font-semibold rounded-lg hover:bg-slate-600 dark:hover:bg-slate-400 transition-colors duration-300"
          >
            Online Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;