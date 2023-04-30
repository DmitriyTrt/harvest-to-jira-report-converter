import { convertFile } from "./lib/convertFile";
import config from "./config.json";
import { glob } from "glob";
import buildOutputFilepath from "./lib/buildOutputFilepath";

async function convert(): Promise<void> {
  const files = await glob(config.input, {
    nodir: true
  });
  if (!files.length) {
    console.warn(`No files match the "${config.input}" input pattern.`);
    return;
  }

  console.log(`Found ${files.length} input file(s). Processing...`);

  for (const inputFilepath of files) {
    const outputFilepath = buildOutputFilepath(inputFilepath, config);
    console.log(`Converting "${inputFilepath}" into "${outputFilepath}"...`);
    convertFile(inputFilepath, outputFilepath, config);
  }
  console.log('Done!');
}

convert()
  .catch((e) => {
    console.error('Failed!', e);
  });
