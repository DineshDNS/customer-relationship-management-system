import {
  useEffect,
  useMemo,
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

import ModuleNav from "../../components/common/ModuleNav";

import {
  ACTIVITIES_NAV,
} from "../../theme/activitiesNav";

import api from "../../api/api";

function ActivityList() {

  const [activities,
    setActivities] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [actionFilter,
    setActionFilter] =
    useState("ALL");

  useEffect(() => {

    fetchActivities();

  }, []);

  const fetchActivities =
    async () => {

      setLoading(true);

      try {

        const response =
          await api.get(
            "activities/"
          );

        const data =

          Array.isArray(
            response.data
          )

          ?

          response.data

          :

          response.data.results || [];

        setActivities(data);

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  const filteredActivities =
    useMemo(() => {

      return activities.filter(

        (activity) => {

          const matchSearch =

            activity.description
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            activity.username
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchAction =

            actionFilter === "ALL"

            ||

            activity.action_type === actionFilter;

          return (

            matchSearch

            &&

            matchAction

          );

        }

      );

    }, [

      activities,

      search,

      actionFilter,

    ]);

  const stats = {

    total:

      activities.length,

    today:

      activities.filter(

        (activity) => {

          const today =

            new Date()

            .toISOString()

            .split("T")[0];

          return activity.created_at.startsWith(today);

        }

      ).length,

  };

  const getIcon =
    (actionType) => {

      switch (actionType) {

        case "CUSTOMER_CREATED":

          return (
            <FaUserPlus className="text-blue-600 text-2xl" />
          );

        case "LEAD_CREATED":

          return (
            <FaBullseye className="text-purple-600 text-2xl" />
          );

        case "LEAD_ASSIGNED":

          return (
            <FaBullseye className="text-orange-600 text-2xl" />
          );

        case "LEAD_STATUS_CHANGED":

          return (
            <FaExchangeAlt className="text-yellow-600 text-2xl" />
          );

        case "DEAL_CREATED":

          return (
            <FaMoneyBillWave className="text-green-600 text-2xl" />
          );

        case "DEAL_STAGE_CHANGED":

          return (
            <FaChartLine className="text-red-600 text-2xl" />
          );

        case "TASK_CREATED":

          return (
            <FaTasks className="text-indigo-600 text-2xl" />
          );

        case "TASK_COMPLETED":

          return (
            <FaCheckCircle className="text-green-700 text-2xl" />
          );

        default:

          return (
            <FaHistory className="text-gray-600 text-2xl" />
          );

      }

    };

      return (

    <MainLayout>

      {/* Header */}

      <div
        className="
        flex

        justify-between

        items-center

        mb-6
      "
      >

        <div>

          <h1
            className="
            text-3xl

            font-bold

            text-gray-800
          "
          >
            Activity Timeline
          </h1>

          <p
            className="
            text-gray-500

            mt-1
          "
          >
            Monitor all CRM activities in one place.
          </p>

        </div>

      </div>

      <ModuleNav
        items={ACTIVITIES_NAV}
      />

      {/* Dashboard */}

      <div
        className="
        grid

        md:grid-cols-2

        gap-6

        my-6
      "
      >

        <div
          className="
          bg-white

          rounded-2xl

          shadow

          p-6
        "
        >

          <p
            className="
            text-gray-500
          "
          >
            Total Activities
          </p>

          <h2
            className="
            text-4xl

            font-bold

            mt-2
          "
          >
            {stats.total}
          </h2>

        </div>

        <div
          className="
          bg-white

          rounded-2xl

          shadow

          p-6
        "
        >

          <p
            className="
            text-gray-500
          "
          >
            Today's Activities
          </p>

          <h2
            className="
            text-4xl

            font-bold

            text-red-600

            mt-2
          "
          >
            {stats.today}
          </h2>

        </div>

      </div>

      {/* Search & Filter */}

      <div
        className="
        bg-white

        rounded-2xl

        shadow

        p-5

        mb-6

        flex

        flex-col

        lg:flex-row

        gap-4
      "
      >

        <input

          type="text"

          value={search}

          placeholder="Search activities..."

          onChange={(e)=>

            setSearch(
              e.target.value
            )

          }

          className="
          flex-1

          border

          border-red-200

          rounded-xl

          p-3

          outline-none

          focus:ring-2

          focus:ring-red-500
        "
        />

        <select

          value={actionFilter}

          onChange={(e)=>

            setActionFilter(
              e.target.value
            )

          }

          className="
          border

          border-red-200

          rounded-xl

          p-3
        "
        >

          <option value="ALL">

            All Activities

          </option>

          <option value="CUSTOMER_CREATED">

            Customer Created

          </option>

          <option value="LEAD_CREATED">

            Lead Created

          </option>

          <option value="LEAD_ASSIGNED">

            Lead Assigned

          </option>

          <option value="LEAD_STATUS_CHANGED">

            Lead Status Changed

          </option>

          <option value="DEAL_CREATED">

            Deal Created

          </option>

          <option value="DEAL_STAGE_CHANGED">

            Deal Stage Changed

          </option>

          <option value="TASK_CREATED">

            Task Created

          </option>

          <option value="TASK_COMPLETED">

            Task Completed

          </option>

        </select>

      </div>

      {/* Timeline */}

      <div
        className="
        relative

        pl-10
      "
      >
                {

          loading ?

          (

            <div
              className="
              bg-white

              rounded-2xl

              shadow-md

              p-10

              text-center
            "
            >

              <h2
                className="
                text-xl

                font-semibold
              "
              >

                Loading Activities...

              </h2>

            </div>

          )

          :

          filteredActivities.length === 0 ?

          (

            <div
              className="
              bg-white

              rounded-2xl

              shadow-md

              p-10

              text-center
            "
            >

              <h2
                className="
                text-2xl

                font-bold
              "
              >

                No Activities Found

              </h2>

              <p
                className="
                text-gray-500

                mt-2
              "
              >

                Try changing your search or filters.

              </p>

            </div>

          )

          :

          (

            filteredActivities.map(

              (activity, index) => (

                <div

                  key={activity.id}

                  className="
                  relative

                  flex

                  gap-5

                  pb-8
                "

                >

                  {

                    index !==

                    filteredActivities.length - 1

                    &&

                    (

                      <div
                        className="
                        absolute

                        left-6

                        top-12

                        w-1

                        h-full

                        bg-red-100
                      "
                      />

                    )

                  }

                  {/* Icon */}

                  <div
                    className="
                    w-12

                    h-12

                    rounded-full

                    bg-red-50

                    flex

                    items-center

                    justify-center

                    z-10

                    shadow-sm
                  "
                  >

                    {

                      getIcon(

                        activity.action_type

                      )

                    }

                  </div>

                  {/* Card */}

                  <div
                    className="
                    flex-1

                    bg-white

                    rounded-2xl

                    shadow-md

                    p-5

                    hover:shadow-lg

                    transition-all
                  "
                  >

                    <div
                      className="
                      flex

                      justify-between

                      items-start

                      gap-5
                    "
                    >

                      <div>

                        <h3
                          className="
                          font-bold

                          text-lg

                          text-gray-800
                        "
                        >

                          {activity.username}

                        </h3>

                        <p
                          className="
                          text-gray-600

                          mt-2

                          leading-7
                        "
                        >

                          {activity.description}

                        </p>

                      </div>

                      <span
                        className="
                        text-xs

                        bg-red-100

                        text-red-700

                        px-3

                        py-1

                        rounded-full

                        whitespace-nowrap
                      "
                      >

                        {activity.action_type}

                      </span>

                    </div>

                    <div
                      className="
                      mt-5

                      text-sm

                      text-gray-400
                    "
                    >

                      {

                        new Date(

                          activity.created_at

                        ).toLocaleString()

                      }

                    </div>

                  </div>

                </div>

              )

            )

          )

        }

      </div>
          </MainLayout>

  );

}

export default ActivityList;