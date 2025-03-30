import { render } from "@testing-library/react";
import { Router } from "next/router";
import { Provider } from "react-redux";
import { expect, vi } from "vitest";
import App from "../../pages/_app";
import { store } from "../../redux/store";

// Create a mock router object
const mockRouter: Partial<Router> = {
  basePath: "",
  pathname: "/",
  route: "/",
  query: {},
  asPath: "/",
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  isFallback: false,
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
};

const MockComponent = () => <div>Test Component</div>;

describe("App Component", () => {
  it("should render child components inside the Provider", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App
          Component={MockComponent}
          pageProps={{}}
          router={mockRouter as Router}
        />
      </Provider>
    );

    expect(getByText("Test Component")).toBeTruthy();
  });
});
