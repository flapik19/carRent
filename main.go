package main

import (
	"carRent/db"
	"carRent/handlers"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	conn, err := db.Connect()
	if err != nil {
		fmt.Println("Ошибка подключения", err)
		return
	}
	fmt.Println("Подключение успешно!", conn)

	h := handlers.DbConn{C: conn}
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/clients", h.GetClients)
	r.POST("/clients", h.CreateClient)
	r.DELETE("/clients/:id", h.DeleteClient)
	r.PUT("/clients/:id", h.UpdateClient)

	r.GET("/car", h.GetCars)
	r.POST("/car", h.CreateCar)
	r.DELETE("/car/:id", h.DeleteCar)
	r.PUT("/car/:id", h.UpdateCar)

	r.POST("/login", h.GetLogin)
	r.POST("/register", h.Register)

	r.GET("/rent", h.GetRent)
	r.POST("/rent", h.CreateRent)
	r.DELETE("/rent/:id", h.DeleteRent)
	r.PUT("/rent/:id", h.UpdateRent)

	r.Run(":8080")
}
