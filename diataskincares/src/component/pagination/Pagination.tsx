import { useState } from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
    currentPage: number;
    setCurrentPage : (pageNumeber : number ) => void;
    productsPerPage: number;
    totalProducts: number;
}
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    setCurrentPage,
    productsPerPage,
    totalProducts
}) => {
    const pageNumeber: number[] = [];
    const totalPages: number = totalProducts / productsPerPage;
    const pageNumeberLimit : number = 5;
    const [ maxPageNumberLimit, setMaxPageNumberLimit ] = useState<number> (5);
    const [minPageNumberLimit, setMAxPageNumberLimit ] = useState<number> (0);

    
}