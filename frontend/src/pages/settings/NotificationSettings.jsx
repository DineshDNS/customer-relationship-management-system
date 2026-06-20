import { useState } from "react";

import MainLayout from
  "../../layouts/MainLayout";

import BackButton from
  "../../components/common/BackButton";

function NotificationSettings() {

  const [settings,
    setSettings] =
    useState({

      email_notifications: true,

      task_reminders: true,

      deal_updates: true,

      lead_notifications: true,
    });

  const handleToggle =
    (field) => {

      setSettings({

        ...settings,

        [field]:
          !settings[field],
      });
    };

  const handleSave = () => {

    alert(
      "Notification Settings Saved"
    );

    // Later:
    // call backend API
  };

  return (

    <MainLayout>

      <BackButton
        path="/settings"
        title="Settings"
      />

      <div
        className="
        max-w-4xl
        mx-auto

        bg-white

        p-10

        rounded-3xl

        shadow-md
      "
      >

        <h1
          className="
          text-4xl
          font-bold
          text-red-700

          mb-8
        "
        >
          Notification Settings
        </h1>

        <div
          className="
          space-y-6
        "
        >

          <div
            className="
            flex
            justify-between
            items-center

            border-b

            pb-4
          "
          >

            <h3>
              Email Notifications
            </h3>

            <input
              type="checkbox"

              checked={
                settings.email_notifications
              }

              onChange={() =>
                handleToggle(
                  "email_notifications"
                )
              }

              className="
              w-6
              h-6
            "
            />

          </div>

          <div
            className="
            flex
            justify-between
            items-center

            border-b

            pb-4
          "
          >

            <h3>
              Task Reminders
            </h3>

            <input
              type="checkbox"

              checked={
                settings.task_reminders
              }

              onChange={() =>
                handleToggle(
                  "task_reminders"
                )
              }

              className="
              w-6
              h-6
            "
            />

          </div>

          <div
            className="
            flex
            justify-between
            items-center

            border-b

            pb-4
          "
          >

            <h3>
              Deal Updates
            </h3>

            <input
              type="checkbox"

              checked={
                settings.deal_updates
              }

              onChange={() =>
                handleToggle(
                  "deal_updates"
                )
              }

              className="
              w-6
              h-6
            "
            />

          </div>

          <div
            className="
            flex
            justify-between
            items-center

            border-b

            pb-4
          "
          >

            <h3>
              Lead Notifications
            </h3>

            <input
              type="checkbox"

              checked={
                settings.lead_notifications
              }

              onChange={() =>
                handleToggle(
                  "lead_notifications"
                )
              }

              className="
              w-6
              h-6
            "
            />

          </div>

        </div>

        <button
          onClick={handleSave}

          className="
          mt-8

          bg-red-600
          hover:bg-red-700

          text-white

          px-8
          py-4

          rounded-xl

          font-semibold
        "
        >
          Save Settings
        </button>

      </div>

    </MainLayout>
  );
}

export default NotificationSettings;    