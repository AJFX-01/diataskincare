import React, { useEffect, useState } from "react";
import Card from "../../../components/card/Card";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { database, storage } from "../../../firebase/firebase";
import styles from "./addProduct.module.scss";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import Loader from "../../../components/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

interface Product {
  name: string;
  imageUrl: string;
  price: string;
  category: string;
  availability: string;
  brand: string;
  count: string;
  description: string;
}

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronic" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
  { id: 5, name: "Accessory" },
  { id: 6, name: "Appliance" },
  { id: 7, name: "Gadget" },
];

const status = [
  { id: 1, name: "In-stock" },
  { id: 2, name: "Out of stock" },
];

const initialState: Product = {
  name: "",
  imageUrl: "",
  price: "",
  category: "",
  availability: "",
  brand: "",
  count: "",
  description: "",
};

export default function AddProduct() {
  const { id } = useParams<{ id: string }>();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  const [product, setProduct] = useState<Product>(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const navigate = useNavigate();

  function detectForm(id: string, arg1: Product, arg2: Product | undefined): Product {
    if (id === "ADD") {
      return arg1;
    } else {
      return arg2 || arg1;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `ShopLand/${Date.now()}${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error(
            "Image not added, only Elue Wisdom can add images to the database"
          );
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct({ ...product, imageUrl: downloadURL });
          });
        }
      );
    }
  };

  const addProductToDatabase = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (product.count < 0) {
      setError("Product availabe cannot be less than 0");
      window.setTimeout(() => setError(""), 7000);
      setLoading(false);
      return;
    }

    if (product.availability === "In-stock" && +product.count <= 0) {
      setError(
        "Since this product is in stock, the number of products available cannot be 0"
      );
      window.setTimeout(() => setError(""), 10000);
      setLoading(false);
      return;
    }

    try {
      const collectionRef = collection(database, "Products");
      addDoc(collectionRef, {
        Availability: product.availability,
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        count: Number(product.count),
        description: product.description,
        createdAt: Timestamp.now().toDate(),
      });
      setLoading(false);
      toast.info(
        "Product will be added (IF YOU ARE AN AUTHORIZED ADMIN, else it will fail to be added)",
        {
          pauseOnFocusLoss: false,
        }
      );
      setProduct({ ...initialState });
      setUploadProgress(0);
      navigate("/admin/all-products");
    } catch (error) {
      toast.error(
        "Product not added, only Elue Wisdom can add products to the database"
      );
      setLoading(false);
    }
  };

  const editProductInDatabase = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (product.imageUrl !== productEdit?.imageUrl) {
      const storageRef = ref(storage, productEdit.imageUrl);
      deleteObject(storageRef);
    }

    if (product.count < 0) {
      setError("Product available cannot be less than 0");
      window.setTimeout(() => setError(""), 7000);
      setLoading(false);
      return;
    }

    if (product.availability === "Out of stock" && +product.count > 0) {
      setError(
        "Since this product is out of stock, the number of products available has to be 0"
      );
      window.setTimeout(() => setError(""), 7000);
      setLoading(false);
      return;
    }

    if (product.availability === "In-stock" && +product.count <= 0) {
      setError(
        "Since this product is in stock, the number of products available cannot be 0"
      );
      window.setTimeout(() => setError(""), 10000);
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(database, "Products", id);
      setDoc(docRef, {
        Availability: product.availability,
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        count: Number(product.count),
        description: product.description,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setLoading(false);
      toast.info(
        "Product will be edited (IF YOU ARE AN AUTHORIZED ADMIN, else it will reverse and not be edited)"
      );
      navigate("/admin/all-products");
    } catch (error) {
      toast.error(error.message, {
        pauseOnFocusLoss: false,
      });
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      {products && (
        <div className={styles
