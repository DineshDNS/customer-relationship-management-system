import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import MainLayout from
"../../layouts/MainLayout";

import ModuleNav from
"../../components/common/ModuleNav";

import api from
"../../api/api";

import {
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";

const COMMUNICATIONS_NAV = [

  {
    name: "All",
    path: "/communications",
  },

  {
    name: "Create",
    path: "/communications/create",
  },
];

function CommunicationList() {

  const [communications,
    setCommunications] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    fetchCommunications();

  }, []);

  const fetchCommunications =
    async (value = "") => {

      try {

        const response =
          await api.get(
            `communications/?search=${value}`
          );

        setCommunications(

          Array.isArray(
            response.data
          )

          ? response.data

          : response.data.results || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const getIcon =
    (type) => {

      switch (type) {

        case "CALL":
          return <FaPhone />;

        case "EMAIL":
          return <FaEnvelope />;

        case "MEETING":
          return <FaCalendarAlt />;

        default:
          return <FaStickyNote />;
      }
    };

  return (

    <MainLayout>

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >

        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Communications
        </h1>

        <Link
          to="/communications/create"
          className="
          bg-red-600
          hover:bg-red-700

          text-white

          px-5
          py-3

          rounded-xl
        "
        >
          Add Communication
        </Link>

      </div>

      <ModuleNav
        items={COMMUNICATIONS_NAV}
      />

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {

          setSearch(
            e.target.value
          );

          fetchCommunications(
            e.target.value
          );
        }}
        className="
        w-full

        border

        rounded-xl

        p-3

        mb-6
      "
      />

      <div
        className="
        space-y-4
      "
      >

        {communications.map(
          (item) => (

            <Link
              key={item.id}
              to={`/communications/${item.id}`}
            >

              <div
                className="
                bg-white

                rounded-2xl

                shadow-md

                p-5

                flex
                gap-4

                hover:shadow-lg

                transition-all
              "
              >

                <div
                  className="
                  text-red-600
                  text-3xl
                "
                >
                  {
                    getIcon(
                      item.communication_type
                    )
                  }
                </div>

                <div>

                  <h3
                    className="
                    text-xl
                    font-bold
                  "
                  >
                    {item.subject}
                  </h3>

                  <p>
                    {
                      item.customer_name
                    }
                  </p>

                  <p
                    className="
                    text-gray-500
                  "
                  >
                    {
                      item.communication_type
                    }
                  </p>

                </div>

              </div>

            </Link>
          )
        )}

      </div>

    </MainLayout>
  );
}

export default CommunicationList;