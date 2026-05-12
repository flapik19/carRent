import { Link } from "react-router-dom"
import styles from "./Register.module.css"

function Register() {
    return (
        <div className={styles.page}>
            <form className={styles.form}>
                <Link to="/" className={styles.backBtn}>
                    ← На главную
                </Link>
                <h1 className={styles.title}>Регистрация</h1>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Введите логин"
                />
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Введите email"
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Введите пароль"
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Повторите пароль"
                />
                <button className={styles.button} type="submit">
                    Зарегистрироваться
                </button>
                <p className={styles.linkText}>
                    Уже есть аккаунт?{" "}
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register