import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

describe("Layout", () => {
  it("should render children", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render header with logo", () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText("Tienda Online")).toBeInTheDocument();
  });

  it("should render footer", () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText(/© 2025 Payment App/)).toBeInTheDocument();
  });
});
