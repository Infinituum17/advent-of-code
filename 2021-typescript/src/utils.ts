import { readFile } from "fs/promises";

export async function readInputFile(filename: string, folder = "./data/") {
  const fileBuffer = await readFile(`${folder}${filename}.txt`);
  return fileBuffer.toString();
}

export async function readLines(path: string) {
  return (await readInputFile(path)).split(/\n/gim);
}