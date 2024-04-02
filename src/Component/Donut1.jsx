import React from 'react'
import { Bar, Line , Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

function Donut1() {
    return (
        <>

            <div style={{ width: 400, height: 300}} >
                <Doughnut
                    data={{
                        labels: ["A", "B", "C" , "D" , "E" , "F" ],
                        datasets: [
                            {
                                label: "Revenue",
                                data: [200, 100, 400 ,600,300,400]
                            }
                        ]
                    }}

                />
            </div>
        </>
    )
}

export default Donut1