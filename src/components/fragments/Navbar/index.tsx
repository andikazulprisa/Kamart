import { useSession, signIn, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data } = useSession();
  return (
    <nav className="bg-black p-4 flex justify-end items-center fixed top-0 left-0 right-0 z-50">
      <button
        onClick={() => (data ? signOut() : signIn())}
        className="px-4 py-2 bg-white hover:bg-blue-200 rounded transition text-black"
      >
        {data ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

export default Navbar;
