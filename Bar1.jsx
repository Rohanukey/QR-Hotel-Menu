import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
    
function Bar1() {
    return (
        <>

            <div style={{ width: 380, height: 300}} >
                <Line
                    data={{
                        labels: ["A", "B", "C" , "D" , "E" , "F" , "G" ],
                        datasets: [
                            {
                                label: "Revenue",
                                data: [0, 200, 100, 400 ,600,300,400]
                            }
                        ]
                    }}
                />
            </div>
        </>
    )
}

export default Bar1