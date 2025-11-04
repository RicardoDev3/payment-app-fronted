import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";

describe("ProductCard", () => {
  const mockProduct = {
    id: "1",
    name: "Test Product",
    description: "Test description",
    price: 10000,
    stock: 5,
    imageUrl: "test.jpg",
  };

  it("should render product information", () => {
    const onBuyClick = vi.fn();
    render(<ProductCard product={mockProduct} onBuyClick={onBuyClick} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText(/10\.000/)).toBeInTheDocument();
  });

  it("should call onBuyClick when button is clicked", () => {
    const onBuyClick = vi.fn();
    render(<ProductCard product={mockProduct} onBuyClick={onBuyClick} />);

    const buyButton = screen.getByRole("button");
    fireEvent.click(buyButton);

    expect(onBuyClick).toHaveBeenCalledWith(mockProduct);
  });

  it("should disable button when out of stock", () => {
    const productOutOfStock = { ...mockProduct, stock: 0 };
    const onBuyClick = vi.fn();
    render(<ProductCard product={productOutOfStock} onBuyClick={onBuyClick} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should show out of stock badge", () => {
    const productOutOfStock = { ...mockProduct, stock: 0 };
    const onBuyClick = vi.fn();
    render(<ProductCard product={productOutOfStock} onBuyClick={onBuyClick} />);

    expect(screen.getByText("Agotado")).toBeInTheDocument();
  });
});
