import Signup from "./pages/signup"
import {BrowserRouter, Routes, Route} from 'react' 

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Home /> }></Route>
    </Routes>
      <Signup />
    </BrowserRouter>
  )
}

export default App
