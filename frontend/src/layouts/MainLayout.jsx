import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

function MainLayout({ children }) {

  return (

    <div
      className="
      min-h-screen
      bg-red-50
    "
    >

      <Sidebar />

      <div
        className="
        ml-64

        min-h-screen

        flex
        flex-col
      "
      >

        <Topbar />

        <main
          className="
          flex-1

          p-8

          overflow-y-auto
        "
        >

          <div
            className="
            max-w-7xl

            mx-auto
          "
          >

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}

export default MainLayout;