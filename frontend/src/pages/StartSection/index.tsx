import React from 'react';
import styles from './styles.module.css';
import Martelo from '../../assets/martelo.png';
import CustomButton from '../../components/CustomButton';
import { StartSectionProps } from './model';
import TopBar from '../../components/TopBar';

function StartSection({...rest}: StartSectionProps) {
    return (
        <main>
            <TopBar />
            <section className={styles.startSection} >
                <div className={styles.textContainer}>
                    <h1 className={styles.titleWelcome}>Bem vindo ao LeiCit</h1>
                    <h4 className={styles.subTitleWelcome}>Seja você o ofertante: Crie sugestões de leilões online 
                        usando cripto e deixe que os outros te façam as propostas. </h4>
                    <div className={styles.buttonContainer}>
                        <CustomButton>
                            Novo leilão
                        </CustomButton>
                        <CustomButton outline>
                            Leilões Aberto
                        </CustomButton>
                    </div>
                </div>
                <img className={styles.hammer} src={Martelo} />
            </section>
        </main>
    )
}

export default StartSection;