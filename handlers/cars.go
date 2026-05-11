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
