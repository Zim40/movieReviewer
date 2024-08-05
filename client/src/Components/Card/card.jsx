import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { RiStarSFill } from "react-icons/ri";
// import { RiStarSLine } from "react-icons/ri";
import { formatPercentage } from "../../Functions/movies";
import { FaStar, FaRegStar } from 'react-icons/fa';
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
}) {

  const movieIdStr = id.toString();
  const isFavorite = favorites.includes(movieIdStr);
  
  return (
    <div className="card-container flex flex-col">
      <img
        className="rounded-lg border border-black border-2"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`${title} Image`}
      />
      <h1 className="font-semibold text-amber-400 text-lg tracking-wide font-mono border-b border-amber-400 border-opacity-30">
        {title}
      </h1>
      {isFavorite ? (
          <FaStar className="text-yellow-500 ml-2" /> // Filled star icon if favorite
        ) : (
          <FaRegStar className="text-gray-500 ml-2" /> // Outline star icon if not favorite
        )}
      <p>
        <span className="font-semibold text-amber-400">Release: </span>
        {release_date}
      </p>
      <p>
        {id}
      </p>
      <p>
        <span className="font-semibold text-amber-400">Language: </span>
        {original_language}
      </p>
      <p>
        <span className="font-semibold text-amber-400">Rating: </span>
        {formatPercentage(vote_average)}/10
      </p>
      <p className="tracking-tight">
        <span className="block font-semibold text-amber-400">Overview:</span>
        {overview}
      </p>
      <p>
        
      </p>
      
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  original_language: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number,
  poster_path: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired
};
