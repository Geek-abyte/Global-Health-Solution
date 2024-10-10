import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosConfig';

const DoctorCallDetail = () => {
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDoctorCallDetails = async () => {
      try {
        const response = await axiosInstance.get(`/calls/current/${id}`);
        setCall(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch call details');
        setLoading(false);
      }
    };

    fetchDoctorCallDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg m-4">{error}</div>;
  }

  if (!call) {
    return <div className="text-center p-4 bg-yellow-100 rounded-lg m-4">No call found</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateDuration = () => {
    if (!call.endTime) return 'Ongoing';
    const duration = new Date(call.endTime) - new Date(call.startTime);
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Call Summary</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <h2 className="text-2xl font-semibold mb-2">Call Details</h2>
          <p className="text-lg">Status: <span className="font-bold">{call.status}</span></p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Time Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium text-gray-600">Start Time:</span> {formatDate(call.startTime)}</p>
              <p><span className="font-medium text-gray-600">End Time:</span> {call.endTime ? formatDate(call.endTime) : 'Ongoing'}</p>
              <p><span className="font-medium text-gray-600">Duration:</span> {calculateDuration()}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Call Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium text-gray-600">Channel Name:</span> {call.channelName}</p>
              <p><span className="font-medium text-gray-600">Specialist Category:</span> {call.specialistCategory}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Participants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2 text-blue-600">User</h4>
              <p><span className="font-medium text-gray-600">ID:</span> {call.userId._id}</p>
              <p><span className="font-medium text-gray-600">Email:</span> {call.userId.email}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2 text-indigo-600">Specialist</h4>
              <p><span className="font-medium text-gray-600">ID:</span> {call.specialistId._id}</p>
              <p><span className="font-medium text-gray-600">Email:</span> {call.specialistId.email}</p>
              <p><span className="font-medium text-gray-600">Category:</span> {call.specialistId.specialistCategory}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCallDetail;