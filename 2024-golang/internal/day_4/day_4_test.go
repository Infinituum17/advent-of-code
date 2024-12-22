package day4

import (
	"testing"
)

func TestSolve(t *testing.T) {
	Solve()
}

func TestBuildTable(t *testing.T) {
	input := "MMMS\nMSAM\nAMXS"
	result := [][]string{
		{"M", "M", "M", "S"},
		{"M", "S", "A", "M"},
		{"A", "M", "X", "S"},
	}

	table := BuildTable(input)

	for y := range table {
		for x := range table[y] {
			if table[y][x] != result[y][x] {
				t.Errorf("Table is incorrect: %v should be %v", table[y][x], result[y][x])
			}
		}
	}
}

func TestSolvePart1(t *testing.T) {
	input := "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX"

	table := BuildTable(input)

	count := 0

	for y := range table {
		for x := range table[y] {
			if table[y][x] == "X" {
				count += Search(table, x, y)
			}
		}
	}

	if count != 18 {
		t.Errorf("Count is incorrect: %v should be %v", count, 18)
	}
}

func TestSolvePart1_2(t *testing.T) {
	input := "MMMS\nMMAM\nMMMM\nXMMM"

	table := BuildTable(input)

	count := 0

	for y := range table {
		for x := range table[y] {
			if table[y][x] == "X" {
				count += Search(table, x, y)
			}
		}
	}

	if count != 1 {
		t.Errorf("Count is incorrect: %v should be %v", count, 1)
	}
}

func TestSolvePart2(t *testing.T) {
	input := "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX"

	table := BuildTable(input)

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

	if count != 9 {
		t.Errorf("Count is incorrect: %v should be %v", count, 9)
	}
}
