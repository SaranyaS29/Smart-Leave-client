import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/StudentHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
  const [student, setStudent] = useState({
    name: "",
    degree: "",
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const getdepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getdepartments();
  }, []);
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);

        if (response.data.success) {
          const student = response.data.student;
          setStudent((prev) => ({
            ...prev,
            name: student.userId.name,
            degree: student.degree,
            department: student.department,
          }));
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

    fetchStudent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/student/${id}`,
        student,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/students");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments && student ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Student</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  placeholder="Insert name"
                  className="mt-1 p-2 block w-full border boder-gray-300 rounded-md "
                  required
                />
              </div>

              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Degree
                </label>
                <select
                  name="degree"
                  onChange={handleChange}
                  value={student.degree}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="BE">Bachelor of Engineering</option>
                  <option value="BT">Bachelor of Technology</option>
                  <option value="MT">Master of Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleChange}
                  value={student.department}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Edit Student
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading ... </div>
      )}
    </>
  );
};
