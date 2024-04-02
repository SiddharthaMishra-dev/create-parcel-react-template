/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import App from "./App";

test("App", () => {
  render(<App />);
  const element = screen.getByText("React + Parcel + Typescript");
  expect(element).toBeTruthy();
});
