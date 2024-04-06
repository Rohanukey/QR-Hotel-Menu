import React, { useState } from 'react'
import Css from "./Counter.module.css"

function Counter({ value , project}) {



    return (
        <>
            <div className={Css.counter}>
                <h2>{project}</h2>
                <h4>Rs.<span>{value}</span></h4>
            </div>
        </>
    )
}

export default Counter