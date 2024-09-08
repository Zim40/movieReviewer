import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/nav";
import Footer from "../Footer/Footer";

export default function Header() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
      <footer className="fixed bottom-0 z-10 w-full">
      <Footer />
      </footer>
      
    </>
  );
}
