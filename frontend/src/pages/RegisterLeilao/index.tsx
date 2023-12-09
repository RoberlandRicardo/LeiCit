import React from 'react';
import styles from './styles.module.css';
import { RegisterLeilaoProps } from './model';
import Input from '../../components/Input';

function RegisterLeilao({innerRef, ...rest}: RegisterLeilaoProps ) {
    return (
        <section className={styles.registerLeilao} ref={innerRef} {...rest}>
            <h3 className={styles.title}>Cadastrar um novo leilão</h3>
            <form className={styles.formLeilao}>
                <fieldset>
                    <div className={styles.containerTitle}>
                        <label className={styles.titleLabel}>
                            Insira as informações do novo Leilão
                        </label>
                    </div>
                    <Input labelName='Nome' />
                </fieldset>
            </form>
        </section>
    )
}

export default RegisterLeilao;