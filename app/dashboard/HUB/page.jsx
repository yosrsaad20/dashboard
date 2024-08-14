
"use client"
// src/app/ui/dashboard/HUB/HUBPage.jsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/HUB/HUB.module.css';
import Search from '@/app/ui/dashboard/search/Search';
import Pagination from '@/app/ui/dashboard/pagination/Pagination';
import { fetchHUBS } from '@/app/lib/data';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


const HUBPage = ({ searchParams }) => {
  const [HUBS, setHUBS] = useState([]);
  const [count, setCount] = useState(0);
  const q = searchParams?.q || '';
  const page = searchParams?.page || 1;

  useEffect(() => {
    const loadHUBS = async () => {
      try {
        const { HUBS, count } = await fetchHUBS(q, page);
        setHUBS(HUBS);
        setCount(count);
      } catch (error) {
        console.error('Error fetching HUBS:', error);
      }
    };
    
    loadHUBS();
  }, [q, page]);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this HUB?")) {
      try {
        const docRef = doc(db, 'hubs', id);
        await deleteDoc(docRef);
        console.log("HUB deleted successfully");
        router.push('/dashboard/HUB');
      } catch (error) {
        console.error("Error deleting HUB:", error);
        alert("Failed to delete HUB: " + error.message);
      }
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a HUB..." />
        <Link href="/dashboard/HUB/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Subcontractor N°</td>
            <td>HUB N°</td>
            <td>HUB Installed</td>
            <td>Boxes Installed</td>
            <td>Actual</td>
            <td>Gap</td>
            <td>Installation Status</td>
            <td>HP Planned</td>
            <td>HP Installed</td>
            <td>Test Optic</td>
            <td>Remote Acceptance</td>
            <td>Created At</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {HUBS.length > 0 ? (
            HUBS.map((HUB) => (
              <tr key={HUB.id}>
                <td>{HUB.subcontractorNo}</td>
                <td>{HUB.HUBNo}</td>
                <td>{HUB.hubInstalled}</td>
                <td>{HUB.boxesInstalled}</td>
                <td>{HUB.actual}</td>
                <td>{HUB.gap}</td>
                <td>{HUB.installationStatus}</td>
                <td>{HUB.hpPlanned}</td>
                <td>{HUB.hpInstalled}</td>
                <td>{HUB.testOptic}</td>
                <td>{HUB.remoteAcceptance}</td>
                <td>{HUB.createdAt?.toString().slice(4, 16)}</td>
                <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/HUB/${HUB.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(HUB.id)}
                    className={`${styles.button} ${styles.delete}`}
                  >
                    Delete
                  </button>
                </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No HUBs available</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default HUBPage;
