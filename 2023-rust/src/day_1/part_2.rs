fn get_lit_map<'a>() -> Vec<(&'a str, char)> {
    vec![
        ("one", '1'),
        ("two", '2'),
        ("three", '3'),
        ("four", '4'),
        ("five", '5'),
        ("six", '6'),
        ("seven", '7'),
        ("eight", '8'),
        ("nine", '9'),
        ("zero", '0'),
    ]
}

pub fn leftmost_num(s: &str) -> char {
    let mut i = 0;

    loop {
        let line = &s[i..];
        let c = line.chars().next().unwrap();

        if c.is_digit(10) {
            return c;
        }

        for (literal, result) in get_lit_map() {
            if line.starts_with(literal) {
                return result;
            }
        }

        i += 1;

        if i == s.len() {
            panic!("Can't find a match in string");
        }
    }
}

pub fn rightmost_num(s: &str) -> char {
    let mut i = s.len();

    loop {
        let line = &s[..i];
        let c = line.chars().rev().next().unwrap();

        if c.is_digit(10) {
            return c;
        }

        for (literal, result) in get_lit_map() {
            if line.ends_with(literal) {
                return result;
            }
        }

        i -= 1;

        if i == 0 {
            panic!("Can't find a match in string");
        }
    }
}
