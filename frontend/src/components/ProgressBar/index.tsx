import React from 'react';
import styles from './styles.module.css'
import { ProgressBarProps } from './model';

function ProgressBar({ totalItens, actualIndex, ...rest}: ProgressBarProps) {
    return (
        <div className={styles.progressBar} {...rest} >
            {
                [...Array(totalItens)].map((e, index) => 
                    <div className={`
                        ${styles.itemProgressBar} 
                        ${index == actualIndex ? styles.active : styles.inactive} 
                    `} />
                )
            }
        </div>
    )
}

export default ProgressBar;