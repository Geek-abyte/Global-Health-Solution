import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardTable = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="overflow-x-auto shadow-sm sm:rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">Doctor</th>
            <th scope="col" className="px-6 py-3 font-semibold">Duration</th>
            <th scope="col" className="px-6 py-3 font-semibold">Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr 
              key={row.id} 
              className="bg-white border-b hover:bg-blue-50 cursor-pointer transition duration-300"
              onClick={() => handleRowClick(row.id)}
            >
              <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{row.doctor}</td>
              <td className="px-6 py-4">{row.duration}</td>
              <td className="px-6 py-4">{row.dateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;