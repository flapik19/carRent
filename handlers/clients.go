package handlers

import (
	"carRent/models"
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DbConn struct {
	С *sql.DB
}

func (h *DbConn) GetClients(c *gin.Context) {
	rows, err := h.С.Query("SELECT ClientId, Fio, Phone, Email, Birthday FROM clients")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer rows.Close()

	mod := []models.Clients{}

	for rows.Next() {
		var client models.Clients
		err = rows.Scan(&client.ClientId, &client.Fio, &client.Phone, &client.Email, &client.Birthday)
		if err != nil {
			return
		}
		mod = append(mod, client)
	}
	c.JSON(http.StatusOK, mod)
}
