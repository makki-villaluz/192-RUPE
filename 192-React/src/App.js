import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import Main from './components/Main.js';
function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={false} />
      <Main/>
    </div>
  );
}

export default App;
