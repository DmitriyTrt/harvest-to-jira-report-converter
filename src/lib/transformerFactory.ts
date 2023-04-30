import { Transform } from "stream";
import Config from "./Config";

// This must list all the column names pushed to the stream by the transformer.
export const columns = [
  'Issue Key',
  'Date Started',
  'Time Spent',
  'Comment',
];

const transformerFactory = (config: Config) => {
  const prefixes = config.prefixes.join('|');
  const taskIdPattern = `(?<task>(?:${prefixes})\\-\\d+)`
  const noteRegexp = new RegExp(`^\\s*${taskIdPattern}\\:\\s*(?<notes>.*)$`);

  return new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      const {
        Notes: notes,
        Date: date,
        Hours: hours
      } = chunk;

      if (!date || !hours) {
        throw new Error('Missing date or hours on a line!');
      }

      if (typeof notes === 'string') {
        const matches = noteRegexp.exec(notes);
        if (matches) {
          this.push({
            "Issue Key": matches.groups?.task,
            "Date Started": date,
            "Time Spent": `${hours}h`,
            Comment: matches.groups?.notes
          });
        }
      }

      callback();
    },
  })
}

export default transformerFactory;
