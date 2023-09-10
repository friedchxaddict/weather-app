import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Manila",
    },
    {
      id: 2,
      title: "New York",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Kihei",
    },
    {
      id: 5,
      title: "Paris",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-base md:text-lg font-base md:font-medium"
          onClick={() => setQuery({ q: city.title })}>
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
