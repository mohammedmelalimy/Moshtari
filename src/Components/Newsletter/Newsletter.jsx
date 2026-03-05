export function Newsletter() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          
          {/* Heading */}
          <h2 className="text-4xl font-bold sm:text-5xl">
            Stay Updated
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-lg">
            Subscribe to our newsletter and get <span className="text-indigo-400 font-semibold">10% off</span> your first order. Be the first to know about new arrivals and exclusive offers.
          </p>

          {/* Form */}
          <form className="flex flex-col sm:flex-row gap-5 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                flex-1 px-4 py-3 rounded-lg 
                bg-white/10 border border-white/20
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition
              "
            />

            <button
              type="submit"
              className="
                px-6 py-3 rounded-lg bg-indigo-500 text-white 
                font-medium hover:bg-indigo-600
                transition
              "
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}