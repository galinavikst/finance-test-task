import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setTickers, setPrevTickers } from "../redux/features/tickersSlise";
import { useAppSelector } from "../redux/store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TickerTable() {
  const socket = io("http://localhost:4000");
  const dispatch = useDispatch();
  const tickersData = useAppSelector((state) => state.tickers.tickers);
  const prevTickersData = useAppSelector((state) => state.tickers.prevTickers);

  // connect to socket
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("start");
      console.log("connected start");
    });

    return () => {
      socket.off("connect", () => {});
    };
  }, []);

  // set tickers data
  useEffect(() => {
    socket.on("ticker", (data) => {
      dispatch(setTickers(data));
    });
    console.log("actual", tickersData);
  }, [dispatch, socket, tickersData, prevTickersData]);

  // set prev data
  useEffect(() => {
    setTimeout(() => {
      dispatch(setPrevTickers(tickersData));
    }, 2000);
    console.log("prev", prevTickersData);
  }, [dispatch, tickersData, prevTickersData]);

  return (
    <div>
      <TableContainer id="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell align="right">Exchange</TableCell>
              <TableCell align="right">Price&nbsp;($)</TableCell>
              <TableCell align="right">Change&nbsp;($)</TableCell>
              <TableCell align="right">Change&nbsp;(%)</TableCell>
              <TableCell align="right">Dividend&nbsp;($)</TableCell>
              <TableCell align="right">Yield</TableCell>
              <TableCell align="right">Last trade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickersData.length &&
              tickersData.map((ticker, index) => (
                <TableRow
                  key={ticker.ticker}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className="ticker_cell"
                    sx={{ p: "0 20px" }}
                    align="left"
                  >
                    {ticker.ticker}{" "}
                    {prevTickersData.length && (
                      <span className="arrow">
                        {ticker.price > prevTickersData[index].price
                          ? "↑"
                          : "↓"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell align="right">{ticker.exchange}</TableCell>
                  <TableCell align="right">{ticker.price}</TableCell>
                  <TableCell align="right">{ticker.change}</TableCell>
                  <TableCell align="right">{ticker.change_percent}</TableCell>
                  <TableCell align="right">{ticker.dividend}</TableCell>
                  <TableCell align="right">{ticker.yield}</TableCell>
                  <TableCell align="right">
                    {ticker.last_trade_time.replace("T", " ").slice(2, -5)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
