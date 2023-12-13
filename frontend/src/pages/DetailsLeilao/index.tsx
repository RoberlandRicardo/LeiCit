import React, { useState } from 'react';
import styles from './styles.module.css';
import useDetailsLeilaoViewModel from './view.model';
import TopBar from '../../components/TopBar';

function DetailsLeilao({...rest}) {

    const {} = useDetailsLeilaoViewModel({...rest});

    return (
        <main>
            <TopBar />
            <section>
                <header className={styles.headerDetails}>
                    <h1 className={styles.name}></h1>
                    <h2 className={styles.address}></h2>
                </header>
            </section>
        </main>
    )
}

export default DetailsLeilao;