import React from "react";
import { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./productList.module.scss";
import Pagination from "../../pagination/Pagination";
import Item from "../productItem/item";
import Search from "../../search/Search";
import { FILTER_BY_SEARCH, selectFilterdProducts, SORT_PRODUCTS } from "../../../redux/slice/filterSlice";
interface ProductListProps {
    
}

const ProductList : React.FC = () => {
    return (
        <div className={styles["product-list"]} id="product">
            <div className={styles.top}>
                <div className={styles.icons}>
                    <BsFillGridFill size={22} color="#c07d53"/>
                    <FaListAlt size={24} color="#111" />
                    <p>
                        <b>
                            1 product Found
                        </b>
                    </p>
                </div>
                <div>
                    <Search></Search> 
                </div>
                <div className={styles.sort}>
                    <label>Sort By</label>
                    <select value={sort}>
                        <option value="latest">Latest</option>
                        <option value="lowest-price">Lowest Price</option>
                        <option value="highest-price">Highest Price</option>
                        <option value="In-stock">In-stock</option>
                        <option value="Out of stock">Out of stock</option>
                        <option value="a-z">A - Z (alphabet. order)</option>
                        <option value="z-a">Z - A (alphabet. order)</option>
                    </select>
                </div>
            </div>
            <div className={ `${styles.grid}`}>
            </div>
            <Pagination/>
        </div>
    )
}