"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './PriceHistoryChart.module.css';

const data = [
  { date: 'Jan', price: 850 },
  { date: 'Feb', price: 920 },
  { date: 'Mar', price: 800 },
  { date: 'Apr', price: 940 },
  { date: 'May', price: 1000 },
  { date: 'Jun', price: 880 },
  { date: 'Jul', price: 910 },
  { date: 'Aug', price: 850 },
  { date: 'Sep', price: 680 },
  { date: 'Oct', price: 790 },
  { date: 'Nov', price: 650 },
  { date: 'Dec', price: 700 },
];

// area under curve purple, give title space, yaxis domain and ticks based on data
export default function PriceHistoryChart() {
    return (
        <div className={styles.container}>
        <div className={styles.title}>Price history</div>
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
                domain={[0, 1000]} 
                ticks={[0, 250, 500, 750, 1000]} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
                />
                <Tooltip />
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
    };
