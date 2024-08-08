import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { RiStarSFill } from "react-icons/ri";
// import { RiStarSLine } from "react-icons/ri";
import { formatPercentage } from "../../Functions/movies";
import { FaStar, FaRegStar } from "react-icons/fa";
// import Auth from "../../utils/Auth";

export default function Card({
  id,
  title,
  poster_path,
  overview,
  original_language,
  release_date,
  vote_average,
  favorites,
  onToggleFavorite,
}) {
  const movieIdStr = id.toString();
  const isFavorite = favorites.includes(movieIdStr);


  return (
    <>
      <div className="flex flex-col justify-center align-center bg-black bg-opacity-40 p-4">
        <h1 className="flex font-bold text-lg tracking-wide font-mono border-b border-amber-400 border-opacity-30 mb-4">
          {title}
          {isFavorite ? (
            <FaStar
              className="text-green-400 ml-auto text-2xl"
              onClick={onToggleFavorite}
            /> // Filled star icon if favorite
          ) : (
            <FaRegStar
              className="text-gray-400 ml-auto text-2xl"
              onClick={onToggleFavorite}
            /> // Outline star icon if not favorite
          )}
        </h1>
        <div className="flex">
          <img
            className="rounded-lg border border-black border-2 w-1/2 h-auto "
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`${title} Image`}
          />
          <div className="flex flex-col p-2 space-y-4">
            <p>
              <span className="font-semibold text-amber-400">Release: </span>
              {release_date}
            </p>
            <p>
              <span className="font-semibold text-amber-400">Language: </span>
              {original_language}
            </p>
            <p>
              <span className="font-semibold text-amber-400">Rating: </span>
              {formatPercentage(vote_average)}/10
            </p>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <p className="tracking-tight">
            <span className="block font-semibold text-amber-400">
              Overview:
            </span>
            {overview}
          </p>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  original_language: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  vote_average: PropTypes.number,
  poster_path: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
