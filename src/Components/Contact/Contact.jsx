import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    try {
      const formData = new FormData(e.target);
      formData.append("access_key", import.meta.env.VITE_WEB3_KEY);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      }).then((res) => res.json());

      if (res.success) {
        toast.success("Message sent successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to send message. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
      bg-gray-100 dark:bg-gray-900 dark:text-white px-6 py-10">

      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-lg
          bg-white dark:bg-gray-800
          p-8 md:p-10
          rounded-2xl shadow-xl
          border border-gray-200 dark:border-gray-700
          transition-all
        "
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
          Contact Us
        </h1>

        {/* NAME */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            required
            className="
              w-full px-4 py-3
              rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700
              focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
              outline-none
              transition
            "
          />
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">Your Email</label>
          <input
            type="email"
            name="email"
            required
            className="
              w-full px-4 py-3
              rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700
              focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
              outline-none
              transition
            "
          />
        </div>

        {/* MESSAGE */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Message</label>
          <textarea
            name="message"
            rows={5}
            required
            className="
              w-full resize-none
              px-4 py-3
              rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700
              h-40
              focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
              outline-none
              transition
            "
          ></textarea>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full py-3
            bg-green-600 hover:bg-green-700
            text-white font-semibold
            rounded-lg
            shadow-md
            transition
          "
        >
          Send Message
        </button>

        <p className="mt-4 text-center text-sm opacity-80">{result}</p>
      </form>
    </div>
  );
};

export default Contact;