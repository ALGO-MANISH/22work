import React from 'react'
import Login from './Login'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Leave from './components/StudentComponents/Leave'
import Complain from './components/StudentComponents/Complain'
import Menu from './components/StudentComponents/Menu'
import Contact from './components/StudentComponents/Contact'
import AddStudents from './components/AdminComponents/AddStudents'
import AddPayment from './components/AdminComponents/AddPayment'
import ApproveLeave from './components/AdminComponents/ApproveLeave'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/leave' element={<Leave />}></Route>
          <Route path='/complain' element={<Complain />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/addStudents' element={<AddStudents />}></Route>
          <Route path='/addPayment' element={<AddPayment />}></Route>
          <Route path='/approveLeave' element={<ApproveLeave />}></Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
