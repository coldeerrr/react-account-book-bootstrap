import React from "react";
import PropTypes from 'prop-types'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { Colors } from "../../utils/constants";

const ColorsArr = Object.keys(Colors).map(key => Colors[key]);

const MyPieChart = ({ title, chartData }) => {

    return (
        <>
            {
                chartData.length === 0 ? <h5 className="text-center mt-3">本月无任何{title}</h5>
                    :
                    <>
                        <h5 className="text-center mt-3">本月{title}</h5>
                        <ResponsiveContainer width={'100%'} height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    cx="50%" cy="50%"
                                    outerRadius={100}
                                    fill={Colors.blue} label
                                >
                                    {
                                        chartData.map((entry, index) => <Cell key={index} fill={ColorsArr[index % ColorsArr.length]} />)
                                    }
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </>
            }
        </>
    )
}

MyPieChart.propTypes = {
    title: PropTypes.string.isRequired,
    chartData: PropTypes.array.isRequired
}

export default MyPieChart