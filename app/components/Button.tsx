import { ReactNode } from 'react';
import styles from '../styles/Button.module.css';

export default function Button({
    children, 
    active
}:{
    children: ReactNode, 
    active: boolean
}) {
    return (
        <button className={styles.btn} disabled={!active}> {children} </button>
    )
}