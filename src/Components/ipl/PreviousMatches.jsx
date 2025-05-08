import React, { useEffect, useState } from "react";
import lsg from "../../assets/LSG.png";
import gt from "../../assets/GT.png";
import { useSelector, useDispatch } from "react-redux";
import logoIpl from "../../assets/iplLogo.svg";
import { fetchPreviousMatches } from "../../redux/features/apiFetch/apiFetch";
import Loading from "./Loading"


export default function NextIplMatches() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPreviousMatches());
  }, [dispatch]);

  const { previousMatches } = useSelector((state) => state.matches);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (
      previousMatches &&
      previousMatches.typeMatches &&
      previousMatches.typeMatches.length > 1 &&
      previousMatches.typeMatches[1].seriesMatches &&
      previousMatches.typeMatches[1].seriesMatches.length > 0 &&
      previousMatches.typeMatches[1].seriesMatches[0].seriesAdWrapper?.matches
    ) {
      setLocalLoading(false);
    }
  }, [previousMatches]);

  const iplMatches =
    previousMatches?.typeMatches?.[1]?.seriesMatches?.[0]?.seriesAdWrapper
      ?.matches || [];

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

  function formatTimestamp(timestamp) {
    const datee = parseInt(timestamp);
    const date = new Date(datee);

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });
  }

  if (localLoading) {
    return <div className="text-center flex justify-center items-center"><Loading /></div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-0 gap-3 py-3 box-border">
        {iplMatches.map((match, index) => (
          <div
            key={index}
            className="p-6 px-6 border border-gray-300 dark:border-gray-700 sm:my-3 mx-3 rounded-2xl"
          >
            <div className="flex justify-between text-gray-500 text-sm">
              <p>
                IPL .{" "}
                {match.matchInfo?.startDate
                  ? formatTimestamp(match.matchInfo.startDate)
                  : "-"}
              </p>
            </div>

            <div className="w-full text-black dark:text-white">
              <div className="flex justify-between items-center py-6 text-sm font-medium">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={teamImageGenerator(
                      match.matchInfo?.team1?.teamSName || "default"
                    )}
                    alt="team1"
                    className="w-10"
                  />
                  <div className="px-1 flex flex-col items-center gap-2">
                    <p>{match.matchInfo?.team1?.teamSName || "-"}</p>
                    <div className="text-center">
                      <p>
                        {match.matchScore?.team1Score?.inngs1
                          ? `${match.matchScore.team1Score.inngs1.runs}/${match.matchScore.team1Score.inngs1.wickets}`
                          : "-"}
                      </p>
                      <p className="text-xs font-light dark:text-gray-300 text-gray-500">
                        (
                        {match.matchScore?.team1Score?.inngs1?.overs
                          ? Math.ceil(match.matchScore.team1Score.inngs1.overs)
                          : "-"}
                        )
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <p>vs</p>
                  <p className="text-xs font-light text-center">
                    {match.matchInfo?.status || "Match Ongoing"}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <img
                    src={teamImageGenerator(
                      match.matchInfo?.team2?.teamSName || "default"
                    )}
                    alt="team2"
                    className="w-10"
                  />
                  <div className="px-1 flex flex-col items-center gap-2">
                    <p>{match.matchInfo?.team2?.teamSName || "-"}</p>
                    <div className="text-center">
                      <p>
                        {match.matchScore?.team2Score?.inngs1
                          ? `${match.matchScore.team2Score.inngs1.runs}/${match.matchScore.team2Score.inngs1.wickets}`
                          : "-"}
                      </p>
                      <p className="text-xs font-light dark:text-gray-300 text-gray-500">
                        (
                        {match.matchScore?.team2Score?.inngs1?.overs
                          ? Math.ceil(match.matchScore.team2Score.inngs1.overs)
                          : "-"}
                        )
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="border-b border-gray-300 dark:border-gray-700 text-sm text-blue-700 pb-1">
                <span className="text-gray-500 dark:text-gray-400">
                  Venue :{" "}
                </span>
                {match.matchInfo?.venueInfo?.ground || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
