import { Link } from "react-router-dom";

export function Button({ text, link, variant = "default" }) {
  const variants = {
    default:
      "bg-black text-white p-3 px-4 rounded-full w-full text-[17px] text-center",
    inactive:
      "pointer-events-none opacity-60 bg-black text-gray-300 p-3 px-4 rounded-full w-full text-[17px] text-center",
  };
  return (
    <Link to={link} className={variants[variant]}>
      {text}
    </Link>
  );
}
