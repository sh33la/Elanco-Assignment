import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { vi } from "vitest";
import CountryCard from "../../components/CountryCard";
import { ICountry } from "../../types/country";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

describe("CountryCard Component", () => {
  const mockPush = vi.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  const mockCountry: ICountry = {
    name: "India",
    countryCode: "IN",
    flag: "https://flagcdn.com/in.svg",
    region: "Asia",
  };

  it("renders country name, region, and flag", () => {
    render(<CountryCard country={mockCountry} />);

    expect(screen.getByText("India")).toBeInTheDocument();
    expect(screen.getByText(/Asia/i)).toBeInTheDocument();
    expect(screen.getByAltText("Flag of India")).toBeInTheDocument();
  });

  it("navigates to the correct country page on click", () => {
    render(<CountryCard country={mockCountry} />);
    const div = screen.getByTestId(`country-card-${mockCountry.countryCode}`);
    fireEvent.click(div);
    expect(mockPush).toHaveBeenCalledWith("/countries/IN");
  });

  it("displays 'No Flag Available' when no flag is present", () => {
    const mockCountryNoFlag = { ...mockCountry, flag: "" };
    render(<CountryCard country={mockCountryNoFlag} />);
    expect(screen.getByText("No Flag Available")).toBeInTheDocument();
  });
});
