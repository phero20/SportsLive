import "./App.css";
import Nav from "./Components/Nav";
import Ipl from "./Components/ipl/Ipl";
import Matches from "./Components/ipl/Matches";
import Table from "./Components/ipl/Table";
import Winners from "./Components/ipl/Winners";
import Players from "./Components/ipl/Players";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
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
            <Route path="players" element={<Players />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
