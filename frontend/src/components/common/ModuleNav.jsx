import {
  NavLink,
} from "react-router-dom";

function ModuleNav({
  items,
}) {

  return (

    <div
      className="
      flex
      gap-3
      mb-6
      flex-wrap
    "
    >

      {items.map(
        (item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({
              isActive,
            }) =>
              `
              px-4
              py-2

              rounded-xl

              font-medium

              transition-all

              ${
                isActive
                  ? "bg-red-600 text-white"
                  : "bg-white border border-red-200 hover:bg-red-50"
              }
            `
            }
          >
            {item.name}
          </NavLink>
        )
      )}

    </div>
  );
}

export default ModuleNav;