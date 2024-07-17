import { useState } from 'react';
import './App.css';
import Header from './components/header/Header.jsx';
import Home from './pages/home/Home';
import Share from './components/share/Share.jsx';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/profile/Profile.jsx';
import Messenger from './pages/messenger/Messenger.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';

function App() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    
    <div className='App'>

      <Header handleOpen={handleOpen} />
      <Share open={open} handleClose={handleClose} />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/messenger' element={<Messenger />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>

    </div>

  )

}

export default App;