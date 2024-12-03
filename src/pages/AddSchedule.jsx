import React, { useState, useEffect } from "react";
import axios from "axios"; // To send data to the server
import { useNavigate, useLocation } from "react-router"; // For navigation and accessing the passed state
import Swal from "sweetalert2";

const ScheduleForm = () => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [scheduleToEdit, setScheduleToEdit] = useState(null);

  const navigate = useNavigate(); // For redirection after submission
  const location = useLocation(); // To get the state passed from the AllSchedule page

  // Set initial form values if we're editing a schedule
  useEffect(() => {
    if (location.state) {
      setScheduleToEdit(location.state);
      setTitle(location.state.title);
      setDay(location.state.day);
      setDate(location.state.date);
      setTime(location.state.time);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = { title, day, date, time };

    try {
      let result = "";
      if (scheduleToEdit) {
        // If editing, send an update request (PUT)
        result = await axios.put(
          `http://localhost:5000/schedule/${scheduleToEdit._id}`,
          scheduleData
        );
      } else {
        // If creating a new schedule (POST)
        result = await axios.post("http://localhost:5000/schedule", scheduleData);
      }

      if (result.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: scheduleToEdit ? "Schedule Updated Successfully" : "Schedule Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/allSchedule"); // Redirect to the schedules page
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });

      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {scheduleToEdit ? "Edit Schedule" : "Add Schedule"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Day dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            required
          >
            <option value="">Select a day</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>

        {/* Date field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Time field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 focus:outline-none"
          >
            {scheduleToEdit ? "Update Schedule" : "Add Schedule"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
