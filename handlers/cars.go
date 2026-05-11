package handlers

import "github.com/gin-gonic/gin"

func (h *DbConn) GetCars(c *gin.Context) {
	rows, err := h.C.Query("Select ")
}
