import { Link } from "react-router-dom"
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                RENTCAR
            </Link>
            <nav className={styles.nav}>
                <Link to="/register" className={styles.registerBtn}>
                    Регистрация
                </Link>
                <Link to="/login" className={styles.loginBtn}>
                    Войти
                </Link>
            </nav>
        </header>
    )
}

export default Header