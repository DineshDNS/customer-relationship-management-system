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

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div
        className="
        ml-64
        min-h-screen
      "
      >

        {/* Fixed Topbar */}

        <div
          className="
          fixed
          top-0
          left-64
          right-0
          z-40

          bg-white
        "
        >

          <Topbar />

        </div>

        {/* Page Content */}

        <main
          className="
          pt-24
          p-8
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