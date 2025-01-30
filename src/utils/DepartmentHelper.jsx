import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ DepId, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete ?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `https://smart-leave-server-kmhd.vercel.app/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          onDepartmentDelete(id);
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
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(DepId)}
      >
        Delete
      </button>
    </div>
  );
};
