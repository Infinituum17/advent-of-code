use std::fs;

pub fn read_file(file_path: &str) -> Result<String, std::io::Error> {
    fs::read_to_string(file_path)
}

pub fn split_lines<'a>(lines: &'a String) -> std::str::Split<'a, &'a str> {
    lines.split("\n")
}
