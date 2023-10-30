import { collection, onSnapshot, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { toast } from "react-toastify";



interface Product {
    id: number;
    name: string;
    price: number;
    description : string;
    imageUrl: string;
    brand: string;
    Avaliability : string;
    category: string;
};


const useFetchCollection = (collectionName : string ) => {
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
            } catch (error : any) {
                setLoading(false);
                toast.error(error.message);
            }
        };
        getCollection();
    }, [collection]);

    return { data, loading };
};


export default useFetchCollection;

