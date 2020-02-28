import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";


import Main from './components/Main.js';
function App() {
  return (
    <div className="App">
      <Router>
      <Main/>
      </Router>
    </div>
  );
}

export default App;
