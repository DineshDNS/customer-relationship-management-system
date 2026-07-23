import { Link } from "react-router-dom";

function RecentCustomers({

  customers,

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
        Recent Customers
      </h2>

      <table
        className="w-full"
      >

        <thead>

          <tr
            className="
            border-b
            text-left
          "
          >

            <th>Name</th>

            <th>Company</th>

            <th>Email</th>

          </tr>

        </thead>

        <tbody>

          {

            customers.map(

              (customer) => (

                <tr
                  key={
                    customer.id
                  }
                  className="
                  border-b
                "
                >

                  <td>

                    <Link
                      to={`/customers/${customer.id}`}
                      className="
                      text-red-600
                      hover:underline
                    "
                    >

                      {customer.name}

                    </Link>

                  </td>

                  <td>

                    {customer.company}

                  </td>

                  <td>

                    {customer.email}

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

export default RecentCustomers;