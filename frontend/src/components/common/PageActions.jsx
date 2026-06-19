import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function PageActions({
  backPath,
  backTitle,
  editPath,
  onDelete,
}) {

  const navigate =
    useNavigate();

  return (

    <div
      className="
      flex
      justify-between
      items-center

      bg-white

      border
      border-red-200

      rounded-xl

      shadow-sm

      p-3

      mb-6
    "
    >

      {/* Back Button */}

      <button
        onClick={() =>
          navigate(backPath)
        }
        className="
        flex
        items-center
        gap-2

        text-red-700

        px-4
        py-2

        rounded-lg

        hover:bg-red-50

        transition-all
      "
      >

        <FaArrowLeft />

        Back to {backTitle}

      </button>

      {/* Right Buttons */}

      <div
        className="
        flex
        gap-3
      "
      >

        <button
          onClick={() =>
            navigate(editPath)
          }
          className="
          flex
          items-center
          gap-2

          bg-blue-600
          hover:bg-blue-700

          text-white

          px-4
          py-2

          rounded-lg

          transition-all
        "
        >

          <FaEdit />

          Edit

        </button>

        <button
          onClick={onDelete}
          className="
          flex
          items-center
          gap-2

          bg-red-600
          hover:bg-red-700

          text-white

          px-4
          py-2

          rounded-lg

          transition-all
        "
        >

          <FaTrash />

          Delete

        </button>

      </div>

    </div>
  );
}

export default PageActions;