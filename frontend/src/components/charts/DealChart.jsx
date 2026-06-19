import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DealChart({
  data
}) {

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
        Deal Stages
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="stage" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#dc2626"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default DealChart;