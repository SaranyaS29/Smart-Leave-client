import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "140px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "130px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "130px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];
export const fetchDepartments = async () => {
  let departments;

  try {
    const response = await axios.get("https://smart-leave-server.vercel.app/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && error.response.data && !error.response.data.success) {
      alert(`Error: ${error.response.data.error}`);
    } else {
      alert("An unexpected error occurred.");
    }
  }
  return departments;
};

export const StudentButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/students/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/students/edit/${Id}`)}
      >
        Edit
      </button>
      {/* <button className="px-3 py-1 bg-red-600 text-white"
            onClick={()=>handleDelete(DepId)}>Leave</button> */}
    </div>
  );
};
