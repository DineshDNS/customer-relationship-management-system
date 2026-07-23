import { Link } from "react-router-dom";

function RecentTasks({

  tasks,

}) {

  return (

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
        Recent Tasks
      </h2>

      <table className="w-full">

        <thead>

          <tr
            className="
            border-b
            text-left
          "
          >

            <th>Title</th>

            <th>Status</th>

            <th>Due Date</th>

          </tr>

        </thead>

        <tbody>

          {

            tasks.map(

              (task) => (

                <tr
                  key={task.id}
                  className="border-b"
                >

                  <td>

                    <Link
                      to={`/tasks/${task.id}`}
                      className="
                      text-red-600
                      hover:underline
                    "
                    >

                      {task.title}

                    </Link>

                  </td>

                  <td>

                    {task.status}

                  </td>

                  <td>

                    {task.due_date}

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

export default RecentTasks;