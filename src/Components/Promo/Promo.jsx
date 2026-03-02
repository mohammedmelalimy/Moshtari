import offers from "../../assets/oFFer.png";

const Promo = () => {
  return (
    <div
      className="my-10 p-6 rounded-2xl shadow-lg 
      bg-slate-100 dark:bg-slate-800 
      border border-slate-200 dark:border-slate-700 
      flex flex-col md:flex-row 
      items-center md:items-start 
      justify-between gap-6 overflow-hidden"
      data-aos="fade-up"
    >
      {/* Text Section */}
      <div className="flex-1 space-y-3 text-center md:text-left">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Special Offer 🎉
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-lg">
          Get up to{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            60% OFF
          </span>{" "}
          on selected products this week only!
        </p>

        <button className="mt-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition">
          Shop Now →
        </button>
      </div>

      {/* Image Section */}
      <div
        className="shrink-0"
        data-aos="zoom-in"
        data-aos-delay="150"
      >
        <img
          src={offers}
          alt="Offer"
          className="w-48 md:w-56 drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default Promo;