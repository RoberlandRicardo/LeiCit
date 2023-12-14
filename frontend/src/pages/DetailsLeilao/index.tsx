import React, { useState } from 'react';
import styles from './styles.module.css';
import useDetailsLeilaoViewModel from './view.model';
import TopBar from '../../components/TopBar';
import Card from '../../components/Card';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import 'material-symbols';
import { ItemTableProps } from './model';

function ItemTable({ value }: ItemTableProps) {
    return (
        <tr className={styles.itemTable}>
            <td>{value} wei</td>
            <td>Anônimo</td>
        </tr>
    )
}

function DetailsLeilao({...rest}) {

    const { loadedLeilao, address, valueBid, setValueBid, doBid } = useDetailsLeilaoViewModel({...rest});

    return (
        <main>
            <TopBar />
            <section>
                <header className={styles.headerDetails}>
                    <h1 className={styles.name}>{loadedLeilao?.name}</h1>
                    <div className={styles.containerAddress} >
                        <h2 className={styles.address}>
                            Endereço: {address}
                        </h2>
                        <a className={styles.iconCopy} onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(address as string);
                        }}>
                            <span className="material-symbols-outlined">
                                content_copy
                            </span>
                        </a>
                    </div>
                </header>
                <main className={styles.content} >
                    <div className={styles.containerCard}>
                        <Card className={styles.cardNewDeal} >
                            <h3 className={styles.titleCard}> Novo lance</h3>
                            <Input
                                value={valueBid}
                                labelName='valor (wei)'
                                type='number'
                                placeholder='0'
                                onChange={(e) => {
                                    setValueBid(parseInt(e.target.value))
                                }}
                            />
                            <CustomButton style={{
                                alignSelf: 'flex-end',
                                width: 110,
                                height: 30,
                                fontSize: 12
                            }} onClick={() => doBid()} >
                                Enviar
                            </CustomButton>
                        </Card>
                        <Card className={styles.cardRounds} >
                        </Card>
                    </div>
                    <Card className={styles.cardBidList} >
                        <h3 className={styles.titleCard}>Rodada {loadedLeilao?.actualRound.toString()} </h3>
                        <table>
                            <thead className={styles.tableHeader}>
                                <tr >
                                    <th>Quantidade</th>
                                    <th>Identificado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ItemTable value={1000000000} minValue />
                                <ItemTable value={1000000000} />
                                <ItemTable value={1000000000} />
                            </tbody>
                        </table>
                    </Card>
                    
                </main>
            </section>
        </main>
    )
}

export default DetailsLeilao;