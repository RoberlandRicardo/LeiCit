import React from 'react';
import styles from './styles.module.css';
import SearchBar from '../../components/SearchBar';
import CardLeilao from '../../components/CardLeilao';
import { SearchLeilaoProps } from './model';

function SearchLeilao({innerRef, ...rest}: SearchLeilaoProps) {
    return (
        <section className={styles.searchLeilao} ref={innerRef} {...rest}>
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
    )
}

export default SearchLeilao;