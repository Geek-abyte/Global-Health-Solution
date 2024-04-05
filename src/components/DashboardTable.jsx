import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardTable = () => {
  const navigate = useNavigate();

  const data = [
    { id: 1, doctor: 'Dr. Smith', duration: '1 hour', dateTime: '2024-04-01 10:00 AM' },
    { id: 2, doctor: 'Dr. Johnson', duration: '45 minutes', dateTime: '2024-04-02 02:30 PM' },
    { id: 3, doctor: 'Dr. Brown', duration: '30 minutes', dateTime: '2024-04-03 09:00 AM' },
    { id: 4, doctor: 'Dr. Davis', duration: '1 hour', dateTime: '2024-04-04 11:30 AM' },
  ];

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
