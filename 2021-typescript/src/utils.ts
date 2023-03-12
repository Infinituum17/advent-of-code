import { readFile } from "fs/promises";

export async function readInputFile(path: string) {
  const fileBuffer = await readFile(path);
  return fileBuffer.toString();
}

export async function readLines(path: string) {
  return (await readInputFile(path)).split(/\n/gim);
}