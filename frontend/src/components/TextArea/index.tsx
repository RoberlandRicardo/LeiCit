import React from 'react';
import styles from './styles.module.css'
import { InputProps } from './model';

function TextArea({labelName, className, ...rest}: InputProps) {
    return (
        <div className={styles.containerInput} >
            <label className={styles.label} >{labelName}</label>
            <textarea className={`${styles.input} ${className}`} {...rest}  />
        </div>
    )
}

export default TextArea;