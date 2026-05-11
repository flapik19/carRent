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

	h := handlers.DbConn{С: conn}
	r := gin.Default()
	r.GET("/clients", h.GetClients)
	r.Run(":8080")
}
