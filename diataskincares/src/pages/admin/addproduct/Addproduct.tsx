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
import { 
    addDoc, 
    collection, 
    doc, 
    setDoc,
    Timestamp,
    
 } from "firebase/firestore";
import Loader from "../../../component/loader/loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";



interface Product {
    imageUrl: string;
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
  imageUrl: "",
  price: "",
  category: "",
  Avaliability: "",
  brand: "",
  count: "",
  description: ""
};

const AddProduct: React.FC = () => {

  const { id } = useParams<{ id?: string }>();
  const products = useSelector(selectProducts);
  const productEdit = id ? products.find((item) => item.id === id) : undefined;
  

  const [product, setProduct] = useState<Product>(() => {
    if (id && productEdit) {
      return detectForm(id, { ...initialState }, productEdit);
    } else {
      return { ...initialState };
    }
  });


  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error ,setError] = useState<string | false>(false);
  const navigate = useNavigate();

  function detectForm(id: string, arg1: any, arg2: any): any {
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
          setProduct({ ...product, imageUrl: downloadURL});
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
        imageURL: product.imageUrl,
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

    if (product.imageUrl !== productEdit?.imageUrl) {
      const storageRef = ref(storage, productEdit?.imageUrl);
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
        imageUrl: product.imageUrl,
        price: parseFloat(product.price),
        category: product.category,
        brand: product.brand,
        count: parseFloat(product.count),
        description: product.description,
        createdAt: productEdit?.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setLoading(false);
      toast.info("Product will be edited (IF YOU ARE AN AUTHORIZED ADMIN, else it will reverse and not be edited)");
      navigate("/admin/all-products");
    } catch (error : any) {
      toast.error(error.message, {
        pauseOnFocusLoss: false,
      });
      setLoading(false);
    }
  };

  return(
   <>
      {loading && <Loader />}
      {products && (
        <div className={styles.product}>
         <h2>
         {String(detectForm(id ?? "", "Add New Product", "Edit Product"))}
          </h2>
         <span>
          {String(detectForm(
            id ?? "",
            "Do not refresh this page, this would cause data to be unavaliable, but if for some reason it refreshes, leave this page and the data would be back, then you can proceed to edit this product.",""
          ))}
         </span>
         <Card cardClass={styles.card}>
          <label style={{ fontSize: "1.4rem", fontWeight: 500 }}>
            Product Name:
          </label>
          <form onSubmit={id === "ADD" ? addProductToDatabase : editProductInDatabase}>
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
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress}%`
                        : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input 
                type="file"
                accept="image/*"
                placeholder="Product image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product && product.imageUrl === "" ? null : (
                <input 
                  type="text"
                  name="imageURL"
                  disabled
                  placeholder="Image Url:"
                  value={product && product.imageUrl}
                />
              )}
            </Card>
            <label>Product Price:</label>
            <input 
              type="text"
              placeholder="Produxct Price"
              value={product && product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Choose product category:</label>
            <select 
              name="category"
              required
              value={product && product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                --choose product category--
              </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
            <label>Product Company/Brand:</label>
              <input
                type="text"
                placeholder="Product Brand (e.g Nike)"
                value={product && product.brand}
                name="brand"
                onChange={(e) => handleInputChange(e)}
                required
              />
              <label>Select availability status:</label>
              <select
                name="availability"
                required
                value={(product && product.Avaliability) || ""}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  --choose availability status--
                </option>
                {status.map((stat) => (
                  <option key={stat.id} value={stat.name}>
                    {stat.name}
                  </option>
                ))}
              </select>
              <label>Number of product available:</label>
              <input
                type="number"
                placeholder="The number available in stock (e.g 3)"
                value={product && product.count}
                name="count"
                onChange={(e) => handleInputChange(e)}
                required
              />
              {error && (
                <p
                  style={{
                    color: "red",
                    fontWeight: 700,
                    paddingBottom: "2rem",
                  }}
                >
                  {error}
                </p>
              )}
              <label>Product Description:</label>
              <textarea
                name="description"
                placeholder="Describe this product"
                value={product && product.description}
                onChange={(e) => handleInputChange(e)}
                cols={30}
                rows={10}
                required
              />
              <button className="--btn --btn-primary --btn-block">
                {String(detectForm(id ?? "", "Save Product", "Edit Product"))}
              </button>
          </form>
         </Card>
        </div>
      )}
   </>
  )

} 