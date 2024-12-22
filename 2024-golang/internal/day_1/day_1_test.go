package day1

import "testing"

func TestComposeLists(t *testing.T) {
	data := "3   4\n4   3\n2   5\n1   3\n3   9\n3   3"

	left, right := ComposeLists(data)

	if left[0] != 3 {
		t.Errorf("left[0]: %v != %v", left[0], 3)
	}

	if right[0] != 4 {
		t.Errorf("right[0]: %v != %v", right[0], 4)
	}

	if left[1] != 4 {
		t.Errorf("left[1]: %v != %v", left[1], 4)
	}

	if right[1] != 3 {
		t.Errorf("right[1]: %v != %v", right[1], 3)
	}

	if left[2] != 2 {
		t.Errorf("left[2]: %v != %v", left[2], 2)
	}

	if right[2] != 5 {
		t.Errorf("right[2]: %v != %v", right[2], 5)
	}

	if left[3] != 1 {
		t.Errorf("left[3]: %v != %v", left[3], 1)
	}

	if right[3] != 3 {
		t.Errorf("right[3]: %v != %v", right[3], 3)
	}

	if left[4] != 3 {
		t.Errorf("left[4]: %v != %v", left[4], 3)
	}

	if right[4] != 9 {
		t.Errorf("right[4]: %v != %v", right[4], 9)
	}

	if left[5] != 3 {
		t.Errorf("left[5]: %v != %v", left[5], 3)
	}

	if right[5] != 3 {
		t.Errorf("right[5]: %v != %v", right[5], 3)
	}

	t.Logf("Left list: %v\n", left)
	t.Logf("Right list: %v", right)
}

func TestComputeDistance(t *testing.T) {
	i := []int{0, 5, 1, 10}
	j := []int{0, 5, 10, 1}
	r := []int{0, 0, 9, 9}

	for index, v1 := range i {
		v2 := j[index]
		res := r[index]

		dist := ComputeDistance(v1, v2)

		if dist != res {
			t.Errorf("Computed distance is '%v' but it should be '%v'", dist, res)
		}
	}
}

func TestSolve(t *testing.T) {
	Solve()
}
