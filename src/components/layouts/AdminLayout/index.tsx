import Sidebar from "@/components/fragments/Sidebar";
import React from "react";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItems = [
  {
    title: "Dashboard",
    url: "/home",
    icon: "bx-grid-alt",
  },
  {
    title: "Profile",
    url: "/home/profile",
    icon: "bx-user",
  },
  {
    title: "Products",
    url: "/home/products",
    icon: "bx-package",
  },
];

const AdminLayout: React.FC<Proptypes> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItems} />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
