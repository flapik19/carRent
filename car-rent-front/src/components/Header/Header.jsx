import { Link, useNavigate, useLocation } from "react-router-dom"
import styles from "./Header.module.css"

function Header() {
    useLocation() // перерисовывает Header при смене маршрута
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                RENTCAR
            </Link>
            <nav className={styles.nav}>
                {user ? (
                    <>
                        {user.role === "admin" && (
                            <>
                                <Link to="/admin" className={styles.registerBtn}>
                                    Админ панель
                                </Link>
                                <Link to="/reports" className={styles.registerBtn}>
                                    Отчеты
                                </Link>
                            </>
                        )}
                        <button onClick={handleLogout} className={styles.loginBtn}>
                            Выйти
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className={styles.registerBtn}>
                            Регистрация
                        </Link>
                        <Link to="/login" className={styles.loginBtn}>
                            Войти
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
