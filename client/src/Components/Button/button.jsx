import propTypes from "prop-types";
export default function Button({ text, onClick }) {
  return (
    
      <button className="border w-full rounded-full p-2 hover:bg-amber-700" onClick={onClick}>{text}</button>
  
  );
}

Button.propTypes = {
  text: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
};
