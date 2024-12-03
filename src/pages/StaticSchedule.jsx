// import React from 'react'

// const StaticSchedule = () => {
//   return (
//     <div>StaticSchedule</div>
//   )
// }

// export default StaticSchedule


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const StaticSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all schedules from the server
    const fetchSchedules = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const response = await axios.get("http://localhost:5000/schedules");
        setSchedules(response.data); // Assuming the server returns an array of schedules
      } catch (error) {
        console.error("Error fetching schedules", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchSchedules();
  }, []);

  

  if (loading) {
    return <div className="min-h-screen flex justify-center items-end"><span className="loading loading-spinner loading-lg"></span></div>; // Display loading text while schedules are being fetched
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">All Schedules</h2>

      <div className="overflow-x-auto rounded-lg shadow-md"> {/* Wrapper with rounded corners and shadow */}
  <table className="min-w-full table-auto bg-white">
    <thead>
      <tr className="bg-gray-100 border-b">
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Serial</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Title</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Day</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Time</th>
      </tr>
    </thead>
    <tbody>
      {schedules.length > 0 ? (
        schedules.map((schedule, index) => (
          <tr key={schedule._id} className="border-b  transition-all duration-200 hover:bg-slate-100">
            <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{schedule.title}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{schedule.day}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{schedule.date}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{schedule.time}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
            No schedules available.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};


export default StaticSchedule