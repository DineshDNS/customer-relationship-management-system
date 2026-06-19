import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import MainLayout from
"../../layouts/MainLayout";

import BackButton from
"../../components/common/BackButton";

import api from
"../../api/api";

import {
  useNavigate,
} from "react-router-dom";

import PageActions from
"../../components/common/PageActions";

function CommunicationDetail() {

  const { id } =
    useParams();

  const [communication,
    setCommunication] =
    useState(null);

  useEffect(() => {

    fetchCommunication();

  }, []);

  const navigate =
    useNavigate();

    const handleDelete =
    async () => {

        const confirmDelete =
        window.confirm(
            "Are you sure you want to delete this communication?"
        );

        if (!confirmDelete)
        return;

        try {

        await api.delete(
            `communications/${id}/`
        );

        alert(
            "Communication deleted successfully"
        );

        navigate(
            "/communications"
        );

        } catch (error) {

        console.log(error);
        }
    };

  const fetchCommunication =
    async () => {

      try {

        const response =
          await api.get(
            `communications/${id}/`
          );

        setCommunication(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  if (!communication) {

    return (

      <MainLayout>

        Loading...

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <PageActions
        backPath="/communications"
        backTitle="Communications"
        editPath={`/communications/${id}/edit`}
        onDelete={handleDelete}
        />

      <div
        className="
        bg-white

        rounded-3xl

        shadow-md

        p-8
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
          {
            communication.subject
          }
        </h1>

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
        "
        >

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
            "
            >
              Customer
            </p>

            <p>
              {
                communication.customer_name
              }
            </p>

          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
            "
            >
              Type
            </p>

            <p>
              {
                communication.communication_type
              }
            </p>

          </div>

        </div>

        <div
          className="
          bg-gray-50

          rounded-xl

          p-5

          mt-6
        "
        >

          <h3
            className="
            font-bold
            mb-3
          "
          >
            Description
          </h3>

          <p>
            {
              communication.description
            }
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default CommunicationDetail;