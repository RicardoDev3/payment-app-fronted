import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Backdrop from "../Backdrop";

describe("Backdrop", () => {
  it("should not render when isVisible is false", () => {
    const { container } = render(<Backdrop isVisible={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render when isVisible is true", () => {
    render(<Backdrop isVisible={true} message="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show default message", () => {
    render(<Backdrop isVisible={true} />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});
