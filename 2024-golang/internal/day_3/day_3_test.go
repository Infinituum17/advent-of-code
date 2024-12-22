package day3

import (
	"fmt"
	"regexp"
	"testing"
)

func TestSolve(t *testing.T) {
	Solve()
}

func TestParseMul(t *testing.T) {
	res, err := ParseMul("mul(1,2)")

	if err != nil {
		t.Error("ParseMul should parse 'mul(1,2)': " + fmt.Sprint(err))
	}

	if res != 2 {
		t.Error("'mul(1,2)' should be equal to 2, instead is equal to " + fmt.Sprint(res))
	}

	res, err = ParseMul("mul(120,12)")

	if err != nil {
		t.Error("ParseMul should parse 'mul(120,12)': " + fmt.Sprint(err))
	}

	if res != 1440 {
		t.Error("'mul(120,12)' should be equal to 1440, instead is equal to " + fmt.Sprint(res))
	}
}

func TestSolvePart1(t *testing.T) {
	input := `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
	regex := regexp.MustCompile(`(?m)mul\(\d{1,3},\d{1,3}\)`)

	sum := 0

	for _, match := range regex.FindAllString(input, -1) {
		res, err := ParseMul(match)

		if err != nil {
			t.Error(err)
		}

		sum += res
	}

	if sum != 161 {
		t.Error("Sum isn't equal to 161")
	}
}
