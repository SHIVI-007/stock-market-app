import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import { useHydrated } from "./hydration";

function Probe() {
  return <span>{useHydrated() ? "browser" : "pending"}</span>;
}

afterEach(() => {
  cleanup();
});

describe("useHydrated", () => {
  it("reports the pending state while the server renders", () => {
    expect(renderToStaticMarkup(<Probe />)).toContain("pending");
  });

  it("reports the browser state once React has taken over", () => {
    render(<Probe />);

    expect(screen.getByText("browser")).toBeInTheDocument();
  });
});
