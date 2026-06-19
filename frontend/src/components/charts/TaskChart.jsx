import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TaskChart({
  data
}) {

  const COLORS = [
    "#16a34a",
    "#f97316",
    "#dc2626",
  ];

  return (

    <div
      className="
      bg-white
      p-6
      rounded-2xl
      shadow-md
    "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-4
      "
      >
        Task Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            outerRadius={100}
            label
          >

            {data.map(
              (entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TaskChart;