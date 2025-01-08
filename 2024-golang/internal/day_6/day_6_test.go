package day6

import (
	"fmt"
	"testing"

	"github.com/Infinituum17/advent-of-code/internal/tools"
)

func TestExample(t *testing.T) {
	data := tools.GetFile("./example.txt")
	table, guard := ParseTable(data)

	if len(table) != 10 || len(table[0]) != 10 {
		panic("Incorrect table size")
	}

	if guard.pos.x != 4 || guard.pos.y != 6 || guard.dir.v != 1 || guard.dir.h != 0 {
		t.Errorf("Found a guard in the wrong position/direction: %v", guard)
	}

	path := TracePath(table, guard)

	count := CountSpots(path)

	if count != 41 {
		panic(fmt.Sprintf("Count is wrong: %v should be 41", count))
	}
}

func TestExample2(t *testing.T) {
	data := tools.GetFile("./example.txt")
	table, guard := ParseTable(data)

	if len(table) != 10 || len(table[0]) != 10 {
		panic("Incorrect table size")
	}

	if guard.pos.x != 4 || guard.pos.y != 6 || guard.dir.v != 1 || guard.dir.h != 0 {
		t.Errorf("Found a guard in the wrong position/direction: %v", guard)
	}

	path := TracePathPositions(table, guard)

	count := CountPathLoops(table, guard, path)

	if count != 6 {
		panic(fmt.Sprintf("Count is wrong: %v should be 6", count))
	}
}

func TestSolve(t *testing.T) {
	Solve()
}
