import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Auth from "../../utils/Auth";
import "./transitions.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);

  const isUser = Auth.loggedIn() ? Auth.getProfile().data : null;
  console.log(isUser);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };
  return (
    <nav className="w-full">
      <ul className="flex align-middle items-center justify-end p-2">
        <h1 className="mr-auto tracking-tighter font-semibold">
          {isUser ? `${isUser.firstName} ${isUser.lastName}` : `Welcome`}
        </h1>

        <div className="flex gap-2 flex-row-reverse hidden sm:flex">
        {Auth.loggedIn() ? (
          <li className="" >
            <span onClick={logout} className="">Logout</span>
          </li>
        ) : (
          <li className="">
            <span className="mr-2">
              <Link to="/login">
                Login
              </Link>
            </span>
            <span>
              <Link to="/register">
                Register
              </Link>
            </span>
          </li>
        )}
          <li className="">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/app">Dashboard</Link>
          </li>
          
        </div>

        <button className="sm:hidden" onClick={toggleMenu}>
          {isOpen ? <p className="">&#10006;</p> : <p className="">&#9776;</p>}
        </button>
        <CSSTransition
          nodeRef={nodeRef}
          timeout={400}
          in={isOpen}
          classNames="my-node"
          unmountOnExit
        >
          <div ref={nodeRef} className="Mobile Nav Container z-20 ">
            {isOpen && mobileNav(toggleMenu, logout)}
          </div>
        </CSSTransition>
      </ul>
    </nav>
  );
}

const mobileNav = (toggleMenu, logout) => {
  return (
    <div className="absolute top-10 left-0 w-full flex flex-col gap-2 flex-row-reverse h-screen bg-[#0e1018]">
      <div className="flex flex-col text-right text-lg tracking-widest p-2 space-y-8 mt-6">
        <li className="">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/app" onClick={toggleMenu}>
            Dashboard
          </Link>
        </li>

        {Auth.loggedIn() ? (
          <li className="" >
            <span onClick={logout} className="">Logout</span>
          </li>
        ) : (
          <li className="">
            <span className="">
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
            </span>
            <span className="text-xs mx-2 text-slate-500">or</span>
            <span>
              <Link to="/register" onClick={toggleMenu}>
                Register
              </Link>
            </span>
          </li>
        )}
      </div>
    </div>
  );
};
