import Signup from "./pages/signup"
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from './pages/Home'
import Login from "./pages/Login"
import Sidebar from "./components/Sidebar/Sidebar"
import Navbar from "./components/Navbar"
import { useState } from 'react'; 




function DashboardLayout({ selectedTopic, onTopicSelect, searchQuery, setSearchQuery }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar setSearchQuery={setSearchQuery}  />
      <div className="flex flex-1">
        <Sidebar onTopicSelect={onTopicSelect} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Home selectedTopic={selectedTopic} searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
}

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Routes with Sidebar */}
        <Route path="/" 
        element={<DashboardLayout
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
         />} 
         />
      </Routes>
    </BrowserRouter>
  )
}

export default App
