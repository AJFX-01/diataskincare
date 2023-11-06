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

    const { data , loading } = useFetchcollection("Products");
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const [showFilter, setShowFilter] = useState<boolean>(false);


    useEffect(() => {

        const products = data.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            imageUrl: item.imageUrl,
            brand: item.brand,
            Avaliability: item.Avaliability,
            category: item.category,
            count: item.count,
        }));

        dispatch(
            STORE_PRODUCTS({
                products
            })
        );

        dispatch(
            GET_PRICE_RANGE({
                products
            })
        );
    }, [dispatch, data]);


    return (
        <section className={styles.section}>
            <h2 style={{textAlign: 'center', padding:'3rem 0', color: '#c07d53'}}>Explore our products</h2>
            <div className={`container ${styles.product}`}>
                <aside className={
                    showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
                }>
                    {loading ? null : (
                        <ProductFilter showFilter={showFilter}
                            setShowFilter={setShowFilter}/>
                    )}
                </aside>
                <div className={styles.content}>
                    {loading ? (
                        <img src={Spinner}
                        alt="spinner"
                        style={{ width: "50px"}}
                        className="--center-all"  
                        />   
                    ) : (
                        <ProductList products={products} />
                    )}
                    <div className={styles.icon}
                        onClick={() => setShowFilter(!showFilter)} 
                    >
                        &nbsp; {" "}
                        {products.length ? (
                            <> 
                                <FaCogs size={20} color="#c07d53" />
                                <p>
                                    <b>{ showFilter ? "Hide Filter" : "Show Filter"}</b>
                                </p>
                            </>
                         ) : null }
                    </div>    
                </div>
            </div>
        </section>
    );
}


export default Product;