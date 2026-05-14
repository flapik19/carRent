package handlers

import (
	"carRent/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func (h *DbConn) Register(c *gin.Context) {
	var req models.Req
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var clientId int
	err = h.C.QueryRow("select clientid from clients where email=$1", req.Email).Scan(&clientId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Пользователь с таким email не сущетсвует"})
		return
	}

	var existingId int
	err = h.C.QueryRow("SELECT userid FROM users WHERE login=$1", req.Login).Scan(&existingId)
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Логин уже занят"})
		return
	}

	_, err = h.C.Exec("INSERT INTO users (login, password, role, clientid) VALUES  ($1, $2, $3, $4)",
		req.Login, string(hashPassword), "client", clientId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, req)
}
