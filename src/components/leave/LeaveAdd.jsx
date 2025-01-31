import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LeaveAdd = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://smart-leave-server.vercel.app/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        navigate("/student-dashboard/leaves");
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
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Leave Type
            </label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              className="w-full border border-gray-300"
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};
