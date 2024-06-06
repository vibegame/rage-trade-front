"use client";
import { Content } from "modules/dashboard/components/content";
import { Header } from "modules/dashboard/components/header";
import { Sidebar } from "modules/dashboard/components/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header className="shrink-0" />
      <div className="flex h-full shrink">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
