package day3

import (
	"errors"
	"regexp"
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
	sum := 0
	regex := regexp.MustCompile(`(?m)mul\(\d{1,3},\d{1,3}\)`)

	instrMatch := regex.FindAllString(data, -1)

	for _, match := range instrMatch {
		res, err := ParseMul(match)

		if err != nil {
			panic("Could not parse expression " + match)
		}

		sum += res
	}

	tools.SolvePart1("Day 3", sum)
}

func SolvePart2(data string) {
	enabled := true
	sum := 0
	regex := regexp.MustCompile(`(?m)(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don\'t\(\))`)

	instrMatch := regex.FindAllString(data, -1)

	for _, match := range instrMatch {
		if match == "do()" {
			enabled = true
			continue
		}

		if enabled {
			if match == "don't()" {
				enabled = false
				continue
			}

			if match != "do()" {
				res, err := ParseMul(match)

				if err != nil {
					panic("Could not parse expression " + match)
				}

				sum += res
			}
		}
	}

	tools.SolvePart2("Day 3", sum)
}

func ParseMul(str string) (int, error) {
	str = str[4 : len(str)-1]
	nums := strings.Split(str, ",")

	n1, err := strconv.Atoi(nums[0])

	if err != nil {
		return 0, errors.New("Could not parse " + str + ": " + err.Error())
	}

	n2, err := strconv.Atoi(nums[1])

	if err != nil {
		return 0, errors.New("Could not parse " + str + ": " + err.Error())
	}

	return n1 * n2, nil
}
