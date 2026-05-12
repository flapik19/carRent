import { Link } from "react-router-dom"
import styles from "./Login.module.css"

function Login() {
    return (
        <div className={styles.page}>
            <form className={styles.form}>
                <Link to="/" className={styles.backBtn}>
                    ← На главную
                </Link>
                <h1 className={styles.title}>Вход</h1>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Введите логин"
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Введите пароль"
                />
                <button className={styles.button} type="submit">
                    Войти
                </button>
                <p className={styles.linkText}>
                    Нет аккаунта?{" "}
                    <Link to="/register" className={styles.link}>
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login