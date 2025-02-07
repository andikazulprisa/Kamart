import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

const Sidebar: React.FC<Proptypes> = ({ lists = [] }) => {
  const { pathname } = useRouter();

  return (
    <div className="fixed top-0 left-0 h-screen w-[200px] bg-black text-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-xl font-bold mb-4">KAMART</h1>
        <div>
          {lists.map((list) => (
            <Link
              href={list.url}
              key={list.title}
              className={`flex items-center gap-2 mb-2 p-2 rounded transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer ${
                pathname === list.url ? "bg-white text-black" : ""
              }`}
            >
              <i className={`bx ${list.icon}`} />
              <h2 className="text-sm">{list.title}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <button
          className="w-full bg-white text-black py-2 rounded transition hover:bg-gray-200"
          type="submit"
          onClick={() => console.log("Logout")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
