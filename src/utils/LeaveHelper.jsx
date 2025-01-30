import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Stu ID",
    selector: (row) => row.studentId,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "150px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "150px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "180px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "90px",
  },
  {
    name: "Status",
    selector: (row) => (
      <span
        className={`px-3 py-2 rounded-sm font-semibold text-sm ${
          row.status === "Approved"
            ? "bg-green-300 text-green-800"
            : row.status === "Rejected"
            ? "bg-red-300 text-red-800"
            : "bg-gray-300 text-gray-800"
        }`}
      >
        {row.status}
      </span>
    ),
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
    width: "120px",
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };
  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};
