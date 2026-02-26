import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slide1 from "../../assets/slide-1.jpg";
import Slide2 from "../../assets/slide-2.jpg";
import Slide3 from "../../assets/slide-3.png";
import Slide4 from "../../assets/slide-4.jpg";
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="dark:bg-slate-900">
      <Slider {...settings} className="container mx-auto py-5">
        <div  className="w-full overflow-hidden rounded-lg">
          <img src={Slide1} alt="slide 1" className="w-full object-cover"/>
        </div>
        <div className="w-full overflow-hidden rounded-lg">
          <img src={Slide2} alt="slide-2" className="w-full object-cover"/>
        </div>
        <div className="w-full overflow-hidden rounded-lg">
          <img src={Slide3} alt="slide-3" className="w-full object-cover"/>
        </div>
        <div className="w-full overflow-hidden rounded-lg">
          <img src={Slide4} alt="slide-4" className="w-full object-cover"/>
        </div>
      </Slider>
    </div>
  );
}