import React, { useEffect } from 'react';
import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import { TopBarProps } from './model';

function TopBar({
    startSectionRef,
    searchLeilaoRef,
    registerLeilaoRef
}: TopBarProps) {


    return (
        <header>
            <img className={styles.logo} src={logo} />
            <div>
                <a onClick={() => searchLeilaoRef.current.scrollIntoView()}>Leilões Abertos</a>
                <a onClick={() => registerLeilaoRef.current.scrollIntoView()}>Novo Leilão</a>
                <a onClick={() => console.log("Teste")}>CIToken</a>
                <a onClick={() => console.log("Teste")}>Sobre</a>
            </div>
        </header>
    )
}

export default TopBar;