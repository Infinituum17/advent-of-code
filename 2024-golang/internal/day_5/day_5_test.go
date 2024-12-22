package day5

import (
	"strings"
	"testing"

	"github.com/Infinituum17/advent-of-code/internal/tools"
)

func TestSolve(t *testing.T) {
	Solve()
}

func TestSolvePart1(t *testing.T) {
	input := tools.GetFile("./example.txt")

	result := strings.Split(input, "\n\n")

	left, right := ParseRules(result[0])
	sequences := ParseSequences(result[1])

	sum := SumMiddleElements(left, right, sequences)

	if sum != 143 {
		t.Errorf("Sum of middle elements should be %v", 143)
	}
}

func TestSolvePart2(t *testing.T) {
	input := tools.GetFile("./example.txt")

	sum := 0
	result := strings.Split(input, "\n\n")

	left, right := ParseRules(result[0])
	sequences := ParseSequences(result[1])

	sequences = GetIncorrectSequences(left, right, sequences)

	for _, sequence := range sequences {
		sum += sequence[len(sequence)/2]
	}

	if sum != 123 {
		t.Errorf("Sum of middle elements should be %v (now it's %v)", 123, sum)
	}
}
