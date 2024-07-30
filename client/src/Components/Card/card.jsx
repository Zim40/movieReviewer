import PropTypes from "prop-types";
import {  formatPercentage } from "../../Functions/movies"

export default function Card({ title, poster_path, overview, original_language, release_date, vote_average }) {
  return (
    <div className="card-container flex flex-col">
      <img
      className="rounded-lg border border-black border-2"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`${title} Image`}
      />
      <h1 className="font-semibold text-amber-400 text-lg tracking-wide font-mono border-b border-amber-400 border-opacity-30">{title}</h1>
      <p><span className="font-semibold text-amber-400">Release: </span>{release_date}</p>
      <p><span className="font-semibold text-amber-400">Language: </span>{original_language}</p>
      <p><span className="font-semibold text-amber-400">Rating: </span>{formatPercentage(vote_average)}</p>
      <p className="tracking-tight"><span className="block font-semibold text-amber-400">Overview:</span>{overview}</p>
    </div>
  );
}

Card.propTypes = {
//   id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  original_language: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number,
  poster_path: PropTypes.string
};
