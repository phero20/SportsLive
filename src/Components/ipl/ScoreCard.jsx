import React, { useEffect, useState } from "react";
import { MonitorPlay } from "lucide-react";
import lsg from "../../assets/LSG.png";
import gt from "../../assets/GT.png";
import { useSelector } from "react-redux";

export default function ScoreCard({ time1, time2, Venue1, Venue2 }) {
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
    return teamLogos[teamName] || "";
  };

  const { iplMatches, loading, error } = useSelector((state) => state.matches);
  console.log(iplMatches)

  const matchData =
    iplMatches && Array.isArray(iplMatches)
      ? iplMatches.map((match, index) => {
          const team1Match = match.t1?.match(/\[([A-Za-z]+)\]/);
          const team2Match = match.t2?.match(/\[([A-Za-z]+)\]/);

          return {
            date: 'Today',
            time: index === 0 ? time1 : time2,
            team1Name: team1Match ? team1Match[1] : "N/A",
            team2Name: team2Match ? team2Match[1] : "N/A",
            team1Score: match.t1s?.split(" ")[0] ?? "-",
            team2Score: match.t2s?.split(" ")[0] ?? "-",
            team1Overs: match.t1s?.split(" ")[1] ?? "-",
            team2Overs: match.t2s?.split(" ")[1] ?? "-",
            Venue : index === 0 ? Venue1 : Venue2,
          };
        })
      : [];

  return (
    <div className="sm:border-0 sm:mx-3 my-7">
      {Array.isArray(iplMatches) &&
        iplMatches.map((_, index) => (
          <React.Fragment key={index}>
            <div className="p-6 pb-6">
              <p className="text-gray-500">
                IPL . Today, {matchData[index].time}
              </p>
              <div className="w-full dark:text-white text-black">
                <div className="flex justify-between items-center py-10 pb-6 ">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <img
                        src={teamImageGenerator(matchData[index].team1Name)}
                        alt="team1"
                        className="w-12"
                      />
                      <div>
                        <p>{matchData[index].team1Score}</p>
                        <p className="text-gray-500 text-xs text-center">
                          {matchData[index].team1Overs}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium px-2">
                      {matchData[index].team1Name}
                    </p>
                  </div>
                  <div className="font-medium">VS</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <div>
                        <p>{matchData[index].team2Score}</p>
                        <p className="text-gray-500 text-xs text-center">
                          {matchData[index].team2Overs}
                        </p>
                      </div>
                      <img
                        src={teamImageGenerator(matchData[index].team2Name)}
                        alt="team2"
                        className="w-12"
                      />
                    </div>
                    <p className="font-medium text-right px-2">
                      {matchData[index].team2Name}
                    </p>
                  </div>
                </div>
                <p className="border-b border-gray-300 dark:border-gray-700 text-sm text-blue-700 pb-1">
                  <span className="text-gray-500 dark:text-gray-400">Venue : </span>
                  {matchData[index].Venue}
                </p>
              </div>
            </div>
            <div className="w-full pb-6 px-5">
              <a
                href="https://www.hotstar.com/in/sports"
                className="flex p-1 py-2 border border-gray-300 dark:border-gray-700 w-28 rounded-full text-xs font-normal justify-evenly text-gray-500 dark:text-gray-400 cursor-pointer"
              >
                <MonitorPlay size={17} color="blue" /> Watch Live
              </a>
            </div>
          </React.Fragment>
        ))}
    </div>
  );
}
