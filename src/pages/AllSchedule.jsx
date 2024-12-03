import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AllSchedule = () => {
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

  const handleComplete = async (id) => {
    try {
      // Make a server call to mark this schedule as completed
      await axios.patch(`http://localhost:5000/schedule/${id}/complete`);
      // After completing, disable the button and update the schedule in state
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule._id === id ? { ...schedule, completed: true } : schedule
        )
      );
    } catch (error) {
      console.error("Error marking schedule as complete", error);
      alert("Failed to mark schedule as complete.");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the schedule by its id
      const response = await axios.delete(`http://localhost:5000/schedule/${id}`);
      
      // Remove the deleted schedule from the state
      setSchedules(schedules.filter((schedule) => schedule._id !== id));

      alert("Schedule deleted successfully!");
    } catch (error) {
      console.error("Error deleting schedule", error);

      if (error.response) {
        // If the server responded with a status code outside 2xx
        alert(`Error: ${error.response.data.message}`);
      } else {
        // If the error is something else (e.g., network error)
        alert("An unexpected error occurred while deleting the schedule.");
      }
    }
  };

  const handleEdit = (schedule) => {
    // Navigate to the AddSchedule page with the existing data
    navigate("/addSchedule", { state: schedule });
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-end"><span className="loading loading-spinner loading-lg"></span></div>; // Display loading text while schedules are being fetched
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">All Schedules</h2>

      <div className="overflow-x-auto"> {/* This wrapper enables horizontal scrolling */}
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Serial</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Day</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((schedule, index) => (
                <tr key={schedule._id} className="border-b">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{schedule.title}</td>
                  <td className="px-4 py-2 text-center">{schedule.day}</td>
                  <td className="px-4 py-2 text-center">{schedule.date}</td>
                  <td className="px-4 py-2 text-center">{schedule.time}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    {/* Complete Button */}
                    <button
                      onClick={() => handleComplete(schedule._id)}
                      disabled={schedule.completed}
                      className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
                    >
                      {schedule.completed ? "Completed" : "Complete"}
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(schedule._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
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

export default AllSchedule;
