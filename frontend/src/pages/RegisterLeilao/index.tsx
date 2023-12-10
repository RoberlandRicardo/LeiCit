import React, { useState } from 'react';
import styles from './styles.module.css';
import { RegisterLeilaoProps } from './model';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import CustomButton from '../../components/CustomButton';
import ProgressBar from '../../components/ProgressBar';
import useRegisterLeilaoViewModel from './view.model';

function RegisterLeilao({innerRef, ...rest}: RegisterLeilaoProps ) {

    const {indexRegister, setIndexRegister, newLeilao, setNewLeilao, registerLeilao} = useRegisterLeilaoViewModel({innerRef, ...rest});

    function renderFirstRegister() {
        return (
            <>
                <fieldset className={styles.contentForm}>
                    <div className={styles.containerTitle}>
                        <label className={styles.titleLabel}>
                            Informações de entrada
                        </label>
                    </div>
                    <ProgressBar 
                        actualIndex={indexRegister}
                        totalItens={2}
                    />
                <Input 
                    labelName='Nome' 
                    placeholder='Nome...'
                    onChange={(e) => {
                        setNewLeilao({
                            ...newLeilao,
                            name: e.target.value
                        })
                    }} />
                <TextArea 
                    style={{minHeight: 100}} 
                    labelName='Descrição' 
                    placeholder='Descreva o objetivo da proposta de leilão que você pretende fazer '
                    onChange={(e) => {
                        setNewLeilao({
                            ...newLeilao,
                            description: e.target.value
                        })
                    }} />
                <Input 
                    labelName='Pretendo me identificar como' 
                    placeholder='Anônimo...'
                    onChange={(e) => {
                        setNewLeilao({
                            ...newLeilao,
                            buyerName: e.target.value
                        })
                    }} />
                </fieldset>
                <CustomButton className={styles.buttonSubmit} onClick={() => setIndexRegister(1)} > 
                    Avançar
                </CustomButton>
            </>
        )
    }

    function renderSecondaryRegister() {
        return (
            <>
                <fieldset className={styles.contentForm}>
                    <div className={styles.containerTitle}>
                        <label className={styles.titleLabel}>
                            Informações de entrada
                        </label>
                    </div>
                    <ProgressBar 
                        actualIndex={indexRegister}
                        totalItens={2}
                    />
                    <Input 
                        labelName='Número de rodadas' 
                        type='number' 
                        placeholder='0'
                        onChange={(e) => {
                            setNewLeilao({
                                ...newLeilao,
                                numberRounds: parseInt(e.target.value)
                            })
                        }} />
                    <Input 
                        labelName='Duração de cada rodada (horas)' 
                        type='number' 
                        placeholder='0'
                        onChange={(e) => {
                            setNewLeilao({
                                ...newLeilao,
                                durationBetweenRounds: parseInt(e.target.value)
                            })
                        }} />
                    <Input labelName='Data inicio' type='date' placeholder='0' />
                </fieldset>
                <div className={styles.containerButtons}>
                    <CustomButton outline className={`${styles.buttonSubmit} ${styles.buttonReturn}`} onClick={() => setIndexRegister(0)} > 
                        Retornar
                    </CustomButton>
                    <CustomButton 
                        className={styles.buttonSubmit} 
                        onClick={() => registerLeilao()} > 
                        Concluir
                    </CustomButton>
                </div>
            </>
        )
    }

    return (
        <section className={styles.registerLeilao} ref={innerRef} {...rest}>
            <h3 className={styles.title}>Cadastrar um novo leilão</h3>
            <form className={styles.formLeilao}>
                {
                    indexRegister == 0 ? renderFirstRegister() : renderSecondaryRegister()
                }
            </form>
        </section>
    )
}

export default RegisterLeilao;