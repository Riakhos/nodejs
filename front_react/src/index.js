import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext.jsx"
import axios from 'axios'

// Redux
import store from './redux/store';
import { Provider } from "react-redux"

import './css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
reportWebVitals()

