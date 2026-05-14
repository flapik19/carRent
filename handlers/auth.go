package handlers

import (
	"carRent/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func (h *DbConn) GetLogin(c *gin.Context) {
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var role string
	var hash string
	var clientid int

	err = h.C.QueryRow("select role,password,clientid from users where login = $1", user.Login).Scan(&role, &hash, &clientid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(user.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Пароль неверный"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"role": role, "client": clientid})
}
