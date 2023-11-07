import { useEffect, useState } from "react";
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
    const [ search, setSearch] = useState("");
    const dispatch = useDispatch();

    const products : Product[] = useSelector(selectProducts);
    const filteredProducts: Product[] = useSelector(selectFilterdProducts);

    // ====== Paginatiuon=========

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage ] = useState<number>(10);

    // =========== currremt products=========
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice
}