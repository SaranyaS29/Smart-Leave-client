import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



export const View = () => {
    const {id} =useParams()
    const [student,setStudent]=useState(null)
    useEffect(() => {
        const fetchStudent = async () => {
        
          try {
            const response = await axios.get(`https://smart-leave-server.vercel.app/student/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }); 
            console.log(response.data);
    
            if (response.data.success) {
               setStudent(response.data.student)
            }
          } catch (error) {
            if (error.response && error.response.data && !error.response.data.success) {
              alert(`Error: ${error.response.data.error}`);
            } else {
              alert("An unexpected error occurred.");
            }
          }
        };
    
        fetchStudent();
      }, [id]);
      return (
        <>{student ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Student Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
               src= {`https://smart-leave-server.vercel.app/public/uploads/${student.userId.profileImage}`}
                alt="Student Profile"
                className="rounded-full border w-72"
              />
            </div>
            <div>
              <div className='flex space-x-3 mb-5'>
              <p className='text-lg font-bold'>Name:</p>
              <p className='font-medium'>{student.userId.name}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
              <p className='text-lg font-bold'>Student ID:</p>
              <p className='font-medium'>{student.studentId}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
              <p className='text-lg font-bold'>Date of Birth:</p>
              <p className='font-medium'>{new Date(student.dob).toLocaleDateString()}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
              <p className='text-lg font-bold'>Gender:</p>
              <p className='font-medium'>{student.gender}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
              <p className='text-lg font-bold'>Department:</p>
              <p className='font-medium'>{student.department.dep_name}</p>
              </div>

              
              
            </div>
          </div>
        </div>
      ):<div>Loading ....</div>}</>
      );
}
