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

func (h *DbConn) CreateRent(c *gin.Context) {
	var rent models.Rent
	err := c.ShouldBindJSON(&rent)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, err = h.C.Exec("INSERT INTO rent (rentid,startdate,enddate,clientid ,staffid ) VALUES ($1, $2, $3, $4, $5)", rent.RentId, rent.Startdate, rent.Enddate, rent.ClientId, rent.StaffId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusCreated, rent)
}

func (h *DbConn) DeleteRent(c *gin.Context) {
	Id := c.Param("id")
	_, err := h.C.Exec("DELETE FROM rent WHERE rentid=$1", Id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusNoContent, nil)
}

func (h *DbConn) UpdateRent(c *gin.Context) {
	var rent models.Rent
	Id := c.Param("id")
	err := c.ShouldBindJSON(&rent)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	_, err = h.C.Exec("UPDATE	rent SET startdate=$1, enddate=$2, clientid = $3, staffid=$4 WHERE rentid=$5", rent.Startdate, rent.Enddate, rent.ClientId, rent.StaffId, Id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, rent)
}
