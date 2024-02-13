import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthContexProvider } from './components/AuthContext'
import { HashRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <React.StrictMode>
      <AuthContexProvider>
        <App />
      </AuthContexProvider>
    </React.StrictMode>
  </Router>
)
