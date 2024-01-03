pub fn is_symbol(c: char) -> bool {
    !c.is_numeric() && c != '.'
}

pub fn nearby_symbol(table: &Vec<Vec<char>>, x: usize, y: usize) -> bool {
    let max_y = table.len();
    let max_x = table[0].len();

    x + 1 < max_x && is_symbol(table[y][x + 1])
        || x + 1 < max_x && y + 1 < max_y && is_symbol(table[y + 1][x + 1])
        || (y as i64) - 1 > 0 && x + 1 < max_x && y - 1 < max_y && is_symbol(table[y - 1][x + 1])
        || (x as i64) - 1 > 0 && x - 1 < max_x && is_symbol(table[y][x - 1])
        || (x as i64) - 1 > 0 && x - 1 < max_x && y + 1 < max_y && is_symbol(table[y + 1][x - 1])
        || (x as i64) - 1 > 0
            && (y as i64) - 1 > 0
            && x - 1 < max_x
            && y - 1 < max_y
            && is_symbol(table[y - 1][x - 1])
        || y + 1 < max_y && is_symbol(table[y + 1][x])
        || (y as i64) - 1 > 0 && y - 1 < max_y && is_symbol(table[y - 1][x])
}

pub fn scan(table: &Vec<Vec<char>>) -> i32 {
    let mut sum = 0;

    for y in 0..table.len() {
        let mut jmp_n = 0;
        for x in 0..table[0].len() {
            if !table[y][x].is_numeric() {
                continue;
            }

            if jmp_n > 0 {
                jmp_n -= 1;
                continue;
            }

            let mut nstr = String::from("");
            let mut is_nearby_symbol = false;
            let mut i = x;

            while table[y][i].is_numeric() {
                nstr.push(table[y][i]);

                if !is_nearby_symbol && nearby_symbol(table, i, y) {
                    is_nearby_symbol = true;
                }

                i += 1;

                if i >= 140 {
                    break;
                }
            }

            if is_nearby_symbol {
                jmp_n = nstr.len() - 1;

                sum += nstr.parse::<i32>().expect("String should be valid number")
            }
        }
    }

    sum
}
