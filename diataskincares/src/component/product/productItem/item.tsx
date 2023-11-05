import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Card from "../../card/Card";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import styles from "./item.module.scss";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../redux/slice/cartSlice';


interface ProductItemType {
    name : string;
    id: string;
    price : string;
    description : string;
    imageUrl : string;
    Avaliability : string;
   
};

interface ProductItemProps  {
    product : ProductItemType ;
    grid: boolean;
}

const ProductItem : React.FC<ProductItemProps> = ({ product , grid }) => {
    const { name, price, Avaliability, description, imageUrl } = product;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError ] = useState< boolean | undefined>(undefined);
    
    const addtoCart = (product : ProductItemType) => {
        if(product?.Avaliability === "Out of Stock") {
            setError(true);
            setTimeout(() => setError(false), 7000);
            return;
        }
        dispatch(ADD_TO_CART(product));
        navigate("/cart");
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }
    return (
        <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
            {Avaliability === "Out of Stock" && (
                <p className={styles["out-of-stock"]}>Out of Stock</p>
            )}
            <div className={styles.img}>
                <Link to={`/`}>
                    <img src={imageUrl} alt={name}/>
                </Link>
                <div className={styles.content}>
                    <div className={styles.details}>
                        <p>NGN {new Intl.NumberFormat().format(price)}</p>
                        <h4>{name.substring(0, 21)}...</h4>
                    </div>
                    {!grid && (
                        <p className={styles.desc}>{description.substring(0, 200)}...</p>
                    )}
                    {error && (
                        <p className={`${styles.flex} ${styles.error}`}>
                            <MdError/> &nbsp;Out of stock
                        </p>
                    )}
                    <button className='--btn --btn-danger' onClick={() => addtoCart(product)}> Add tp Cart</button>
                </div>
            </div>
        </Card>
    );
}

export default ProductItem;