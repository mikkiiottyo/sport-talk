import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextProvider';
import ToggleAnswers from '../components/ToggleAnswers';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);


const Home = ({ selectedTopic, searchQuery }) => {
const { user } = useAuth();
const [questions, setQuestions] = useState([]);
const [showForm, setShowForm] = useState(false);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [editQuestionId, setEditQuestionId] = useState(null);
const [editTitle, setEditTitle] = useState('');
const [editDescription, setEditDescription] = useState('');

const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedTopic) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/questions?subcategory=${selectedTopic.id}`);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, [selectedTopic]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/questions', {
        title,
        description,
        category: selectedTopic.title,
        subcategory: selectedTopic.id,
        userId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTitle('');
      setDescription('');
      setShowForm(false);
      const res = await axios.get(`http://localhost:5000/api/questions?subcategory=${selectedTopic.id}`);
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVote = async (id, voteType) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/questions/${id}/vote`,
        { voteType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, votes: res.data.votes } : q))
      );
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {selectedTopic ? selectedTopic.label : 'Select a sub-category'}
      </h2>

      {selectedTopic && user && (
        <div>
          <button
            className={`${showForm ? 'bg-red-600' : 'bg-green-600'} text-white px-4 py-2 rounded mb-4 cursor-pointer`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Ask a Question'}
          </button>

          {showForm && (
            <form onSubmit={handleQuestionSubmit} className="mb-6">
              <input
                type="text"
                className="w-full border p-2 mb-2"
                placeholder="Question Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="w-full border p-2 mb-2"
                placeholder="Question Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" type="submit">
                Submit Question
              </button>
            </form>
          )}
        </div>
      )}

      <div>
        {filteredQuestions.map((q) => (
          <div
            key={q._id}
            className={`mb-4 p-4 border rounded shadow bg-white ${
              user && q.user?._id === user._id ? 'border-green-900 bg-green-500' : ''
            }`}
          >
            {user && q.user?._id === user._id && (
              <span className="text-xs font-semibold text-blue-700 bg-blue-200 px-2 py-1 rounded mb-2 inline-block">
                Your Question
              </span>
            )}

            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={() => handleVote(q._id, 'up')}
                className="text-green-600 hover:text-green-800 text-xl"
                title="Upvote"
              >
                <FaArrowUp />
              </button>
              <span className="font-semibold">{q.votes ?? 0}</span>
              <button
                onClick={() => handleVote(q._id, 'down')}
                className="text-red-600 hover:text-red-800 text-xl"
                title="Downvote"
              >
                <FaArrowDown />
              </button>
            </div>

            {editQuestionId === q._id ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await axios.patch(`http://localhost:5000/api/questions/${q._id}`, {
                      title: editTitle,
                      description: editDescription,
                    }, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                      }
                    });
                    setEditQuestionId(null);
                    const res = await axios.get(`http://localhost:5000/api/questions?subcategory=${selectedTopic.id}`);
                    setQuestions(res.data);
                  } catch (err) {
                    console.error('Edit failed:', err);
                  }
                }}
              >
                <input
                  type="text"
                  className="w-full border p-2 mb-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                  required
                />
                <textarea
                  className="w-full border p-2 mb-2"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                />
                <div className="flex justify-end space-x-2">
                  <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
                  <button
                    type="button"
                    onClick={() => setEditQuestionId(null)}
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{q.title}</h3>
                <p className="text-xs font-semibold text-indigo-700 bg-indigo-100 inline-block px-2 py-1 rounded mb-1">
                  {q.answerCount ?? 0} {q.answerCount === 1 ? 'answer' : 'answers'}
                </p>
                <p>{q.description}</p>
                <p className="text-sm text-gray-500">
                  Asked by {q.user?.name} • {dayjs(q.createdAt).fromNow()}
                </p>
                {user && q.user?._id === user._id && (
                  <div className="flex space-x-2 text-sm mt-1">
                    <button
                      onClick={() => {
                        setEditQuestionId(q._id);
                        setEditTitle(q.title);
                        setEditDescription(q.description);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await axios.delete(`http://localhost:5000/api/questions/${q._id}`, {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                          });
                          const res = await axios.get(`http://localhost:5000/api/questions?subcategory=${selectedTopic.id}`);
                          setQuestions(res.data);
                        } catch (err) {
                          console.error('Delete failed:', err);
                        }
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}

            <ToggleAnswers questionId={q._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
