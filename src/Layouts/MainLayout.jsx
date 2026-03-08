import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
