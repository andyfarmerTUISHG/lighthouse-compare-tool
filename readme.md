# Tool to Record and Compare Google Lighthouse Reports

Experiment to capture and compare Lighthouse Reports

## How to run

In order to run the tool:-

`node index.js --url http://akf0676.github.io/`

## Saving the Reports

To avoid reports from different websites getting mixed up we will organise like this:-

```ASCII
project
│  index.js
└───reports
    │
    └───domain1.com
    │   │   dateTtime.json
    │   │   dateTtime.json
    │
    └───domain2.com
        │   dateTtime.json
        │   dateTtime.json


```

Reports will be named with a timestamp so no two reports will be the same, and will enable the ability to distinguish between reports.

## Compare Reports

Take advantage of [Glob](https://www.npmjs.com/package/glob) in `sync` execution to collect all reports stored in a domain directory, so we ensure we know how many reports exist. Comparison will only execute if previous reports exist.

If there is a list fo reports - use `path` to parse the report data to get a list of all timestamps

Comparisons will be run on every new request, if there are pre-existing saved reports.

It is also possible to run a comparison of two reports:-

`node index.js --from domain1.com/dateTtime --to domain1.com/dateTtime`

## Comparison Logic

Items for comparison are held in a `metricFilter` this is used to review the items returned from the Lighthouse `audit` object, and cross reference it to the other passed report.

Results output:-

- Log color (Green for negative, red for positive, white for unchanged)
- Log text contents change.
  - [Name] is X% slower for positive numbers
  - [Name] is X% faster’ for negative numbers
  - [Name] is unchanged’ for numbers with no percentage difference.

There are many ways th

## Changes

Within this project supporting conventional commits.
Pre-fix commits with one of the following:

- feat: Feature changes/updates,
- fix: Bug fixes,
- docs: Documentation,
- style: Formatting, missing semi colons etc,
- refactor: Refactor,
- test: Adding missing tests,
- chore: Maintenance

Inspired by [CSS-Tricks](https://css-tricks.com/build-a-node-js-tool-to-record-and-compare-google-lighthouse-reports/)
