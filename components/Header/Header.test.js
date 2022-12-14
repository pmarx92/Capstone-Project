import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("displays a header ", () => {
  render(<Header />);
  const heading = screen.getByRole("heading", {
    name: /Capstone Project/i,
  });
  expect(heading).toBeInTheDocument();
});
