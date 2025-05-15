import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextProvider';
import ToggleAnswers from '../components/ToggleAnswers';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);


const Home = ({ selectedTopic, searchQuery }) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
        headers:{
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {selectedTopic ? selectedTopic.label : 'Select a sub-category'}
      </h2>

      {selectedTopic && user && (
        <div>
          <button
  className={`${
    showForm ? 'bg-red-600' : 'bg-green-600'
  } text-white px-4 py-2 rounded mb-4 cursor-pointer`}
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
    <div key={q._id} className="mb-4 p-4 border rounded bg-white shadow">
      <h3 className="text-lg font-semibold">{q.title}</h3>
      <p className="text-xs font-semibold text-indigo-700 bg-indigo-100 inline-block px-2 py-1 rounded mb-1">
        {q.answerCount ?? 0} {q.answerCount ===1 ? 'answer' : 'answers'}
      </p>
      <p>{q.description}</p>
      <p className="text-sm text-gray-500">Asked by {q.user?.name} • {dayjs(q.createdAt).fromNow()}</p>
      <ToggleAnswers questionId={q._id} />
  </div>
))}
      </div>
    </div>
  );
};

export default Home;