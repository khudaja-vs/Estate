import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Header from './component/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-In" element={<SignIn />} />
          <Route path="/sign-Up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      
    </BrowserRouter>
  )
}

