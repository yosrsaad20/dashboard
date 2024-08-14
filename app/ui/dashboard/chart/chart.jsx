"use client"
import React, { useEffect, useState } from 'react';
import styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fetchChartData } from '@/app/lib/data'; // Adjust the import path as necessary

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchChartData();
        
        // Example of formatting dates, assuming `createdAt` is a field in your data
        const formattedData = data.map(item => ({
          ...item,
          name: new Date(item.createdAt).toLocaleDateString(), // Format date for display
          HPInstalled: item.HPInstalled || 0,
          HPPlanned: item.HPPlanned || 0
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Boxes Recap</h2>
        <ResponsiveContainer width="90%" height={400}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
            <Legend />
            <Line type="monotone" dataKey="HPInstalled" stroke="#8884d8" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="HPPlanned" stroke="#F56666" strokeDasharray="3 4 5 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>HP Recap</h2>
        <ResponsiveContainer width="90%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
            <Legend />
            <Bar dataKey="HPInstalled" fill="#8884d8" />
            <Bar dataKey="HPPlanned" fill="#F56666" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
