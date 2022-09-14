import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export interface CharacterItemProps {
  name: String;
  url: String;
}

function Card({ name, url }: CharacterItemProps) {
  const id = url.split("/")[5];

  return (
    <li className="text-2xl hover:text-slate-50">
      <Link to={`/characters/${id}`}>{name}</Link>
    </li>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};

export default Card;
