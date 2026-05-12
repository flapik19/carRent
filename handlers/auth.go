package handlers

import (
	"carRent/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *DbConn) GetLogin(c *gin.Context) {
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var role string
	err = h.C.QueryRow("select role from users where login = $1 AND password=$2", user.Login, user.Password).Scan(&role)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, role)
}
