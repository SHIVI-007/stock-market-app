import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { OwnershipSimulator } from "./core-simulators";

afterEach(cleanup);

describe("OwnershipSimulator", () => {
  it("computes ownership from shares owned and shares outstanding", () => {
    render(<OwnershipSimulator />);

    // Defaults: 1 crore shares outstanding, 0.1 crore owned → 10%.
    expect(screen.getByText("10%")).toBeInTheDocument();
  });

  it("updates ownership when the learner changes shares owned", () => {
    render(<OwnershipSimulator />);

    fireEvent.change(screen.getByLabelText("Shares you own value"), {
      target: { value: "0.5" },
    });

    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("updates the implied price per share when company value changes", () => {
    render(<OwnershipSimulator />);

    // ₹100 crore ÷ 1 crore shares = ₹100 per share
    expect(screen.getByText("₹100")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Company value value"), {
      target: { value: "200" },
    });

    expect(screen.getByText("₹200")).toBeInTheDocument();
  });

  it("keeps the share price stable when only the learner's holding changes", () => {
    render(<OwnershipSimulator />);

    const before = screen.getByText("₹100");
    expect(before).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Shares you own value"), {
      target: { value: "0.75" },
    });

    // Ownership changes, but the company value and share count have not.
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("₹100")).toBeInTheDocument();
  });
});
