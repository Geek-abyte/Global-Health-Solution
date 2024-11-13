import React, { useState, useEffect } from 'react';
import { FiPhone, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import axiosInstance from '../../../utils/axiosConfig';
import { motion } from 'framer-motion';
import LoadingAnimation from '../../../components/LoadingAnimation';

const Calls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    specialistCategory: '',
    startDate: '',
    endDate: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCalls();
  }, [filters]);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...filters,
        search: searchTerm,
      }).toString();

      const response = await axiosInstance.get(`/calls/history?${queryParams}`);
      setCalls(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching calls:', err);
      setError('Failed to fetch calls');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateDuration = (startTime, endTime) => {
    if (!endTime) return 'Ongoing';
    const duration = new Date(endTime) - new Date(startTime);
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleExportCSV = () => {
    // Implementation for exporting call data to CSV
    const csvContent = calls.map(call => ({
      id: call._id,
      user: call.userId.name,
      specialist: call.specialistId.name,
      category: call.specialistCategory,
      status: call.status,
      startTime: formatDate(call.startTime),
      duration: calculateDuration(call.startTime, call.endTime)
    }));

    // Create and download CSV file
    const csvString = [
      ['ID', 'User', 'Specialist', 'Category', 'Status', 'Start Time', 'Duration'],
      ...csvContent.map(row => Object.values(row))
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calls-report-${new Date().toISOString()}.csv`;
    a.click();
  };

  if (loading) return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <LoadingAnimation />
      <p className="text-xl font-semibold mt-4">Loading calls...</p>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Call Management</h1>
        <button
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <FiDownload className="mr-2" />
          Export to CSV
        </button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search calls..."
            className="w-full p-2 pl-10 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <select
          className="p-2 border rounded-lg"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          className="p-2 border rounded-lg"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />

        <input
          type="date"
          className="p-2 border rounded-lg"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>

      {/* Calls Table */}
      {error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {calls.map((call) => (
                <motion.tr
                  key={call._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{call.userId.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{call.specialistId.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{call.specialistCategory}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(call.startTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {calculateDuration(call.startTime, call.endTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${call.status === 'completed' ? 'bg-green-100 text-green-800' :
                        call.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      {call.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calls;