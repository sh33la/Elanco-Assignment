import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import Home from "../pages";
import { store } from "../redux/store";

test("renders loading state while fetching data", async () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByText(/loading/i));
});
