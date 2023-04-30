import { createReadStream, createWriteStream } from "fs";
import { parse, stringify } from "csv";
import transformerFactory, { columns } from "./transformerFactory";
import Config from "./Config";

export function convertFile(inputFilepath: string, outputFilepath:string, config: Config): void {
  createReadStream(inputFilepath, 'utf-8')
    .pipe(parse({
      columns: true,
    }))
    .pipe(transformerFactory(config))
    .pipe(stringify({
      header: true,
      columns,
    }))
    .pipe(createWriteStream(outputFilepath));
}
