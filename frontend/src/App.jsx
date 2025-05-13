import Signup from "./pages/signup"
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from './pages/Home'
import Login from "./pages/Login"
import Sidebar from "./components/Sidebar"
import Questions from "./components/Questions"
import Answer from "./components/Answer"




function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        {children}
      </div>
    </div>
  );
}


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Routes with Sidebar */}
        <Route path="/" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/questions" element={<DashboardLayout><Questions /></DashboardLayout>} />
        <Route path="/answers" element={<DashboardLayout><Answer /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
