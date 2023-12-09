import React from 'react';
import styles from './styles.module.css'
import { InputProps } from './model';

function Input({labelName, ...rest}: InputProps) {
    return (
        <div>
            <label className={styles.label} >{labelName}</label>
            <input className={styles.input} {...rest} />
        </div>
    )
}

export default Input;