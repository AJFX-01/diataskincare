import { useEffect, useState } from "react";
import Card from "../../../component/card/Card";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { database, storage } from "../../../firebase/firebase";
import styles from "./addProduct.module.scss";
import { toast } from "react-toastify";
import { addDoc, 
    collection, 
    doc, 
    setDoc,
    Timestamp
 } from "firebase/firestore";
import Loader from "../../../component/loader/loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import { FcNeutralDecision } from "react-icons/fc";
import { BsIntersect } from "react-icons/bs";


interface Product {
    imageURL: string;
    name: string;
    price: string;
    category: string;
    Avaliability: string;
    brand: string;
    count: string;
    description: string;
}

const categories = [
  { id: 1, name: "Body Cleanser" },
  { id: 2, name: "Exfloliator"},
  { id: 3 , name: "Face Lotion"},
  { id: 4 , name:" Body Lotion"},
  {id: 5, name:"Face Cleaner"}
];

const status = [
  {id: 1, name: "In-stock"},
  {id: 2, name: "Out-Of-Stock"}
];

const initialState: Product = {
  name: "",
  imageURL: "",
  price: "",
  category: "",
  Avaliability: "",
  brand: "",
  count: "",
  description: ""
};

const AddProduct: React.FC = () => {

  const { id } = useParams<{ id: string}>();
  const products = useSelector(selectProducts);\
  const prodcutsEdit = products.find((item) => item.id === id);
  const [product, setProduct] = useState<Product>(() => {
    const newState = detectForm(id, { ...initialState}, prodcutsEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error ,setError] = useState<string | false>(false);
  const navigate = useNavigate();

  function detectForm(id: string, arg1: Product, arg2: Product | undefined): Product {
    if (id == "ADD") {
      return arg1;
    } else {
      return arg2 || arg1;
    }
  } ;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    setProduct{{ ...product, [name]: value}};
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    
    const storageRef = ref(storage, `DiataSkincares/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error("Image not added, only AJFX can add image to the database");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL});
        });
      }
    );
  };

  
} 