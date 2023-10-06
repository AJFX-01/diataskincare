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
    const [minPageNumberLimit, setMinPageNumberLimit ] = useState<number> (0);

    const paginate = (pageNumeber : number) => {
        setCurrentPage(pageNumeber);
        window.scroll(0, 1500);
    };
    const paginateNext = () => {
        setCurrentPage(currentPage + 1 );

        if ((currentPage + 1) > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumeberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumeberLimit);
        }
    };
    const paginatePrev = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumeberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumeberLimit;)
            setMinPageNumberLimit(minPageNumberLimit - pageNumeberLimit );
        }
    };

    for (let i = 1; 1 <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumeber.push(i);
    }

    return ()
}