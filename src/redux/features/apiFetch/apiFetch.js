import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchIplData = createAsyncThunk(
  "matches/fetchIplData",
  async (_, { rejectWithValue }) => {
    try {
      const response1 = await fetch("https://sports-backend-pcf6.onrender.com/api/ipl-live");
      const response2 = await fetch("https://sports-backend-pcf6.onrender.com/api/scores");
      const response3 = await fetch("https://sports-backend-pcf6.onrender.com/api/points-table");
      
      const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "73bdf95549mshef9acf5750702abp102124jsn9dcc9be9e2ac",
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
        },
      };
      const response4 = await fetch(url, options);

      if (!response1.ok || !response2.ok || !response3.ok || !response4.ok) {
        throw new Error("Failed to fetch one or more API endpoints.");
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

// Initial state
const initialState = {
  matches: [],
  iplMatches: [],
  pointsTable: [],
  previuosMatches: [],
  loading: false,
  error: null,
};

export const scoreSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.matches = action.payload;
    },
    iplMatches: (state, action) => {
      state.iplMatches = action.payload;
    },
    pointsTable: (state, action) => {
      state.pointsTable = action.payload;
    },
    previuosMatches: (state, action) => {
      state.previuosMatches = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIplData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIplData.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload.matches;
        state.iplMatches = action.payload.iplMatches;
        state.pointsTable = action.payload.pointsTable;
        state.previuosMatches = action.payload.previousMatches; // ✅ Fixed logic
      })
      .addCase(fetchIplData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchSuccess, iplMatches, pointsTable, previuosMatches } = scoreSlice.actions;
export default scoreSlice.reducer;
