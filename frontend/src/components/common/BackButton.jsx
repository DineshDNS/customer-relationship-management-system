import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton({
  path,
  title,
}) {

  const navigate =
    useNavigate();

  return (

    <button
      onClick={() =>
        navigate(path)
      }
      className="
      flex
      items-center
      gap-2

      bg-white

      border
      border-red-200

      text-red-700

      px-4
      py-2

      rounded-xl

      shadow-sm

      hover:bg-red-50

      transition-all

      mb-6
    "
    >

      <FaArrowLeft />

      Back to {title}

    </button>
  );
}

export default BackButton;