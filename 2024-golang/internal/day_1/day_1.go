package day1

import (
	"sort"
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
	left, right := ComposeLists(data)

	sort.Ints(left)
	sort.Ints(right)

	tools.SolvePart1("Day 1", SumDistances(left, right))
}

func SolvePart2(data string) {
	left, right := ComposeLists(data)
	cache := make(map[int]int)

	for _, v := range right {
		cache[v] += 1
	}

	sum := 0

	for _, v := range left {
		sum += v * cache[v]
	}

	tools.SolvePart2("Day 1", sum)
}

func ComposeLists(data string) ([]int, []int) {
	left := []int{}
	right := []int{}

	for _, line := range strings.Split(data, "\n") {
		v := strings.Split(line, "   ")
		lv, err := strconv.Atoi(v[0])

		if err != nil {
			panic("Could not convert '" + v[0] + "' to Integer")
		}

		rv, err := strconv.Atoi(v[1])

		if err != nil {
			panic("Could not convert '" + v[1] + "' to Integer")
		}

		left = append(left, lv)
		right = append(right, rv)
	}

	return left, right
}

func ComputeDistance(num1, num2 int) int {
	if num1 == num2 {
		return 0
	} else if num1 > num2 {
		return num1 - num2
	} else {
		return num2 - num1
	}
}

func SumDistances(left, right []int) int {
	sum := 0

	for i := range left {
		lv := left[i]
		rv := right[i]

		sum += ComputeDistance(lv, rv)
	}

	return sum
}
