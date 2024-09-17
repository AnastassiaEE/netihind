import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div className="flex justify-center items-center absolute w-full h-full z-50 bg-primary">
            <span className={styles.loader}></span>
        </div>
    );
}
