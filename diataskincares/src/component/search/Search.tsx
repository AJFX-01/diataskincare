import React { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./search.module.scss";
import { ChangeEvent } from "react";

interface SearchProps {
    value: string;
    onChange: ( event : ChangeEvent<HTMLInputElement> ) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange}) => {
    return (
        <div className={styles.search}>
            <BiSearch size={18} className={styles.icons} />
            <input type="text" placeholder="Search by name or category" value={value} onChange={onChange} />
        </div>
    );
}

export default Search;