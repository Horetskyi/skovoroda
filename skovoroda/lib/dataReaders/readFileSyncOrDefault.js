import fs from "fs";

export default function readFileSyncOrDefault(path) {
  try {
    return fs.readFileSync(path).toString();
  } catch (error) {
    return null;
  }
}