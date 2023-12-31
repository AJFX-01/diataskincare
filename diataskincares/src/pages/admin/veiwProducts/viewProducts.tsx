
import React, { useEffect, useState } from "react";
import { database } from "../../../firebase/firebase";
import Loader from "../../../component/loader/loader";
import { toast } from "react-toastify";
import styles from "./viewProducts.module.scss";
import { doc, deleteDoc } from "firebase/firestore";
import { storage } from "../../../firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS, Product
} from "../../../redux/slice/productSlice";
import useFetchcollection from "../../../hooks/useFetchCollection";
import {
  FILTER_BY_SEARCH,
  selectFilterdProducts,
} from "../../../redux/slice/filterSlice";
import Search from "../../../component/search/Search";
import Pagination from "../../../component/pagination/Pagination";


const ViewProducts= () => {
    const { data, loading } = useFetchcollection("Products")
    const [ search, setSearch] = useState<string>("");
    const dispatch = useDispatch();

    const products : Product[] = useSelector(selectProducts);
    const filteredProducts: Product[] = useSelector(selectFilterdProducts);

    // ====== Paginatiuon=========

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage ] = useState<number>(10);

    // =========== currremt products=========
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products
            })
        );
    }, [dispatch, data])

    useEffect(() => {
        dispatch(
            FILTER_BY_SEARCH({
                products,
                search,
            })
        );
    } , [dispatch, products, search]);

    const confirmDelete = (id: string, imageUrl: string, name: string) => {
        Notiflix.Confirm.show(
          "Delete Product",
          `Are you sure you want to delete ${name}?`,
          "DELETE",
          "CANCEL",
          function okCb() {
            deleteProduct(id, imageUrl);
            toast.success(
              `${name} deleted, if you are not an authorized admin, this would be reversed within seconds.`
            );
          },
          function cancelCb() {},
          {
            width: "320px",
            borderRadius: "5px",
            titleColor: "#c07d53",
            okButtonBackground: "#c07d53",
            cssAnimationStyle: "zoom",
          }
        );
      };
    
    const deleteProduct = async (id: string, imageUrl: string) => {
        try {
            await deleteDoc(doc(database, "Products", id));
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef).then(() => {
                // handle sucess if needed
            })
            .catch((error : any) => {
                toast.error(error.message);
            });
        } catch (error : any) {
            if (error.message === "Missing or insufficient permissions.") {
                toast.error(
                    "D;ELETE REQUEST REVERSED, only AJFX can delete products from the database"
                );
            }
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className={styles.table}>
                <h1>All Products</h1>
                <div className={styles.search}>
                    <p>
                        <p>
                            <b>{currentProducts.length}</b> Prooduct(s) Found
                        </p>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                        {search && (
                            <p style={{
                                textAlign: "center",
                                margin: "2rem 0",
                                fontSize: "1.9rem"
                                }}>
                                <b>
                                    Products including ' <i style={{ color: "#ff847c"}}>{search}</i>'
                                </b>
                            </p>
                        )}
                    </p>
                </div>
                {filteredProducts.length === 0 ? (
                    <h2>
                        <b>
                            No Product(s) Found.
                        </b>
                    </h2>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product, index) => {
                                const { id, name, price, imageUrl, category } = product;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={imageUrl}
                                            alt={name}
                                            style={{ width: "100px"}}
                                            />
                                        </td>
                                        <td>{name}</td>
                                        <td>{category}</td>
                                        <td>NGN {new Intl.NumberFormat().format(parseInt(price))}</td>
                                        <td className={styles.icons}>
                                            <Link to={`/admin/add-product/${id}`}>
                                                <FaEdit size={20} color="green" />
                                            </Link>
                                            &nbsp;
                                            <FaTrashAlt
                                                size={18}
                                                color="red"
                                                onClick={() => confirmDelete(id, imageUrl, name)}
                                            />
                                        </td>
                                    </tr>
                                );
                        })}
                        </tbody>
                    </table>
                )}
                <Pagination
                    productsPerPage={productsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalProducts={filteredProducts.length}
                />
            </div>
        </>
    )
}