import { FaProductHunt, FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-black text-5xl">KAMART | SHOP</h1>
        <p className="text-black text-xl">
          /home, /products, /auth/login, /auth/register{" "}
        </p>
        <div className="flex gap-4">
          <button className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
            <FaProductHunt />
            Product
          </button>
          <button className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
            <FaUser />
            Profile
          </button>
        </div>
      </main>
    </div>
  );
}
