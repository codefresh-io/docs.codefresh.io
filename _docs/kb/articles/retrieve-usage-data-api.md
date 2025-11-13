---
title: "How To: Retrieve Usage Data via the Analytics API"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [API]
support-reviewed:
---

## Overview

This guide shows how to programmatically access usage-related analytics through the **Codefresh Analytics API**. You'll learn the key endpoints, available reports, supported query parameters, and see a script you can adapt for your own reporting needs.  

> **Goal:** Pull usage metrics (e.g., credit consumption, pipeline credit consumption, active committers) for monitoring or reporting.

**Disclaimer:**  
This API is used for data visualization in the user interface. It does not provide raw analytical data, but rather pre-aggregated data in the form of OLAP cubes intended for rendering graphical charts in the interface. There are currently no plans to standardize or version this API, so the data structure may change at any time without backward compatibility or public notice.

## Prerequisites

- A Codefresh **API key** with permission to access Analytics.
- Date range values in `YYYY-MM-DD` format for queries.
- Optional: `jq` for pretty-printing JSON responses when using shell examples.

## Details

### Endpoints

**Reports**
```
GET https://g.codefresh.io/api/analytics/reports/{reportName}
```
Replace `{reportName}` with the specific report you want to query. Examples:
```
GET https://g.codefresh.io/api/analytics/reports/creditConsumption
GET https://g.codefresh.io/api/analytics/reports/pipelineCreditConsumption
GET https://g.codefresh.io/api/analytics/reports/activeCommitters
```

**Discover reports and parameters**
```
GET https://g.codefresh.io/api/analytics/metadata
```

> **Notes**
> - Not all reports and query parameters are publicly documented.
> - Different reports support different time ranges and granularities.
> - Use the **metadata** endpoint to discover available reports and their parameters.

### Query parameters & time dimensions

**creditConsumption** and **pipelineCreditConsumption** support:  
- **No granularity (aggregated):** 1 day – 1 year  
  `?dateRange=YYYY-MM-DD&dateRange=YYYY-MM-DD`  
- **Monthly granularity:** 1 day – 1 year  
  `?granularity=month&dateRange=YYYY-MM-DD&dateRange=YYYY-MM-DD`  
- **Daily granularity:** 2 days – 45 days  
  `?granularity=day&dateRange=YYYY-MM-DD&dateRange=YYYY-MM-DD`  

**activeCommitters** supports:  
- **Monthly granularity:** 3 months – 1 year  
  `?granularity=month&dateRange=YYYY-MM-DD&dateRange=YYYY-MM-DD`

### Examples

**Credit consumption for the last 3 months with monthly granularity**
```
curl -s -H "Authorization: $API_KEY" "https://g.codefresh.io/api/analytics/reports/creditConsumption?granularity=month&dateRange=$(date -v-3m +'%Y-%m-%d')&dateRange=$(date +'%Y-%m-%d')" | jq .
```

**Credit consumption for the last 11 months without granularity**
```
curl -s -H "Authorization: $API_KEY" "https://g.codefresh.io/api/analytics/reports/creditConsumption?dateRange=$(date -v-11m +'%Y-%m-%d')&dateRange=$(date +'%Y-%m-%d')" | jq .
```

**Pipeline credit consumption for the last 14 days with daily granularity**
```
curl -s -H "Authorization: $API_KEY" "https://g.codefresh.io/api/analytics/reports/pipelineCreditConsumption?granularity=day&dateRange=$(date -v-14d +'%Y-%m-%d')&dateRange=$(date +'%Y-%m-%d')" | jq .
```

**Active committers for the last 6 months with monthly granularity**
```
curl -s -H "Authorization: $API_KEY" "https://g.codefresh.io/api/analytics/reports/activeCommitters?granularity=month&dateRange=$(date -v-6m +'%Y-%m-%d')&dateRange=$(date +'%Y-%m-%d')" | jq .
```

## Suggested script

```
#!/bin/bash
# Expects these variables will be passed as parameters:
# API_KEY -> pass Codefresh API key
API_KEY=$1
# START_DATE -> pass start date formatted like "YYYY-MM-DD"
START_DATE=$2
# END_DATE -> pass end date formatted like "YYYY-MM-DD"
END_DATE=$3
# REPORT_NAME -> pass report name: creditConsumption | pipelineCreditConsumption | activeCommitters 
REPORT_NAME=$4

# Validate passed variables are not empty:
: "${API_KEY:?Set API_KEY}"
: "${START_DATE:?Set START_DATE}"
: "${END_DATE:?Set END_DATE}"
: "${REPORT_NAME:?Set REPORT_NAME}"

# Fetch report with monthly granularity
curl -s -H "Authorization: $API_KEY" "https://g.codefresh.io/api/analytics/reports/${REPORT_NAME}?granularity=month&dateRange=${START_DATE}&dateRange=${END_DATE}"   | jq .
```

## Error handling

The API can return errors. Known error types and typical messages:

- BadRequestError (400)
  - "Invalid report name" — check the report name for typos.
  - "Passed structure is invalid - [Time dimensions are not supported for target report: {reportName}]" — invalid combination of date range and granularity. Different reports support different parameter combinations (for example, creditConsumption with daily granularity supports a maximum range of 45 days).
  - "Filter by account id is not allowed by user params" — invalid filter parameter.

- AuthError (403)
  - "Permission denied" — the API key/user is not authorized to access the requested report.

- ReportExecutionError (432)
  - "analytics report not finished yet" — the report is still being generated. Retry the same request later (common when requesting large periods with no pre-aggregated cache).

- InternalServerError (500)
  - "Could not get analytics report" — no data available for the requested combination of parameters (period/granularity/filters).

## Best practices

- Use the **metadata** endpoint to confirm available reports and supported query parameters.
- Select a date range and **granularity** appropriate for your reporting needs.
- Automate data collection (cron, pipeline) to regularly sync usage data into your BI/monitoring systems.
