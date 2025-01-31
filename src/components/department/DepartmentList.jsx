import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";

export const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [depLoading, setDepLoading] = useState(false);

  const onDepartmentDelete = async (id) => {
    try {
      const response = await fetch(`https://smart-leave-server.vercel.app//department/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = departments.filter((dep) => dep._id !== id);
        setDepartments(data);
      }
    } catch (error) {
      console.error("Error occurred while deleting the record:", error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          console.log(response.data);
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                DepId={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ), // Pass the ID for better reusability
          }));
          setDepartments(data);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          !error.response.data.success
        ) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert("An unexpected error occurred.");
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Filter logic for search
  const filteredDepartments = departments
    ? departments.filter((dep) =>
        dep.dep_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      {depLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search By Department Name"
              className="px-4 py-1 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
};
