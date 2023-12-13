import React from 'react';
import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import { CustomButtonProps } from './model';

function CustomButton({outline, className, onClick, disabled, ...rest}: CustomButtonProps) {
    return (
        <button className={`
            ${styles.customButton} 
            ${disabled ? styles.disabled :
                outline ? styles.textOutline : styles.textDefault} 
            ${className}
        `} 
            onClick={(e) => {
                e.preventDefault();
                onClick && onClick(e);
            }}
            disabled={disabled}
        {...rest}/>
    )
}

export default CustomButton;