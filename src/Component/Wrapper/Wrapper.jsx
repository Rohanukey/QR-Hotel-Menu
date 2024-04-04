/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Css from "./Wrapper.module.css";
import SideNav from '../SideNav/SideNav';
import bars from "../../assets/react.svg"
import Dashboard from "../Dashboard/Dashboard";
import Header from '../Header/Header';
import AddOns from '../AddOns/AddOns';

function Wrapper() {

  const [selectedComponent, setSelectedComponent] = useState('dashboard');
  const handleNavItemClick = (component) => {
    setSelectedComponent(component);
  };

  const [onTap, setOnTap] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {

      const newwidth = window.innerWidth
      setWidth(newwidth);
      if (newwidth < 1300) {
        setOnTap(true)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const toggleToggleNav = () => {
    setOnTap(prevState => !prevState);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'AddOns':
        return <AddOns/>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={Css.pageContent}>
        <div className={`${Css.ToggleNav} ${onTap || (width <= 1299 && onTap) ? Css.Display : ""}`}>
          <SideNav onNavItemClick={handleNavItemClick} />
        </div>
        <div className={Css.AdminPageWrapper}>
          <div className={Css.options}>
            <div className={Css.btn}><button onClick={toggleToggleNav}><img className={Css.bars} src={bars} /></button></div>
          </div>
          <div className={Css.ComponentWrapper}>
            <Header />
            {renderComponent()}
          </div>  
        </div>
      </div>

    </>
  )
}

export default Wrapper;
