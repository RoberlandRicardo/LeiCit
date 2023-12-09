import React from 'react';
import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import { CustomButtonProps } from './model';

function CustomButton({outline, ...rest}: CustomButtonProps) {
    return (
        <button className={`
            ${styles.customButton} 
            ${outline ? styles.textOutline : styles.textDefault}
        `} {...rest}/>
    )
}

export default CustomButton;