// filepath: /d:/My-Project/kamart/src/__test__/pages/products.spec.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ProductView from "@/components/views/products";
import "@testing-library/jest-dom/extend-expect";

jest.mock("@/api/products", () => ({
  getProducts: jest.fn().mockResolvedValue([
    {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "Description 1",
      images: ["https://via.placeholder.com/150"],
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      description: "Description 2",
      images: ["https://via.placeholder.com/150"],
    },
  ]),
}));

describe("Product Page", () => {
  it("should render without crashing", async () => {
    render(<ProductView />);
    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(await screen.findByText("Product 2")).toBeInTheDocument();
  });
});
