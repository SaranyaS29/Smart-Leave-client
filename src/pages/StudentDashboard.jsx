import React from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/StudentDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/dashboard/Navbar";

export const StudentDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100  h-screen">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
};
