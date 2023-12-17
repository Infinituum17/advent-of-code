#[cfg(test)]
mod part_1 {
    use advent_of_code::{
        day_1::part_1::{leftmost_num, rightmost_num, sum_calibration_values},
        utils::{read_file, split_lines},
    };

    #[test]
    fn test_leftmost_num() {
        let cases = vec![("12", '1'), ("a23", '2'), (" a1b l 2", '1')];

        for (case, result) in cases {
            assert_eq!(leftmost_num(case), result);
        }
    }

    #[test]
    fn test_rightmost_num() {
        let cases = vec![("12", '2'), ("a23", '3'), (" ao7 xl", '7')];

        for (case, result) in cases {
            assert_eq!(rightmost_num(case), result);
        }
    }

    #[test]
    fn test_sum_calibration_values() {
        let values = vec![12, 2, 4, 5, 1];

        assert_eq!(sum_calibration_values(values), 24);
    }

    #[test]
    fn final_result() {
        let input_str = read_file("./input/day_1.txt");
        let input = match input_str {
            Ok(input) => input,
            Err(error) => panic!("Could not read file: {error}"),
        };
        let cvalues_pair =
            split_lines(&input).map(|line| (leftmost_num(line), rightmost_num(line)));

        let cvalues = cvalues_pair
            .map(|(left, right)| {
                let mut s = left.to_string();
                s.push(right);
                return s
                    .parse::<i32>()
                    .expect("Every value should be a valid number");
            })
            .collect::<Vec<i32>>();

        assert_eq!(sum_calibration_values(cvalues), 55386);
    }
}

#[cfg(test)]
mod part_2 {
    use advent_of_code::{
        day_1::part_1::sum_calibration_values,
        day_1::part_2::{leftmost_num, rightmost_num},
        utils::{read_file, split_lines},
    };

    #[test]
    fn test_leftmost_num() {
        let cases = vec![
            ("two1nine", '2'),
            ("eightwothree", '8'),
            ("zoneight234", '1'),
        ];

        for (case, result) in cases {
            assert_eq!(leftmost_num(case), result);
        }
    }

    #[test]
    fn test_rightmost_num() {
        let cases = vec![("12", '2'), ("a23", '3'), (" ao7 xl", '7')];

        for (case, result) in cases {
            assert_eq!(rightmost_num(case), result);
        }
    }

    #[test]
    fn final_result() {
        let input_str = read_file("./input/day_1.txt");
        let input = match input_str {
            Ok(input) => input,
            Err(error) => panic!("Could not read file: {error}"),
        };
        let cvalues_pair =
            split_lines(&input).map(|line| (leftmost_num(line), rightmost_num(line)));

        let cvalues = cvalues_pair
            .map(|(left, right)| {
                let mut s = left.to_string();
                s.push(right);
                return s
                    .parse::<i32>()
                    .expect("Every value should be a valid number");
            })
            .collect::<Vec<i32>>();

        assert_eq!(sum_calibration_values(cvalues), 54824);
    }
}
