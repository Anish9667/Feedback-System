import React, { useState } from 'react';
import axios from '../services/axios';

const Home = () => {
  const [form, setForm] = useState({ email: '', comment: '', rating: 5 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/feedback', form);
      alert('Feedback submitted successfully!');
      setForm({ email: '', comment: '', rating: 5 });
    } catch (err) {
      alert('Something went wrong!',err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="comment"
          placeholder="Your Comment"
          value={form.comment}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <select name="rating" value={form.rating} onChange={handleChange} className="border p-2 rounded">
          {[1,2,3,4,5].map((r) => (
            <option key={r} value={r}>{r} Star</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default Home;
