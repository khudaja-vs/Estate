import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Signin from './Pages/Signin';
import Signout from './Pages/Signup';
import Profile from './Pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      
    </BrowserRouter>
  )
}

