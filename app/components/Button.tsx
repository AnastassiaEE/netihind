import { ReactNode } from 'react';
import styles from '../styles/Button.module.css';

export default function Button({
    children 
}:{
    children: ReactNode
}) {
    return (
        <button className={styles.btn}> {children} </button>
    )
}