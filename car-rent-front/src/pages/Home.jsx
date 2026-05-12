import { useEffect, useState } from "react"
import { Card, CardContent, Typography, Grid, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

function Home() {
    const [cars, setCars] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:8080/car")
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>Прокат автомобилей</Typography>
            <Button variant="contained" onClick={() => navigate("/login")}>Войти</Button>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                {cars.map(car => (
                    <Grid item xs={12} sm={6} md={4} key={car.carid}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{car.brand} {car.model}</Typography>
                                <Typography>Год: {car.year}</Typography>
                                <Typography>Цена в день: {car.price} руб.</Typography>
                                <Typography>Состояние: {car.condition}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Home