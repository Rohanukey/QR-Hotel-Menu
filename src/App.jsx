import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Wrapper from './Component/Wrapper/Wrapper'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Wrapper/>}  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
