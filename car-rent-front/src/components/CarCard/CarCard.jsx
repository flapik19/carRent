import styles from "./CarCard.module.css"

function CarCard({ car }) {
    return (
        <div className={styles.card}>
            <h2>
                {car.brand} {car.model}
            </h2>

            <p>{car.year}</p>
            <p>{car.price} ₽</p>

            <button>
                Арендовать
            </button>
        </div>
    )
}

export default CarCard