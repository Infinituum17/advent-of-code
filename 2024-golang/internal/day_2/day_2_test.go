package day2

import "testing"

func TestSolve(t *testing.T) {
	Solve()
}

func TestParseData(t *testing.T) {
	data := "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9"
	result := [][]int{
		{7, 6, 4, 2, 1},
		{1, 2, 7, 8, 9},
		{9, 7, 6, 2, 1},
		{1, 3, 2, 4, 5},
		{8, 6, 4, 4, 1},
		{1, 3, 6, 7, 9},
	}

	parsedData := ParseData(data)

	for i := range parsedData {
		for j := range parsedData[i] {
			if parsedData[i][j] != result[i][j] {
				t.Errorf("Position [%v %v] is %v, but instead should be %v", i, j, parsedData[i][j], result[i][j])
			}
		}
	}
}

func TestIsSafe(t *testing.T) {
	data := [][]int{
		{7, 6, 4, 2, 1},
		{1, 2, 7, 8, 9},
		{9, 7, 6, 2, 1},
		{1, 3, 2, 4, 5},
		{8, 6, 4, 4, 1},
		{1, 3, 6, 7, 9},
	}

	if !IsSafe(data[0]) {
		t.Errorf("%v should be safe", data[0])
	}

	if IsSafe(data[1]) {
		t.Errorf("%v should be unsafe", data[1])
	}

	if IsSafe(data[2]) {
		t.Errorf("%v should be unsafe", data[2])
	}

	if IsSafe(data[3]) {
		t.Errorf("%v should be unsafe", data[3])
	}

	if IsSafe(data[4]) {
		t.Errorf("%v should be unsafe", data[4])
	}

	if !IsSafe(data[5]) {
		t.Errorf("%v should be safe", data[5])
	}
}

func TestIsIncremental(t *testing.T) {
	testCase := []int{1, 3, 6, 7, 9}

	if !IsIncremental(testCase) {
		t.Errorf("%v should be incremental", testCase)
	}

	testCase = []int{1, 3, 2, 4, 5}

	if IsIncremental(testCase) {
		t.Errorf("%v should NOT be incremental", testCase)
	}
}

func TestIsDecremental(t *testing.T) {
	testCase := []int{7, 6, 4, 2, 1}

	if !IsDecremental(testCase) {
		t.Errorf("%v should be incremental", testCase)
	}

	testCase = []int{8, 6, 4, 4, 1}

	if IsDecremental(testCase) {
		t.Errorf("%v should NOT be incremental", testCase)
	}
}

func TestIsSafe2(t *testing.T) {
	data := [][]int{
		{7, 6, 4, 2, 1},
		{1, 2, 7, 8, 9},
		{9, 7, 6, 2, 1},
		{1, 3, 2, 4, 5},
		{8, 6, 4, 4, 1},
		{1, 3, 6, 7, 9},
	}

	if !IsSafe2(data[0]) {
		t.Errorf("%v should be safe", data[0])
	}

	if IsSafe2(data[1]) {
		t.Errorf("%v should be unsafe", data[1])
	}

	if IsSafe2(data[2]) {
		t.Errorf("%v should be unsafe", data[2])
	}

	if !IsSafe2(data[3]) {
		t.Errorf("%v should be safe", data[3])
	}

	if !IsSafe2(data[4]) {
		t.Errorf("%v should be safe", data[4])
	}

	if !IsSafe2(data[5]) {
		t.Errorf("%v should be safe", data[5])
	}
}
