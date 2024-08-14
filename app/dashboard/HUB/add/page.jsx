"use client";
import React, { useState } from 'react';
import styles from "@/app/ui/dashboard/HUB/addHUB/addHUB.module.css";
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

const AddHUB = () => {
  const [formData, setFormData] = useState({
    subcontractorNo: "",
    HUBNo: "",
    hubInstalled: "",
    totalBoxes: "",
    actual: "",
    gap: "",
    installationStatus: "",
    hpPlanned: "",
    hpInstalled: "",
    testOptic: "",
    remoteAcceptance: "",
    createdAt: new Date().toISOString().split('T')[0] // Set the current date as default
  });

  const router = useRouter();

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
    const [day, month] = formData.createdAt.split(/(\d+)/).filter(Boolean);
    const monthIndex = new Date(Date.parse(month +" 1, 2021")).getMonth(); // Convert month name to index
    const date = new Date(new Date().getFullYear(), monthIndex, parseInt(day, 10));
    const formattedDate = {
      seconds: Math.floor(date.getTime() / 1000)
    };

    try {
      await addDoc(collection(db, 'hubs'), formData);
      console.log('HUB added successfully');
      router.push('/dashboard/HUB'); // Navigate back to the dashboard after adding the HUB
    } catch (error) {
      console.error('Error adding HUB: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="subcontractorNo"
          value={formData.subcontractorNo}
          onChange={handleChange}
          placeholder="Subcontractor No"
          required
        />
        <input
          type="text"
          name="HUBNo"
          value={formData.HUBNo}
          onChange={handleChange}
          placeholder="HUB No"
          required
        />
        <select
          name="hubInstalled"
          value={formData.hubInstalled}
          onChange={handleChange}
          required
        >
          <option value="" disabled>HUB Installed</option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
        <input
          type="number"
          name="totalBoxes"
          value={formData.totalBoxes}
          onChange={handleChange}
          placeholder="Total Boxes"
          required
        />
        <input
          type="number"
          name="actual"
          value={formData.actual}
          onChange={handleChange}
          placeholder="Actual"
          required
        />
        <input
          type="number"
          name="gap"
          value={formData.gap}
          onChange={handleChange}
          placeholder="Gap"
          required
        />
        <select
          name="installationStatus"
          value={formData.installationStatus}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Installation Status</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="number"
          name="hpPlanned"
          value={formData.hpPlanned}
          onChange={handleChange}
          placeholder="HP Planned"
          required
        />
        <input
          type="number"
          name="hpInstalled"
          value={formData.hpInstalled}
          onChange={handleChange}
          placeholder="HP Installed"
          required
        />
        <select
          name="testOptic"
          value={formData.testOptic}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Test Optic</option>
          <option value="OK">OK</option>
          <option value="Not OK">Not OK</option>
        </select>
        <select
          name="remoteAcceptance"
          value={formData.remoteAcceptance}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Remote Acceptance</option>
          <option value="Accepted">Accepted</option>
          <option value="Not Accepted">Not Accepted</option>
        </select>
        <input
          type="date"
          name="createdAt"
          value={formData.createdAt}
          onChange={handleChange}
          required
        />
        <button type="submit">Add HUB</button>
      </form>
    </div>
  );
};

export default AddHUB;
