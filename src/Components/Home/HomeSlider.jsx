import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slide1 from "../../assets/slide-1.jpg";
import Slide2 from "../../assets/slide-2.jpg";
import Slide3 from "../../assets/slide-3.png";
import Slide4 from "../../assets/slide-4.jpg";

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true, // Smooth fade transition
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  const slides = [Slide1, Slide2, Slide3, Slide4];

  return (
    <div className="dark:bg-slate-900 py-6">
      <div className="container mx-auto">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="px-2">
              <div className="relative w-full overflow-hidden rounded-xl shadow-lg hover:scale-105 transform transition duration-500">
                <img
                  src={slide}
                  alt={`slide-${index + 1}`}
                  className="w-full h-64 md:h-96 object-cover"
                />
                
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}