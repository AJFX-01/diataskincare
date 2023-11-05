import { collection, getDocs, onSnapshot, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { toast } from "react-toastify";




type CollectionData = {
    id:string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    brand: string;
    Avaliability: string;
    category: string;
    count: string;
}

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
                   
                    const allData: CollectionData[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                        id: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        description: doc.data().description,
                        imageUrl: doc.data().imageUrl,
                        brand: doc.data().brand,
                        Avaliability: doc.data().Availability,
                        category: doc.data().category,
                        count: doc.data().count
                    }));
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
     