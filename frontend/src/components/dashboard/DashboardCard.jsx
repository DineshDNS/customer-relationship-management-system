function DashboardCard({

  title,

  value,

  color,

  icon,

}) {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      border-l-4
      p-6
      hover:shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1
    "
      style={{
        borderColor: color,
      }}
    >

      <div
        className="
        flex
        justify-between
        items-start
      "
      >

        <div>

          <p
            className="
            text-gray-500
            text-lg
            font-medium
          "
          >
            {title}
          </p>

          <h2
            className="
            text-3xl
            font-bold
            mt-4
            text-gray-900
          "
          >
            {value}
          </h2>

        </div>

        <div
          className="
          w-16
          h-16
          rounded-full
          flex
          items-center
          justify-center
          text-3xl
        "
        style={{

          color: color,

          backgroundColor: `${color}15`,

        }}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}

export default DashboardCard;