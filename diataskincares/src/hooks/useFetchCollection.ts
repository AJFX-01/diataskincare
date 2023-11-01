import { collection, getDocs, onSnapshot, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { toast } from "react-toastify";




type CollectionData = {
    id: string;
    [key: string]: any;
    // name: string;
    // price: number;
    // description: string;
    // imageUrl: string;
    // brand: string;
    // Avaliability: string;
    // category: string;
}

// const useFetchCollection = (collectionName : string ) : T[] => {
//     const [data, setData] = useState<CollectionData[]>([]);
//     const [loading , setLoading] = useState<boolean>(false);

//     useEffect(() => {
//         const getCollection = () => {
//             setLoading(true);
//             try {
//                 const docRef = collection(database, collectionName);
//                 const q = query(docRef, orderBy("createdAt", "desc"));
//                 onSnapshot(q, (snapshot) => {
//                     const allData: T[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
//                         id: doc.id,
//                         ...doc.data()
//                     }) as T);
//                     // const allData: CollectionData[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
//                     //     id: doc.id,
//                     //     name: doc.data().name,
//                     //     price: doc.data().price,
//                     //     description: doc.data().description,
//                     //     imageUrl: doc.data().imageUrl,
//                     //     brand: doc.data().brand,
//                     //     Avaliability: doc.data().Availability,
//                     //     category: doc.data().category,
//                     // }));
//                     setData(allData);
//                     setLoading(false);
//                 });
//             } catch (error : any) {
//                 setLoading(false);
//                 toast.error(error.message);
//             }
//         };
//         getCollection();
//     }, [collection]);

//     return { data, loading };
// };
const useFetchCollection = <T extends CollectionData>(collectionName: string): T[] => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const getCollection = async () => {
        setLoading(true);
        try {
          const docRef = collection(database, collectionName);
          const q = query(docRef, orderBy("createdAt", "desc"));
  
          const snapshot = await getDocs(q);
          const allData: T[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setData(allData);
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          toast.error(error.message);
        }
      };
  
      getCollection();
    }, [collection]);
  
    return { data, loading };
  };

export default useFetchCollection;

