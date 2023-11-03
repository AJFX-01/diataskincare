import React, { useEffect, useState } from "react";
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
  { id: 5, name:"Face Cleaner"}
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

  const { id } = useParams<{ id: string }>();
  const products = useSelector(selectProducts);
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
    setProduct({ ...product, [name]: value });
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
      (error : any) => {
        toast.error("Image not added, only AJFX can add image to the database");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL});
        });
      }
    );
  };

  const addProductToDatabase = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if(parseInt(product.count) < 0) {
      setError("Product avaliable cannot be less than 0");
      window.setTimeout(() => setError(false), 7000);
      setLoading(false);
      return;
    }

    if (product.Avaliability === "In-stock" && parseInt(product.count) <= 0) {
      setError(
        "Since this product is in stock, the number of product available cannot be 0"
      );
      window.setTimeout(() => setError(false), 1000);
      setLoading(false);
      return;
    }


    try {
      const collectionRef = collection(database, "Products");
      addDoc(collectionRef, {
        Avaliability: product.Avaliability,
        name: product.name, 
        imageURL: product.imageURL,
        price: parseFloat(product.price),
        category: product.category,
        count: parseFloat(product.count),
        description: product.description,
        createdAt: Timestamp.now().toDate(),
      });
      setLoading(false);
      toast.info("Product will be added (IF YOU ARE AN AUTHORIZED ADMIN, else it will fail to be added)", {
        pauseOnFocusLoss: false,
      });
      setProduct({ ...initialState });
      setUploadProgress(9);
      navigate("/admin/all-products");
    } catch (errror) {
      toast.error("Products not added, only AJFX can added products to datase");
      setLoading(false);
      return;
    }
  };

  const editProductInDatabase = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (product.imageURL !== prodcutsEdit?.imageUrl) {
      const storageRef = ref(storage, prodcutsEdit?.imageUrl);
      deleteObject(storageRef);
    }

    if (parseInt(product.count) < 0) {
      setError("Product avaliable cannot be less than 0");
      window.setTimeout(() => setError(false), 7000);
      setLoading(false);
      return;
    }

    if (product.Avaliability === "Out of stock" && parseInt(product.count) > 0) {
      setError("Since this product is out of stock, the number of product available has to be 0");
      window.setTimeout(() => setError(false), 1000);
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(database, "Products", id);
      setDoc(docRef, {
        Availability: product.Avaliability,
        name: product.name,
        imageUrl: product.imageURL,
        price: parseFloat(product.price),
        category: product.category,
        brand: product.brand,
        count: parseFloat(product.count),
        description: product.description,
        createdAt: prodcutsEdit?.createdAt,
        editedAt: Timestamp.now().toDate(),
      })
    }
  }

  return(
   <>
      {loading && <Loader />}
      {products && (
        <div className={styles.product}>
         <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
         <span>
          {detectForm(
            id,
            "Do not refresh this page, this would cause data to be unavaliable, but if for some reason it refreshes, leave this page and the data would be back, then you can proceed to edit this product."
          )}
         </span>
         <Card cardClass={styles.card}>
          <label style={{ fontSize: "1.4rem", fontWeight: 500 }}>
            Product Name:
          </label>
          <form onSubmit={{detectForm(id, addProductToDatabase, editProductInDatabase)}}>
            <input
              type="text"
              placeholder="Product Name"
              value={product && product.name}
              name="name"
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label>Product Image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%`}}>
                  </div>
                </div>
              )}
            </Card>
          </form>
         </Card>
        </div>
      )}
   </>
  )

} 