
import { render, screen } from "@testing-library/react";
import Invoice from "./Invoice";

describe("Invoice component", () => {
  it("should render Invoice component correctly", () => {
    render(<Invoice />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });
});