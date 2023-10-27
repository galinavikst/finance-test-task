import { screen, render } from "@testing-library/react";
import TickerTable from "./components/TickerTable";
import { Provider } from "react-redux";
import { store } from "./redux/store";

test("renders table", () => {
  render(
    <Provider store={store}>
      <TickerTable />
    </Provider>
  );

  const sampleTickers = ["AAPL", "GOOGL", "MSFT", "AMZN", " FB", "TSLA"];

  sampleTickers.forEach((ticker) => {
    const cell = screen.getByText(ticker);
    expect(cell).toBeInTheDocument();
  });
});
