import React from 'react';
import './App.css';
import AppRoutes from './components/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom'; // making router to navigate without refresh


function App() {
  return (

    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>

  );
}

export default App;
