
import './App.css'
import { AuthForm } from './components/AuthForm'
import { ToastContainer} from 'react-toastify'
import { Route,Routes } from 'react-router'
import {Dashboard} from './components/Dashboard'
import { Navbar } from './components/Navbar'
import { useEffect } from 'react'
import { me } from './api/auth'

function App() {
  const isLogedIn=true;


useEffect (()=>{
  me().then((data)=>console.log(data));
},[]);


  return (
    <>
    {isLogedIn ? <Navbar/> : null}
    <Routes>
    <Route path='/' element ={<Dashboard/>}/>
    <Route path='/auth' element ={<AuthForm/>}/>
    </Routes>
    <ToastContainer position='top-right' theme='colored'autoClose={5000}/>
    </>
  );  
}

export default App
