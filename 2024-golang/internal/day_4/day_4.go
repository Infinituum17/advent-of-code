package day4

import (
	"strings"

	"github.com/Infinituum17/advent-of-code/internal/tools"
)

var word = []string{"X", "M", "A", "S"}

func Solve() {
	data := tools.GetData()

	SolvePart1(data)
	SolvePart2(data)
}

func SolvePart1(data string) {
	table := BuildTable(data)

	count := 0

	for y := range table {
		for x := range table[y] {
			if table[y][x] == "X" {
				count += Search(table, x, y)
			}
		}
	}

	tools.SolvePart1("Day 4", count)
}

func SolvePart2(data string) {
	table := BuildTable(data)

	count := 0

	for y := range table {
		for x := range table[y] {
			if table[y][x] == "A" {
				if Search2(table, x, y) {
					count++
				}
			}
		}
	}

	tools.SolvePart2("Day 4", count)
}

func Search2(table [][]string, x, y int) bool {
	if x > 0 && x < len(table[y])-1 && y > 0 && y < len(table)-1 {
		if table[y-1][x-1] == "M" && table[y+1][x+1] == "S" || table[y-1][x-1] == "S" && table[y+1][x+1] == "M" {
			if table[y-1][x+1] == "M" && table[y+1][x-1] == "S" || table[y-1][x+1] == "S" && table[y+1][x-1] == "M" {
				return true
			}
		}
	}

	return false
}

func BuildTable(data string) [][]string {
	table := [][]string{}

	for _, row := range strings.Split(data, "\n") {
		table = append(table, strings.Split(row, ""))
	}

	return table
}

func Search(table [][]string, x, y int) int {
	matches := 0

	if SearchE(table, x, y) {
		matches++
	}

	if SearchNE(table, x, y) {
		matches++
	}

	if SearchN(table, x, y) {
		matches++
	}

	if SearchNW(table, x, y) {
		matches++
	}

	if SearchW(table, x, y) {
		matches++
	}

	if SearchSW(table, x, y) {
		matches++
	}

	if SearchS(table, x, y) {
		matches++
	}

	if SearchSE(table, x, y) {
		matches++
	}

	return matches
}

func SearchE(table [][]string, x, y int) bool {
	if x > len(table[y])-len(word) {
		return false
	}

	if table[y][x+1] == word[1] && table[y][x+2] == word[2] && table[y][x+3] == word[3] {
		return true
	}

	return false
}

func SearchNE(table [][]string, x, y int) bool { // 0, 3
	if y-len(word)+1 < 0 || x > len(table[y])-len(word) {
		return false
	}

	if table[y-1][x+1] == word[1] && table[y-2][x+2] == word[2] && table[y-3][x+3] == word[3] {
		return true
	}

	return false
}

func SearchN(table [][]string, x, y int) bool {
	if y-len(word)+1 < 0 {
		return false
	}

	if table[y-1][x] == word[1] && table[y-2][x] == word[2] && table[y-3][x] == word[3] {
		return true
	}

	return false
}

func SearchNW(table [][]string, x, y int) bool {
	if y-len(word)+1 < 0 || x-len(word)+1 < 0 {
		return false
	}

	if table[y-1][x-1] == word[1] && table[y-2][x-2] == word[2] && table[y-3][x-3] == word[3] {
		return true
	}

	return false
}

func SearchW(table [][]string, x, y int) bool {
	if x-len(word)+1 < 0 {
		return false
	}

	if table[y][x-1] == word[1] && table[y][x-2] == word[2] && table[y][x-3] == word[3] {
		return true
	}

	return false
}

func SearchSW(table [][]string, x, y int) bool {
	if y > len(table)-len(word) || x-len(word)+1 < 0 {
		return false
	}

	if table[y+1][x-1] == word[1] && table[y+2][x-2] == word[2] && table[y+3][x-3] == word[3] {
		return true
	}

	return false
}

func SearchS(table [][]string, x, y int) bool {
	if y > len(table)-len(word) {
		return false
	}

	if table[y+1][x] == word[1] && table[y+2][x] == word[2] && table[y+3][x] == word[3] {
		return true
	}

	return false
}

func SearchSE(table [][]string, x, y int) bool {
	if y > len(table)-len(word) || x > len(table[y])-len(word) {
		return false
	}

	if table[y+1][x+1] == word[1] && table[y+2][x+2] == word[2] && table[y+3][x+3] == word[3] {
		return true
	}

	return false
}
