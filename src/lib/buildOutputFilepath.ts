import Config from "./Config";
import path from "path";

export default function buildOutputFilepath(inputFilepath: string, config: Config): string {
  const filename = path.basename(inputFilepath);
  return `${config.output}/${filename}`;
}
