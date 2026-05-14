import styles from "./CarCard.module.css"
import {useState} from "react";

import RentModal from "../RentModal/RentModal.jsx";

function CarCard({ car }) {
    const [sost, setsost] = useState(false)

    return (
        <div className={styles.card}>
            <h2>
                {car.brand} {car.model}
            </h2>

            <p>{car.year}</p>
            <p>{car.price} ₽</p>

            <button onClick={() => setsost(true)}>
                Арендовать
            </button>

            {sost && (<RentModal
                car ={car}
                onclose={() => setsost(false)}
                onSuccess={() => setsost(false)}
            />
            )}
        </div>
    )
}

export default CarCard