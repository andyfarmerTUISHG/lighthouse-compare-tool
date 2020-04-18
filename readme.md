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
