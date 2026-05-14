package handlers

import (
	"carRent/models"
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DbConn struct {
	C *sql.DB
}

func (h *DbConn) GetClients(c *gin.Context) {
	// Подзапрос 2: SELECT с ORDER BY и OFFSET
	rows, err := h.C.Query(`
		SELECT ClientId, Fio, Phone, Email, Birthday 
		FROM clients 
		ORDER BY fio ASC 
		OFFSET 0
	`)
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

func (h *DbConn) CreateClient(c *gin.Context) {
	var client models.Clients
	err := c.ShouldBindJSON(&client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, err = h.C.Exec("INSERT INTO clients (clientid, fio, phone, email, birthday) VALUES ($1, $2, $3, $4, $5)", client.ClientId, client.Fio, client.Phone, client.Email, client.Birthday)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusCreated, client)
}

func (h *DbConn) DeleteClient(c *gin.Context) {
	Id := c.Param("id")
	_, err := h.C.Exec("DELETE FROM clients WHERE clientid=$1", Id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusNoContent, nil)
}

func (h *DbConn) UpdateClient(c *gin.Context) {
	var client models.Clients
	Id := c.Param("id")
	err := c.ShouldBindJSON(&client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	_, err = h.C.Exec("UPDATE	clients SET fio=$1, phone=$2, email = $3, birthday=$4 WHERE clientid=$5", client.Fio, client.Phone, client.Email, client.Birthday, Id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, client)
}
