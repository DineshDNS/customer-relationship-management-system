import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {

  FaUser,

  FaUserTie,

  FaBullseye,

  FaClipboardList,

  FaStickyNote,

  FaCalendarAlt,

} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";

import PageActions from "../../components/common/PageActions";

import api from "../../api/api";

function LeadDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [lead, setLead] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [status, setStatus] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [assignedUser, setAssignedUser] =
    useState("");

  const [profile, setProfile] =
    useState(null);

  const currentUser = {

    role:
      localStorage.getItem(
        "role"
      ),

    username:
      localStorage.getItem(
        "username"
      ),

  };

  useEffect(() => {

    fetchProfile();

    fetchLead();

    fetchUsers();

  }, []);

  // ==========================================
  // Fetch Logged In User
  // ==========================================

  const fetchProfile =
    async () => {

      try {

        const response =
          await api.get(
            "auth/profile/"
          );

        setProfile(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ==========================================
  // Fetch Sales Executives
  // ==========================================

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

  // ==========================================
  // Fetch Lead
  // ==========================================

  const fetchLead =
    async () => {

      try {

        const response =
          await api.get(
            `leads/${id}/`
          );

        setLead(
          response.data
        );

        setStatus(
          response.data.status
        );

        setAssignedUser(
          response.data.assigned_to || ""
        );

      }

      catch (error) {

        console.log(error);

        if (
          error.response?.status === 403
        ) {

          alert(
            "You don't have permission to access this lead."
          );

          navigate(
            "/leads"
          );

        }

      }

      finally {

        setLoading(false);

      }

    };

  // ==========================================
  // Assign Lead
  // ==========================================

  const assignLead =
    async () => {

      if (!assignedUser) {

        alert(
          "Please select a Sales Executive."
        );

        return;

      }

      try {

        await api.patch(

          `leads/${id}/assign/`,

          {

            assigned_to:
              assignedUser,

          }

        );

        alert(
          "Lead assigned successfully."
        );

        fetchLead();

      }

      catch (error) {

        console.log(error);

        alert(

          error.response?.data?.error ||

          "Unable to assign lead."

        );

      }

    };

  // ==========================================
  // Update Status
  // ==========================================

  const updateStatus =
    async () => {

      try {

        await api.patch(

          `leads/${id}/status/`,

          {

            status,

          }

        );

        alert(
          "Lead status updated successfully."
        );

        fetchLead();

      }

      catch (error) {

        console.log(error);

        alert(

          error.response?.data?.error ||

          "Unable to update status."

        );

      }

    };

  // ==========================================
  // Delete Lead
  // ==========================================

  const handleDelete =
    async () => {

      const confirmDelete =
        window.confirm(

          `Delete lead for "${lead.customer_name}"?`

        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          `leads/${id}/`
        );

        alert(
          "Lead deleted successfully."
        );

        navigate(
          "/leads"
        );

      }

      catch (error) {

        console.log(error);

        alert(

          error.response?.data?.detail ||

          "Unable to delete lead."

        );

      }

    };

  // ==========================================
  // Permissions
  // ==========================================

  const canEdit =

    lead && (

      currentUser.role ===
      "ADMIN"

      ||

      lead.assigned_to_name ===
      currentUser.username

    );

  const canDelete =

    lead && (

      currentUser.role ===
      "ADMIN"

      ||

      (

        currentUser.role ===
        "MANAGER"

        &&

        lead.created_by_name ===
        currentUser.username

      )

    );

  const canAssign =

    currentUser.role ===
      "ADMIN"

    ||

    currentUser.role ===
      "MANAGER";

  // ==========================================
  // Loading
  // ==========================================

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
          text-xl
        "
        >

          Loading Lead...

        </div>

      </MainLayout>

    );

  }

  if (!lead) {

    return (

      <MainLayout>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
          text-center
          text-red-600
        "
        >

          Lead not found.

        </div>

      </MainLayout>

    );

  }

  return (

  <MainLayout>

    <PageActions

      backPath="/leads"

      backTitle="Leads"

      editPath={
        canEdit
          ? `/leads/${id}/edit`
          : null
      }

      onDelete={
        canDelete
          ? handleDelete
          : null
      }

    />

    {/* ===========================
        Lead Header
    =========================== */}

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
        items-center
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

          {/* Avatar */}

          <div
            className="
            w-24
            h-24
            rounded-full
            bg-red-100

            flex
            items-center
            justify-center

            text-red-600
            text-5xl
            font-bold
          "
          >

            {

              lead.customer_name

                ? lead.customer_name
                    .charAt(0)
                    .toUpperCase()

                : <FaUser />

            }

          </div>

          <div>

            <h1
              className="
              text-4xl
              font-bold
              text-gray-900
            "
            >

              {lead.customer_name}

            </h1>

            <p
              className="
              text-gray-500
              mt-2
            "
            >

              Lead Details

            </p>

            <div
              className="
              flex
              flex-wrap
              gap-3
              mt-5
            "
            >

              {/* Status */}

              <span
                className="
                bg-red-600
                text-white

                px-4
                py-2

                rounded-full

                text-sm
                font-semibold
              "
              >

                {lead.status}

              </span>

              {/* Priority */}

              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  text-white

                  ${
                    lead.priority === "HIGH"

                    ? "bg-red-600"

                    : lead.priority === "MEDIUM"

                    ? "bg-orange-500"

                    : "bg-green-600"
                  }
                `}
              >

                {lead.priority}

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
              text-lg
              mt-2
            "
            >

              {lead.assigned_to_name}

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
              text-lg
              mt-2
            "
            >

              {lead.created_by_name}

            </h3>

          </div>

        </div>

      </div>

    </div>

        {/* =====================================
        Lead Information
    ===================================== */}

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
            text-gray-800
          "
          >
            Customer
          </h2>

        </div>

        <p className="text-lg">

          {lead.customer_name}

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
            text-gray-800
          "
          >
            Assigned To
          </h2>

        </div>

        <p className="text-lg">

          {lead.assigned_to_name}

        </p>

      </div>

      {/* Priority */}

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

          <FaBullseye
            className="
            text-red-600
            text-2xl
          "
          />

          <h2
            className="
            text-xl
            font-bold
            text-gray-800
          "
          >
            Priority
          </h2>

        </div>

        <span
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            text-white

            ${
              lead.priority === "HIGH"

                ? "bg-red-600"

                : lead.priority === "MEDIUM"

                ? "bg-orange-500"

                : "bg-green-600"
            }
          `}
        >

          {lead.priority}

        </span>

      </div>

      {/* Created By */}

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

          <FaClipboardList
            className="
            text-red-600
            text-2xl
          "
          />

          <h2
            className="
            text-xl
            font-bold
            text-gray-800
          "
          >
            Created By
          </h2>

        </div>

        <p className="text-lg">

          {lead.created_by_name}

        </p>

      </div>

    </div>

    {/* =====================================
        Notes
    ===================================== */}

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

        {

          lead.notes ||

          "No notes available."

        }

      </p>

    </div>

    {/* =====================================
        Created Date
    ===================================== */}

    <div
      className="
      bg-gray-50
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
          Created At
        </h2>

      </div>

      <p>

        {new Date(
          lead.created_at
        ).toLocaleString()}

      </p>

    </div>

    {/* =====================================
        Assign Lead
    ===================================== */}

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
            Assign Lead
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

                users.map(
                  (user)=>(

                    <option

                      key={user.id}

                      value={user.id}

                    >

                      {user.username}

                    </option>

                  )
                )

              }

            </select>

            <button

              onClick={assignLead}

              disabled={!assignedUser}

              className="
              bg-blue-600
              hover:bg-blue-700

              disabled:bg-gray-400

              text-white

              px-6
              py-3

              rounded-xl

              font-semibold
            "
            >

              Assign Lead

            </button>

          </div>

        </div>

      )

    }

        {/* =====================================
        Update Lead Status
    ===================================== */}

    <div
      className="
      bg-white
      rounded-3xl
      shadow-md
      p-8
    "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-6
      "
      >
        Update Lead Status
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

          value={status}

          onChange={(e) =>
            setStatus(
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

          <option value="NEW">
            NEW
          </option>

          <option value="CONTACTED">
            CONTACTED
          </option>

          <option value="QUALIFIED">
            QUALIFIED
          </option>

          <option value="CONVERTED">
            CONVERTED
          </option>

          <option value="CLOSED">
            CLOSED
          </option>

        </select>

        <button

          onClick={updateStatus}

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

          Update Status

        </button>

      </div>

      <p
        className="
        text-gray-500
        text-sm
        mt-4
      "
      >

        Changing the lead status automatically creates
        an activity log and sends notifications based
        on your CRM workflow.

      </p>

    </div>

  </MainLayout>

);

}

export default LeadDetail;