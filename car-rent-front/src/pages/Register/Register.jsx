import {Link, useNavigate} from "react-router-dom"
import styles from "./Register.module.css"
import {useState} from "react";

function Register() {
    const [login, setlogin] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [retPass, setRetPass] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!login.trim() || !email.trim() || !password.trim() || !retPass.trim()) {
            alert("Заполните все поля")
            return
        }
        if (password === retPass) {
            fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({login, password, email})
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error)
                    } else {
                        navigate("/login")
                    }
                })
        } else {
            alert("Пароли не совпадают")
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Link to="/" className={styles.backBtn}>
                    ← На главную
                </Link>
                <h1 className={styles.title}>Регистрация</h1>
                <input
                    value = {login} onChange={e => setlogin(e.target.value)}
                    className={styles.input}
                    type="text"
                    placeholder="Введите логин"
                />
                <input
                    value={email} onChange={e => setemail(e.target.value)}
                    className={styles.input}
                    type="email"
                    placeholder="Введите email"
                />
                <input
                    value={password} onChange={e => setpassword(e.target.value)}
                    className={styles.input}
                    type="password"
                    placeholder="Введите пароль"
                />
                <input
                    value = {retPass}  onChange={e => setRetPass(e.target.value)}
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