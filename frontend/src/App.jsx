import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./pages/top.jsx";
import Posts from './pages/posts.jsx';
import Popular from "./pages/Popular.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
    <Routes>
    <Route path="/" element={<Top />} />
      <Route path="/trending" element={<Posts />} />
      <Route path="/popular" element={<Popular />} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
