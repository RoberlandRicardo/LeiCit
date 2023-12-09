import React from 'react';
import styles from './styles.module.css'
import { CardLeilaoProps } from './model';

function CardLeilao({
        rounds,
        dateInit,
        creator, 
        name, 
        ...rest}: CardLeilaoProps) {
    return (
        <div className={styles.cardLeilao} {...rest}>
            <h1 className={styles.name}>{name}</h1>
            <h3 className={styles.subCamp}>Criado por </h3>
            <h2 className={styles.camp}>{creator}</h2>
            <div>
                <h3 className={styles.subCamp}>Data de inicio </h3>
                {/* <h2>{dateInit.toString()}</h2> */}
                <h3 className={styles.subCamp}>Rodadas </h3>
                <h2 className={styles.camp}>{rounds}</h2>
            </div>
        </div>
    )
}

export default CardLeilao;