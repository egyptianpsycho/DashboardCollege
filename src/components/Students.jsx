import React from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import Header from "./Header";
const Students = () => {
  const [students, setStudents] = useState([]);
  const [showTables, setShowTables] = useState(false);

  const handleFetch = async () => {
    setShowTables(!showTables);
    const studentsResponse = await fetch(
      "https://student-doctor-management-api-production.up.railway.app/students"
    );
    const studentsData = await studentsResponse.json();
    setStudents(studentsData.students);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center py-32 justify-center mt-10">
        <h1 className="text-6xl font-bold text-amber-50 ">
          STUDENTS
        </h1>
      </div>
      <div className="dashboard mx-auto">
        <Button
          className="btn  mt-10 text-3xl text-center "
          onClick={handleFetch}
        >
          Show Students
        </Button>
        <div className={`tables-container ${showTables ? "expand" : ""}`}>
          <div className="section std  ">
            {students?.map((student) => (
              <div key={student.id} className="entry">
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
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
