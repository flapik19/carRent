package handlers

import (
	"carRent/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *DbConn) CreateRentCar(c *gin.Context) {
	var rentcar models.RentCar
	err := c.ShouldBindJSON(&rentcar)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = h.C.Exec("INSERT INTO rentcar (rentid,carid,suminday,days) VALUES ($1,$2,$3,$4)",
		rentcar.RentID, rentcar.CarId, rentcar.SumInDay, rentcar.Days)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rentcar})
}
