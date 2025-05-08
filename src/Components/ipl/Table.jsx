import React, { useEffect, useState } from "react";
import lsg from "../../assets/lsg.png";
import gt from "../../assets/GT.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchPointsTable } from "../../redux/features/apiFetch/apiFetch";
import Loading from "./Loading"

export default function Table() {
  const { pointsTable } = useSelector((state) => state.matches);
  const [localLoading, setLocalLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPointsTable());
  }, [dispatch]);

  useEffect(() => {
    if (pointsTable && Object.keys(pointsTable).length > 0) {
      setLocalLoading(false);
    }
  }, [pointsTable]);

  const pointsTableData = !localLoading ? pointsTable : null;

  const sortedPointsTable = pointsTableData
    ? Object.entries(pointsTableData).sort(([teamA], [teamB]) => {
        const teamNumA = parseInt(teamA.replace("Team ", ""));
        const teamNumB = parseInt(teamB.replace("Team ", ""));
        return teamNumA - teamNumB;
      })
    : [];

  const teamNameImageGenerator = (teamName) => {
    const teamData = {
      "Royal Challengers Bengaluru": {
        logo: "https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png",
        shortName: "RCB",
      },
      "Punjab Kings": {
        logo: "https://assets.ccbp.in/frontend/react-js/kxp-logo-img.png",
        shortName: "PBKS",
      },
      "Mumbai Indians": {
        logo: "https://assets.ccbp.in/frontend/react-js/mi-logo-img.png",
        shortName: "MI",
      },
      "Gujarat Titans": {
        logo: gt,
        shortName: "GT",
      },
      "Delhi Capitals": {
        logo: "https://assets.ccbp.in/frontend/react-js/dc-logo-img.png",
        shortName: "DC",
      },
      "Kolkata Knight Riders": {
        logo: "https://assets.ccbp.in/frontend/react-js/kkr-logo-img.png",
        shortName: "KKR",
      },
      "Lucknow Super Giants": {
        logo: lsg,
        shortName: "LSG",
      },
      "Rajasthan Royals": {
        logo: "https://assets.ccbp.in/frontend/react-js/rr-logo-img.png",
        shortName: "RR",
      },
      "Sunrisers Hyderabad": {
        logo: "https://assets.ccbp.in/frontend/react-js/srh-logo-img.png",
        shortName: "SRH",
      },
      "Chennai Super Kings": {
        logo: "https://assets.ccbp.in/frontend/react-js/csk-logo-img.png",
        shortName: "CSK",
      },
    };

    return teamData[teamName] || { logo: "", shortName: "" };
  };

  if (localLoading) {
     return <div className="text-center flex justify-center items-center"><Loading /></div>;
  }

  return (
    <div className="p-1">
      <div className="max-w-full rounded-lg border border-gray-300 dark:border-gray-700 px-2 py-5">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="text-gray-500 dark:text-gray-200 font-medium border-b border-gray-300 dark:border-gray-700">
              <th className="w-1/3 p-3 pl-5 text-left text-sm font-medium">
                Team
              </th>
              <th className="w-1/12 p-3 text-center text-sm font-medium">M</th>
              <th className="w-1/12 p-3 text-center text-sm font-medium">W</th>
              <th className="w-1/12 p-3 text-center text-sm font-medium">L</th>
              <th className="w-1/6 p-3 text-center text-sm font-medium">NRR</th>
              <th className="w-1/6 p-3 text-center text-sm font-medium">Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedPointsTable.map(([teamKey, team], index) => {
              const { Played, Won, Loss, Points, Name } = team;
              const nrr =
                parseFloat(team["Net Run Rate"]) > 0
                  ? `+${team["Net Run Rate"]}`
                  : team["Net Run Rate"];

              const teamData = teamNameImageGenerator(Name);

              return (
                <tr
                  key={index}
                  className="text-black dark:text-gray-200 text-xs md:text-sm font-medium text-center border-b border-gray-300 dark:border-gray-700"
                >
                  <td className="w-1/3 p-1 py-3 text-left flex gap-2 items-center">
                    {teamKey.replace("Team ", "")}
                    <img src={teamData.logo} alt={Name} className="w-6" />
                    {teamData.shortName}
                  </td>
                  <td className="w-1/12 p-2 text-center">{Played}</td>
                  <td className="w-1/12 p-2 text-center">{Won}</td>
                  <td className="w-1/12 p-2 text-center">{Loss}</td>
                  <td className="w-1/6 p-2 text-center">{nrr}</td>
                  <td className="w-1/6 p-2 text-center">{Points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
