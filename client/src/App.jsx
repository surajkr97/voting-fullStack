import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/Login';
import Profile from './pages/Profile';
import CandidatesList from './pages/CandidateList'
import UserList from './pages/UserList';
import Layout from './components/Layout';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignUp />} />      
      <Route path="/login" element={<LogIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/candidates" element={<CandidatesList />} /></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
