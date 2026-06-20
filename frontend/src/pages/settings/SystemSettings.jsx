import { useState } from "react";

import MainLayout from
  "../../layouts/MainLayout";

import BackButton from
  "../../components/common/BackButton";

function SystemSettings() {

  const [settings,
    setSettings] =
    useState({

      company_name:
        "CRM PRO",

      currency: "INR",

      timezone:
        "Asia/Kolkata",

      date_format:
        "DD/MM/YYYY",
    });

  const handleChange =
    (e) => {

      setSettings({

        ...settings,

        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    (e) => {

      e.preventDefault();

      alert(
        "CRM Settings Updated"
      );

      // Later:
      // save to backend
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
          CRM Settings
        </h1>

        <form
          onSubmit={handleSubmit}

          className="
          space-y-6
        "
        >

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Company Name
            </label>

            <input
              type="text"

              name="company_name"

              value={
                settings.company_name
              }

              onChange={
                handleChange
              }

              className="
              w-full

              border
              border-red-200

              p-4

              rounded-xl
            "
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Currency
            </label>

            <select
              name="currency"

              value={
                settings.currency
              }

              onChange={
                handleChange
              }

              className="
              w-full

              border
              border-red-200

              p-4

              rounded-xl
            "
            >

              <option value="INR">
                INR (₹)
              </option>

              <option value="USD">
                USD ($)
              </option>

              <option value="EUR">
                EUR (€)
              </option>

            </select>

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Timezone
            </label>

            <input
              type="text"

              name="timezone"

              value={
                settings.timezone
              }

              onChange={
                handleChange
              }

              className="
              w-full

              border
              border-red-200

              p-4

              rounded-xl
            "
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Date Format
            </label>

            <select
              name="date_format"

              value={
                settings.date_format
              }

              onChange={
                handleChange
              }

              className="
              w-full

              border
              border-red-200

              p-4

              rounded-xl
            "
            >

              <option value="DD/MM/YYYY">
                DD/MM/YYYY
              </option>

              <option value="MM/DD/YYYY">
                MM/DD/YYYY
              </option>

              <option value="YYYY-MM-DD">
                YYYY-MM-DD
              </option>

            </select>

          </div>

          <button
            className="
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

        </form>

      </div>

    </MainLayout>
  );
}

export default SystemSettings;