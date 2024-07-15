import propTypes from "prop-types";

export default function Searchbar({ onButtonClick, text }) {
  return (
    <div className="flex mt-8 w-full gap-4 sm:w-1/3">
      <input
        type="search"
        id="search"
        className="block w-full p-2 ps-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 space-y-4"
        placeholder="Search"
        required
      />
      <button type="submit" onClick={onButtonClick} className="px-2 bg-[#322e45] bg-opacity-60 hover:bg-opacity-100 hover:border-slate-700 border border-slate-500 text-slate-300 rounded">
        {text}
      </button>
    </div>
  );
}

Searchbar.propTypes = {
  onButtonClick: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
};
