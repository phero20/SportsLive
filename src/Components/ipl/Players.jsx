import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import lsg from "../../assets/LSG.png";
import gt from "../../assets/GT.png";
import logoIpl from "../../assets/logoIpl.webp";
import { fetchPlayers } from "../../redux/features/apiFetch/apiFetch";
import Loading from "./Loading"


export default function Stats() {
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.matches);

  // Local state to track loading state based on players array
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  useEffect(() => {
    // Set isLoading to false once players data is fetched and array is populated
    if (players.length > 0) {
      setIsLoading(false);
    }
  }, [players]); // Runs whenever players array is updated

  const refs = useRef([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const teamImageGenerator = (teamName) => {
    const teamLogos = {
      RCB: "https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png",
      CSK: "https://assets.ccbp.in/frontend/react-js/csk-logo-img.png",
      DC: "https://assets.ccbp.in/frontend/react-js/dc-logo-img.png",
      SRH: "https://assets.ccbp.in/frontend/react-js/srh-logo-img.png",
      KKR: "https://assets.ccbp.in/frontend/react-js/kkr-logo-img.png",
      MI: "https://assets.ccbp.in/frontend/react-js/mi-logo-img.png",
      RR: "https://assets.ccbp.in/frontend/react-js/rr-logo-img.png",
      PBKS: "https://assets.ccbp.in/frontend/react-js/kxp-logo-img.png",
      GT: gt,
      LSG: lsg,
    };
    return teamLogos[teamName] || logoIpl;
  };

  const handleScroll = (teamName) => {
    const index = players.findIndex((team) => team.team === teamName);
    if (index !== -1 && refs.current[index]) {
      refs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setSelectedTeam(teamName);
      setDropdownOpen(false);
      setTimeout(() => {
        setSelectedTeam(null);
      }, 1000);
    }
  };

  if (isLoading) {
    return <div className="text-center flex justify-center items-center"><Loading /></div>;
  }

  return (
    <div className="flex flex-col p-4 gap-12">
      <div className="relative w-36 mt-4">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full p-2 border dark:border-gray-700 border-gray-300 rounded-lg flex justify-between items-center text-gray-500"
        >
          <span>Select Team</span>
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
          <ul className="absolute z-10 mt-1 w-full border dark:border-gray-700 border-gray-300 rounded-md max-h-60 overflow-y-auto scrollbar-hide text-gray-500 bg-gray-100 dark:bg-gray-950">
            {players.map((team, index) => (
              <li
                key={index}
                onClick={() => handleScroll(team.team)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white hover:text-black"
              >
                {team.team === "PK" ? "PBKS" : team.team}
              </li>
            ))}
          </ul>
        )}
      </div>

      {players.map((team, index) => (
        <div
          key={index}
          ref={(el) => (refs.current[index] = el)}
          className={`w-full flex flex-col items-center rounded-lg gap-6 py-6 px-4 border border-gray-300 dark:border-gray-600 transition-colors duration-700  ${
            selectedTeam === team.team
              ? "bg-blue-900"
              : "dark:bg-gray-900 bg-gray-300"
          }`}
        >
          <div className="flex gap-3 items-center">
            <img
              src={teamImageGenerator(team.team === "PK" ? "PBKS" : team.team)}
              alt={team.team}
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
              {team.team === "PK" ? "PBKS" : team.team}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full text-gray-700 dark:text-gray-300">
            {(() => {
              const squadRaw = Object.values(team.players.squad || {});

              const seenNames = new Set();
              const squad = squadRaw.filter((player) => {
                if (!player.Name || seenNames.has(player.Name)) return false;
                seenNames.add(player.Name);
                return true;
              });

              return squad.map((player, playerIndex) => {
                const isCaptain = playerIndex === 0;
                return (
                  <div
                    key={playerIndex}
                    className={`border p-4 flex flex-col items-start rounded-lg border-gray-300 dark:border-gray-600 ${
                      isCaptain
                        ? "bg-blue-900"
                        : " dark:bg-gray-950 bg-gray-100"
                    }`}
                  >
                    <p
                      className={`text-lg font-semibold ${
                        isCaptain ? "text-white" : ""
                      }`}
                    >
                      {player.Name || "Player Name"}
                      {isCaptain && " (C)"}
                    </p>
                    <p
                      className={`text-sm text-gray-500 dark:text-gray-400 ${
                        isCaptain ? "text-gray-200" : ""
                      }`}
                    >
                      {player.Style || "Role"}
                    </p>
                    <p
                      className={`text-sm text-gray-500 dark:text-gray-400 ${
                        isCaptain ? "text-gray-200" : ""
                      }`}
                    >
                      {player.Nationality || "Country"}
                    </p>
                    <p
                      className={`text-sm text-gray-500 dark:text-gray-400 ${
                        isCaptain ? "text-gray-200" : ""
                      }`}
                    >
                      {player.Oversea ? "Overseas" : "Local"}
                    </p>
                    <p
                      className={`text-sm text-gray-500 dark:text-gray-400 ${
                        isCaptain ? "text-gray-200" : ""
                      }`}
                    >
                      {player.Wicketkeeper ? "Wicketkeeper" : ""}
                    </p>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}