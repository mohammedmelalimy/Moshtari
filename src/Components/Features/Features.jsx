import { Headphones, RefreshCw, Shield, Truck } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", description: "Free shipping on orders over $100" },
  { icon: Shield, title: "Secure Payment", description: "100% secure payment processing" },
  { icon: RefreshCw, title: "Easy Returns", description: "30-day return policy on all items" },
  { icon: Headphones, title: "24/7 Support", description: "Dedicated customer support team" },
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"          // ✅ fade up animation
                data-aos-delay={index * 100} // optional: stagger animation
              >
                {/* Icon Circle */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 mb-4 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-gray-900 dark:text-white font-semibold text-lg">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}