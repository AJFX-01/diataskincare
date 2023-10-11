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
    const [ category, setCategory ] = useState("All");
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
        <div className={styles.filter} onClick={() => setShowFilter(!showFilter)}>
            <h4>Categories</h4>
            <div className={styles.category}>
                {allCategories.map((cat, index) => (
                    <button key={index} className={category === cat ? styles.active : undefined} type="button"
                        onClick={() => filteredProducts(cat)}>
                            &#8250; {cat}
                    </button>
                ))}
            </div>
           <h4>Price</h4>
           <p>NGN {new Intl.NumberFormat().format(price)}</p>
           <div className={styles.price}>
                <input 
                type="range" 
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                min={minPrice} 
                max={maxPrice}
                />
             </div>
             <br/>
             <button className="--btn --btn-danger" onClick={clearFilters}>
             Clear Filters
             </button> 
        </div> 
    );
};

export default ProductFilter; 
