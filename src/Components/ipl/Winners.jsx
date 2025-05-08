import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Winners() {
  const winners = useSelector((state) => state.matches.winners);
  const refs = useRef([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleScroll = (year) => {
    const index = winners.findIndex((match) => match.year === year);
    if (index !== -1 && refs.current[index]) {
      refs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setSelectedYear(year);
      setDropdownOpen(false);
      setTimeout(() => setSelectedYear(null), 1500);
    }
  };

  return (
    <div>
      <div className="relative mt-4 w-44 p-4">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-32 p-2 border dark:border-gray-700 border-gray-300 rounded-lg  flex justify-between items-center text-gray-500"
        >
          <span>{selectedYear || "Select Year"}</span>
          <svg
            className={`w-4 h-4 transform ${dropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 w-32 border dark:border-gray-700 border-gray-300 rounded-md max-h-60 overflow-y-auto scrollbar-hide text-gray-500">
            {winners.map((match) => (
              <li
                key={match.year}
                onClick={() => handleScroll(match.year)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white hover:text-black bg-gray-100 dark:bg-gray-950"
              >
                {match.year}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-0 gap-3 py-3 box-border">
        {winners.map((match, index) => (
          <div
            key={index}
            ref={(el) => (refs.current[index] = el)}
            className={`relative p-6 px-6 border border-gray-300 dark:border-gray-700 sm:my-3 mx-3 rounded-2xl flex flex-col items-center transition-colors duration-700 ${
              selectedYear === match.year ? "bg-blue-900" : ""
            }`}
          >
            <p className="absolute top-3 left-3 text-sm text-gray-500">
              {match.year}
            </p>
            <div className="mb-4">
              <img src={match.image_url} alt={match.team} className="w-16" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold dark:text-white">{match.team}</p>
              <p className="text-sm text-gray-500">against {match.rival}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
