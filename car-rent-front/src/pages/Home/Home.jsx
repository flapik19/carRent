import { useEffect, useState } from "react"

import Header from "../../components/Header/Header"
import CarList from "../../components/CarList/CarList"

import styles from "./Home.module.css"

function Home() {
    const [cars, setCars] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/car")
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])

    return (
        <div className={styles.page}>
            <Header />

            <CarList cars={cars} />
        </div>
    )
}
export default Home