import { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post(
            'http://localhost:5000/api/auth/login',
             {email, password}
            );
            if(response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate('/')
            }
            console.log(response)
    } catch(error) {
        console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border"
              placeholder="*******"
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-teal-600 text-white py-2 cursor-pointer">
              Login
            </button>
            <p className="text-center">
                Don't have an account? <Link to="/register">Sign Up!</Link>
            </p>
             <p className="text-center mt-2"> <Link to="/">Home</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;