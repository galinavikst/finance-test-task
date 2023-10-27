import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { api } from "./features/apiSlice";
import tickerReduser from "./features/tickersSlise";

export const store = configureStore({
  reducer: {
    tickers: tickerReduser,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const useAppSelector = useSelector;
