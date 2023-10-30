import React, { useEffect, useState } from "react";
import { FaCogs } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useFetchcollection from "../../hooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import styles from "./product.module.scss";
import ProductFilter from "./productFiter/ProductFilter";
import ProductList from "./productList/ProductList";
import Spinner from "../../assets/spinner.jpg";

const Product: React.FC = () => {
    const { data , loading } = useFetchcollection<string >("Products");
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const [showFilter, setShowFilter] = useState<boolean>(false);


    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data,
            })
        );

        dispatch(
            GET_PRICE_RANGE({
                products: data,
            })
        );
    }, [dispatch, data]);
}


export default Product;