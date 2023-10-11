import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { FILTER_BY_BRAND,
        FILTER_BY_PRICE,
        FILTER_BY_CATEGORY
    } from "../../../redux/slice/filterSlice";
import { selectMaxPrice, selectMinPrice, selectProducts } from "../../../redux/slice/productSlice";
import styles from "./productfilter.module.scss";



// interface Product {
//     name: string;
//     id: number;
//     category: string;
//     price: number;
//     brand: string;
//     description: string; // Add these properties
//     imageUrl: string; 
//     Avaliability: string;
// } 

interface ProductFilterProps {
    showFilter: boolean;
    setShowFilter: (show : boolean ) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ showFilter, setShowFilter }) => {
    const [ categ, setCategory ] = useState("All");
    const [ brand, setBrand ] = useState("All");
    const [ price, setPrice ] = useState<number>(3000);
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const minPrice = useSelector(selectMinPrice);
    const maxPrice = useSelector(selectMaxPrice);

    const allCategories = ["All", ...new Set(products.map((product) => product.category))];
    const allBrands = ["All", ...new Set(products.map((product) => product.brand) )];

    useEffect(() => {
        dispatch(FILTER_BY_BRAND({products, brand}));
    }, [dispatch, products, brand]);
    
    const filteredProducts = ( cat: string ) => {
        setCategory(cat);
        dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
    };
    useEffect(() => {
        dispatch(FILTER_BY_PRICE( {products, price })); 
    }, [dispatch, products, price]);

    const clearFilters = () => {
        setCategory("All");
        setBrand("All");
        setPrice(maxPrice);
    };


    return (
        <div className={styles.filter} onClick={() => setShowFilter(!)}></div> 
    );
}

export default ProductFilter; 