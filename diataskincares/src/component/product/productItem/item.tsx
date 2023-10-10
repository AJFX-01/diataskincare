import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Card from "../../card/Card";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import styles from "./item.module.scss";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../redux/slice/cartSlice';


type ItemType = {
    name : string;
    price : number;
    description : string;
    imageUrl : string;
    Avaliability : string;
};

type ItemProps = {
    product : ItemType;
    grid: boolean;
}

const Item : React.FC<ItemProps> = ({ product, grid}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError ] = useState< boolean | undefined>(undefined);
    
    const addtoCart = (product : ItemType) => {
        if(product?.Avaliability === "Out of Stock") {
            setError(true);
            setTimeout(() => setError(false), 7000);
            return;
        }
    }
    return (
        <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
            {product?.Avaliability === "Out of Stock" && (
                <p className={styles["out-of-stock"]}>Out of Stock</p>
            )}
            <div className={styles.img}>
                <Link to={}>
                    <img src={product.imageUrl} alt={product.name}/>
                </Link>
                <div className={styles.content}>
                    <div className={styles.details}>
                        <p>NGN {new Intl.NumberFormat().format(product.price)}</p>
                        <h4>{product.name.substring(0, 21)}...</h4>
                    </div>
                    {!grid && (
                        <p className={styles.desc}>{product.description.substring(0, 200)}...</p>
                    )}
                    {error && (
                        <p className={`${styles.flex} ${styles.error}`}>
                            <MdError/> &nbsp;Out of stock
                        </p>
                    )}
                    <button className='--btn --btn-danger'> Add tp Cart</button>
                </div>
            </div>
        </Card>
    );
}

export default Item;