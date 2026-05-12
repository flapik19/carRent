import {Link, useNavigate} from "react-router-dom"
import styles from "./Login.module.css"
import {useState} from "react";

function Login() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password })
        })
            .then(res => res.json())
            .then(role => {
                console.log(role);
                if (role === "admin") navigate("/admin")
                else if (role === "manager") navigate("/manager")
                else navigate("/home")
            })
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Link to="/" className={styles.backBtn}>
                    ← На главную
                </Link>
                <h1 className={styles.title}>Вход</h1>
                <input
                    value={login} onChange={e => setLogin(e.target.value)}
                    className={styles.input}
                    type="text"
                    placeholder="Введите логин"
                />
                <input
                    value={password} onChange={e => setPassword(e.target.value)}
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