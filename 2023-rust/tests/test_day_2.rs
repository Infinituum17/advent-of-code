#[cfg(test)]
mod part_1 {
    use advent_of_code::{
        day_2::game::parse_game,
        utils::{read_file, split_lines},
    };

    #[test]
    fn test_is_possible() {
        let game1 = parse_game("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");

        assert!(game1.is_possible());

        let game2 =
            parse_game("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red");

        assert!(!game2.is_possible());
    }

    #[test]
    fn test_parse_game() {
        let game1 = parse_game("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");

        assert_eq!(game1.id, 1);
        assert_eq!(game1.turns.len(), 3);

        assert_eq!(game1.turns[0].red, 4);
        assert_eq!(game1.turns[0].green, 0);
        assert_eq!(game1.turns[0].blue, 3);

        assert_eq!(game1.turns[1].red, 1);
        assert_eq!(game1.turns[1].green, 2);
        assert_eq!(game1.turns[1].blue, 6);

        assert_eq!(game1.turns[2].red, 0);
        assert_eq!(game1.turns[2].green, 2);
        assert_eq!(game1.turns[2].blue, 0);
    }

    #[test]
    fn final_result() {
        let input_str = read_file("./input/day_2.txt");
        let input = match input_str {
            Ok(input) => input,
            Err(error) => panic!("Could not read file: {error}"),
        };
        let games_str = split_lines(&input);

        let mut sum = 0;

        for game_line in games_str {
            let game = parse_game(game_line);

            if game.is_possible() {
                sum += game.id;
            }
        }

        assert_eq!(sum, 2416);
    }
}

#[cfg(test)]
mod part_2 {
    use advent_of_code::{
        day_2::game::parse_game,
        utils::{read_file, split_lines},
    };

    #[test]
    fn test_min_colors() {
        let game1 = parse_game("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");

        let (r, g, b) = game1.min_colors();

        assert_eq!(r, 4);
        assert_eq!(g, 2);
        assert_eq!(b, 6);

        let game2 =
            parse_game("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red");

        let (r, g, b) = game2.min_colors();

        assert_eq!(r, 20);
        assert_eq!(g, 13);
        assert_eq!(b, 6);
    }

    #[test]
    fn test_power() {
        let game1 = parse_game("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");

        assert_eq!(game1.power(), 48);

        let game2 =
            parse_game("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red");

        assert_eq!(game2.power(), 1560);
    }

    #[test]
    fn final_result() {
        let input_str = read_file("./input/day_2.txt");
        let input = match input_str {
            Ok(input) => input,
            Err(error) => panic!("Could not read file: {error}"),
        };
        let games_str = split_lines(&input);

        let mut sum = 0;

        for game_line in games_str {
            let game = parse_game(game_line);

            sum += game.power()
        }

        assert_eq!(sum, 63307);
    }
}
