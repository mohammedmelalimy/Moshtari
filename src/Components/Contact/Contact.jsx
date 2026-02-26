import { useState } from "react";
import { toast } from "react-toastify";
const Contact = () => {
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");
try{
    const formData = new FormData(e.target);
    formData.append("access_key", import.meta.env.VITE_WEB3_KEY);
    console.log("KEY:", import.meta.env.VITE_WEB3_KEY);
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
    <div className="min-h-screen flex items-center justify-center  bg-gray-100 dark:bg-gray-900 dark:text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl container mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Your Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium w-full">Message</label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full resize-none h-48 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Send Message
        </button>

        <p className="mt-4 text-center text-sm">{result}</p>
      </form>
    </div>
  );
};

export default Contact;