package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Отчет 1: Статистика по машинам (прямо из таблицы)
func (h *DbConn) GetCarsReport(c *gin.Context) {
	type CarStats struct {
		TotalCars      int `json:"total_cars"`
		AvailableCars  int `json:"available_cars"`
		RentedCars     int `json:"rented_cars"`
		AveragePrice   int `json:"average_price"`
	}

	var stats CarStats
	err := h.C.QueryRow(`
		SELECT 
			COUNT(*) as total_cars,
			COUNT(CASE WHEN condition = 'available' THEN 1 END) as available_cars,
			COUNT(CASE WHEN condition = 'rented' THEN 1 END) as rented_cars,
			COALESCE(AVG(price), 0)::int as average_price
		FROM car
	`).Scan(&stats.TotalCars, &stats.AvailableCars, &stats.RentedCars, &stats.AveragePrice)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, stats)
}

// Отчет 2: Аренды клиента по ID (с параметром)
func (h *DbConn) GetClientRentsReport(c *gin.Context) {
	clientId := c.Query("clientId")
	
	if clientId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "clientId parameter required"})
		return
	}

	type RentInfo struct {
		RentId    int    `json:"rent_id"`
		StartDate string `json:"start_date"`
		EndDate   string `json:"end_date"`
		CarBrand  string `json:"car_brand"`
		CarModel  string `json:"car_model"`
		Days      int    `json:"days"`
		TotalCost int    `json:"total_cost"`
	}

	rows, err := h.C.Query(`
		SELECT 
			r.rentid,
			r.startdate,
			r.enddate,
			c.brand,
			c.model,
			rc.days,
			rc.suminday * rc.days as total_cost
		FROM rent r
		JOIN rentcar rc ON r.rentid = rc.rentid
		JOIN car c ON rc.carid = c.carid
		WHERE r.clientid = $1
		ORDER BY r.startdate DESC
	`, clientId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	rents := []RentInfo{}
	for rows.Next() {
		var rent RentInfo
		err = rows.Scan(&rent.RentId, &rent.StartDate, &rent.EndDate, &rent.CarBrand, &rent.CarModel, &rent.Days, &rent.TotalCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		rents = append(rents, rent)
	}

	if len(rents) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "Данных нет"})
		return
	}

	c.JSON(http.StatusOK, rents)
}
