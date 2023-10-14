import { doc, getDoc, DocumentReference, DocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { database } from "../firebase/firebase";

interface DocumentData {
  id: string;
  // Define other properties based on your document structure
}

interface FetchDocumentsResult {
  document: DocumentData | null;
}

export default function useFetchDocuments(collectionName: string, documentID: string): FetchDocumentsResult {
  const [document, setDocument] = useState<DocumentData | null>(null);

  useEffect(() => {
    const getDocument = async () => {
      const docRef: DocumentReference = doc(database, collectionName, documentID);
      const docSnap: DocumentSnapshot = await getDoc(docRef);

      if (docSnap.exists()) {
        const obj: DocumentData = { id: documentID, ...docSnap.data() as DocumentData };
        setDocument(obj);
      } else {
        toast.error("Document not found", {
          autoClose: 5000,
          pauseOnFocusLoss: false,
        });
      }
    };
    getDocument();
  }, [collectionName, documentID]);

  return { document };
}
