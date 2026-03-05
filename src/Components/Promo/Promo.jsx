import { Link } from "react-router-dom";
import offers from "../../assets/oFFer.png";

const Promo = () => {
  return (
    <section
      data-aos="fade-up"
      className="
        my-12 p-8 rounded-3xl overflow-hidden
        bg-slate-50 dark:bg-black
        border border-slate-200 dark:border-slate-700
        shadow-xl flex flex-col md:flex-row items-center justify-between gap-10
      "
    >
      {/* Left Content */}
      <div className="flex-1 space-y-4 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Limited Time Offer 🎉
        </h2>

        <p className="max-w-lg text-lg text-slate-600 dark:text-slate-300 mx-auto md:mx-0">
          Enjoy up to{" "}
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            60% OFF
          </span>{" "}
          on selected items. Don’t miss out on this exclusive weekly deal!
        </p>

        <Link
          to={'login'}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="
            mt-4 px-6 py-3 rounded-xl font-semibold text-white
            bg-indigo-600 hover:bg-indigo-700 transition-all
            shadow-md hover:shadow-lg active:scale-95
          "
        >
          Shop Now →
        </Link>
      </div>

      {/* Image */}
      <div
        data-aos="zoom-in"
        data-aos-delay="150"
        className="shrink-0 hidden sm:block"
      >
        <img
          src={offers}
          alt="Special Offer"
          className="w-56 md:w-64 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default Promo;