---
title: "How-to: Create cron trigger using CLI or API"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines, CLI, API]
support-reviewed: 2023-04-18 LG
---

## Overview

You want to create a cron trigger programmatically.

## Details

Since the cron trigger is not part of the pipeline spec, you will need to
create the trigger-event and then link it to the pipeline manually. This can
be done using Codefresh CLI or API calls.

### CLI

First, you need to create a trigger event ([CLI docs](https://codefresh-
io.github.io/cli/triggers/create-trigger-event/)):

```shell
codefresh create trigger-event --type cron --kind codefresh --value expression="0 0/5 0 ? * --value message=5min
```
  
The output will be something like this:

```shell
Trigger event: cron:codefresh:0 0/5 0 ? * *:5min:53be218399** was successfully created.
```
  
Then you need to attach the trigger-event to a pipeline ([CLI
doc](https://codefresh-io.github.io/cli/triggers/create-pipeline-trigger/)):

```shell
codefresh create t 'cron:codefresh:0 0/5 0 ? * *:test:53be218399**' <pipeline_ID>
```

### API

The process is the same as with the CLI. First, we create a trigger event
([API docs](https://g.codefresh.io/api/#operation/triggers-events-create)):

```shell
curl -X POST \  
-H "Authorization: ${API_KEY}" \  
-H 'Content-Type: application/json; charset=utf-8' \  
-d "{\"type\":\"cron\",\"kind\":\"codefresh\",\"values\":{\"expression\":\"0 0/5 0 ? * *\",\"message\":\"5min\"}}" \  
"https://g.codefresh.io/api/hermes/events?public=$false"
```

Output:

```shell
"cron:codefresh:0 0/5 0 ? * *:5min:53be218399**"
```

And then attach this event to a pipeline using the output event URI (URL-incoded) from the previous call ([APIdocs](https://g.codefresh.io/api/#operation/triggers-create)):

```shell
curl \  
-X POST \  
-H "Authorization: ${API_KEY}" \  
-H 'Content-Type: application/json; charset=utf-8' \  
-d "" \  
"https://g.codefresh.io/api/hermes/triggers/cron%253Acodefresh%253A0%25200%25200%252F1%25201%252F1%2520*%2520*%253Ahourly%253A53be2183993e/<pipeline_ID>"
```
