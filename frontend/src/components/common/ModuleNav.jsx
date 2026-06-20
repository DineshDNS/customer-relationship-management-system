import { NavLink } from "react-router-dom";

function ModuleNav({ items }) {

  return (

    <div
      className="
      flex
      flex-wrap
      gap-3
      mb-6
    "
    >

      {items.map((item) => (

        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            px-5
            py-2

            rounded-full

            border

            transition-all

            font-medium

            ${
              isActive
                ? `
                  bg-red-600
                  text-white
                  border-red-600
                `
                : `
                  bg-white
                  text-red-700
                  border-red-200
                  hover:bg-red-50
                `
            }
          `}
        >

          {item.name}

        </NavLink>

      ))}

    </div>

  );
}

export default ModuleNav;