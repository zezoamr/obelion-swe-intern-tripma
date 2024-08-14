"use client";
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './PriceHistoryChart.module.css';


export default function PriceHistoryChart({data}) {
    if(!data) return <p>Loading...</p>;
    
    const yDomain = [Math.min(...data.map(d => d.price)), Math.max(...data.map(d => d.price))];

    const minPrice = Math.min(...data.map(d => d.price));
    const yTicks = Array.from(new Set(data.map(d => d.price)))
        .sort((a, b) => a - b)
        .reduce((acc, cur) => {
            if (acc.length === 0 || acc[acc.length - 1] + 100 <= cur) {
                acc.push(cur);
            }
            return acc;
        }, []);

    if (minPrice - 250 >= 0) {
        yTicks.unshift(minPrice - 250);
    } else {
        yTicks.unshift(0);
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Price History</div>
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                    {/* <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    > */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        {/* <XAxis dataKey="date" axisLine={false} tickLine={false} /> */}
                        <YAxis 
                            domain={yDomain} 
                            ticks={yTicks} 
                            axisLine={false} 
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        {/* <Tooltip /> */}
                        <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#8a0ad3"
                            fill="#8a0ad3" 
                            fillOpacity={0.3} 
                        />
                        {/* <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#8884d8" 
                            strokeWidth={2} 
                            dot={false} 
                            activeDot={{ r: 8 }}
                        /> */}
                    {/* </LineChart> */}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
