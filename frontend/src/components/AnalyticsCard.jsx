import React from 'react';

const AnalyticsCard = ({ label, value }) => (
  <div className="bg-blue-100 p-4 rounded shadow text-center">
    <h2 className="text-xl font-bold">{value}</h2>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default AnalyticsCard;
