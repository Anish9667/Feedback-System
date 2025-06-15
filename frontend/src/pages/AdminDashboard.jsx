import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import AnalyticsCard from '../components/AnalyticsCard';
import RatingChart from '../components/RatingChart';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('/feedback');
      setFeedbacks(res.data.data || []);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      if (err.response?.status === 401) {
        logout();
        navigate('/admin/login');
      }
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("/feedback/stats");
      console.log(" Stats data:", res.data); 
      console.log(" Rating Counts:", res.data?.ratingCounts); 
      setStats(res.data);
    } catch (err) {
      console.error(" Error in stats API:", err);
    }
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/feedback/${id}`);
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  
  const handleExport = async () => {
    try {
      const res = await axios.get('/feedback/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'feedbacks.csv');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  useEffect(() => {
    
    fetchFeedbacks();
    fetchStats();
  }, []);

  return (
    <div className="p-6">
    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
        <button
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

     
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <AnalyticsCard label="Total Feedbacks" value={stats.total} />
          <AnalyticsCard label="Average Rating" value={stats.average} />

          <div className="bg-white rounded shadow p-4 col-span-1 md:col-span-1">
            <h3 className="text-md font-bold mb-2">Ratings Breakdown</h3>

           
            {stats.ratingCounts ? (
              <RatingChart ratingsCount={stats.ratingCounts} />
            ) : (
              <p className="text-gray-500 text-sm">No chart data available.</p>
            )}
          </div>
        </div>
      )}

      
      <button
        onClick={handleExport}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export CSV
      </button>

    
      <div className="overflow-x-auto shadow rounded border">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Comment</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks?.length > 0 ? (
              feedbacks.map((fb) => (
                <tr key={fb._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{fb.email}</td>
                  <td className="p-3">{fb.comment}</td>
                  <td className="p-3">{fb.rating}</td>
                  <td className="p-3">
                    {new Date(fb.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(fb._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-4">
                  No feedback found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
