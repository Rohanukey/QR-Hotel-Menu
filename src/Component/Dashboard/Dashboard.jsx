import React, { useEffect, useState } from 'react'
import Css from "./Dashboard.module.css"
import Counter from '../Counter/Counter';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import Bar1 from '../../../Bar1';
import Donut1 from '../../Component/Donut1';


function Dashboard() {

  const arr =
    [{ id: 1, clientsObtained: 50 },
    { id: 2, clientsObtained: 50 },
    { id: 3, clientsObtained: 50 },
    { id: 4, clientsObtained: 50 },
    ]

  const url = "http://localhost:3000/BalanceSheets";
  const [apidata, setApidata] = useState([])


  useEffect(() => {
    localStorage.getItem("EmployeeData")

    axios.get(url)
      .then((response) => setApidata(response.data))
      .catch((error) => error.message)

    console.log(apidata)
  }, [])

  const sum = arr.reduce((acc, curr) => acc + curr.clientsObtained, 0);
  console.log(" this is " + sum)

  const income = apidata.reduce((acc, curr) => acc + curr.Income, 0)

  const expenses = apidata.reduce((acc, curr) => acc + curr.Expenses, 0)

  return (
    <>
      <div className={Css.DashboardWrapper}>
        <div className={Css.ContentWrapper}>
          <div className={Css.info}>
            <div className={Css.user}>
              <h3> Hi Rohan ukey,</h3>
            </div>
            <div className={Css.url}>
              <div>
                <h4>Your Customer App url </h4>
                <h3> Hi Rohan ukeynanociaociacicwipjcpajc,</h3>
              </div>
              <button className={Css.copy}>Copy</button>
            </div>
          </div>
          <div className={Css.CounterWrapper}>
            <Counter value={sum} project=" Daily Orders " />
            <Counter value={income} project=" Daily Revenue " />
            <Counter value={expenses} project=" Daily Customers " />
          </div>
          <div className={Css.Analystic}>
            <div className={Css.title} >
              <h3>Order Analystic</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard