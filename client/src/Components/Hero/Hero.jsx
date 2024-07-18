import propTypes from "prop-types";
import Image from "../../assets/Hero.jpg";
import Searchbar from "../Searchbar/searchBar";
import Movies from '../Movies/movies';
import "./style.css";

export default function Hero({ lineOne, subTextOne, subTitle, subTextTwo }) {
  const Hello = () => {
    console.log("Hello World");
  };
  return (
    <div className="z-10 relative  sm:h-96">
      <div className="absolute flex flex-col items-center w-full h-screen  bg-black bg-opacity-60 p-2 space-y-4">
        <h1 className="font-mono text-3xl font-bold text-white tracking-widest text-shadow-default">
          {lineOne}
        </h1>
        <p className="text-shadow-default font-semibold text-lg">
          {subTextOne}
        </p>
        <h2 className="font-mono text-3xl font-bold text-white tracking-widest">
          {subTitle}
        </h2>
        <p className="font-semibold text-lg">{subTextTwo}</p>
        <div className="w-full flex justify-center lg:w-full">
          <Searchbar onButtonClick={Hello} text="Search" />
        </div>
        <Movies /> 
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
