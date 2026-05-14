package models

type Clients struct {
	ClientId int    `json:"client_id"`
	Phone    string `json:"phone"`
	Fio      string `json:"fio"`
	Email    string `json:"email"`
	Birthday string `json:"birthday"`
}

type Car struct {
	Carid     int    `json:"carid"`
	Brand     string `json:"brand"`
	Model     string `json:"model"`
	Year      int    `json:"year"`
	Number    string `json:"number"`
	Price     int    `json:"price"`
	Condition string `json:"condition"`
}

type Staff struct {
	StaffId int    `json:"staff_id"`
	Fio     string `json:"fio"`
	Number  string `json:"number"`
	PostId  int    `json:"post_id"`
}

type Rent struct {
	RentId    int    `json:"rent_id"`
	Startdate string `json:"start_date"`
	Enddate   string `json:"end_date"`
	ClientId  int    `json:"client_id"`
	StaffId   int    `json:"staff_id"`
}

type User struct {
	UserId   int    `json:"user_id"`
	Login    string `json:"login"`
	Password string `json:"password"`
	Role     string `json:"role"`
	ClientId int    `json:"client_id"`
}

type Req struct {
	Login    string `json:"login"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type RentCar struct {
	RentID   int `json:"rentid"`
	CarId    int `json:"carid"`
	SumInDay int `json:"suminday"`
	Days     int `json:"days"`
}
