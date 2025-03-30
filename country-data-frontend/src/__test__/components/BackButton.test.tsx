import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { describe, expect, it, vi } from "vitest";
import BackButton from "../../components/BackButton";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

describe("BackButton Component", () => {
  it("should navigate to home page when clicked", () => {
    const mockPush = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<BackButton />);

    const button = screen.getByRole("button", { name: /back/i });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
