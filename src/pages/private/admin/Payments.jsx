import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiCalendar, FiDownload, FiFilter } from 'react-icons/fi';
import axiosInstance from '../../../utils/axiosConfig';
import LoadingAnimation from '../../../components/LoadingAnimation';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('all');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    successfulPayments: 0,
    failedPayments: 0,
    averageAmount: 0
  });

  useEffect(() => {
    fetchPayments();
  }, [dateRange]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/payment/admin/transactions?range=${dateRange}`);
      setPayments(response.data.payments);
      setStats(response.data.stats);
    } catch (err) {
      setError('Failed to fetch payment data');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await axiosInstance.get('/payment/admin/export', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payments-${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error exporting payments:', err);
    }
  };

  if (loading) return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <LoadingAnimation />
      <p className="text-xl font-semibold mt-4">Loading payments...</p>
    </div>
  );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <button
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <FiDownload className="mr-2" /> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <FiDollarSign className="text-green-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Successful Payments</p>
              <p className="text-2xl font-bold">{stats.successfulPayments}</p>
            </div>
            <div className="text-green-500 text-3xl">✓</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Failed Payments</p>
              <p className="text-2xl font-bold">{stats.failedPayments}</p>
            </div>
            <div className="text-red-500 text-3xl">✗</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Average Amount</p>
              <p className="text-2xl font-bold">${stats.averageAmount.toFixed(2)}</p>
            </div>
            <FiDollarSign className="text-blue-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center mb-6 gap-4">
        <div className="flex items-center">
          <FiFilter className="mr-2" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.id || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.created ? new Date(payment.created).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {payment.customer?.name || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {payment.customer?.email || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${(payment.amount || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'succeeded'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {payment.status || 'unknown'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;