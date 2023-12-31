import React from 'react';
import styles from './styles.module.css'
import { InputProps } from './model';

function Input({labelName, className, ...rest}: InputProps) {
    return (
        <div className={styles.containerInput} >
            <label className={styles.label} >{labelName}</label>
            <input className={`${styles.input} ${className}`} {...rest} />
        </div>
    )
}

export default Input;