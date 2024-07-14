import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./transitions.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <nav className="w-full">
      <ul className="flex align-middle items-center justify-end p-2">
        <h1 className="mr-auto tracking-tighter font-semibold">
          Movie Reviewer
        </h1>
        <div className="flex gap-2 flex-row-reverse hidden sm:flex">
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
            {isOpen && mobileNav(toggleMenu)}
          </div>
        </CSSTransition>
      </ul>
    </nav>
  );
}

const mobileNav = (toggleMenu) => {
  return (
    <div className="absolute top-10 left-0 w-full flex flex-col gap-2 flex-row-reverse h-screen bg-[#242424]">
      <div className="flex flex-col text-right tracking-widest p-2 space-y-1">
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
      </div>
    </div>
  );
};
