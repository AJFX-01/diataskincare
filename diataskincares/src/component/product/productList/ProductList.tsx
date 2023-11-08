import React, { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./productList.module.scss";
import Pagination from "../../pagination/Pagination";
import Item from "../productItem/item";
import Search from "../../search/Search";
import { FILTER_BY_SEARCH,
         selectFilterdProducts, 
         SORT_PRODUCTS, 
} from "../../../redux/slice/filterSlice";

interface Product {
    name: string;
    id: string;
    category: string;
    price: string;
    brand: string;
    description: string; // Add these properties
    imageUrl: string; 
    Avaliability: string;
    count: string;
   
}


interface ProductListProps {
    products: Product[];
}

const ProductList : React.FC<ProductListProps> = ({ products }: { products: Product[] }) => {
    const [grid, setGrid] = useState(true);
    const [search, setSearch ] = useState<string>("");
    const [sort, setSort] = useState<string>("latest");
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilterdProducts);

    // ============pages function control============
    const [currentPage, setCurrentPage ] = useState<number>(1);
    const [productsPerPage] = useState<number>(10);
    //=============current Page=================//

    const indexOfLastProduct = currentPage + productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // ==========================================
    useEffect(() => {
        dispatch(
            FILTER_BY_SEARCH({
                products,
                search,
            })
        );
    }, [dispatch, products, search]);

    useEffect(() => {
        dispatch(
            SORT_PRODUCTS({
                products,
                sort,
            })
        );
    }, [ dispatch, products, sort])

    return (
        <div className={styles["product-list"]} id="product">
            <div className={styles.top}>
                <div className={styles.icons}>
                    <BsFillGridFill size={22} color="#c07d53" onClick={() => setGrid(true) }/>
                    <FaListAlt size={24} color="#111" onClick={() => setGrid(false)} />
                    <p>
                        <b>
                            {filteredProducts.length === 1 
                                ? "1 product Found" 
                                : `${filteredProducts.length} Product Found`}
                        </b>
                    </p>
                </div>
                <div>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className={styles.sort}>
                    <label>Sort By:</label>
                    <select value={sort} onChange={(e) => {
                        setSort(e.target.value);
                    }}>
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
            {search && (
                <p style={{ textAlign: "center", margin: "2rem 0", fontSize: "1.9rem" }}>
                    <b>
                        Product including ' <i style={{ color:"#c07d53" }}>{search}</i> '
                    </b>
                </p>
            )}
            <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                {filteredProducts.length === 0 ? (
                    <h2>
                        <b>No Product(s) match your search</b>
                    </h2>
                ) : (
                    <>
                        {currentProducts.map((product) => (
                            <div key={product.id}>
                                <Item {...product} grid={grid} product={product}/>
                            </div>
                        ))}

                    </>
                )}
            </div>
            <Pagination
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={filteredProducts.length}
            />
        </div>
    );
};

export default ProductList;