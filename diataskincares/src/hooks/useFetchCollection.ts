import { collection, onSnapshot, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { toast } from "react-toastify";
import { Collection } from "typescript";

interface CollectionData {
    id: string;
    [key: string ]: any;
}

const useFetchCollection = (collection.name : string ) => {
    const [data, setData] = useState<CollectionData[]>([]);
    const [loading , setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getCollection = () => {
            setLoading(true);
            try {
                const docRef = collection(database, collectionName);
                const q = query(docRef, orderBy("createdAt", "desc"));
                onSnapshot(q, (snapshot) => {
                    const allData: CollectionData[] = [];
                    snapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
                        allData.push({ id: doc.id, ...doc.data()});
                    });
                    setData(allData);
                    setLoading(false);
                });
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        };
        getCollection();
    }, [collection]);

    return { data, loading };
};


export default useFetchCollection;

