import {
  useEffect,
  useState,
} from "react";

import MainLayout from
"../../layouts/MainLayout";

import BackButton from
"../../components/common/BackButton";

import api from
"../../api/api";

import {
  FaBell,
  FaCheckCircle,
  FaEnvelopeOpen,
} from "react-icons/fa";

function NotificationList() {

  const [notifications,
    setNotifications] =
    useState([]);

  useEffect(() => {

    fetchNotifications();

    const interval =
      setInterval(
        fetchNotifications,
        10000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const response =
          await api.get(
            "notifications/"
          );

        setNotifications(

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

  const markAsRead =
    async (id) => {

      try {

        await api.patch(
          `notifications/${id}/read/`
        );

        fetchNotifications();

      } catch (error) {

        console.log(error);
      }
    };

  const markAllAsRead =
    async () => {

      try {

        await Promise.all(

          notifications

            .filter(
              (item) =>
                !item.is_read
            )

            .map(
              (item) =>
                api.patch(
                  `notifications/${item.id}/read/`
                )
            )
        );

        fetchNotifications();

      } catch (error) {

        console.log(error);
      }
    };

  const unreadCount =

    notifications.filter(
      (item) =>
        !item.is_read
    ).length;

  return (

    <MainLayout>

      <BackButton
        path="/dashboard"
        title="Dashboard"
      />

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
            Notifications
          </h1>

          <p
            className="
            text-gray-500
            mt-1
          "
          >
            {unreadCount}
            {" "}
            unread notifications
          </p>

        </div>

        {unreadCount > 0 && (

          <button
            onClick={
              markAllAsRead
            }
            className="
            bg-green-600
            hover:bg-green-700

            text-white

            px-5
            py-3

            rounded-xl

            flex
            items-center
            gap-2
          "
          >

            <FaCheckCircle />

            Mark All Read

          </button>

        )}

      </div>

      {notifications.length === 0 ? (

        <div
          className="
          bg-white

          rounded-3xl

          shadow-md

          p-16

          text-center
        "
        >

          <FaBell
            className="
            text-6xl
            text-gray-300

            mx-auto

            mb-4
          "
          />

          <h2
            className="
            text-2xl
            font-bold
            text-gray-600
          "
          >
            No Notifications
          </h2>

          <p
            className="
            text-gray-400
            mt-2
          "
          >
            You're all caught up.
          </p>

        </div>

      ) : (

        <div
          className="
          space-y-4
        "
        >

          {notifications.map(
            (notification) => (

              <div
                key={
                  notification.id
                }
                className={`
                  rounded-2xl

                  shadow-md

                  p-5

                  flex
                  justify-between
                  items-center

                  transition-all

                  ${
                    notification.is_read

                    ? "bg-white"

                    : `
                      bg-red-50
                      border-l-4
                      border-red-600
                    `
                  }
                `}
              >

                <div
                  className="
                  flex
                  gap-4
                "
                >

                  <div
                    className="
                    w-14
                    h-14

                    rounded-full

                    bg-red-100

                    flex
                    items-center
                    justify-center
                  "
                  >

                    {notification.is_read ? (

                      <FaEnvelopeOpen
                        className="
                        text-green-600
                        text-xl
                      "
                      />

                    ) : (

                      <FaBell
                        className="
                        text-red-600
                        text-xl
                      "
                      />

                    )}

                  </div>

                  <div>

                    <div
                      className="
                      flex
                      items-center
                      gap-3
                    "
                    >

                      <h3
                        className="
                        font-bold
                        text-lg
                      "
                      >
                        {
                          notification.title
                        }
                      </h3>

                      {!notification.is_read && (

                        <span
                          className="
                          bg-red-600

                          text-white

                          text-xs

                          px-2
                          py-1

                          rounded-full
                        "
                        >
                          NEW
                        </span>

                      )}

                    </div>

                    <p
                      className="
                      text-gray-600
                      mt-1
                    "
                    >
                      {
                        notification.message
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
                          notification.created_at
                        ).toLocaleString()
                      }
                    </p>

                  </div>

                </div>

                {!notification.is_read && (

                  <button
                    onClick={() =>
                      markAsRead(
                        notification.id
                      )
                    }
                    className="
                    bg-green-600
                    hover:bg-green-700

                    text-white

                    px-4
                    py-2

                    rounded-xl

                    flex
                    items-center
                    gap-2
                  "
                  >

                    <FaCheckCircle />

                    Read

                  </button>

                )}

              </div>
            )
          )}

        </div>

      )}

    </MainLayout>
  );
}

export default NotificationList;