"use client"
import React, { useEffect, useState } from 'react';
import { MdDashboardCustomize } from "react-icons/md";
import styles from "./card.module.css";
import { fetchHUBStats } from '@/app/lib/data'; // Adjust the import path if necessary

const Card = () => {
  const [stats, setStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHUBStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching HUB stats:", error);
      }
    };

    fetchData();

    // Optionally set up an interval to update daily
    const intervalId = setInterval(fetchData, 24 * 60 * 60 * 1000); // Update every 24 hours

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return (
    <>
      <div className={styles.container}>
        <MdDashboardCustomize size={24} />
        <div className={styles.texts}>
          <h3>Daily</h3>
          <span className={styles.title}>Total HUB Installations</span>
          <span className={styles.number}>{stats.daily}</span>
          
        </div>
      </div>
      <div className={styles.container}>
        <MdDashboardCustomize size={24} />
        <div className={styles.texts}>
          <h3>Weekly</h3>
          <span className={styles.title}>Total HUB Installations</span>
          <span className={styles.number}>{stats.weekly}</span>
        </div>
      </div>
      <div className={styles.container}>
        <MdDashboardCustomize size={24} />
        <div className={styles.texts}>
          <h3>Monthly</h3>
          <span className={styles.title}>Total HUB Installations</span>
          <span className={styles.number}>{stats.monthly}</span>
          
        </div>
      </div>
    </>
  );
};

export default Card;
