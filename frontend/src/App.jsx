import Signup from "./pages/signup"
import {BrowserRouter, Routes, Route} from 'react' 
import Home from './pages/Home'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Home /> }></Route>
      <Route path ="/register" element={<Signup /> }></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
