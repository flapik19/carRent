package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func Connect() (*sql.DB, error) {
	conn := "host=localhost port=5432 user=student dbname=carrent sslmode=disable"

	res, err := sql.Open("postgres", conn)

	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	err = res.Ping()
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return res, nil
}
