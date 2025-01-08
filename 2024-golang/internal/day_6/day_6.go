package day6

import (
	"fmt"
	"strings"
	"sync"

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
	SolvePart2(data)
}

func SolvePart1(data string) {
	table, guard := ParseTable(data)
	path := TracePath(table, guard)
	count := CountSpots(path)

	tools.SolvePart1("Day 6", count)
}

func SolvePart2(data string) {
	table, guard := ParseTable(data)
	path := TracePathPositions(table, guard)
	count := CountPathLoops(table, guard, path)

	tools.SolvePart2("Day 6", count)
}

func CountPathLoops(table Table, guard Guard, path []Position) int {
	var wg sync.WaitGroup
	var mt sync.Mutex
	count := 0

	for _, pos := range path {
		t := DupTable(table)
		t[pos.y][pos.x] = "#"
		wg.Add(1)
		go CheckLoop(&t, guard, &wg, &mt, &count, pos)
	}

	wg.Wait()

	return count
}

func CheckLoop(table *Table, guard Guard, wg *sync.WaitGroup, mt *sync.Mutex, count *int, p Position) {
	defer wg.Done()

	posMap := MakePositionMap()
	pos, dir := Position{guard.pos.x, guard.pos.y}, Direction{guard.dir.v, guard.dir.h}

	for {
		x, y := NextPosition(pos.x, pos.y, dir)

		if y < 0 || y >= len(*table) || x < 0 || x >= len((*table)[0]) {
			break
		}

		if (*table)[y][x] != "#" {
			pos.x, pos.y = x, y
			continue
		}

		if posMap[dir][pos] {
			mt.Lock()
			*count++
			mt.Unlock()

			return
		}

		posMap[dir][pos] = true

		dir = Rotate(dir)

	}
}

func MakePositionMap() map[Direction]map[Position]bool {
	m := make(map[Direction]map[Position]bool)

	m[Direction{1, 0}] = make(map[Position]bool)
	m[Direction{-1, 0}] = make(map[Position]bool)
	m[Direction{0, 1}] = make(map[Position]bool)
	m[Direction{0, -1}] = make(map[Position]bool)

	return m
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
	pathTable := DupTable(table)
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

func TracePathPositions(table Table, guard Guard) []Position {
	path := TracePath(table, guard)
	positions := []Position{}

	for j := range path {
		for i := range path[j] {
			if path[j][i] == "x" && (guard.pos.x != i || guard.pos.y != j) {
				positions = append(positions, Position{i, j})
			}
		}
	}

	return positions
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

func DupTable(ref Table) Table {
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
