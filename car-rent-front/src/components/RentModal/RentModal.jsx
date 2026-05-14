import {useState} from "react";
import styles from "./RentModal.module.css";
import { createPortal } from "react-dom"


function RentModal ({car, onclose, onSuccess}) {
    const  [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!startDate || !endDate) {
            alert("Выберите даты аренды")
            return
        }
        
        const user = JSON.parse(localStorage.getItem("user"))

        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))

        fetch("http://localhost:8080/rent", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                start_date: startDate,
                end_date: endDate,
                client_id: user.clientid,
                staff_id: 1
            })
        }) .then(res => res.json())
            .then(data => {
                return fetch("http://localhost:8080/rentcar", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        rentid: data.rent_id,
                        carid: car.carid,
                        suminday: car.price,
                        days: days
                    })
                })
            })
            .then(() => {
                onSuccess()
            })
    }

    return createPortal(
        <div className={styles.overlay} onClick={onclose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h2 className={styles.title}>Аренда: {car.brand} {car.model}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>Дата начала</label>
                    <input
                        className={styles.input}
                        value={startDate} onChange={e => setStartDate(e.target.value)}
                        type="date"/>
                    <label className={styles.label}>Дата окончания</label>
                    <input
                        className={styles.input}
                        value={endDate} onChange={e => setEndDate(e.target.value)}
                        type="date"/>
                    <div className={styles.actions}>
                        <button className={styles.submitBtn} type="submit">Арендовать</button>
                        <button className={styles.cancelBtn} type="button" onClick={onclose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>,
    document.body
    )
}
export default RentModal