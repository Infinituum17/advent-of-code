package day2

import (
	"strconv"
	"strings"

	day1 "github.com/Infinituum17/advent-of-code/internal/day_1"
	"github.com/Infinituum17/advent-of-code/internal/tools"
)

const MAX_DISTANCE = 3

func Solve() {
	data := tools.GetData()

	SolvePart1(data)
	SolvePart2(data)
}

func SolvePart1(data string) {
	reports := ParseData(data)

	count := 0

	for _, report := range reports {
		if IsSafe(report) {
			count++
		}
	}

	tools.SolvePart1("Day 2", count)
}

func SolvePart2(data string) {
	reports := ParseData(data)

	count := 0

	for _, report := range reports {
		if IsSafe2(report) {
			count++
		}
	}

	tools.SolvePart2("Day 2", count)
}

func ParseData(data string) [][]int {
	reportLines := strings.Split(data, "\n")
	reports := [][]int{}

	for i, line := range reportLines {
		reports = append(reports, []int{})

		for _, report := range strings.Split(line, " ") {
			rep, err := strconv.Atoi(report)

			if err != nil {
				panic("Data is not valid, found a non-integer value")
			}

			reports[i] = append(reports[i], rep)
		}
	}

	return reports
}

func IsSafe(reports []int) bool {
	r1, r2 := reports[0], reports[1]

	if r1 < r2 {
		return IsIncremental(reports)
	} else {
		return IsDecremental(reports)
	}
}

func IsIncremental(reports []int) bool {
	i := 0

	for i < len(reports)-1 {
		r1, r2 := reports[i], reports[i+1]

		if r1 >= r2 {
			return false
		}

		if day1.ComputeDistance(r1, r2) > 3 {
			return false
		}

		i++
	}

	return true
}

func IsDecremental(reports []int) bool {
	i := 0

	for i < len(reports)-1 {
		r1, r2 := reports[i], reports[i+1]

		if r1 <= r2 {
			return false
		}

		if day1.ComputeDistance(r1, r2) > 3 {
			return false
		}

		i++
	}

	return true
}

func IsSafe2(reports []int) bool {
	if IsIncremental(reports) {
		return true
	}

	if IsDecremental(reports) {
		return true
	}

	i := 0

	for i < len(reports) {
		reportsCopy := make([]int, len(reports))
		copy(reportsCopy, reports)

		repSlice := append(reportsCopy[:i], reportsCopy[i+1:]...)

		if IsSafe(repSlice) {
			return true
		}

		i++
	}

	return false
}
