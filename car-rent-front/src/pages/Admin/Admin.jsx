import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Admin.module.css"

function Admin() {
    const [activeTab, setActiveTab] = useState("cars")
    const [cars, setCars] = useState([])
    const [clients, setClients] = useState([])
    const [rents, setRents] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editItem, setEditItem] = useState(null)

    const API_URL = "http://localhost:8080"

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch(`${API_URL}/car`)
            .then(res => res.json())
            .then(data => setCars(data))

        fetch(`${API_URL}/clients`)
            .then(res => res.json())
            .then(data => setClients(data))

        fetch(`${API_URL}/rent`)
            .then(res => res.json())
            .then(data => setRents(data))
    }

    const handleDelete = (type, id) => {
        if (!window.confirm("Удалить запись?")) return

        const endpoints = {
            cars: `${API_URL}/car/${id}`,
            clients: `${API_URL}/clients/${id}`,
            rents: `${API_URL}/rent/${id}`
        }

        fetch(endpoints[type], { method: "DELETE" })
            .then(() => fetchData())
    }

    const handleEdit = (type, item) => {
        setEditItem({ type, ...item })
        setShowModal(true)
    }

    const handleAdd = (type) => {
        setEditItem({ type })
        setShowModal(true)
    }

    return (
        <div className={styles.page}>
            <Link to="/" className={styles.backBtn}>← На главную</Link>

            <h1 className={styles.title}>Панель администратора</h1>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "cars" ? styles.active : ""}`}
                    onClick={() => setActiveTab("cars")}
                >
                    🚗 Автомобили
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "clients" ? styles.active : ""}`}
                    onClick={() => setActiveTab("clients")}
                >
                    👥 Клиенты
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "rents" ? styles.active : ""}`}
                    onClick={() => setActiveTab("rents")}
                >
                    📋 Аренда
                </button>
            </div>

            <div className={styles.tableContainer}>
                {activeTab === "cars" && (
                    <>
                        <button onClick={() => handleAdd("cars")} className={styles.addBtn}>
                            + Добавить автомобиль
                        </button>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Бренд</th>
                                <th>Модель</th>
                                <th>Год</th>
                                <th>Номер</th>
                                <th>Цена/день</th>
                                <th>Состояние</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cars.map(car => (
                                <tr key={car.carid}>
                                    <td>{car.carid}</td>
                                    <td>{car.brand}</td>
                                    <td>{car.model}</td>
                                    <td>{car.year}</td>
                                    <td>{car.number}</td>
                                    <td>{car.price} ₽</td>
                                    <td>
                                            <span className={`${styles.badge} ${car.condition === "available" ? styles.green : styles.red}`}>
                                                {car.condition}
                                            </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <button onClick={() => handleEdit("cars", car)} className={styles.editBtn}>
                                            ✏️
                                        </button>
                                        <button onClick={() => handleDelete("cars", car.carid)} className={styles.deleteBtn}>
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}

                {activeTab === "clients" && (
                    <>
                        <button onClick={() => handleAdd("clients")} className={styles.addBtn}>
                            + Добавить клиента
                        </button>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>ФИО</th>
                                <th>Телефон</th>
                                <th>Email</th>
                                <th>Дата рождения</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map(client => (
                                <tr key={client.client_id}>
                                    <td>{client.client_id}</td>
                                    <td>{client.fio}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.email}</td>
                                    <td>{client.birthday?.split("T")[0]}</td>
                                    <td className={styles.actions}>
                                        <button onClick={() => handleEdit("clients", client)} className={styles.editBtn}>
                                            ✏️
                                        </button>
                                        <button onClick={() => handleDelete("clients", client.client_id)} className={styles.deleteBtn}>
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}

                {activeTab === "rents" && (
                    <>
                        <button onClick={() => handleAdd("rents")} className={styles.addBtn}>
                            + Добавить аренду
                        </button>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Дата начала</th>
                                <th>Дата конца</th>
                                <th>ID клиента</th>
                                <th>ID сотрудника</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rents.map(rent => (
                                <tr key={rent.rent_id}>
                                    <td>{rent.rent_id}</td>
                                    <td>{rent.start_date?.split("T")[0]}</td>
                                    <td>{rent.end_date?.split("T")[0]}</td>
                                    <td>{rent.client_id}</td>
                                    <td>{rent.staff_id}</td>
                                    <td className={styles.actions}>
                                        <button onClick={() => handleEdit("rents", rent)} className={styles.editBtn}>
                                            ✏️
                                        </button>
                                        <button onClick={() => handleDelete("rents", rent.rent_id)} className={styles.deleteBtn}>
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            {showModal && (
                <Modal
                    editItem={editItem}
                    onClose={() => setShowModal(false)}
                    onSave={() => { setShowModal(false); fetchData() }}
                />
            )}
        </div>
    )
}

function Modal({ editItem, onClose, onSave }) {
    const [formData, setFormData] = useState(editItem || {})

    const handleSubmit = (e) => {
        e.preventDefault()
        const isEdit = editItem.rent_id || editItem.client_id || editItem.carid

        const urlBase = {
            cars: "http://localhost:8080/car",
            clients: "http://localhost:8080/clients",
            rents: "http://localhost:8080/rent"
        }

        const idField = {
            cars: "carid",
            clients: "client_id",
            rents: "rent_id"
        }

        const url = isEdit
            ? `${urlBase[editItem.type]}/${editItem[idField[editItem.type]]}`
            : urlBase[editItem.type]

        fetch(url, {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(() => onSave())
    }

    const renderFields = () => {
        switch(editItem.type) {
            case "cars":
                return (
                    <>
                        <input placeholder="Car ID" type="number" value={formData.carid || ""} onChange={e => setFormData({...formData, carid: parseInt(e.target.value)})} />
                        <input placeholder="Бренд" value={formData.brand || ""} onChange={e => setFormData({...formData, brand: e.target.value})} />
                        <input placeholder="Модель" value={formData.model || ""} onChange={e => setFormData({...formData, model: e.target.value})} />
                        <input placeholder="Год" type="number" value={formData.year || ""} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} />
                        <input placeholder="Номер" value={formData.number || ""} onChange={e => setFormData({...formData, number: e.target.value})} />
                        <input placeholder="Цена" type="number" value={formData.price || ""} onChange={e => setFormData({...formData, price: parseInt(e.target.value)})} />
                        <input placeholder="Состояние" value={formData.condition || ""} onChange={e => setFormData({...formData, condition: e.target.value})} />
                    </>
                )
            case "clients":
                return (
                    <>
                        <input placeholder="Client ID" type="number" value={formData.client_id || ""} onChange={e => setFormData({...formData, client_id: parseInt(e.target.value)})} />
                        <input placeholder="ФИО" value={formData.fio || ""} onChange={e => setFormData({...formData, fio: e.target.value})} />
                        <input placeholder="Телефон" value={formData.phone || ""} onChange={e => setFormData({...formData, phone: e.target.value})} />
                        <input placeholder="Email" type="email" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
                        <input placeholder="Дата рождения" type="date" value={formData.birthday?.split("T")[0] || ""} onChange={e => setFormData({...formData, birthday: e.target.value})} />
                    </>
                )
            case "rents":
                return (
                    <>
                        <input placeholder="Rent ID" type="number" value={formData.rent_id || ""} onChange={e => setFormData({...formData, rent_id: parseInt(e.target.value)})} />
                        <input placeholder="Дата начала" type="date" value={formData.start_date?.split("T")[0] || ""} onChange={e => setFormData({...formData, start_date: e.target.value})} />
                        <input placeholder="Дата конца" type="date" value={formData.end_date?.split("T")[0] || ""} onChange={e => setFormData({...formData, end_date: e.target.value})} />
                        <input placeholder="Client ID" type="number" value={formData.client_id || ""} onChange={e => setFormData({...formData, client_id: parseInt(e.target.value)})} />
                        <input placeholder="Staff ID" type="number" value={formData.staff_id || ""} onChange={e => setFormData({...formData, staff_id: parseInt(e.target.value)})} />
                    </>
                )
        }
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h2>{editItem.rent_id || editItem.client_id || editItem.carid ? "Редактировать" : "Добавить"}</h2>
                <form onSubmit={handleSubmit}>
                    {renderFields()}
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.saveBtn}>Сохранить</button>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Admin