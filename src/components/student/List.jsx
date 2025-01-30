import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { columns, StudentButtons } from "../../utils/StudentHelper";
import DataTable from "react-data-table-component";

export const List = () => {
  const [students, setStudents] = useState([]);
  const [stuLoading, setStuLoading] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      setStuLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/student", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          console.log(response.data);
          const data = response.data.students.map((stu) => ({
            _id: stu._id,
            sno: sno++,
            dep_name: stu.department.dep_name,
            name: stu.userId.name,
            dob: new Date(stu.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={30}
                height={40}
                className="rounded-full"
                src={`http://localhost:5000/public/uploads/${stu.userId.profileImage}`}
              />
            ),
            action: <StudentButtons Id={stu._id} />, // Pass the ID for better reusability
          }));
          setStudents(data);
          setFilteredStudents(data);
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
        setStuLoading(false);
      }
    };

    fetchStudents();
  }, []);
  const handleFilter = (e) => {
    const records = students.filter((stu) =>
      stu.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredStudents(records);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Students</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="px-4 py-1 border rounded"
          onChange={handleFilter}
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          to="/admin-dashboard/add-student"
          className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
        >
          Add New Student
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredStudents} pagination />
      </div>
    </div>
  );
};
