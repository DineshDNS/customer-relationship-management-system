import { Link } from "react-router-dom";

function RecentLeads({

  leads,

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
        Recent Leads
      </h2>

      <table className="w-full">

        <thead>

          <tr
            className="
            border-b
            text-left
          "
          >

            <th>Customer</th>

            <th>Status</th>

            <th>Priority</th>

          </tr>

        </thead>

        <tbody>

          {

            leads.map(

              (lead) => (

                <tr
                  key={lead.id}
                  className="border-b"
                >

                  <td>

                    <Link
                      to={`/leads/${lead.id}`}
                      className="
                      text-red-600
                      hover:underline
                    "
                    >

                      {lead.customer}

                    </Link>

                  </td>

                  <td>

                    {lead.status}

                  </td>

                  <td>

                    {lead.priority}

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

export default RecentLeads;