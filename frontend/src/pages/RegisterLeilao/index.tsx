import React from 'react';
import styles from './styles.module.css';
import { RegisterLeilaoProps } from './model';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import CustomButton from '../../components/CustomButton';
import ProgressBar from '../../components/ProgressBar';

function RegisterLeilao({innerRef, ...rest}: RegisterLeilaoProps ) {
    return (
        <section className={styles.registerLeilao} ref={innerRef} {...rest}>
            <h3 className={styles.title}>Cadastrar um novo leilão</h3>
            <form className={styles.formLeilao}>
                <fieldset className={styles.contentForm}>
                    <div className={styles.containerTitle}>
                        <label className={styles.titleLabel}>
                            Informações de entrada
                        </label>
                    </div>
                    <ProgressBar 
                        actualIndex={0}
                        totalItens={2}
                    />
                    <Input labelName='Nome' placeholder='Nome...' />
                    <TextArea style={{minHeight: 100}} labelName='Descrição' 
                        placeholder='Descreva o objetivo da proposta de leilão que você pretende fazer ' />
                    <Input labelName='Pretendo me identificar como' placeholder='Anônimo...' />
                </fieldset>
                <CustomButton className={styles.buttonSubmit} > 
                    Avançar
                </CustomButton>
            </form>
        </section>
    )
}

export default RegisterLeilao;