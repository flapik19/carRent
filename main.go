package main

import (
	"carRent/db"
	"carRent/handlers"
	"fmt"

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

	r.GET("/clients", h.GetClients)
	r.POST("/clients", h.CreateClient)
	r.DELETE("/clients/:id", h.DeleteClient)
	r.PUT("/clients/:id", h.UpdateClient)

	r.GET("/car", h.GetCars)

	r.GET("/rent", h.GetRent)

	r.Run(":8080")
}
