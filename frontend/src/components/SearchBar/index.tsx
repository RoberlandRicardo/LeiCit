import React from 'react';
import styles from './styles.module.css'
import { SearchBarProps } from './model';

function SearchBar({className, ...rest}: SearchBarProps) {
    return (
        <div className={`${styles.containerInput} ${className}`}>
            <input className={styles.searchBar} type="text" {...rest} />
        </div>
    )
}

export default SearchBar;