import {
  useEffect,
  useState,
} from "react";

import MainLayout from
"../../layouts/MainLayout";

import ModuleNav from
"../../components/common/ModuleNav";

import {
  REPORTS_NAV,
} from "../../theme/reportsNav";

import api from
"../../api/api";

import {
  FaUserPlus,
  FaBullseye,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaTasks,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";

function ActivityReport() {

  const [activities, setActivities] =
    useState([]);

  useEffect(() => {

    fetchActivities();

  }, []);

  const fetchActivities =
    async () => {

      try {

        const response =
          await api.get(
            "reports/activities/"
          );

        setActivities(
          Array.isArray(
            response.data
          )
            ? response.data
            : []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const getIcon =
    (action) => {

      switch (action) {

        case "CUSTOMER_CREATED":

          return (
            <FaUserPlus
              className="
              text-blue-600
              text-xl
            "
            />
          );

        case "LEAD_CREATED":

          return (
            <FaBullseye
              className="
              text-purple-600
              text-xl
            "
            />
          );

        case "LEAD_ASSIGNED":

          return (
            <FaBullseye
              className="
              text-orange-600
              text-xl
            "
            />
          );

        case "LEAD_STATUS_CHANGED":

          return (
            <FaExchangeAlt
              className="
              text-yellow-600
              text-xl
            "
            />
          );

        case "DEAL_CREATED":

          return (
            <FaMoneyBillWave
              className="
              text-green-600
              text-xl
            "
            />
          );

        case "DEAL_STAGE_CHANGED":

          return (
            <FaChartLine
              className="
              text-red-600
              text-xl
            "
            />
          );

        case "TASK_CREATED":

          return (
            <FaTasks
              className="
              text-indigo-600
              text-xl
            "
            />
          );

        case "TASK_COMPLETED":

          return (
            <FaCheckCircle
              className="
              text-green-700
              text-xl
            "
            />
          );

        default:

          return (
            <FaHistory
              className="
              text-gray-600
              text-xl
            "
            />
          );
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
          Activity Report
        </h1>

      </div>

      <ModuleNav
        items={REPORTS_NAV}
      />

      <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        mb-6
      "
      >

        <h2
          className="
          text-xl
          font-bold
          mb-2
        "
        >
          Activity Statistics
        </h2>

        <p
          className="
          text-gray-600
        "
        >
          Total Activities:
          {" "}
          <span
            className="
            font-bold
            text-red-600
          "
          >
            {activities.length}
          </span>
        </p>

      </div>

      <div
        className="
        space-y-4
      "
      >

        {activities.map(
          (activity) => (

            <div
              key={activity.date}
              className="
              bg-white
              rounded-2xl
              shadow-md
              p-5

              flex
              gap-4
            "
            >

              <div
                className="
                w-12
                h-12

                rounded-full

                bg-red-50

                flex
                items-center
                justify-center

                flex-shrink-0
              "
              >
                {
                  getIcon(
                    activity.action
                  )
                }
              </div>

              <div
                className="
                flex-1
              "
              >

                <h3
                  className="
                  font-bold
                  text-gray-800
                "
                >
                  {activity.user}
                </h3>

                <p
                  className="
                  text-gray-600
                "
                >
                  {
                    activity.description
                  }
                </p>

                <span
                  className="
                  inline-block

                  mt-2

                  px-3
                  py-1

                  bg-red-100
                  text-red-700

                  rounded-full

                  text-sm
                "
                >
                  {
                    activity.action
                  }
                </span>

                <p
                  className="
                  text-sm
                  text-gray-400
                  mt-2
                "
                >
                  {
                    new Date(
                      activity.date
                    ).toLocaleString()
                  }
                </p>

              </div>

            </div>
          )
        )}

      </div>

    </MainLayout>
  );
}

export default ActivityReport;