"use client";
import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/HUB/singleHUB/singleHUB.module.css";
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/app/firebase'; // Import your Firestore instance

const fetchHUB = async (id) => {
  try {
    const docRef = doc(db, 'hubs', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching HUB:', error);
    return null;
  }
};

const SingleHUBPage = ({ params }) => {
  const { id } = params;
  const [HUB, setHUB] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    subcontractorNo: "",
    HUBNo: "",
    hubInstalled: "",
    boxesInstalled: "",
    actual: "",
    gap: "",
    installationStatus: "",
    hpPlanned: "",
    hpInstalled: "",
    testOptic: "",
    remoteAcceptance: "",
    createdAt: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHUB = await fetchHUB(id);
      setHUB(fetchedHUB);
      if (fetchedHUB) {
        setFormData({
          subcontractorNo: fetchedHUB.subcontractorNo || "",
          HUBNo: fetchedHUB.HUBNo || "",
          hubInstalled: fetchedHUB.hubInstalled || "",
          boxesInstalled: fetchedHUB.boxesInstalled || "",
          actual: fetchedHUB.actual || "",
          gap: fetchedHUB.gap || "",
          installationStatus: fetchedHUB.installationStatus || "",
          hpPlanned: fetchedHUB.hpPlanned || "",
          hpInstalled: fetchedHUB.hpInstalled || "",
          testOptic: fetchedHUB.testOptic || "",
          remoteAcceptance: fetchedHUB.remoteAcceptance || "",
          createdAt: fetchedHUB.createdAt || ""
        });
      }
    };
    fetchData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'hubs', id);
      await updateDoc(docRef, formData);
      console.log("HUB updated successfully");
      router.push('/dashboard/HUB');
    } catch (error) {
      console.error("Error updating HUB:", error);
    }
  };

  // Handle delete operation
  const handleDelete = async () => {
    try {
      const docRef = doc(db, 'hubs', id);
      await deleteDoc(docRef);
      console.log("HUB deleted successfully");
      router.push('/dashboard/HUB'); // Navigate back to the HUB dashboard after deletion
    } catch (error) {
      console.error("Error deleting HUB:", error);
    }
  };

  if (!HUB) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={HUB.id} />

          {/* ... your form inputs ... */}

          <button type="submit">Update</button>
        </form>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete HUB
        </button>
      </div>
    </div>
  );
};

export default SingleHUBPage;
