import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dc from "../../../assets/DC.png";
import gt from "../../../assets/GT.png";

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://sports-backend-pcf6.onrender.com/api/scores"
      );
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPointsTable = createAsyncThunk(
  "matches/fetchPointsTable",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://sports-backend-pcf6.onrender.com/api/points-table"
      );
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPlayers = createAsyncThunk(
  "matches/fetchPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response1 = await fetch("https://sports-backend-pcf6.onrender.com/api/ipl-live");
      const response2 = await fetch("https://sports-backend-pcf6.onrender.com/api/scores");
      const response3 = await fetch("https://sports-backend-pcf6.onrender.com/api/points-table");
      
      const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "479fe899fdmsh2dbe00ffa7859f2p171596jsne5ff2cf23d87",
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
        },
      };
      const response4 = await fetch(url, options);

      if (!response1.ok || !response2.ok || !response3.ok || !response4.ok) {
        throw new Error("Failed to fetch one or more API endpoints.");
      }

      const url1= 'https://cricket-api-free-data.p.rapidapi.com/cricket-players?teamid=2';
      const options1 = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '479fe899fdmsh2dbe00ffa7859f2p171596jsne5ff2cf23d87',
          'x-rapidapi-host': 'cricket-api-free-data.p.rapidapi.com'
        }
      };
      
      try {
        const response = await fetch(url1, options1);
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
         
        
      const result1 = await response1.json();
      const result2 = await response2.json();
      const result3 = await response3.json();
      const result4 = await response4.json();
      console.log(result4);
      // Filtering IPL matches
      const today = new Date().toISOString().slice(0, 10);
      const iplMatchesToday = result1.matches.filter((match) => {
        const isIPLMatch =
          match.series &&
          match.series.toLowerCase().includes("indian premier league");
        const matchDate1 = match.dateTimeGMT.split("T")[0];

        return isIPLMatch && matchDate1 === today;
      });

      return { matches: result2, iplMatches: iplMatchesToday, pointsTable: result3, previousMatches: result4 };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const initialState = {
  matches: [],
  pointsTable: [],
  previousMatches: [],
  players: [],
  scoreCad: [],
  winners: [
    {
      year: 2008,
      team: "Rajasthan Royals",
      rival: "Chennai Super Kings",
      image_url: "https://assets.ccbp.in/frontend/react-js/rr-logo-img.png",
    },
    {
      year: 2009,
      team: "Deccan Chargers",
      rival: "Royal Challengers Bangalore",
      image_url: dc,
    },
    {
      year: 2010,
      team: "Chennai Super Kings",
      rival: "Mumbai Indians",
      image_url: "https://assets.ccbp.in/frontend/react-js/csk-logo-img.png",
    },
    {
      year: 2011,
      team: "Chennai Super Kings",
      rival: "Royal Challengers Bangalore",
      image_url: "https://assets.ccbp.in/frontend/react-js/csk-logo-img.png",
    },
    {
      year: 2012,
      team: "Kolkata Knight Riders",
      rival: "Chennai Super Kings",
      image_url: "https://assets.ccbp.in/frontend/react-js/kkr-logo-img.png",
    },
    {
      year: 2013,
      team: "Mumbai Indians",
      rival: "Chennai Super Kings",
      image_url: "https://assets.ccbp.in/frontend/react-js/mi-logo-img.png",
    },
    {
      year: 2014,
      team: "Kolkata Knight Riders",
      rival: "Kings XI Punjab",
      image_url: "https://assets.ccbp.in/frontend/react-js/kkr-logo-img.png",
    },
    {
      year: 2015,
      team: "Mumbai Indians",
      rival: "Chennai Super Kings",
      image_url: "https://assets.ccbp.in/frontend/react-js/mi-logo-img.png",
    },
    {
      year: 2016,
      team: "Sunrisers Hyderabad",
      rival: "Royal Challengers Bangalore",
      image_url: "https://assets.ccbp.in/frontend/react-js/srh-logo-img.png",
    },
    {
      year: 2017,
      team: "Mumbai Indians",
      rival: "Rising Pune Supergiant",
      image_url: "https://assets.ccbp.in/frontend/react-js/mi-logo-img.png",
    },
    {
      year: 2018,
      team: "Chennai Super Kings",
      rival: "Sunrisers Hyderabad",
      image_url: "https://assets.ccbp.in/frontend/react-js/csk-logo-img.png",
    },
    {
      year: 2019,
      team: "Mumbai Indians",
      rival: "Chennai Super Kings",
      image_url: "https://assets.ccbp.in/frontend/react-js/mi-logo-img.png",
    },
    {
      year: 2020,
      team: "Mumbai Indians",
      rival: "Delhi Capitals",
      image_url: "https://assets.ccbp.in/frontend/react-js/mi-logo-img.png",
    },
    {
      year: 2021,
      team: "Chennai Super Kings",
      rival: "Kolkata Knight Riders",
      image_url: "https://assets.ccbp.in/frontend/react-js/csk-logo-img.png",
    },
    {
      year: 2022,
      team: "Gujarat Titans",
      rival: "Rajasthan Royals",
      image_url: gt,
    },
    {
      year: 2023,
      team: "Chennai Super Kings",
      rival: "Gujarat Titans",
      image_url: "https://assets.ccbp.in/frontend/react-js/csk-logo-img.png",
    },
    {
      year: 2024,
      team: "Kolkata Knight Riders",
      rival: "Sunrisers Hyderabad",
      image_url: "https://assets.ccbp.in/frontend/react-js/kkr-logo-img.png",
    },
  ],
  loading: false,
  error: null,
};


const scoreSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.matches = action.payload;
        state.loading = false;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(fetchPointsTable.fulfilled, (state, action) => {
        state.pointsTable = action.payload;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.players = action.payload;
      })
      .addCase(fetchPreviousMatches.fulfilled, (state, action) => {
        state.previousMatches = action.payload;
      })
      .addCase(fetchScoreCad.fulfilled, (state, action) => {
        state.scoreCad = action.payload;
      });
  },
});

export default scoreSlice.reducer;
