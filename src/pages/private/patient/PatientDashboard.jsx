import React from "react";
import { DTable } from "../../../components";
import { cardbrain, carddoc, cardfile } from "../../../assets";
import { tableData } from "../../../data/tableData";
import { useSelector } from "react-redux";

const PatientDashboard = ({ className }) => {
  const { user } = useSelector((state) => state.auth); 

  const cards = [
    { title: "Chat with AI", image: cardbrain, color: "text-secondary-6" },
    { title: "Consultant", image: carddoc, color: "text-primary-6" },
    { title: "History", image: cardfile, color: "text-[#3AADD9]" },
  ];

  return (
    <main className={`p-4 md:p-8 w-full ${className}`}>
      {!user.isEmailVerified && (
        <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-r-md shadow-md">
          <h2 className="text-xl font-bold mb-2">
            Email Not Verified
          </h2>
          <p className="mb-4">
            Please verify your Email.
          </p>
          <a
            href="/otp-verification"
            target="_blank"
            className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-300"
          >
            Verify Now
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 border-secondary-6 ${card.color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <img src={card.image} className="w-20 h-20 mb-4" alt="" />
            <h3 className="text-lg font-bold text-center">{card.title}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">
          Recent Activities
        </h2>
        <div className="overflow-x-auto">
          <DTable data={tableData.slice(0, 5)} />
        </div>
      </div>
    </main>
  );
};

export default PatientDashboard;
