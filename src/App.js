import {BrowserRouter, Router, Routes, Route}  from 'react-router-dom';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';

function App() {
  return(
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-center"/>
      <Routes path= '/'  element={Home}/>
    </div>
    </BrowserRouter>
  )
}
export default App;
