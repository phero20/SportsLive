import "./App.css";
import Nav from "./Components/Nav";
import Ipl from "./Components/ipl/Ipl";
import Matches from "./Components/ipl/Matches";
import Table from "./Components/ipl/Table";
import Winners from "./Components/ipl/Winners";
import Stats from "./Components/ipl/Stats";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { fetchIplData } from "./redux/features/apiFetch/apiFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIplData());
  }, [dispatch]);


  // const fetchh=async()=>{
  //   const url = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent';
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-key': '225de374aamshae091e8b45f42aap159aa5jsna9afa85d0339',
  //       'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
  //     }
  //   };
    
  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     const iplMatches = result.typeMatches[1].seriesMatches[0].seriesAdWrapper.matches[1];
    
      
  //     console.log(iplMatches);

  //     // console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchh();
  // }
  // , []);


  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/ipl/matches" replace />} />
          <Route path="/ipl" element={<Ipl />}>
            <Route path="matches" element={<Matches />} />
            <Route path="table" element={<Table />} />
            <Route path="winners" element={<Winners />} />
            <Route path="stats" element={<Stats />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
