import { createSlice } from "@reduxjs/toolkit";

const tickerSlise = createSlice({
  name: "tickers",
  initialState: {
    tickers: [],
    prevTickers: [],
  },
  reducers: {
    setTickers(state, action) {
      state.tickers = action.payload;
    },
    setPrevTickers(state, action) {
      state.prevTickers = action.payload;
    },
  },
});

export const { setTickers, setPrevTickers } = tickerSlise.actions;
export default tickerSlise.reducer;
