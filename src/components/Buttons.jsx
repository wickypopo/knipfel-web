import { Link } from "react-router-dom";

export function Button({ text, link }) {
  return (
    <Link
      to={link}
      className="bg-black text-white p-3 px-4 rounded-full w-full text-[17px] text-center"
    >
      {text}
    </Link>
  );
}
