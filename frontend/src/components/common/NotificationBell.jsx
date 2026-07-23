import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  FaBell,
} from "react-icons/fa";

import api from "../../api/api";

function NotificationBell() {

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {

    fetchUnreadCount();

    fetchLatestNotifications();

    const interval = setInterval(() => {

      fetchUnreadCount();

      fetchLatestNotifications();

    }, 30000);

    return () => clearInterval(interval);

  }, []);

  // ==========================
  // Unread Count
  // ==========================

  const fetchUnreadCount =
    async () => {

      try {

        const response =
          await api.get(
            "notifications/unread-count/"
          );

        setUnreadCount(
          response.data.unread_count
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ==========================
  // Latest Notifications
  // ==========================

  const fetchLatestNotifications =
    async () => {

      try {

        const response =
          await api.get(
            "notifications/"
          );

        const data =

          Array.isArray(
            response.data
          )

            ? response.data

            : response.data.results || [];

        setNotifications(
          data.slice(0, 5)
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ==========================
  // Mark Read
  // ==========================

  const markRead =
    async (id) => {

      try {

        await api.patch(
          `notifications/${id}/read/`
        );

        fetchUnreadCount();

        fetchLatestNotifications();

      }

      catch (error) {

        console.log(error);

      }

    };

  return (
        <div
      className="
      relative
    "
    >

      {/* ==========================
          Notification Bell
      ========================== */}

      <button

        onClick={() =>
          setOpen(
            !open
          )
        }

        className="
        relative

        text-gray-700

        hover:text-red-600

        transition

        text-2xl
      "
      >

        <FaBell />

        {

          unreadCount > 0 && (

            <span
              className="
              absolute

              -top-2

              -right-2

              bg-red-600

              text-white

              rounded-full

              text-xs

              w-5

              h-5

              flex

              items-center

              justify-center
            "
            >

              {

                unreadCount > 99

                ? "99+"

                : unreadCount

              }

            </span>

          )

        }

      </button>

      {/* ==========================
          Dropdown
      ========================== */}

      {

        open && (

          <div
            className="
            absolute

            right-0

            mt-3

            w-96

            bg-white

            rounded-2xl

            shadow-2xl

            border

            z-50
          "
          >

            <div
              className="
              flex

              justify-between

              items-center

              p-4

              border-b
            "
            >

              <h2
                className="
                font-bold

                text-lg
              "
              >
                Notifications
              </h2>

              <span
                className="
                bg-red-600

                text-white

                px-3

                py-1

                rounded-full

                text-xs
              "
              >
                {unreadCount}
              </span>

            </div>

            {

              notifications.length === 0 ? (

                <div
                  className="
                  p-8

                  text-center

                  text-gray-500
                "
                >
                  No Notifications
                </div>

              ) : (

                notifications.map(
                  (notification) => (

                    <div
                      key={notification.id}
                      className={`
                      p-4

                      border-b

                      hover:bg-red-50

                      cursor-pointer

                      ${
                        notification.is_read

                        ? "bg-white"

                        : "bg-red-50"

                      }
                    `}
                    >

                      <div
                        className="
                        flex

                        justify-between

                        items-start
                      "
                      >

                        <div>

                          <div
                            className="
                            flex

                            gap-2

                            items-center

                            mb-2
                          "
                          >

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
                              {
                                notification.notification_type
                              }
                            </span>

                            {

                              !notification.is_read && (

                                <span
                                  className="
                                  bg-green-600

                                  text-white

                                  text-xs

                                  px-2

                                  py-1

                                  rounded-full
                                "
                                >
                                  NEW
                                </span>

                              )

                            }

                          </div>

                          <h3
                            className="
                            font-semibold
                          "
                          >
                            {
                              notification.title
                            }
                          </h3>

                          <p
                            className="
                            text-sm

                            text-gray-500

                            mt-1
                          "
                          >
                            {
                              notification.message
                            }
                          </p>

                          <p
                            className="
                            text-xs

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

                        {

                          !notification.is_read && (

                            <button

                              onClick={() =>
                                markRead(
                                  notification.id
                                )
                              }

                              className="
                              text-blue-600

                              hover:text-blue-800

                              text-sm
                            "
                            >
                              Read
                            </button>

                          )

                        }

                      </div>

                    </div>

                  )

                )

              )

            }

            <div
              className="
              p-4

              text-center
            "
            >

              <Link

                to="/notifications"

                onClick={() =>
                  setOpen(false)
                }

                className="
                text-red-600

                font-semibold

                hover:underline
              "
              >

                View All Notifications

              </Link>

            </div>

          </div>

        )

      }

          </div>

  );

}

export default NotificationBell;