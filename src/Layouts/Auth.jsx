import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
const Auth = () => {
  return (
    <>
      <Navbar />

      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Auth;
