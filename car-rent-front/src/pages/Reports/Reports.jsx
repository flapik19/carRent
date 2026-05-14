import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Reports.module.css"
import Header from "../../components/Header/Header"

function Reports() {
    const [carStats, setCarStats] = useState(null)
    const [clientId, setClientId] = useState("")
    const [clientRents, setClientRents] = useState(null)

    useEffect(() => {
        // Загружаем статистику по машинам
        fetch("http://localhost:8080/reports/cars")
            .then(res => res.json())
            .then(data => setCarStats(data))
    }, [])

    const handleClientSearch = (e) => {
        e.preventDefault()
        if (!clientId) return

        fetch(`http://localhost:8080/reports/client-rents?clientId=${clientId}`)
            .then(res => res.json())
            .then(data => setClientRents(data))
    }

    return (
        <div className={styles.page}>
            <Header />
            
            <div className={styles.container}>
                <h1 className={styles.title}>Отчеты и аналитика</h1>

                {/* Отчет 1: Статистика по машинам */}
                <div className={styles.report}>
                    <h2>Статистика автопарка</h2>
                    {carStats && (
                        <div className={styles.stats}>
                            <div className={styles.statCard}>
                                <div className={styles.statValue}>{carStats.total_cars}</div>
                                <div className={styles.statLabel}>Всего машин</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statValue}>{carStats.available_cars}</div>
                                <div className={styles.statLabel}>Доступно</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statValue}>{carStats.rented_cars}</div>
                                <div className={styles.statLabel}>В аренде</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statValue}>{carStats.average_price} ₽</div>
                                <div className={styles.statLabel}>Средняя цена/день</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Отчет 2: Аренды клиента */}
                <div className={styles.report}>
                    <h2>История аренд клиента</h2>
                    <form onSubmit={handleClientSearch} className={styles.searchForm}>
                        <input
                            type="number"
                            placeholder="Введите ID клиента"
                            value={clientId}
                            onChange={e => setClientId(e.target.value)}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.searchBtn}>Поиск</button>
                    </form>

                    {clientRents && (
                        clientRents.message ? (
                            <p className={styles.noData}>{clientRents.message}</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Машина</th>
                                        <th>Дата начала</th>
                                        <th>Дата конца</th>
                                        <th>Дней</th>
                                        <th>Сумма</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientRents.map(rent => (
                                        <tr key={rent.rent_id}>
                                            <td>{rent.rent_id}</td>
                                            <td>{rent.car_brand} {rent.car_model}</td>
                                            <td>{rent.start_date?.split("T")[0]}</td>
                                            <td>{rent.end_date?.split("T")[0]}</td>
                                            <td>{rent.days}</td>
                                            <td>{rent.total_cost} ₽</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Reports
