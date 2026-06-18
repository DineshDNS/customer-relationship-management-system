import { NavLink } from "react-router-dom";

import {
  MENU_ITEMS,
} from "../../theme/menu";

function Sidebar() {

  const menuItems =
    MENU_ITEMS;

  return (

    <div
      className="
      w-64
      fixed
      left-0
      top-0
      h-screen

      overflow-y-auto

      bg-gradient-to-b
      from-red-800
      via-red-900
      to-red-950

      text-white
      shadow-xl
    "
    >

      <div
        className="
        h-20
        flex
        items-center
        justify-center

        border-b
        border-red-700

        sticky
        top-0

        bg-red-900

        z-10
      "
      >

        <h1
          className="
          text-2xl
          font-bold
          tracking-wide
        "
        >
          CRM PRO
        </h1>

      </div>

      <div className="p-4">

        {menuItems.map(
          (item) => {

            const Icon =
              item.icon;

            return (

              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>

                  `
                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  mb-2

                  rounded-xl

                  transition-all

                  ${
                    isActive
                      ? "bg-red-600 shadow-lg"
                      : "hover:bg-red-700"
                  }
                `
                }
              >

                <Icon />

                {item.name}

              </NavLink>
            );
          }
        )}

      </div>

    </div>
  );
}

export default Sidebar;