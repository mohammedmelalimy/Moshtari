import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <main className=" py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
