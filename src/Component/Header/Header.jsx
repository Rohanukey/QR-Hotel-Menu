import React from 'react';
import Css from "./Header.module.css";
import bars from "../../assets/Bars.png";

function Header({ toggleToggleNav }) {
    return (
        <div className={Css.HeaderWrapper}>
            <div className={Css.logo}>
                <h4>Chess&Grill</h4>
            </div>
            <div className={Css.options}>
                <div className={Css.btn}>
                    <button onClick={toggleToggleNav}>
                        <img className={Css.bars} src={bars} alt="Toggle Nav" />
                    </button>
                </div>
                <img width="24" height="24" src="https://img.icons8.com/forma-thin/24/visible.png" alt="visible" />
                <div className={Css.ics}><h4>RU</h4></div>
                <h4>Rohan ukey</h4>
            </div>
        </div>
    );
}

export default Header;
