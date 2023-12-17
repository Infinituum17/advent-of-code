pub fn leftmost_num(s: &str) -> char {
    for c in s.chars() {
        if c.is_digit(10) {
            return c;
        }
    }

    unreachable!("Should always find a valid number")
}

pub fn rightmost_num(s: &str) -> char {
    for c in s.chars().rev() {
        if c.is_digit(10) {
            return c;
        }
    }

    unreachable!("Should always find a valid number")
}

pub fn sum_calibration_values(values: Vec<i32>) -> i32 {
    values.iter().fold(0, |a, v| a + v)
}
