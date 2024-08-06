"use client";
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './PriceHistoryChart.module.css';

const data = [
  { date: 'Jan', price: 850 },
  { date: 'Feb', price: 920 },
  { date: 'Mar', price: 800 },
  { date: 'Apr', price: 940 },
  { date: 'May', price: 1000 },
  { date: 'Jun', price: 1300 },
  { date: 'Jul', price: 910 },
  { date: 'Aug', price: 850 },
  { date: 'Sep', price: 680 },
  { date: 'Oct', price: 790 },
  { date: 'Nov', price: 650 },
  { date: 'Dec', price: 700 },
];

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

// give title space, why area isn't working
export default function PriceHistoryChart() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Price History</div>
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} />
                        <YAxis 
                            domain={yDomain} 
                            ticks={yTicks} 
                            axisLine={false} 
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip />
                        <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#8a0ad3"
                            fill="#8a0ad3" 
                            fillOpacity={0.3} 
                        />
                        <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#8884d8" 
                            strokeWidth={2} 
                            dot={false} 
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
