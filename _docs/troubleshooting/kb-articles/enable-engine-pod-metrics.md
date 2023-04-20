---
title: "Codefresh runner: Enabling engine pod metrics"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Runtimes, CLI]
support-reviewed: 2023-04-18 LG
---


## Overview

If you want to scrape the metrics from the Codefresh Runner to your existing
Prometheus\Grafana stack you will need to enable the metrics in the runner
engine pod.

## Details

You will need to add the `METRICS_PROMETHEUS_ENABLED: 'true'` environment
variable in your Runtime Environment spec.

To make the changes in your Runtime Environment, you will need to use the
[Codefresh CLI.](https://codefresh-io.github.io/cli/installation/)

1\. Get your Runtime Environment spec:

`codefresh get re <name> -o yaml > spec.yaml`

2\. Modify\add the `envVar` section in `runtimeScheduler` in the downloaded
file:

    
    
    ...  
    runtimeScheduler:  
      envVars:  
        METRICS_PROMETHEUS_ENABLED: 'true'  
      ...  
      cluster:  
        ...

3\. Save the file and then patch your RE using the following CLI command:  
`codefresh patch re -f spec.yaml`

Start a new build and check if you can scrape the metrics using port 9100 at
the /metrics endpoint. The metrics in the dind pod should be enabled by
default at the same port and endpoint.

