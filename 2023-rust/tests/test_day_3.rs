#[cfg(test)]
mod part_1 {
    use advent_of_code::{
        day_3::part_1::{is_symbol, scan},
        utils::{read_file, split_lines},
    };

    #[test]
    fn test_is_symbol() {
        assert!(!is_symbol('.'));
        assert!(!is_symbol('1'));
        assert!(is_symbol('@'));
        assert!(is_symbol('#'));
    }

    #[test]
    fn test_scan() {
        let table_str = String::from("467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..");
        let lines = split_lines(&table_str);
        let mut table = vec![];

        for line in lines {
            table.push(line.chars().collect::<Vec<char>>());
        }

        assert_eq!(scan(&table), 4361);
    }

    #[test]
    fn final_result() {
        let input_str = read_file("./input/day_3.txt");
        let input = match input_str {
            Ok(input) => input,
            Err(error) => panic!("Could not read file: {error}"),
        };
        let lines = split_lines(&input);
        let table = lines
            .map(|line| line.chars().collect::<Vec<char>>())
            .collect::<Vec<Vec<char>>>();

        let sum = scan(&table);

        assert_eq!(sum, 556367);
    }
}

#[cfg(test)]
mod part_2 {
    use advent_of_code::{
        day_3::part_2::{capture_num, get_valid_gear_ratio, scan, Coordinates},
        utils::{read_file, split_lines},
    };

    #[test]
    fn test_capture_num() {
        let table = vec![
            vec!['3', '5', '.', '.', '.'],
            vec!['.', '*', '.', '.', '.'],
            vec!['.', '.', '2', '7', '.'],
            vec!['.', '.', '.', '.', '.'],
            vec!['.', '.', '.', '.', '.'],
        ];

        assert_eq!(capture_num(&table, Coordinates::new(0, 0)), 35);
        assert_eq!(capture_num(&table, Coordinates::new(1, 0)), 35);
        assert_eq!(capture_num(&table, Coordinates::new(2, 2)), 27);
    }

    #[test]
    fn test_get_gear_ratio() {
        let table = vec![
            vec!['3', '5', '.', '.', '.'],
            vec!['.', '*', '.', '.', '.'],
            vec!['.', '.', '2', '7', '.'],
            vec!['.', '.', '.', '.', '.'],
            vec!['.', '.', '.', '.', '.'],
        ];

        let ratio = get_valid_gear_ratio(&table, Coordinates::new(1, 1));

        assert!(ratio.is_some());
        assert_eq!(ratio.unwrap(), 35 * 27);
    }

    #[test]
    fn test_scan() {
        let table = vec![
            vec!['3', '5', '.', '.', '.'],
            vec!['.', '*', '.', '.', '.'],
            vec!['.', '.', '2', '7', '.'],
            vec!['.', '.', '.', '.', '.'],
            vec!['.', '.', '.', '.', '.'],
        ];

        assert_eq!(scan(&table), 35 * 27);

        let table = vec![
            vec!['3', '5', '.', '.', '.'],
            vec!['.', '*', '.', '.', '*'],
            vec!['.', '.', '2', '7', '.'],
            vec!['.', '.', '.', '*', '.'],
            vec!['.', '.', '.', '2', '.'],
        ];

        assert_eq!(scan(&table), (35 * 27) + (27 * 2));

        let table_str = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..".to_string();
        let lines = split_lines(&table_str);
        let mut table = vec![];

        for line in lines {
            table.push(line.chars().collect::<Vec<char>>());
        }

        assert_eq!(scan(&table), 467835);
    }

    #[test]
    fn final_result() {
        let input_str = read_file("./input/day_3.txt");
        let input = match input_str {
            Ok(input) => input,
            Err(error) => panic!("Could not read file: {error}"),
        };
        let lines = split_lines(&input);
        let table = lines
            .map(|line| line.chars().collect::<Vec<char>>())
            .collect::<Vec<Vec<char>>>();

        let sum = scan(&table);

        assert_eq!(sum, 89471771);
    }
}
