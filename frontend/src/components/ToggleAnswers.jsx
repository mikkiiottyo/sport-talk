import  { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextProvider';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);

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
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setText('');
      fetchAnswers(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = () => {
    setShow(!show);
    if (!show) fetchAnswers();
  };

  const handleAnswerVote = async (id, voteType) => {
  try {
    const res = await axios.patch(
      `http://localhost:5000/api/answers/${id}/vote`,
      { voteType },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    setAnswers((prev) =>
      prev.map((a) => (a._id === id ? { ...a, votes: res.data.votes } : a))
    );
  } catch (err) {
    console.error('Answer vote failed:', err);
  }
};

  return (
    <div className="mt-2">
      <button onClick={handleToggle} className="text-blue-500 underline cursor-pointer">
        {show ? 'Hide' : 'View'} Answers
      </button>

      {show && (
        <div className="mt-2">
          <ul className="mb-2">
            {answers.length === 0 && <p>No answers yet.</p>}
            {answers.map((a) => (
              <li key={a._id} className="border p-2 rounded mb-2">
                {a.answerText}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-400">
                    - {a.user?.name} • {dayjs(a.createdAt).fromNow()}
                  </p>
                  <div>
                    <button
                    onClick={() => handleAnswerVote(a._id, 'up')}
                    className="text-green-600 hover:text-green-800 text-sm cursor-pointer"
                    title="Upvote"
                    >
                      <FaArrowUp />
                    </button>
                    <span className="font-semibold text-sm">{a.votes ?? 0}</span>
                    <button
                    onClick={() => handleAnswerVote(a.id, 'down')}
                    className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
                    title="Downvote"
                    >
                      <FaArrowDown />
                    </button>
                  </div>
                </div>
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
              <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer" type="submit">
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