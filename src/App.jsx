
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Wrapper from './Component/Wrapper/Wrapper'
import AddOns from './Component/AddOns/AddOns'
import Dashboard from "./comonent/Dashboard";
import Header from "./comonent/Header";
import Cart from "./comonent/Cart";
import MergeHeader from './Component/MergeHeader/MergeHeader';
import Test from './DeffComponenet/ProductForm/ProductForm';
import Category from "./Component/Category/Category"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Wrapper />} />
          <Route path='/Addons' element={<AddOns />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/H" element={<Header/>} />
          <Route path="/MenuPage" element={<MergeHeader/>} />
          <Route path="/Test" element={<Test/>} />
          <Route path="/Caterory" element={<Category/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
