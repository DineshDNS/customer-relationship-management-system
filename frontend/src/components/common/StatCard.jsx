function StatCard({

  title,

  value,

  borderColor,

}) {

  return (

    <div
      className={`
      bg-white

      rounded-2xl

      shadow-md

      p-6

      border-l-4

      ${borderColor}

      hover:shadow-xl

      transition-all
    `}
    >

      <h3
        className="
        text-gray-500
        text-sm
      "
      >
        {title}
      </h3>

      <h2
        className="
        text-4xl
        font-bold
        mt-3
      "
      >
        {value}
      </h2>

    </div>
  );
}

export default StatCard;