import CarCard from "../CarCard/CarCard"
import styles from "./CarList.module.css"

function CarList({ cars }) {
    return (
        <div className={styles.grid}>
            {cars.map(car => (
                <CarCard
                    key={car.carid}
                    car={car}
                />
            ))}
        </div>
    )
}

export default CarList