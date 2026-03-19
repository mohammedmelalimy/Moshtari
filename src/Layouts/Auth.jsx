import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
const Auth = () => {
  return (
    <>
      <Navbar />

      <main className="flex flex-col justify-between min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Auth;
