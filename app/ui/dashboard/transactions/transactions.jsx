"use client"
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import styles from "./transactions.module.css";

const Transactions = () => {
  const [latestUpdates, setLatestUpdates] = useState([]);

  useEffect(() => {
    const fetchLatestUpdates = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, "hubs"); // Replace with your actual collection name
        const q = query(colRef, orderBy("createdAt", "desc"), limit(4)); // Fetch latest 4 updates
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());
        setLatestUpdates(data);
      } catch (error) {
        console.error("Error fetching latest updates:", error);
      }
    };

    fetchLatestUpdates();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Update</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>HUB N°</td>
            <td>Status</td>
            <td>Remote Acceptance</td>
            <td>HUB Installed</td>
          </tr>
        </thead>
        <tbody>
          {latestUpdates.length > 0 ? (
            latestUpdates.map((update, index) => (
              <tr key={index}>
                <td>{update.HUBNo}</td>
                <td>
                  <span className={`${styles.status} ${styles[update.installationStatus.toLowerCase()]}`}>
                    {update.installationStatus}
                  </span>
                </td>
                <td>{update.remoteAcceptance}</td>
                <td>{update.hubInstalled}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No updates available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
