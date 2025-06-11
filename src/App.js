// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './App.css'; // Assuming you have some global styles

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
