import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CreateCounter from './views/CreateCounter'
import Dashboard from './views/Dashboard';
import EditCounter from './views/EditCounter';
import Index from './views/Index';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';
import SingleCounter from './views/SingleCounter'
import NotFound from './views/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Index />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/create-counter' element={<CreateCounter />}/>
        <Route path='/edit-counter/:id' element={<EditCounter />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/event/:id' element={<SingleCounter />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
