import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

export const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://smart-leave-server.vercel.app/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          studentId: leave.studentId.studentId,
          name: leave.studentId.userId.name,
          leaveType: leave.leaveType,
          department: leave.studentId.department ? leave.studentId.department.dep_name : "N/A", // Check for null/undefined
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
  
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      alert("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    let filtered = leaves;

    if (searchTerm) {
      filtered = filtered.filter(
        (leave) =>
          leave.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          leave.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter((leave) => leave.status === selectedStatus);
    }

    setFilteredLeaves(filtered);
  }, [searchTerm, selectedStatus, leaves]);

  return (
    <>
      {leaves.length > 0 ? (
        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search By Department or Student Name"
              className="px-4 py-1 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="space-x-3">
              <button
                className={`px-2 py-1 ${
                  selectedStatus === "Pending" ? "bg-teal-700" : "bg-teal-600"
                } text-white hover:bg-teal-700`}
                onClick={() => setSelectedStatus("Pending")}
              >
                Pending
              </button>
              <button
                className={`px-2 py-1 ${
                  selectedStatus === "Approved"
                    ? "bg-green-700"
                    : "bg-green-600"
                } text-white hover:bg-green-700`}
                onClick={() => setSelectedStatus("Approved")}
              >
                Approved
              </button>
              <button
                className={`px-2 py-1 ${
                  selectedStatus === "Rejected" ? "bg-red-700" : "bg-red-600"
                } text-white hover:bg-red-700`}
                onClick={() => setSelectedStatus("Rejected")}
              >
                Rejected
              </button>
              <button
                className="px-2 py-1 bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => setSelectedStatus("")}
              >
                Show All
              </button>
            </div>
          </div>
          <div className="mt-3">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};
