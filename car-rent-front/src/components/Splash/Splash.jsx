import { useEffect } from "react"
import styles from "./Splash.module.css"

function Splash({ onFinish }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish()
        }, 3000) // 3 секунды

        return () => clearTimeout(timer)
    }, [onFinish])

    return (
        <div className={styles.splash}>
            <div className={styles.content}>
                <h1 className={styles.title}>🚗 RENTCAR</h1>
                <p className={styles.subtitle}>Система управления арендой автомобилей</p>
                <div className={styles.info}>
                    <p>База данных: PostgreSQL</p>
                    <p>Курсовая работа по дисциплине "Базы данных"</p>
                    <p className={styles.theme}>Тема: Автоматизация процесса аренды автомобилей</p>
                </div>
                <div className={styles.loader}></div>
            </div>
        </div>
    )
}

export default Splash
