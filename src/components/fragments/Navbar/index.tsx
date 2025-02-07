import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <button
        onClick={() => (data ? signOut() : signIn())}
        className="px-4 py-2 bg-black hover:bg-gray-800 rounded transition text-white"
      >
        {data ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

export default Navbar;
