import { collection, getDocs, query, where, limit, startAfter ,orderBy} from 'firebase/firestore';
import { db } from '@/app/firebase'; // Adjust the import path as necessary

export const fetchHUBS = async (q, page) => {
  const pageSize = 10; // Number of items per page
  const startAt = (page - 1) * pageSize;

  let hubQuery = query(collection(db, 'hubs'), limit(pageSize));

  if (q) {
    hubQuery = query(
      collection(db, 'hubs'),
      where('subcontractorNo', '>=', q),
      where('subcontractorNo', '<=', q + '\uf8ff'),
      limit(pageSize)
    );
  }

  // If not the first page, add startAfter to paginate
  if (page > 1) {
    const lastVisible = await getLastVisibleDocument(page - 1); // Fetch the last document from the previous page
    hubQuery = query(hubQuery, startAfter(lastVisible));
  }

  const hubSnapshot = await getDocs(hubQuery);
  const hubList = hubSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Calculate total count
  const count = await getTotalCount(q);
  const fetchHUBStats = async () => {
    const db = getFirestore();
    const colRef = collection(db, 'hubs');
    const snapshot = await getDocs(colRef);
    const data = snapshot.docs.map(doc => doc.data());
  
    // Initialize counters for daily, weekly, and monthly installations
    const installations = {
      daily: 0,
      weekly: 0,
      monthly: 0,
    };
  
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of the current week
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the current month
  
    // Reset today to the current date
    today.setHours(0, 0, 0, 0);
  
    data.forEach(hub => {
      const createdAt = hub.createdAt ? new Date(hub.createdAt.seconds * 1000) : null;
  
      if (createdAt) {
        if (createdAt.toDateString() === today.toDateString()) {
          installations.daily += 1;
        }
        if (createdAt >= startOfWeek) {
          installations.weekly += 1;
        }
        if (createdAt >= startOfMonth) {
          installations.monthly += 1;
        }
      }
    });
  
    return installations;
  };

  return { HUBS: hubList, count };

};

// Function to get the last visible document for pagination
const getLastVisibleDocument = async (page) => {
  // You would need to implement how you fetch the last document
  // Here is a simplified example:
  const hubQuery = query(collection(db, 'hubs'), limit(5));
  const snapshot = await getDocs(hubQuery);
  const docs = snapshot.docs;
  return docs[docs.length - 1]; // Return the last document
};

// Function to get total count of documents
const getTotalCount = async (q) => {
  let hubQuery = query(collection(db, 'hubs'));

  if (q) {
    hubQuery = query(
      collection(db, 'hubs'),
      where('subcontractorNo', '>=', q),
      where('subcontractorNo', '<=', q + '\uf8ff')
    );
  }

  const snapshot = await getDocs(hubQuery);
  return snapshot.size;
};

export const fetchChartData = async () => {
  const colRef = collection(db, 'hubs');
  const snapshot = await getDocs(query(colRef, orderBy('createdAt'))); // Adjust the query as needed
  const data = snapshot.docs.map(doc => doc.data());

  // Transform data to match chart format
  const today = new Date();
  const formattedData = data.map(item => {
    const createdAt = new Date(item.createdAt.seconds * 1000); // Assuming createdAt is a timestamp

    return {
      name: createdAt.toLocaleDateString(), // Format date string
      HPInstalled: item.hpInstalled || 0,
      HPPlanned: item.hpPlanned || 0,
    };
  });
  return formattedData;
};