import React, { useEffect } from 'react';
import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import { TopBarProps } from './model';
import { useNavigate } from 'react-router-dom';

function TopBar({
}: TopBarProps) {

    const navigate = useNavigate();

    return (
        <header className={styles.topBar}>
            <img className={styles.logo} src={logo} />
            <div>
                <a onClick={() => navigate("/search")}>Leilões Abertos</a>
                <a onClick={() => navigate("/register")}>Novo Leilão</a>
                <a onClick={() => console.log("Teste")}>CIToken</a>
                <a onClick={() => console.log("Teste")}>Sobre</a>
            </div>
        </header>
    )
}

export default TopBar;