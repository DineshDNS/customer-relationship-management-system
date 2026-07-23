import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../../layouts/MainLayout";
import ModuleNav from "../../components/common/ModuleNav";

import {
  TASKS_NAV,
} from "../../theme/tasksNav";

import TaskTable from "../../components/tasks/TaskTable";

import api from "../../api/api";

function OverdueTasks() {

  const role =
    localStorage.getItem(
      "role"
    );

  const [tasks,
    setTasks] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks =
    async () => {

      setLoading(true);

      try {

        const response =
          await api.get(
            "tasks/overdue/"
          );

        setTasks(

          Array.isArray(
            response.data
          )

            ?

            response.data

            :

            response.data.results || []

        );

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

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

        <div>

          <h1
            className="
            text-3xl

            font-bold
          "
          >

            Overdue Tasks

          </h1>

          <p
            className="
            text-gray-500

            mt-1
          "
          >

            Tasks that have passed their due date.

          </p>

        </div>

      </div>

      <ModuleNav
        items={TASKS_NAV}
      />

      <TaskTable

        tasks={tasks}

        loading={loading}

        role={role}

      />

    </MainLayout>

  );

}

export default OverdueTasks;