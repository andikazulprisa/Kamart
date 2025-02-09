import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import HomePage from "@/pages/index";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ProductPage, { getServerSideProps } from "@/pages/products";
import ProfilePage from "@/pages/admin/profile";
import { getProducts } from "@/services/api/product";
import { IncomingMessage, ServerResponse } from "http";

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn().mockImplementation(() => Promise.resolve({ ok: true })),
}));

// Mock next/router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
    query: {},
    pathname: "/",
  }),
}));

// **Mock API getProducts**
jest.mock("@/services/api/product", () => ({
  getProducts: jest.fn(),
  getDetailProduct: jest.fn().mockResolvedValue(null),
}));

describe("Pages Tests", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    mockPush.mockClear();
    localStorage.removeItem("access_token");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("1. Admin Page", () => {
    it("should render shop title", () => {
      render(<HomePage />);
      expect(screen.getByText("KAMART | SHOP")).toBeInTheDocument();
    });

    it("should render navigation buttons", () => {
      render(<HomePage />);
      const productButton = screen.getByRole("button", { name: /product/i });
      const profileButton = screen.getByRole("button", { name: /profile/i });
      
      expect(productButton).toBeInTheDocument();
      expect(profileButton).toBeInTheDocument();
    });
  });

  describe("2. Login Page", () => {
    it("should render login form", () => {
      render(<LoginPage />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("should handle form submission", async () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: /login/i });
      
      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);
      });
    });
  });

  describe("3. Register Page", () => {
    it("should render register form", () => {
      render(<RegisterPage />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Fullname")).toBeInTheDocument();
      expect(screen.getByLabelText("Phone")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("should handle form submission", async () => {
      render(<RegisterPage />);
      
      const emailInput = screen.getByLabelText("Email");
      const fullnameInput = screen.getByLabelText("Fullname");
      const phoneInput = screen.getByLabelText("Phone");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: /register/i });
      
      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(fullnameInput, { target: { value: "Test User" } });
        fireEvent.change(phoneInput, { target: { value: "1234567890" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);
      });
    });
  });

  describe("4. Product Page", () => {
    it("should render product page", async () => {
      (getProducts as jest.Mock).mockResolvedValue([
        {
          id: 1,
          title: "Test Product 1",
          price: 100,
          description: "Description for product 1",
          images: ["https://example.com/image1.jpg"],
        },
      ]);

      render(<ProductPage products={[{
        id: 1, title: "Test Product 1",
        price: 0,
        description: "",
        images: []
      }]} />);

      await waitFor(() => {
        expect(screen.getByText("All Products")).toBeInTheDocument();
      });

      // Pastikan bahwa daftar produk tampil tanpa error
      await waitFor(() => {
        expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      });
    });

    it("should fetch products on server side", async () => {
      (getProducts as jest.Mock).mockResolvedValue([
        {
          id: 1,
          title: "Test Product 1",
          price: 100,
          description: "Description for product 1",
          images: ["https://example.com/image1.jpg"],
        },
      ]);
      const response = await getServerSideProps({
        req: { cookies: {} } as IncomingMessage & { cookies: Partial<{ [key: string]: string; }> },
        res: {} as ServerResponse<IncomingMessage>,
        query: {},
        resolvedUrl: ""
      });

      expect(response).toEqual({
        props: {
          products: [
            {
              id: 1,
              title: "Test Product 1",
              price: 100,
              description: "Description for product 1",
              images: ["https://example.com/image1.jpg"],
            },
          ],
        },
      });
    });
  });

  // describe("5. Authentication Flow", () => {
  //   it("should redirect to login for protected routes", async () => {
  //     localStorage.removeItem("access_token");

  //     render(<ProductPage />);
      
  //     await waitFor(() => {
  //       expect(mockPush).toHaveBeenCalledWith("/auth/login");
  //     });
  //   });
  // });

  describe("6. Profile Page", () => {
    it("should render profile when authenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: {
          user: {
            name: "Test User",
            email: "test@example.com",
          },
        },
        status: "authenticated",
      });

      render(<ProfilePage />);
      expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    });
  });
});
