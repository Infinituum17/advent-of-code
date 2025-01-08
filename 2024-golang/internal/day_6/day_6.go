package day6

import (
	"fmt"
	"strings"

	"github.com/Infinituum17/advent-of-code/internal/tools"
)

type Position struct {
	x, y int
}

type Direction struct {
	v, h int
}

type Guard struct {
	pos Position
	dir Direction
}

type Table [][]string

func Solve() {
	data := tools.GetData()

	SolvePart1(data)
}

func SolvePart1(data string) {
	table, guard := ParseTable(data)
	path := TracePath(table, guard)
	count := CountSpots(path)

	tools.SolvePart1("Day 6", count)
}

func LocateGuard(data Table) Guard {
	for y := range data {
		for x := range data[y] {
			current := data[y][x]

			if current == "^" {
				return Guard{pos: Position{x, y}, dir: Direction{1, 0}}
			}
		}
	}

	panic("No Guard was found")
}

func ParseTable(data string) (Table, Guard) {
	table := [][]string{}
	guard := Guard{}

	for y, line := range strings.Split(data, "\n") {
		table = append(table, []string{})
		for x, c := range line {
			v := string(c)
			table[y] = append(table[y], v)

			if v == "^" {
				guard.pos = Position{x, y}
				guard.dir = Direction{1, 0}
			}
		}
	}

	return table, guard
}

func TracePath(table Table, guard Guard) Table {
	pathTable := CreatePathTable(table)
	x := guard.pos.x
	y := guard.pos.y

	pathTable[y][x] = "x"

	for {
		// PrintTable(pathTable)
		nextX, nextY := NextPosition(x, y, guard.dir)

		if nextY >= 0 && nextY < len(table) && nextX >= 0 && nextX < len(table[0]) {
			if table[nextY][nextX] != "#" {
				x, y = nextX, nextY
				pathTable[nextY][nextX] = "x"
			} else {
				guard.dir = Rotate(guard.dir)
			}
		} else {
			break
		}
	}

	return pathTable
}

func NextPosition(x, y int, dir Direction) (int, int) {
	if dir.v == 1 {
		return x, y - 1
	}

	if dir.v == -1 {
		return x, y + 1
	}

	if dir.h == 1 {
		return x + 1, y
	}

	if dir.h == -1 {
		return x - 1, y
	}

	panic("Could not set next position")
}

func Rotate(dir Direction) Direction {
	if dir.v == 1 {
		return Direction{0, 1}
	} else if dir.v == -1 {
		return Direction{0, -1}
	}

	if dir.h == 1 {
		return Direction{-1, 0}
	} else if dir.h == -1 {
		return Direction{1, 0}
	}

	panic("Invalid direction")
}

func CreatePathTable(ref Table) Table {
	pathTable := Table{}

	for y := range ref {
		pathTable = append(pathTable, []string{})
		for x := range len(ref[0]) {
			value := ref[y][x]

			pathTable[y] = append(pathTable[y], value)
		}
	}

	return pathTable
}

func CountSpots(table Table) int {
	count := 0

	for y := range table {
		for x := range table[y] {
			if table[y][x] == "x" {
				count++
			}
		}
	}

	return count
}

func PrintTable(table Table) {
	for y := range table {
		for x := range table[y] {
			fmt.Print(table[y][x])
		}

		fmt.Print("\n")
	}
	fmt.Print("\n")
}
