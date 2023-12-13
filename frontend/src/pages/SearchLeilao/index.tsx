import React from 'react';
import styles from './styles.module.css';
import SearchBar from '../../components/SearchBar';
import CardLeilao from '../../components/CardLeilao';
import { SearchLeilaoProps } from './model';
import TopBar from '../../components/TopBar';

function SearchLeilao({...rest}: SearchLeilaoProps) {
    return (
        <main>
            <TopBar />
            <section className={styles.searchLeilao} {...rest}>
                <h3 className={styles.title} >Leilões Abertos</h3>
                <SearchBar className={styles.searchBar} placeholder='Busque por endereço ou nome...' />
                <main className={styles.contentLeilaos}>
                    <CardLeilao 
                        dateInit={new Date()}
                        creator='Roberland'
                        name='Liscitação da Cantina'
                        rounds={3}
                        onClickDetail={() => console.log('Teste')}
                    />
                    <CardLeilao 
                        dateInit={new Date()}
                        creator='Roberland'
                        name='Liscitação da Cantina'
                        rounds={3}
                        onClickDetail={() => console.log('Teste')}
                    />
                    <CardLeilao 
                        dateInit={new Date()}
                        creator='Roberland'
                        name='Liscitação da Cantina'
                        rounds={3}
                        onClickDetail={() => console.log('Teste')}
                    />
                </main>
            </section>
        </main>
    )
}

export default SearchLeilao;