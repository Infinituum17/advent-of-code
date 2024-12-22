package tools

import (
	"fmt"
	"os"
)

func GetData() string {
	return GetFile("./data.txt")
}

func GetFile(file string) string {
	res, err := os.ReadFile(file)

	if err != nil {
		panic("Could not read file: " + err.Error())
	}

	return string(res)
}

func SolvePart1(day string, data any) {
	fmt.Printf("\n%v: Part 1: %v\n\n", day, data)
}

func SolvePart2(day string, data any) {
	fmt.Printf("\n%v: Part 2: %v\n\n", day, data)
}
