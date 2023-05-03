# Harvest-to-Jira Timesheet Converter

A tool that converts CSV reports produced by Harvest into timesheet CSV files accepted by Jira.

## Setup

It's best to use [Volta](https://volta.sh/) for Node version management.

Install everything:
```shell
npm i
```

Create a config file:
```shell
cp src/config.example.json src/config.json
```

Specify the project prefixes (the part before the `-` dash in a task ID):
```
{
  "prefixes": [
    "AA",
    "BB"
  ],
  ...
}
```

## Log your time to Harvest

With the above config, all the time entries must have the following format to be included in the final report:
```
AA-999: What was done
 bb-99999 : Some description
```

Spaces around a task ID are ignored.

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
* Upload the timesheet into Jira.
