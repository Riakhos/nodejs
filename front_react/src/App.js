import { Routes, Route } from "react-router-dom"
import React from "react"

import Layout from "./components/Layout"
import Nothing from "./components/Nothing"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Detail from './pages/articles/Detail'
import Add from './pages/articles/Add'
import Update from './pages/articles/Update'

import Sign from './pages/Sign'
import Register from './pages/Register'

import './css/App.css'

function App() {
  return (
    <Routes>
      {/* Début Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/search" element={<Search />} />
      </Route>
      {/* Fin Layout */}
      <Route path="*" element={<Nothing />} />
    </Routes>
  )
}

export default App;
