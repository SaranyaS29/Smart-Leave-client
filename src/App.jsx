import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import "./App.css";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";
import { StudentDashboard } from "./pages/StudentDashboard.jsx";
import { PrivateRoutes } from "./utils/PrivateRoutes.jsx";
import { RoleBasedRoutes } from "./utils/RoleBasedRoutes.jsx";
import { AddDepartment } from "./components/department/AddDepartment.jsx";
import { DepartmentList } from "./components/department/DepartmentList.jsx";
import { EditDepartment } from "./components/department/EditDepartment.jsx";
import { List } from "./components/student/List.jsx";
import { Add } from "./components/student/Add.jsx";
import { View } from "./components/student/View.jsx";
import { Edit } from "./components/student/Edit.jsx";
import { Summary } from "./components/StudentDashboard/Summary.jsx";
import { LeaveList } from "./components/leave/LeaveList.jsx";
import { LeaveAdd } from "./components/leave/LeaveAdd.jsx";
import { Setting } from "./components/StudentDashboard/Setting.jsx";
import { Table } from "./components/leave/Table.jsx";
import { Detail } from "./components/leave/Detail.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const WelcomeAdmin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://smart-leave-server.vercel.app/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold text-teal-600">
        Welcome, {user ? user.name : "Admin"}! 👋
      </h2>
      <p className="text-lg text-gray-600">
        You are logged in as {user ? user.role : "Admin"}.
      </p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          {/* Welcome Page for Admin */}
          <Route index element={<WelcomeAdmin />} />
          <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
          <Route path="/admin-dashboard/students" element={<List />} />
          <Route path="/admin-dashboard/add-student" element={<Add />} />
          <Route path="/admin-dashboard/students/:id" element={<View />} />
          <Route path="/admin-dashboard/students/edit/:id" element={<Edit />} />
          <Route path="/admin-dashboard/leaves" element={<Table />} />
          <Route path="/admin-dashboard/leaves/:id" element={<Detail />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route
          path="/student-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin", "student"]}>
                <StudentDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />} />
          <Route path="/student-dashboard/profile/:id" element={<View />} />
          <Route path="/student-dashboard/leaves" element={<LeaveList />} />
          <Route path="/student-dashboard/add-leave" element={<LeaveAdd />} />
          <Route path="/student-dashboard/setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
