import {
  Link,
} from "react-router-dom";

function TaskTable({

  tasks,

  loading,

  role,

}) {

  const getStatusBadge =
    (status) => {

      switch (status) {

        case "COMPLETED":

          return "bg-green-100 text-green-700";

        case "IN_PROGRESS":

          return "bg-yellow-100 text-yellow-700";

        default:

          return "bg-red-100 text-red-700";

      }

    };

  const getTaskTypeBadge =
    (type) => {

      switch (type) {

        case "CALL":

          return "bg-blue-100 text-blue-700";

        case "MEETING":

          return "bg-purple-100 text-purple-700";

        case "FOLLOW_UP":

          return "bg-orange-100 text-orange-700";

        case "EMAIL":

          return "bg-cyan-100 text-cyan-700";

        default:

          return "bg-gray-100 text-gray-700";

      }

    };

  const isOverdue =
    (
      dueDate,
      status
    ) => {

      if (
        status ===
        "COMPLETED"
      ) {

        return false;

      }

      return (
        new Date(dueDate) <
        new Date()
      );

    };

      if (loading) {

    return (

      <div
        className="
        bg-white

        rounded-2xl

        shadow-md

        p-12

        text-center
      "
      >

        <h2
          className="
          text-xl

          font-semibold
        "
        >
          Loading Tasks...
        </h2>

      </div>

    );

  }

  if (!tasks.length) {

    return (

      <div
        className="
        bg-white

        rounded-2xl

        shadow-md

        p-12

        text-center
      "
      >

        <h2
          className="
          text-2xl

          font-bold
        "
        >
          No Tasks Found
        </h2>

        <p
          className="
          text-gray-500

          mt-2
        "
        >
          There are no tasks available.
        </p>

      </div>

    );

  }

  return (

    <div
      className="
      bg-white

      rounded-2xl

      shadow-md

      overflow-hidden
    "
    >

      <table
        className="
        w-full
      "
      >

        <thead>

          <tr
            className="
            bg-red-600

            text-white
          "
          >

            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Assigned To
            </th>

            <th className="p-4 text-left">
              Type
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Due Date
            </th>

            <th className="p-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {

            tasks.map(

              (task) => (

                <tr

                  key={task.id}

                  className="
                  border-b

                  hover:bg-red-50

                  transition
                "
                >

                  <td className="p-4 font-medium">

                    {task.title}

                  </td>

                  <td className="p-4">

                    {task.customer_name}

                  </td>

                  <td className="p-4">

                    {task.assigned_to_name}

                  </td>

                  <td className="p-4">

                    <span
                      className={`
                        px-3

                        py-1

                        rounded-full

                        text-sm

                        font-semibold

                        ${getTaskTypeBadge(
                          task.task_type
                        )}
                      `}
                    >

                      {task.task_type}

                    </span>

                  </td>

                  <td className="p-4">

                    <span
                      className={`
                        px-3

                        py-1

                        rounded-full

                        text-sm

                        font-semibold

                        ${getStatusBadge(
                          task.status
                        )}
                      `}
                    >

                      {task.status}

                    </span>

                  </td>

                  <td
                    className={`
                      p-4

                      font-medium

                      ${
                        isOverdue(

                          task.due_date,

                          task.status

                        )

                        ?

                        "text-red-600"

                        :

                        "text-gray-700"

                      }
                    `}
                  >

                    {task.due_date}

                  </td>

                  <td className="p-4">

                    <div
                      className="
                      flex

                      justify-center

                      gap-3
                    "
                    >

                      <Link

                        to={`/tasks/${task.id}`}

                        className="
                        bg-blue-600

                        hover:bg-blue-700

                        text-white

                        px-4

                        py-2

                        rounded-lg

                        text-sm
                      "
                      >

                        View

                      </Link>

                      {

                        role !==
                        "SALES_EXECUTIVE"

                        &&

                        (

                          <Link

                            to={`/tasks/${task.id}/edit`}

                            className="
                            bg-yellow-500

                            hover:bg-yellow-600

                            text-white

                            px-4

                            py-2

                            rounded-lg

                            text-sm
                          "
                          >

                            Edit

                          </Link>

                        )

                      }

                    </div>

                  </td>

                </tr>

              )

            )

          }

        </tbody>

      </table>

    </div>

  );

}

export default TaskTable;