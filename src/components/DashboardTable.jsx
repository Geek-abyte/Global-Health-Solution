import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardTable = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate.push(`/details/${id}`);
  };

  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row) => (
          <tr key={row.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleRowClick(row.id)}>
            <td className="px-6 py-4 whitespace-nowrap">{row.doctor}</td>
            <td className="px-6 py-4 whitespace-nowrap">{row.duration}</td>
            <td className="px-6 py-4 whitespace-nowrap">{row.dateTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DashboardTable;
