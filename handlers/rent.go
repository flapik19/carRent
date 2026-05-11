package handlers

import (
	"carRent/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *DbConn) GetRent(c *gin.Context) {
	rows, err := h.C.Query("SELECT rentid, startdate, enddate, clientid, staffid FROM rent")

	if err != nil {
		fmt.Println(err)
		return
	}
	defer rows.Close()
	model := []models.Rent{}
	for rows.Next() {
		var rent models.Rent
		err = rows.Scan(&rent.RentId, &rent.Startdate, &rent.Enddate, &rent.ClientId, &rent.StaffId)
		if err != nil {
			fmt.Println(err)
			return
		}
		model = append(model, rent)
	}
	c.JSON(http.StatusOK, model)
}
