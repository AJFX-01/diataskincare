

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { toast } from "react-toastify";

interface Document {
 id: string;
 [key: string]: any;
}

const useFetchCollection = (collectionName: string): { data: Document[]; loading: boolean } => {
 const [data, setData] = useState<Document[]>([]);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
    const getCollection = async () => {
      setLoading(true);
      try {
        const docRef = collection(database, collectionName);
        const q = query(docRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
          let allData: Document[] = [] as Document[] ;
          snapshot.docs.forEach((doc) => {
            allData.push({ id: doc.id, ...doc.data() } as Document);
          });
          setData(allData);
          setLoading(false);
        });
      } catch (error : any) {
        setLoading(false);
        toast.error(error.message);
      }
    };

    getCollection();
 }, [collectionName]);

 return { data, loading };
};

export default useFetchCollection;
