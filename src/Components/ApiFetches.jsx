import React from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { iplMatches } from "./redux/features/apiFetch/apiFetch";

export default function ApiFetches() {


    const dispatch = useDispatch();
    const fetchData = async () => {
      try {
        const response1 = await fetch("http://localhost:5000/api/ipl-live");
        const response2 = await fetch("http://localhost:5000/api/scores");
        if (!response1.ok || !response2.ok) {
          throw new Error(`HTTP error! Status: ${response1.status}`);
        }
        const result1 = await response1.json();
        const result2 = await response2.json();
        console.log(result1);
  
        const today = new Date().toISOString().slice(0, 10);
        const iplMatchesToday = result1.matches.filter((match) => {
          const isIPLMatch =
            match.series &&
            match.series.toLowerCase().includes("indian premier league");
          const matchDate1 = match.dateTimeGMT.split("T")[0];
           
          return isIPLMatch && matchDate1 === today;
        });
        dispatch(iplMatches(iplMatchesToday));
        dispatch(fetchSuccess(result2));
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);


  return (
    <div>
      
    </div>
  )
}
