import React, { useState } from "react";
import ScoreCard from "./ScoreCard";
import { useSelector } from "react-redux";
import NextIplMatches from "./NextIplMatches";
import PreviousMatches from "./PreviousMatches"; // Import PreviousMatches Component

export default function Matches() {
  const { matches, loading, error } = useSelector((state) => state.matches);
  const [prevActive, setPrevActive] = useState(false); // Toggle state

  // Toggle between Next and Previous Matches
  const handleToggle = (isPrev) => {
    setPrevActive(isPrev);
  };

  const time1 = matches?.["Match 1"]?.Time;
  const time2 = matches?.["Match 2"]?.Time;
  const Venue1 = matches?.["Match 1"]?.Location;
  const Venue2 = matches?.["Match 2"]?.Location;

  return (
    <>
      {/* ScoreCard Component */}
      <ScoreCard time1={time1} time2={time2} Venue1={Venue1} Venue2={Venue2} />

      {/* Toggle Buttons */}
      <ul className="flex text-sm font-medium text-gray-500 dark:text-gray-400 mb-5 mx-5 gap-7 cursor-pointer">
        <li
          onClick={() => handleToggle(false)}
          className={`border-b-4 px-3 py-1 transition-all ${
            !prevActive
              ? "font-medium dark:text-white text-black border-blue-900"
              : "dark:text-gray-400 text-gray-500 border-transparent"
          }`}
        >
          Next Matches
        </li>
        <li
          onClick={() => handleToggle(true)}
          className={`border-b-4 px-3 py-1 transition-all ${
            prevActive
              ? "font-medium dark:text-white text-black border-blue-900"
              : "dark:text-gray-400 text-gray-500 border-transparent"
          }`}
        >
          Previous Matches
        </li>
      </ul>

      {/* Conditional Rendering for Match Sections */}
      {prevActive ? (
        <PreviousMatches matches={matches} />
      ) : (
        <NextIplMatches matches={matches} />
      )}
    </>
  );
}
