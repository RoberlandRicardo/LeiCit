
import React from 'react';
import styles from './styles.module.css'
import { CardProps } from './model';

function Card({className, ...rest}: CardProps) {
    return (
        <div className={`${styles.card} ${className}`} {...rest} />
    )
}

export default Card;