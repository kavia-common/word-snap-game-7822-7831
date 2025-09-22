import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders navbar and actions", () => {
  render(<App />);
  expect(screen.getByText(/WordSnap/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Start/i })).toBeInTheDocument();
});
