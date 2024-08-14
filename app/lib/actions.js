import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/app/firebase'; // Adjust the import path as necessary

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      if (!id) {
        res.status(400).json({ error: "ID is required" });
        return;
      }

      const docRef = doc(db, "hubs", id);
      console.log('Deleting document with ID:', id);
      await deleteDoc(docRef);
      res.status(200).json({ message: "HUB deleted successfully" });
    } catch (error) {
      console.error('Error deleting HUB:', error);
      res.status(500).json({ error: "Error deleting HUB" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
