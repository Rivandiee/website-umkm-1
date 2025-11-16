"use client";

import SideBar from "../../components/admin/SideBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 ml-64 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
