import styles from "./Loader.module.css"

export default function Loader() {
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-primary">
            <span className={styles.loader}></span>
        </div>
    )
}