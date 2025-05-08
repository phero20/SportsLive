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
      const response = await fetch(
        "https://sports-backend-pcf6.onrender.com/api/players"
      );
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPreviousMatches = createAsyncThunk(
  "matches/fetchPreviousMatches",
  async (_, { rejectWithValue }) => {
    const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent";
    const apiKeys = [
      "73bdf95549mshef9acf5750702abp102124jsn9dcc9be9e2ac",
      "0ce6c19b5cmsh745281674507dc1p19c7aajsn972189d87d01",
      "225de374aamshae091e8b45f42aap159aa5jsna9afa85d0339",
      "eb1dd8c8bemsh9d4a79a1b8ee204p1014fejsn6fb2d2d98933",
    ];

    try {
      for (const key of apiKeys) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key": key,
            "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          },
        });
        if (response.ok) return await response.json();
      }
      throw new Error("All API keys failed");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const fetchScoreCad = createAsyncThunk(
  "matches/fetchScoreCad",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://cricket-api-free-data.p.rapidapi.com/cricket-livescores",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "0ce6c19b5cmsh745281674507dc1p19c7aajsn972189d87d01",
            "x-rapidapi-host": "cricket-api-free-data.p.rapidapi.com",
          },
        }
      );
      return await response.json();
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
