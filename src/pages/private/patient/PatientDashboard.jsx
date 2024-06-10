import React from "react";
import { DTable } from "../../../components";
import { cardbrain, carddoc, cardfile } from "../../../assets";
import { tableData } from "../../../data/tableData";

const PatientDashboard = ({ className }) => {
  const isVerified = true; // Dummy variable for verification status

  return (
    <main className={`main p-[40px] w-full ${className}`}>
      {!isVerified && (
        <div className="flex items-center justify-between mb-[30px] p-[20px] bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <div>
            <h2 className="text-[24px] font-bold">
              Email Verification Required
            </h2>
            <p className="text-[18px]">
              Please verify your Email to access all features.
            </p>
          </div>
          <a
            href="/otp-verification"
            target="_blank"
            className="px-[20px] py-[10px] bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-300"
          >
            Verify Now
          </a>
        </div>
      )}
      <div className="flex flex-row items-center justify-between mb-[90px]">
        <div className="card flex flex-col gap-[10px] text-[20px] font-bold text-secondary-6 rounded-md border-2 border-secondary-6 h-[200px] w-[200px] hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-lg">
          <img src={cardbrain} className="w-[80px]" alt="" />
          Chat with AI
        </div>
        <div className="card flex flex-col gap-[10px] text-[20px] font-bold text-primary-6 rounded-md border-2 border-secondary-6 h-[200px] w-[200px] hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-lg">
          <img src={carddoc} className="w-[80px]" alt="" />
          Consultant
        </div>
        <div className="card flex flex-col gap-[10px] text-[20px] font-bold text-[#3AADD9] rounded-md border-2 border-secondary-6 h-[200px] w-[200px] hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-lg">
          <img src={cardfile} className="w-[80px]" alt="" />
          History
        </div>
      </div>
      <DTable data={tableData.slice(0, 5)} />
    </main>
  );
};

export default PatientDashboard;
