/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Css from "./Wrapper.module.css";
import SideNav from '../SideNav/SideNav';
import bars from "../../assets/Bars.png"
import Dashboard from "../Dashboard/Dashboard";
import Header from '../Header/Header';
import AddOns from '../AddOns/AddOns';
import MergeHeader from '../MergeHeader/MergeHeader';

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
        return <AddOns />;
      case 'MenuPage':
        return <MergeHeader />;
      case 'Header':
        return <Header toggleToggleNav={toggleToggleNav} />;
      default:
        return null;
    }
  };

  const Header = () => {
    return (
      <div className={Css.HeaderWrapper}>
        <div className={Css.logo}>
          <h4>Chess&Grill</h4>
        </div>
        <div className={Css.options}>
          <div className={Css.display}>
            <img onClick={toggleToggleNav} width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/menu--v1.png" alt="menu--v1" />
          </div>
          <img width="24" height="24" src="https://img.icons8.com/forma-thin/24/visible.png" alt="visible" />
          <div className={Css.ics}><h4>RU</h4></div>
          <h4>Rohan ukey</h4>
        </div>
      </div>
    )
  }

  const options = () => {
    return (
      <div className={Css.options}>
        <div className={Css.btn}><button onClick={toggleToggleNav}><img className={Css.bars} src={bars} /></button></div>
      </div>
    )
  }

  return (
    <>
      <div className={Css.pageContent}>
        <div className={`${Css.ToggleNav} ${onTap || (width <= 1299 && onTap) ? Css.Display : ""}`}>
          <SideNav onNavItemClick={handleNavItemClick} />
        </div>
        <div className={Css.AdminPageWrapper}>
          <Header />
          <div className={Css.ComponentWrapper}>
            {renderComponent()}
          </div>
        </div>
      </div>

    </>
  )
}

export default Wrapper;
