# Harvest-to-Jira Timesheet Converter

A tool that converts CSV reports produced by Harvest into timesheet CSV files accepted by Jira.

## Setup

It's best to uses Volta for Node version management. Install everything:
```shell
npm i
```

Create a config file:
```shell
cp src/config.example.json src/config.json
```

Specify task prefixes. For example, with the following config, tasks `AA-123` and `BB-345` would be included in the final report:
```
{
  "prefixes": [
    "AA",
    "BB"
  ],
  ...
}
```

## Prepare the file

* Open Harvest
* Switch to the Reports tab
* Choose the time range
* Press the Detailed Report button
* Export it as a CSV file
* Put the file into the project's `csv/input` folder.

## Run

* Execute `npm run convert`
* Find the file in the `csv/output` folder. It should have the same file name as the input one.