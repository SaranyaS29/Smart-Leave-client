import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  const fetchLeave = async () => {
    try {
      const response = await axios.get(
        `https://smart-leave-server.vercel.app/leave/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeave(response.data.leave);
      }
    } catch (error) {
      console.error("Error fetching leave details:", error);
      alert("An unexpected error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [id]);

  const changeStatus = async (leaveId, newStatus) => {
    try {
      const response = await axios.put(
        `https://smart-leave-server.vercel.app/leave/${leaveId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchLeave();
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  if (!leave) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={`https://smart-leave-server.vercel.app/public/uploads/${leave.studentId?.userId?.profileImage}`}
            alt="Student Profile"
            className="rounded-full border w-72"
          />
        </div>
        <div>
          <p className="text-lg font-bold">
            Name:{" "}
            <span className="font-medium">{leave.studentId?.userId?.name}</span>
          </p>
          <p className="text-lg font-bold">
            Student ID:{" "}
            <span className="font-medium">{leave.studentId?.studentId}</span>
          </p>
          <p className="text-lg font-bold">
            Leave Type: <span className="font-medium">{leave.leaveType}</span>
          </p>
          <p className="text-lg font-bold">
            Reason: <span className="font-medium">{leave.reason}</span>
          </p>
          <p className="text-lg font-bold">
            Department:{" "}
            <span className="font-medium">
              {leave.studentId?.department?.dep_name}
            </span>
          </p>
          <p className="text-lg font-bold">
            Start Date:{" "}
            <span className="font-medium">
              {new Date(leave.startDate).toLocaleDateString()}
            </span>
          </p>
          <p className="text-lg font-bold">
            End Date:{" "}
            <span className="font-medium">
              {new Date(leave.endDate).toLocaleDateString()}
            </span>
          </p>
          <p className="text-lg font-bold">
            {leave.status === "Pending" ? "Action:" : "Status:"}
          </p>
          {leave.status === "Pending" ? (
            <div className="flex space-x-2">
              <button
                className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400"
                onClick={() => changeStatus(leave._id, "Approved")}
              >
                Approve
              </button>
              <button
                className="px-2 py-0.5 bg-red-300 hover:bg-red-400"
                onClick={() => changeStatus(leave._id, "Rejected")}
              >
                Reject
              </button>
            </div>
          ) : (
            <p className="font-medium">{leave.status}</p>
          )}
        </div>
      </div>
    </div>
  );
};
