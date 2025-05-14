import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextProvider';

const ToggleAnswers = ({ questionId }) => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState([]);
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const fetchAnswers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/answers/${questionId}`);
      setAnswers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/answers', {
        questionId,
        answerText: text,
        userId: user._id
      });
      setText('');
      fetchAnswers(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = () => {
    setShow(!show);
    if (!show) fetchAnswers();
  };

  return (
    <div className="mt-2">
      <button onClick={handleToggle} className="text-blue-500 underline">
        {show ? 'Hide' : 'View'} Answers
      </button>

      {show && (
        <div className="mt-2">
          <ul className="mb-2">
            {answers.length === 0 && <p>No answers yet.</p>}
            {answers.map((a) => (
              <li key={a._id} className="border p-2 rounded mb-2">
                {a.answerText}
                <p className="text-sm text-gray-400">— {a.user?.name}</p>
              </li>
            ))}
          </ul>

          {user && (
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full border p-2 mb-2"
                placeholder="Write your answer..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                Submit Answer
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ToggleAnswers;