import React, { useEffect, useState } from 'react'
import { DTable } from '../../../components';
import axiosInstance from '../../../utils/axiosConfig';
import { useSelector } from 'react-redux';

const DoctorHistory = () => {
  const [calls, setCalls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axiosInstance.get(`/calls/history`, { userId: user.id, });
        setCalls(response.data);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching calls:", err);
        if (err.response.data.message === 'No calls found') {
          setCalls([]);
          setLoading(false);
        } else {
          console.log('Failed to fetch call details', err);
          setError('Failed to fetch call details');
          setLoading(false);
        }
      }
    };

    fetchCalls();
  }, [user]);


  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      Loading...
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }
  return (
    <div className='p-[45px]'>
      <DTable calls={calls} loading={loading} />
    </div>
  )
}

export default DoctorHistory