import Signup from "./pages/signup"
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from './pages/Home'
import Login from "./pages/Login"
import Sidebar from "./components/Sidebar"
import Questions from "./components/Questions"
import Answer from "./components/Answer"
import Navbar from "./components/Navbar"




function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
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
