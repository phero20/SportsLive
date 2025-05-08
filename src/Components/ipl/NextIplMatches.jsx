import React, { useEffect, useState } from "react";
import lsg from "../../assets/LSG.png";
import gt from "../../assets/GT.png";
import { useSelector, useDispatch } from "react-redux";
import logoIpl from "../../assets/iplLogo.svg";
import { fetchMatches } from "../../redux/features/apiFetch/apiFetch";
import Loading from "./Loading"

export default function NextIplMatches() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMatches());
  }), [dispatch];

  const { matches } = useSelector((state) => state.matches);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (matches && Object.keys(matches).length > 0) {
      setLocalLoading(false);
    }
  }, [matches]);

  const matchesData = Object.keys(matches).length > 0 ? matches : null;

  const filteredMatches = matchesData
    ? Object.values(matchesData)
        .filter((match) => match.Date?.toLowerCase() !== "today")
        .sort((a, b) => {
          const dateA = a.Date?.toLowerCase();
          const dateB = b.Date?.toLowerCase();

          if (dateA === "tomorrow") return -1;
          if (dateB === "tomorrow") return 1;

          const parsedA = Date.parse(a.Date);
          const parsedB = Date.parse(b.Date);

          return isNaN(parsedA) || isNaN(parsedB) ? 0 : parsedA - parsedB;
        })
        .map((match) => ({
          ...match,
          teams:
            match.Rival?.split(/\s+/).filter((w) => w.toLowerCase() !== "vs") ||
            [],
        }))
    : [];

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

  if (localLoading) {
    return <p className="text-center flex justify-center items-center"><Loading /></p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-0 gap-3 py-3 box-border">
        {filteredMatches.map((match, index) => (
          <div
            key={index}
            className="p-6 px-6 border border-gray-300 dark:border-gray-700 sm:my-3 mx-3 rounded-2xl"
          >
            <div className="flex justify-between text-gray-500 text-sm">
              <p>IPL · {match.Date}</p>
              <p>{match.Time}</p>
            </div>

            <div className="w-full text-black dark:text-white">
              <div className="flex justify-between items-center py-6 text-sm font-medium">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={teamImageGenerator(match.teams[0])}
                    alt="team1"
                    className="w-10"
                  />
                  <p className="px-1">{match.teams[0]}</p>
                </div>

                <div>VS</div>

                <div className="flex flex-col items-center gap-2">
                  <img
                    src={teamImageGenerator(match.teams[1])}
                    alt="team2"
                    className="w-10"
                  />
                  <p className="px-1">{match.teams[1]}</p>
                </div>
              </div>

              <p className="border-b border-gray-300 dark:border-gray-700 text-sm text-blue-700 pb-1">
                <span className="text-gray-500 dark:text-gray-400">
                  Venue:{" "}
                </span>
                {match.Location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
