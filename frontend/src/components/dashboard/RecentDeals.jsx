import { Link } from "react-router-dom";

function RecentDeals({

  deals,

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
        Recent Deals
      </h2>

      <table className="w-full">

        <thead>

          <tr
            className="
            border-b
            text-left
          "
          >

            <th>Deal</th>

            <th>Customer</th>

            <th>Stage</th>

            <th>Value</th>

          </tr>

        </thead>

        <tbody>

          {

            deals.map(

              (deal) => (

                <tr
                  key={deal.id}
                  className="border-b"
                >

                  <td>

                    <Link
                      to={`/deals/${deal.id}`}
                      className="
                      text-red-600
                      hover:underline
                    "
                    >

                      {deal.deal_name}

                    </Link>

                  </td>

                  <td>

                    {deal.customer}

                  </td>

                  <td>

                    {deal.stage}

                  </td>

                  <td>

                    ₹{deal.deal_value}

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

export default RecentDeals;