
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Wrapper from './Component/Wrapper/Wrapper'
import AddOns from './Component/AddOns/AddOns'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Wrapper/>}  />
        <Route path='/Addons' element={<AddOns/>}  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
