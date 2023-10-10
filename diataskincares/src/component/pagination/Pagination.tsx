import { useState } from 'react';
import styles from "./pagination.module.scss";
import React from 'react';

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
    const [ minPageNumberLimit, setMinPageNumberLimit ] = useState<number> (0);

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
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumeberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumeberLimit);
        }
    };

    for (let i = 1; 1 <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumeber.push(i);
    }

    return (
        <ul className={styles.pagination}>
            <li onClick={paginatePrev} className={currentPage === pageNumeber[0] ? `{styles.hidden}` : undefined}>
                Prev
            </li>
            {pageNumeber.map((number) => {
                if (number < (maxPageNumberLimit + 1) && number > minPageNumberLimit) return (
                    <li key={number} onClick={() => paginate(number)} className={currentPage === number ? `${styles.active}` : undefined }>
                        {number}
                    </li>
                );
                return null;
            })}
            <li onClick={paginateNext} className={currentPage === pageNumeber[pageNumeber.length - 1] ? `${styles.hidden}` : undefined}>
                Next
            </li>
            <p>
                <b className={styles.page}>{`page${currentPage}`}</b> &nbsp; <span>of</span> &nbsp; <b>{`${Math.ceil(totalPages)}`}</b>
            </p>
        </ul>
    );
};


export default Pagination;