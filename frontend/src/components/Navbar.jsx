import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextProvider"

const Navbar = ({ setSearchQuery }) => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate('/login');
}

  return (
   <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
    <div className="text-xl font-bold">
        <Link to="/">SportTalk</Link>
    </div>
    <input
    type="text"
    placeholder="Questions Asked"
    onChange={(e) => setSearchQuery(e.target.value)}
    className="bg-gray-600 px-4 py-2 rounded"
     />
     <div>
        {!user ? (
            <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
            Login
            </Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded mr-4">
            Signup
            </Link>
            </>
        )
        :
        <>
        <span className="mr-4">Welcome {user.name}!</span>
         <button
onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded mr-4 cursor-pointer">Logout</button>
        </>
}
     </div>
   </nav>
  );
};

export default Navbar
