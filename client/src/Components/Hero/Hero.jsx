import propTypes from "prop-types";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner";
import Image from "../../assets/Hero.jpg";

// import Movies from '../Movies/movies';
const Movies = lazy(() => import("../Movies/movies"));
import "./style.css";
import Auth from "../../utils/Auth";

export default function Hero({ lineOne, subTextOne, subTitle, subTextTwo }) {
  const isUser = Auth.loggedIn() ? Auth.getProfile().data : null;
  return (
    <div className="z-10 relative  sm:h-96">
      <div className="absolute flex flex-col items-center w-full h-screen  bg-black bg-opacity-60 p-2">
        <h1 className="font-mono text-3xl font-bold text-white tracking-widest text-shadow-default">
          {lineOne}
        </h1>
        <p className="text-md">{subTextOne}</p>
        <h2 className="font-mono text-3xl font-bold text-white tracking-widest">
          {subTitle}
        </h2>
        <p className="text-md">{subTextTwo}</p>
        {isUser ? (
        ""
        ) : (
          <div className="flex align-center items-center justify-center rounded-full bg-[#0e1018] bg-opacity-60 gap-4 p-2 mt-4 w-full md:w-1/2">
          <Link to="/login">
            <button className="flex w-36 align-center items-center justify-center border border-amber-400 rounded-full  p-1 bg-[#0e1018]">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="flex w-36 align-center items-center justify-center border border-amber-400 rounded-full p-1 bg-[#0e1018]">
              Sign Up
            </button>
          </Link>
        </div>
        )}

        <Suspense fallback={<Spinner />}>
          <div className="flex w-full text-sm px-4 mt-4">
            <label className="block border-b border-r border-amber-400 px-2 text-amber-400 font-semibold font-mono rounded-md bg-[#0e1018] bg-opacity-60">
              Popular
            </label>
          </div>

          <div className="flex w-full overflow-y-hidden overflow-x-scroll">
            <Movies />
          </div>
        </Suspense>
      </div>
      <img
        src={Image}
        alt="Hero Image"
        className="w-full h-screen object-cover sm:h-screen"
      ></img>
    </div>
  );
}

Hero.propTypes = {
  lineOne: propTypes.string,
  subTextOne: propTypes.string,
  subTitle: propTypes.string,
  subTextTwo: propTypes.string,
};
