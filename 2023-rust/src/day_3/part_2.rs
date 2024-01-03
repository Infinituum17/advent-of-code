#[derive(Debug, PartialEq)]
pub struct Coordinates {
    pub x: usize,
    pub y: usize,
}

impl Coordinates {
    pub fn new(x: usize, y: usize) -> Coordinates {
        return Coordinates { x, y };
    }
}

pub fn scan(table: &Vec<Vec<char>>) -> i32 {
    /*
     * Iterates through the whole table, and finds gears `*`.
     * When a gear is found, count the numbers around it (with special cases for the top and the bottom &[i32;3]).
     * If the total count is 2, then capture those numbers, multiply them together and sum the result in a variable.
     * Continue the iteration until all the values are checked. Return the result.
     */

    let mut result = 0;

    for y in 0..table.len() {
        for x in 0..table[y].len() {
            let curr = table[y][x];

            if curr == '*' {
                if let Some(ratio) = get_valid_gear_ratio(table, Coordinates::new(x, y)) {
                    result += ratio;
                }
            }
        }
    }

    result
}

pub fn get_valid_gear_ratio(table: &Vec<Vec<char>>, coord: Coordinates) -> Option<i32> {
    /*
     * NW NT NE
     * WS [] ET
     * SW ST SE
     */

    let (x, y) = (coord.x, coord.y);
    let mut count = 0;
    let mut ratio = 1;

    // WS
    if (x as i32) - 1 >= 0 && table[y][x - 1].is_numeric() {
        ratio *= capture_num(table, Coordinates::new(x - 1, y));
        count += 1;
    }

    // ET
    if x + 1 < table[y].len() && table[y][x + 1].is_numeric() {
        ratio *= capture_num(table, Coordinates::new(x + 1, y));
        count += 1;
    }

    // NW NT NE
    if (y as i32) - 1 >= 0 {
        let mut sl = vec![table[y - 1][x]];

        if (x as i32) - 1 >= 0 {
            sl.insert(0, table[y - 1][x - 1]);
        } else {
            sl.insert(0, '.');
        }

        if x + 1 < table[y - 1].len() {
            sl.push(table[y - 1][x + 1]);
        } else {
            sl.push('.');
        }

        if sl[0].is_numeric() && sl[1].is_numeric() && sl[2].is_numeric() {
            ratio *= capture_num(table, Coordinates::new(x, y - 1));
            count += 1;
        } else if sl[0].is_numeric() && sl[1].is_numeric() {
            ratio *= capture_num(table, Coordinates::new(x, y - 1));
            count += 1;
        } else if sl[1].is_numeric() && sl[2].is_numeric() {
            ratio *= capture_num(table, Coordinates::new(x, y - 1));
            count += 1;
        } else if sl[1].is_numeric() {
            ratio *= capture_num(table, Coordinates::new(x, y - 1));
            count += 1;
        } else {
            if sl[0].is_numeric() {
                ratio *= capture_num(table, Coordinates::new(x - 1, y - 1));
                count += 1;
            }

            if sl[2].is_numeric() {
                ratio *= capture_num(table, Coordinates::new(x + 1, y - 1));
                count += 1;
            }
        }
    }

    // SW ST SE
    if y + 1 < table.len() {
        let mut sl = vec![table[y + 1][x]];

        if (x as i32) - 1 >= 0 {
            sl.insert(0, table[y + 1][x - 1]);
        } else {
            sl.insert(0, '.');
        }

        if x + 1 < table[y + 1].len() {
            sl.push(table[y + 1][x + 1]);
        } else {
            sl.push('.');
        }

        if sl[0].is_numeric() && sl[1].is_numeric() && sl[2].is_numeric() {
            ratio *= capture_num(table, Coordinates::new(x, y + 1));
            count += 1;
        } else if sl[0].is_numeric() && sl[1].is_numeric() {
            ratio *= capture_num(table, Coordinates::new(x, y + 1));
            count += 1;
        } else if sl[1].is_numeric() && sl[2].is_numeric() {
            ratio *= capture_num(table, Coordinates::new(x, y + 1));
            count += 1;
        } else if sl[1].is_numeric() {
            ratio *= capture_num(table, Coordinates::new(x, y + 1));
            count += 1;
        } else {
            if sl[0].is_numeric() {
                ratio *= capture_num(table, Coordinates::new(x - 1, y + 1));
                count += 1;
            }

            if sl[2].is_numeric() {
                ratio *= capture_num(table, Coordinates::new(x + 1, y + 1));
                count += 1;
            }
        }
    }

    if count == 2 {
        Some(ratio)
    } else {
        None
    }
}

pub fn capture_num(table: &Vec<Vec<char>>, coord: Coordinates) -> i32 {
    let (x, y) = (coord.x, coord.y);
    let mut s = String::new();

    if (x as i32) - 1 >= 0 {
        s.push_str(&propagate_left(table, Coordinates::new(x - 1, y)));
    }

    s.push(table[y][x]);

    if x + 1 < table[y].len() {
        s.push_str(&propagate_right(table, Coordinates::new(x + 1, y)));
    }

    let opt_n = s.parse::<i32>();

    if let Ok(num) = opt_n {
        return num;
    }

    panic!("Error while trying to capture a number: {:?}", opt_n.err());
}

pub fn propagate_left(table: &Vec<Vec<char>>, coord: Coordinates) -> String {
    let (x, y) = (coord.x, coord.y);
    let mut res = String::new();

    if !table[y][x].is_numeric() {
        return res;
    }

    res.push(table[y][x]);

    if (x as i32) - 1 >= 0 {
        res.insert_str(0, &propagate_left(table, Coordinates::new(x - 1, y)));
    }

    res
}

pub fn propagate_right(table: &Vec<Vec<char>>, coord: Coordinates) -> String {
    let (x, y) = (coord.x, coord.y);
    let mut res = String::new();

    if !table[y][x].is_numeric() {
        return res;
    }

    res.push(table[y][x]);

    if x + 1 < table[y].len() {
        res.push_str(&propagate_right(table, Coordinates::new(x + 1, y)));
    }

    res
}
