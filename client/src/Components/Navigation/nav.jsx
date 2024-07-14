import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <nav className="w-full">
      <ul className="flex align-middle items-center justify-end p-2">
        <h1 className="mr-auto tracking-tighter font-semibold">Movie Reviewer</h1>
        <div className="flex gap-2 flex-row-reverse hidden sm:flex">
          <li className="">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/app">Dashboard</Link>
          </li>
        </div>
        
        <button className="sm:hidden" onClick={toggleMenu}>
        {isOpen ? (
            <p className="">&#10006;</p>
          ) : (
            <p className="">&#9776;</p>
          )}
        </button>
        <div className="Mobile Nav Container">{isOpen && mobileNav(toggleMenu)}</div>
      </ul>
    </nav>
  );
}

const mobileNav = (toggleMenu) => {
  return (
    <div className="absolute top-10 left-0 w-full flex flex-col gap-2 flex-row-reverse">
      <div className="flex flex-col text-right tracking-widest p-2 space-y-1">
        <li className="">
          <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li>
          <Link to="/app" onClick={toggleMenu}>Dashboard</Link>
        </li>
      </div>
    </div>
  );
};
