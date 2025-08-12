import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/Login';
import User from './pages/User';
import CandidatesList from './pages/CandidateList'
import UserList from './pages/UserList';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />      
      <Route path="/login" element={<LogIn />} />
      <Route path="/user" element={<User />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/candidates" element={<CandidatesList />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
