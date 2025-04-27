import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import ScrollReveal from "scrollreveal";

const Dashboard = () => {
  const [showTables, setShowTables] = useState(false);
  const [students, setStudents] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editingName, setEditingName] = useState("");
  const [newName, setNewName] = useState("");
  const [editingType, setEditingType] = useState("");
  const [message, setmessage] = useState("");
  const handleShowTables = () => {
    setShowTables(!showTables);
  };

  useEffect(() => {
    const fetchData = async () => {
      const studentsResponse = await fetch(
        "https://student-doctor-management-api-production.up.railway.app/students"
      );
      const studentsData = await studentsResponse.json();
      setStudents(studentsData.students);

      const doctorsResponse = await fetch(
        "https://student-doctor-management-api-production.up.railway.app/doctors"
      );
      const doctorsData = await doctorsResponse.json();
      setDoctors(doctorsData.doctors);
    };
    fetchData();
    const sr = ScrollReveal();

    sr.reveal(".admin-dashboard-title", {
      origin: "bottom",
      distance: "100px",
      delay: 100,
      duration: 1000,
      easing: "ease-in-out",
      reset: false,
    });
    sr.reveal(".rvlbtn", {
      origin: "left",
      distance: "500px",
      delay: 100,
      duration: 1000,
      easing: "ease-in-out",
      reset: false,
    });
  }, []);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://student-doctor-management-api-production.up.railway.app/${editingType}?oldName=${editingName}&newName=${newName}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

        setmessage(data.message);

        if (editingType === "students") {
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.name === editingName
                ? { ...student, name: newName }
                : student
            )
          );
        } else if (editingType === "doctors") {
          setDoctors((prevDoctors) =>
            prevDoctors.map((doctor) =>
              doctor.name === editingName
                ? { ...doctor, name: newName }
                : doctor
            )
          );
        }
        setEditingName("");
        setNewName("");
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("Error editing:", error);
    }
  };

  const startEditing = (name, type) => {
    setEditingName(name);
    setEditingType(type);
    setNewName("");
  };

  const handleDelete = async (id, type) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://student-doctor-management-api-production.up.railway.app/${type}/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();

          if (response.ok) {
            console.log(data.message);

            if (type === "students") {
              setStudents((prevStudents) =>
                prevStudents.filter((student) => student._id !== id)
              );
            } else if (type === "doctors") {
              setDoctors((prevDoctors) =>
                prevDoctors.filter((doctor) => doctor._id !== id)
              );
            }

            Swal.fire({
              title: "Deleted!",
              text: `${type.slice(0, -1)} has been deleted.`,
              icon: "success",
            });
          } else {
            console.error("Failed to delete");
            Swal.fire({
              title: "Error!",
              text: "There was a problem deleting the data.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error with the request.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="dashboard">
      <section>
        <div className="flex flex-col items-center py-32 justify-center mt-10">
          <h1 className="text-6xl font-bold text-amber-50 admin-dashboard-title ">
            <span className="text-7xl text-red-300">Admin</span>Dashboard
          </h1>
        </div>
      </section>
      <div className="rvlbtn">
        <Button
          className="btn mt-10 text-3xl text-center "
          onClick={handleShowTables}
        >
          Show All Tables
        </Button>
      </div>
      <div className={`tables-container ${showTables ? "expand" : ""}`}>
        <div className="section std">
          <h2 className="text-amber-50 text-left ml-20 text-xl">Students</h2>
          {students?.map((student, index) => (
            <div key={index} className="entry">
              <pre>
                {JSON.stringify(
                  {
                    name: student.name,
                    age: student.age,
                    level: student.level,
                    address: student.address,
                  },
                  null,
                  2
                )}
              </pre>
              <div className="actions flex justify-end mr-3">
                <button onClick={() => startEditing(student.name, "students")}>
                  Edit
                </button>

                <button onClick={() => handleDelete(student._id, "students")}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="section doc">
          <h2 className="text-amber-50 text-left ml-20 text-xl">Doctors</h2>
          {doctors.map((doctor, index) => (
            <div key={index} className="entry">
              <pre>
                {JSON.stringify(
                  {
                    name: doctor.name,
                    age: doctor.age,
                    phone: doctor.phone,
                  },
                  null,
                  2
                )}
              </pre>
              <div className="actions flex justify-end mr-3">
                <button onClick={() => startEditing(doctor.name, "doctors")}>
                  Edit
                </button>
                <button onClick={() => handleDelete(doctor._id, "doctors")}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {editingName && (
          <div className="edit-form bg-teal-950">
            <h3>Edit {editingType === "students" ? "Student" : "Doctor"}</h3>
            <div>
              <label>Old Name:</label>
              <input type="text" value={editingName} disabled />
            </div>
            <div>
              <label>New Name:</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
              />
            </div>
            <div className="p-2 mt-2">
              <p className="text-green-400 w-64">{message}</p>
            </div>
            <div className="actions flex justify-end mr-3">
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setEditingName("")}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
