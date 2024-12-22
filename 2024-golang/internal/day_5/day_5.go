package day5

import (
	"strconv"
	"strings"

	"github.com/Infinituum17/advent-of-code/internal/tools"
)

func Solve() {
	data := tools.GetData()

	SolvePart1(data)
	SolvePart2(data)
}

func SolvePart1(data string) {
	result := strings.Split(data, "\n\n")

	left, right := ParseRules(result[0])
	sequences := ParseSequences(result[1])

	sum := SumMiddleElements(left, right, sequences)

	tools.SolvePart1("Day 5", sum)
}

func SolvePart2(data string) {
	sum := 0
	result := strings.Split(data, "\n\n")

	left, right := ParseRules(result[0])
	sequences := ParseSequences(result[1])

	sequences = GetIncorrectSequences(left, right, sequences)

	for _, sequence := range sequences {
		sum += sequence[len(sequence)/2]
	}

	tools.SolvePart2("Day 5", sum)
}

func GetIncorrectSequences(left, right map[int][]int, sequences [][]int) [][]int {
	incorrect := [][]int{}

	for _, seq := range sequences {
		if !IsValid(left, right, seq) {
			incorrect = append(incorrect, seq)
		}
	}

	return ReorderSequences(left, incorrect)
}

type Node struct {
	value int
	next  []int
}

func ReorderSequences(left map[int][]int, seq [][]int) [][]int {
	for i, s := range seq {
		seq[i] = ReorderSequence(left, s)
	}

	return seq
}

func ReorderSequence(left map[int][]int, s []int) []int {
	list := []Node{}

	for _, v := range s {
		associated := left[v]

		if associated == nil {
			associated = []int{}
		}

		list = append(list, Node{v, associated})
	}

	ordered := []int{}

	for len(list) > 0 {
		for i, n := range list {
			hasParent := false

			for j, n2 := range list {
				if i == j {
					continue
				}

				for _, c := range n2.next {
					if c == n.value {
						hasParent = true
						break
					}
				}

				if hasParent {
					break
				}
			}

			if !hasParent {
				if i+1 < len(list) {
					list = append(list[:i], list[i+1:]...)
				} else {
					list = list[:len(list)-1]
				}
				ordered = append(ordered, n.value)
				break
			}
		}
	}

	return ordered
}

func ParseRule(data string, leftRules, rightRules *map[int][]int) {
	values := strings.Split(data, "|")
	left, err := strconv.Atoi(values[0])

	if err != nil {
		panic(err)
	}

	right, err := strconv.Atoi(values[1])

	if err != nil {
		panic(err)
	}

	if (*leftRules)[left] == nil {
		(*leftRules)[left] = []int{}
	}

	(*leftRules)[left] = append((*leftRules)[left], right)

	if (*rightRules)[right] == nil {
		(*rightRules)[right] = []int{}
	}

	(*rightRules)[right] = append((*rightRules)[right], left)
}

func ParseSequence(data string) []int {
	sequence := []int{}

	for _, el := range strings.Split(data, ",") {
		v, err := strconv.Atoi(el)

		if err != nil {
			panic(err)
		}

		sequence = append(sequence, v)
	}

	return sequence
}

func ParseRules(data string) (map[int][]int, map[int][]int) {
	left := make(map[int][]int)
	right := make(map[int][]int)

	for _, line := range strings.Split(data, "\n") {
		ParseRule(line, &left, &right)
	}

	return left, right
}

func ParseSequences(data string) [][]int {
	sequences := [][]int{}

	for _, line := range strings.Split(data, "\n") {
		sequences = append(sequences, ParseSequence(line))
	}

	return sequences
}

func SumMiddleElements(left, right map[int][]int, sequences [][]int) int {
	sum := 0

	for _, sequence := range sequences {
		if IsValid(left, right, sequence) {
			sum += sequence[len(sequence)/2]
		}
	}

	return sum
}

func IsValid(left, right map[int][]int, sequence []int) bool {
	for i, el := range sequence {
		if IsNotAllowed(sequence[:i], left[el]) {
			return false
		}

		if i+1 < len(sequence) {
			if IsNotAllowed(sequence[i+1:], right[el]) {
				return false
			}
		}
	}

	return true
}

func IsNotAllowed(sequence, notAllowedElements []int) bool {
	for _, el := range sequence {
		for _, notAllowedElement := range notAllowedElements {
			if el == notAllowedElement {
				return true
			}
		}
	}

	return false
}
