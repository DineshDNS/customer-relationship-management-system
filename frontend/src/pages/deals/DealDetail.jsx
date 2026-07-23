import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaUser,
  FaUserTie,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import PageActions from "../../components/common/PageActions";
import api from "../../api/api";

function DealDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [deal, setDeal] =
    useState(null);

  const [stage, setStage] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [assignedUser, setAssignedUser] =
    useState("");

  const currentUser = {

    role:
      localStorage.getItem("role"),

    username:
      localStorage.getItem("username"),

  };

  useEffect(() => {

    fetchDeal();

    if (

      currentUser.role === "ADMIN"

      ||

      currentUser.role === "MANAGER"

    ) {

      fetchUsers();

    }

  }, []);

  // ==========================
  // Fetch Deal
  // ==========================

  const fetchDeal =
    async () => {

      try {

        const response =
          await api.get(
            `deals/${id}/`
          );

        setDeal(response.data);

        setStage(
          response.data.stage
        );

        setAssignedUser(
          response.data.assigned_to || ""
        );

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  // ==========================
  // Fetch Users
  // ==========================

  const fetchUsers =
    async () => {

      try {

        const response =
          await api.get(
            "auth/assign-users/"
        );

        setUsers(

          response.data.results ||

          response.data ||

          []

        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ==========================
  // Assign Deal
  // ==========================

  const assignDeal =
    async () => {

      try {

        await api.patch(

          `deals/${id}/assign/`,

          {

            assigned_to:
              assignedUser,

          }

        );

        alert(
          "Deal assigned successfully."
        );

        fetchDeal();

      }

      catch (error) {

        console.log(error);

      }

    };

  // ==========================
  // Update Stage
  // ==========================

  const updateStage =
    async () => {

      try {

        await api.patch(

          `deals/${id}/stage/`,

          {

            stage,

          }

        );

        alert(
          "Deal stage updated."
        );

        fetchDeal();

      }

      catch (error) {

        console.log(error);

      }

    };

  // ==========================
  // Delete
  // ==========================

  const handleDelete =
    async () => {

      if (

        !window.confirm(
          "Delete this deal?"
        )

      ) return;

      try {

        await api.delete(
          `deals/${id}/`
        );

        alert(
          "Deal deleted."
        );

        navigate(
          "/deals"
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const canAssign =

    currentUser.role === "ADMIN"

    ||

    currentUser.role === "MANAGER";

  const canDelete =

    currentUser.role !==
    "SALES_EXECUTIVE";

  const canEdit =
    currentUser.role !== "SALES_EXECUTIVE";

  if (loading) {

    return (

      <MainLayout>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
          text-center
        "
        >

          Loading Deal...

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      

        <PageActions
        backPath="/deals"
        backTitle="Deals"
        editPath={canEdit
      ? `/deals/${id}/edit`
      : null}
        onDelete={
          canDelete
            ? handleDelete
            : null
        }
      />

      {/* ==========================================
          Deal Header
      ========================================== */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
        mb-8
      "
      >

        <div
          className="
          flex
          flex-col
          lg:flex-row

          justify-between

          lg:items-center

          gap-8
        "
        >

          {/* Left */}

          <div
            className="
            flex
            items-center
            gap-6
          "
          >

            <div
              className="
              w-24
              h-24

              rounded-full

              bg-red-100

              flex

              items-center

              justify-center

              text-5xl

              font-bold

              text-red-700
            "
            >

              {

                deal.deal_name

                  ? deal.deal_name
                      .charAt(0)
                      .toUpperCase()

                  : "D"

              }

            </div>

            <div>

              <h1
                className="
                text-4xl
                font-bold
              "
              >

                {deal.deal_name}

              </h1>

              <p
                className="
                text-gray-500
                mt-2
              "
              >

                Deal Details

              </p>

              <div
                className="
                flex
                gap-3
                mt-5
              "
              >

                <span
                  className={`
                  px-4
                  py-2

                  rounded-full

                  text-white

                  text-sm

                  font-semibold

                  ${
                    stage === "WON"
                      ? "bg-green-600"

                    : stage === "LOST"
                      ? "bg-red-600"

                    : stage === "NEGOTIATION"
                      ? "bg-orange-500"

                    : stage === "PROPOSAL"
                      ? "bg-purple-600"

                    : "bg-blue-600"
                  }
                `}
                >

                  {stage}

                </span>

                <span
                  className="
                  bg-green-600

                  text-white

                  px-4
                  py-2

                  rounded-full

                  text-sm

                  font-semibold
                "
                >

                  ₹{" "}

                  {Number(
                    deal.deal_value || 0
                  ).toLocaleString()}

                </span>

              </div>

            </div>

          </div>

          {/* Right */}

          <div
            className="
            grid
            grid-cols-2
            gap-8
          "
          >

            <div
              className="
              text-center
            "
            >

              <p
                className="
                text-gray-500
              "
              >

                Assigned To

              </p>

              <h3
                className="
                font-bold
                mt-2
              "
              >

                {

                  deal.assigned_to_name ||

                  "Not Assigned"

                }

              </h3>

            </div>

            <div
              className="
              text-center
            "
            >

              <p
                className="
                text-gray-500
              "
              >

                Created By

              </p>

              <h3
                className="
                font-bold
                mt-2
              "
              >

                {deal.created_by_name}

              </h3>

            </div>

          </div>

        </div>

      </div>
            {/* ==========================================
          Deal Information
      ========================================== */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        mb-8
      "
      >

        {/* Customer */}

        <div
          className="
          bg-red-50
          rounded-2xl
          p-6
        "
        >

          <div
            className="
            flex
            items-center
            gap-3
            mb-4
          "
          >

            <FaUser
              className="
              text-red-600
              text-2xl
            "
            />

            <h2
              className="
              text-xl
              font-bold
            "
            >
              Customer
            </h2>

          </div>

          <p className="text-lg">

            {deal.lead_customer || "-"}

          </p>

        </div>

        {/* Deal Value */}

        <div
          className="
          bg-red-50
          rounded-2xl
          p-6
        "
        >

          <div
            className="
            flex
            items-center
            gap-3
            mb-4
          "
          >

            <FaMoneyBillWave
              className="
              text-red-600
              text-2xl
            "
            />

            <h2
              className="
              text-xl
              font-bold
            "
            >
              Deal Value
            </h2>

          </div>

          <p
            className="
            text-2xl
            font-bold
            text-green-600
          "
          >

            ₹ {Number(deal.deal_value || 0).toLocaleString()}

          </p>

        </div>

        {/* Assigned To */}

        <div
          className="
          bg-red-50
          rounded-2xl
          p-6
        "
        >

          <div
            className="
            flex
            items-center
            gap-3
            mb-4
          "
          >

            <FaUserTie
              className="
              text-red-600
              text-2xl
            "
            />

            <h2
              className="
              text-xl
              font-bold
            "
            >
              Assigned To
            </h2>

          </div>

          <p className="text-lg">

            {deal.assigned_to_name || "Not Assigned"}

          </p>

        </div>

        {/* Expected Close */}

        <div
          className="
          bg-red-50
          rounded-2xl
          p-6
        "
        >

          <div
            className="
            flex
            items-center
            gap-3
            mb-4
          "
          >

            <FaCalendarAlt
              className="
              text-red-600
              text-2xl
            "
            />

            <h2
              className="
              text-xl
              font-bold
            "
            >
              Expected Close Date
            </h2>

          </div>

          <p className="text-lg">

            {deal.expected_close_date || "-"}

          </p>

        </div>

      </div>

      {/* ==========================================
          Notes
      ========================================== */}

      <div
        className="
        bg-red-50
        rounded-2xl
        p-6
        mb-8
      "
      >

        <div
          className="
          flex
          items-center
          gap-3
          mb-4
        "
        >

          <FaStickyNote
            className="
            text-red-600
            text-2xl
          "
          />

          <h2
            className="
            text-xl
            font-bold
          "
          >
            Notes
          </h2>

        </div>

        <p>

          {deal.notes || "No notes available."}

        </p>

      </div>

      {/* ==========================================
          Assign Deal
      ========================================== */}

      {

        canAssign && (

          <div
            className="
            bg-white
            rounded-3xl
            shadow-md
            p-8
            mb-8
          "
          >

            <h2
              className="
              text-2xl
              font-bold
              mb-6
            "
            >
              Assign Deal
            </h2>

            <div
              className="
              flex
              flex-col
              md:flex-row
              gap-4
            "
            >

              <select

                value={assignedUser}

                onChange={(e)=>

                  setAssignedUser(
                    e.target.value
                  )

                }

                className="
                w-full
                md:w-96

                border
                border-red-200

                rounded-xl

                p-3
              "
              >

                <option value="">
                  Select Sales Executive
                </option>

                {

                  users.map((user)=>(

                    <option
                      key={user.id}
                      value={user.id}
                    >

                      {user.username}

                    </option>

                  ))

                }

              </select>

              <button

                onClick={assignDeal}

                className="
                bg-blue-600
                hover:bg-blue-700

                text-white

                px-6
                py-3

                rounded-xl

                font-semibold
              "
              >

                Assign Deal

              </button>

            </div>

          </div>

        )

      }

            {/* ==========================================
          Update Deal Stage
      ========================================== */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
        mb-8
      "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-6
        "
        >
          Update Deal Stage
        </h2>

        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-4
          items-center
        "
        >

          <select

            value={stage}

            onChange={(e)=>

              setStage(
                e.target.value
              )

            }

            className="
            w-full
            md:w-80

            border
            border-red-200

            rounded-xl

            p-3
          "
          >

            <option value="PROSPECTING">
              PROSPECTING
            </option>

            <option value="PROPOSAL">
              PROPOSAL
            </option>

            <option value="NEGOTIATION">
              NEGOTIATION
            </option>

            <option value="WON">
              WON
            </option>

            <option value="LOST">
              LOST
            </option>

          </select>

          <button

            onClick={updateStage}

            className="
            bg-red-600
            hover:bg-red-700

            text-white

            px-6
            py-3

            rounded-xl

            font-semibold

            transition-all
          "
          >

            Update Stage

          </button>

        </div>

        <p
          className="
          text-gray-500
          text-sm
          mt-4
        "
        >

          Updating the stage automatically records an activity log
          and generates notifications.

        </p>

      </div>

      {/* ==========================================
          Deal Summary
      ========================================== */}

      <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
      "
      >

        <h2
          className="
          text-xl
          font-bold
          mb-4
        "
        >
          Deal Summary
        </h2>

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
        "
        >

          <div>

            <p className="text-gray-500">
              Deal ID
            </p>

            <h3 className="font-semibold">
              #{deal.id}
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              Created
            </p>

            <h3 className="font-semibold">
              {deal.created_at
                ? new Date(
                    deal.created_at
                  ).toLocaleDateString()
                : "-"}
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              Last Updated
            </p>

            <h3 className="font-semibold">
              {deal.updated_at
                ? new Date(
                    deal.updated_at
                  ).toLocaleDateString()
                : "-"}
            </h3>

          </div>

        </div>

      </div>

          </MainLayout>

  );

}

export default DealDetail;