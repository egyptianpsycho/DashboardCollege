import React from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import Header from "./Header";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showTables, setShowTables] = useState(false);

  const handleFetch = async () => {
    setShowTables(!showTables);
    const doctorsResponse = await fetch(
      "https://student-doctor-management-api-production.up.railway.app/doctors"
    );
    const doctorsData = await doctorsResponse.json();
    setDoctors(doctorsData.doctors);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center py-32 justify-center mt-10">
        <h1 className="text-6xl font-bold text-amber-50 ">DOCTORS</h1>
      </div>
      <div className="dashboard mx-auto">
        <Button
          className="btn mt-10 text-3xl text-center "
          onClick={handleFetch}
        >
          Show Doctors
        </Button>
        <div className={`tables-container ${showTables ? "expand" : ""}`}>
          <div className="section std">
            {doctors?.map((doctor) => (
              <div key={doctor.id} className="entry">
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
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
