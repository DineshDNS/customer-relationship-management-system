import {
  useEffect,
  useState,
} from "react";

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

import MainLayout from "../../layouts/MainLayout";

import ModuleNav from
"../../components/common/ModuleNav";

import {
  ACTIVITIES_NAV,
} from "../../theme/activitiesNav";

import api from "../../api/api";

function ActivityList() {

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
            "activities/"
          );

        setActivities(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const getIcon =
  (actionType) => {

    switch (actionType) {

      case "CUSTOMER_CREATED":

        return (
          <FaUserPlus
            className="
            text-blue-600
            text-2xl
          "
          />
        );

      case "LEAD_CREATED":

        return (
          <FaBullseye
            className="
            text-purple-600
            text-2xl
          "
          />
        );

      case "LEAD_ASSIGNED":

        return (
          <FaBullseye
            className="
            text-orange-600
            text-2xl
          "
          />
        );

      case "LEAD_STATUS_CHANGED":

        return (
          <FaExchangeAlt
            className="
            text-yellow-600
            text-2xl
          "
          />
        );

      case "DEAL_CREATED":

        return (
          <FaMoneyBillWave
            className="
            text-green-600
            text-2xl
          "
          />
        );

      case "DEAL_STAGE_CHANGED":

        return (
          <FaChartLine
            className="
            text-red-600
            text-2xl
          "
          />
        );

      case "TASK_CREATED":

        return (
          <FaTasks
            className="
            text-indigo-600
            text-2xl
          "
          />
        );

      case "TASK_COMPLETED":

        return (
          <FaCheckCircle
            className="
            text-green-700
            text-2xl
          "
          />
        );

      default:

        return (
          <FaHistory
            className="
            text-gray-600
            text-2xl
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
          Activities
        </h1>

      </div>

      <ModuleNav
        items={ACTIVITIES_NAV}
      />

      <div
        className="
        space-y-4
      "
      >

        {activities.map(
          (activity) => (

            <div
              key={activity.id}
              className="
              bg-white

              rounded-2xl

              shadow-md

              p-5

              flex
              items-start
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
                    activity.action_type
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
                  {activity.username}
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

                <p
                  className="
                  text-sm
                  text-gray-400
                  mt-2
                "
                >
                  {
                    new Date(
                      activity.created_at
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

export default ActivityList;