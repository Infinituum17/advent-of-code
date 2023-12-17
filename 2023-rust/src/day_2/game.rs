pub struct Turn {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
}

pub struct Game {
    pub id: u16,
    pub turns: Vec<Turn>,
}

impl Game {
    pub fn is_possible(&self) -> bool {
        self.turns
            .iter()
            .all(|turn| turn.red <= 12 && turn.green <= 13 && turn.blue <= 14)
    }
}

pub fn parse_game(line: &str) -> Game {
    let mut game_str = line.split(":");
    let id = game_str
        .next()
        .expect("String to not be empty")
        .split(" ")
        .last()
        .expect("Game to have an id")
        .parse::<u16>()
        .expect("Id to be a number");

    let turns_str = game_str.next().expect("String to not be empty");
    let mut turns: Vec<Turn> = vec![];

    for turn_str in turns_str.split("; ") {
        let mut red = 0;
        let mut green = 0;
        let mut blue = 0;

        for items_str in turn_str.trim().split(", ") {
            let item = items_str.split(" ").collect::<Vec<&str>>();
            let count = item[0].parse::<u8>().expect("String to be a valid number");
            let color = item[1];

            match color {
                "red" => red += count,
                "green" => green += count,
                "blue" => blue += count,
                _ => panic!("Not a valid color"),
            }
        }

        turns.push(Turn { red, green, blue });
    }

    Game { id, turns }
}
