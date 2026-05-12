package handlers

import (
	"carRent/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *DbConn) GetCars(c *gin.Context) {
	rows, err := h.C.Query("Select carid, brand, model, year, number, price, condition from car")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer rows.Close()

	mode := []models.Car{}
	for rows.Next() {
		var car models.Car
		err = rows.Scan(&car.Carid, &car.Brand, &car.Model, &car.Year, &car.Number, &car.Price, &car.Condition)
		if err != nil {
			fmt.Println(err)
			return
		}
		mode = append(mode, car)
	}
	c.JSON(http.StatusOK, mode)
}

func (h *DbConn) CreateCar(c *gin.Context) {
	var car models.Car
	err := c.ShouldBindJSON(&car)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	_, err = h.C.Exec("INSERT INTO CAR (carid, brand, model, year, number, price, condition) VALUES  ($1, $2, $3,$4,$5,$6,$7)",
		car.Carid, car.Brand, car.Model, car.Year, car.Number, car.Price, car.Condition)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusCreated, car)
}

func (h *DbConn) DeleteCar(c *gin.Context) {
	Id := c.Param("id")
	_, err := h.C.Exec("DELETE FROM car WHERE carid=$1", Id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusNoContent, nil)
}

func (h *DbConn) UpdateCar(c *gin.Context) {
	var car models.Car
	Id := c.Param("id")
	err := c.ShouldBindJSON(&car)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	_, err = h.C.Exec("UPDATE car SET brand=$1, model=$2, year=$3, number=$4, price=$5, condition=$6 where carid=$7", car.Brand, car.Model, car.Year, car.Number, car.Price, car.Condition, Id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, car)
}
