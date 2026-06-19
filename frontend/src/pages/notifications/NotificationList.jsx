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
  FaEnvelopeOpen,
} from "react-icons/fa";

function NotificationList() {

  const [notifications,
    setNotifications] =
    useState([]);

  const [activeTab,
    setActiveTab] =
    useState("UNREAD");

  const [visibleCount,
    setVisibleCount] =
    useState(5);

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

  const unreadNotifications =

    notifications.filter(
      (item) =>
        !item.is_read
    );

  const readNotifications =

    notifications.filter(
      (item) =>
        item.is_read
    );

  const unreadCount =
    unreadNotifications.length;

  let filteredNotifications =
    notifications;

  if (
    activeTab ===
    "UNREAD"
  ) {

    filteredNotifications =
      unreadNotifications;

  } else if (
    activeTab ===
    "READ"
  ) {

    filteredNotifications =
      readNotifications;
  }

  const visibleNotifications =

    filteredNotifications.slice(
      0,
      visibleCount
    );

  const getTimeAgo =
    (dateString) => {

      const date =
        new Date(
          dateString
        );

      const now =
        new Date();

      const seconds =
        Math.floor(
          (
            now - date
          ) / 1000
        );

      if (
        seconds < 60
      ) {
        return "Just now";
      }

      const minutes =
        Math.floor(
          seconds / 60
        );

      if (
        minutes < 60
      ) {
        return `${minutes} mins ago`;
      }

      const hours =
        Math.floor(
          minutes / 60
        );

      if (
        hours < 24
      ) {
        return `${hours} hrs ago`;
      }

      const days =
        Math.floor(
          hours / 24
        );

      return `${days} days ago`;
    };

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
          "
          >
            Mark All Read
          </button>

        )}

      </div>

      {/* Tabs */}

      <div
        className="
        flex
        gap-3
        mb-6
      "
      >

        <button
          onClick={() => {

            setActiveTab(
              "UNREAD"
            );

            setVisibleCount(
              5
            );
          }}
          className={`
            px-5
            py-2
            rounded-xl

            ${
              activeTab ===
              "UNREAD"

              ? "bg-red-600 text-white"

              : "bg-white"
            }
          `}
        >
          Unread
          {" "}
          (
          {unreadCount}
          )
        </button>

        <button
          onClick={() => {

            setActiveTab(
              "READ"
            );

            setVisibleCount(
              5
            );
          }}
          className={`
            px-5
            py-2
            rounded-xl

            ${
              activeTab ===
              "READ"

              ? "bg-red-600 text-white"

              : "bg-white"
            }
          `}
        >
          Read
          {" "}
          (
          {
            readNotifications.length
          }
          )
        </button>

        <button
          onClick={() => {

            setActiveTab(
              "ALL"
            );

            setVisibleCount(
              5
            );
          }}
          className={`
            px-5
            py-2
            rounded-xl

            ${
              activeTab ===
              "ALL"

              ? "bg-red-600 text-white"

              : "bg-white"
            }
          `}
        >
          All
          {" "}
          (
          {
            notifications.length
          }
          )
        </button>

      </div>

      {visibleNotifications.length === 0 ? (

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
            text-gray-500
          "
          >
            No Notifications
          </h2>

        </div>

      ) : (

        <div
          className="
          space-y-4
        "
        >

          {visibleNotifications.map(
            (
              notification
            ) => (

              <div
                key={
                  notification.id
                }
                onClick={() => {

                  if (
                    !notification.is_read
                  ) {

                    markAsRead(
                      notification.id
                    );
                  }
                }}
                className={`
                  p-5

                  rounded-2xl

                  shadow-md

                  cursor-pointer

                  transition-all

                  hover:scale-[1.01]

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
                    w-12
                    h-12

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
                      "
                      />

                    ) : (

                      <FaBell
                        className="
                        text-red-600
                      "
                      />

                    )}

                  </div>

                  <div
                    className="
                    flex-1
                  "
                  >

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
                      mt-2
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
                        getTimeAgo(
                          notification.created_at
                        )
                      }
                    </p>

                  </div>

                </div>

              </div>
            )
          )}

          {filteredNotifications.length >
            visibleCount && (

            <div
              className="
              text-center
              mt-6
            "
            >

              <button
                onClick={() =>
                  setVisibleCount(
                    visibleCount + 5
                  )
                }
                className="
                bg-red-600
                hover:bg-red-700

                text-white

                px-6
                py-3

                rounded-xl
              "
              >
                See More
              </button>

            </div>

          )}

        </div>

      )}

    </MainLayout>
  );
}

export default NotificationList;