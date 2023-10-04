import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Card from "../../card/Card";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import styles from "./item.module.scss";


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
    return (
        <Card cardClass={styles.grid}>
            <div className={styles.img}>
                <Link to={}>
                    <img src={product.imageUrl} alt={product.name}/>
                </Link>
                <div className={styles.content}>
                    <div className={styles.details}>
                        <p>NGN {new Intl.NumberFormat().format(product.price)}</p>
                        <h4>{product.name.substring(0, 21)}...</h4>
                        <button className=''></button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Item;