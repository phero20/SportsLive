import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMatches,
  fetchScoreCad,
} from "../../redux/features/apiFetch/apiFetch";
import lsg from "../../assets/LSG.png";
import gt from "../../assets/GT.png";
import { MonitorPlay } from "lucide-react";

export default function ScoreCard() {
  const dispatch = useDispatch();
  const [polling, setPolling] = useState(null);

  const { matches, scoreCad } = useSelector((state) => state.matches);

  // Fetch matches once and initial scoreCad
  useEffect(() => {
    dispatch(fetchMatches());
    dispatch(fetchScoreCad());
  }, [dispatch]);

  // Utility functions
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

  const formatMatchTime = (timeString = "") => {
    const match = timeString.match(/\b\d{1,2}:\d{2}\s*[AP]M\b/i);
    return match ? match[0] : timeString;
  };

  const parseScore = (scoreString = "") => {
    const scoreMatch = scoreString.match(/^([\d\-]+)\s*\(([\d.]+)\s*Ovs\)/);
    if (scoreMatch) {
      return {
        score: scoreMatch[1],
        overs: `(${scoreMatch[2]})`,
      };
    }
    return {
      score: scoreString || "-",
      overs: "",
    };
  };

  const tomorrowMatches = Object.entries(matches || {}).filter(
    ([_, match]) => match.Date === "Today"
  );

  const formattedTomorrowMatches = tomorrowMatches.map(([matchKey, match]) => ({
    matchId: matchKey,
    matchTitle: match.Rival,
    matchDate: match.Date,
    matchTime: match.Time,
    loc: match.Location,
    teamOne: {
      name: match.Rival.split(" vs ")[0],
      score: "",
      status: "bat",
    },
    teamTwo: {
      name: match.Rival.split(" vs ")[1],
      score: "",
      status: "bat",
    },
    matchStatus: match.Rival,
    currentStatus: "live",
  }));

  const liveMatches = (scoreCad?.response || [])
    .filter((match) => match.seriesName === "INDIAN PREMIER LEAGUE 2025")
    .flatMap((match) =>
      match.matchList.map((liveMatch) => ({
        matchId: liveMatch.matchId,
        matchTitle: liveMatch.matchTitle,
        matchDate: "Today",
        matchTime: liveMatch.matchTime,
        teamOne: {
          name: liveMatch.teamOne.name,
          score: liveMatch.teamOne.score,
          status: liveMatch.teamOne.status,
        },
        teamTwo: {
          name: liveMatch.teamTwo.name,
          score: liveMatch.teamTwo.score,
          status: liveMatch.teamTwo.status,
        },
        matchStatus: liveMatch.matchStatus,
        currentStatus: liveMatch.currentStatus,
      }))
    );

  const combinedTodayMatches = [...formattedTomorrowMatches, ...liveMatches];

  // Start polling only if there's a live match
  useEffect(() => {
    const hasLiveMatch = combinedTodayMatches.some(
      (match) => match.currentStatus?.toLowerCase() === "live"
    );

    if (hasLiveMatch && !polling) {
      const intervalId = setInterval(() => {
        dispatch(fetchScoreCad());
      }, 15000);
      setPolling(intervalId);
    } else if (!hasLiveMatch && polling) {
      clearInterval(polling);
      setPolling(null);
    }

    return () => {
      if (polling) {
        clearInterval(polling);
        setPolling(null);
      }
    };
  }, [combinedTodayMatches, dispatch]);

  // UI rendering (same as yours, no changes)
  return (
    <div className="sm:border-0 sm:mx-3 my-7">
      {combinedTodayMatches.map((match, index) => {
        const teamOneData = parseScore(match.teamOne.score);
        const teamTwoData = parseScore(match.teamTwo.score);

        return (
          <React.Fragment key={index}>
            <div className="p-6 pb-6">
              <p className="text-gray-500">
                IPL · {match.matchDate}, {formatMatchTime(match.matchTime)}
              </p>
              <div className="w-full dark:text-white text-black">
                <div className="flex justify-between items-center py-10 pb-6">
                  {/* Team One */}
                  <div className="flex flex-col gap-4 items-start">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <img
                        src={teamImageGenerator(match.teamOne.name)}
                        alt="team1"
                        className="w-12"
                      />
                      <div className="text-left">
                        <p>{teamOneData.score}</p>
                        <p className="text-gray-500 text-xs">
                          {teamOneData.overs}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium px-2">{match.teamOne.name}</p>
                  </div>

                  {/* VS */}
                  <div className="font-medium text-xl text-center flex flex-col gap-2">
                    VS
                    <p className="text-xs font-medium">{match.matchStatus}</p>
                  </div>

                  {/* Team Two */}
                  <div className="flex flex-col gap-4 items-end">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <div className="text-right">
                        <p>{teamTwoData.score}</p>
                        <p className="text-gray-500 text-xs">
                          {teamTwoData.overs}
                        </p>
                      </div>
                      <img
                        src={teamImageGenerator(match.teamTwo.name)}
                        alt="team2"
                        className="w-12"
                      />
                    </div>
                    <p className="font-medium text-right px-2">
                      {match.teamTwo.name}
                    </p>
                  </div>
                </div>

                <p className="border-b border-gray-300 dark:border-gray-700 text-sm text-blue-700 pb-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    {match.loc ? `Venue: ` : ""}
                  </span>
                  {match.loc}
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
        );
      })}
    </div>
  );
}
