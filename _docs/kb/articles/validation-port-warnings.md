---
title: "Validation port warnings"
description: ""
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: true
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Issue

Warning regarding the validation port on trying to launch a service or composition. Codefresh uses the validation port to verify that your application is up.  

Launching a pipeline showed the following warning messages in the build log:

* “Encountered a problem while validating your application. Please check your pipeline configuration.”
* “No default port was configured”.

{% include
image.html
lightbox="true"
file="/images/troubleshooting/validation-port-warning.png"
url="/images/troubleshooting/validation-port-warning.png"
alt="Validation port warning"
caption="Validation port warning"
max-width="40%"
%}

## Possible cause

Though the pipeline is launched successfully, the Codefresh **health check** couldn't identify which URL to validate or didn’t get a response from the specified application port.  
  
When launching a pipeline, Codefresh exposes the ports specified in the repository’s Dockerfile. Codefresh enables you to validate that your application is up by running a '**health check**' to test the connection to one of the exposed ports.

## Solution

1. Make sure that you listen to one of your exposed ports:
   * If you use a Dockerfile, listen to a port in your application.
   * If you use a template, listen to one of the exposed ports in either the template, or in the ports list. (If you are not using a Dockerfile, you can find the ports list in the **Pipeline** view.
2. Navigate to **Repositories > Your Repository > Launch Settings**, and verify that the **Application Port** is the same one that your application exposes, and listen to it. This is the port on which Codefresh runs the **health check**.

    {% include
    image.html
    lightbox="true"
    file="/images/troubleshooting/port-for-health-check.png"
    url="/images/troubleshooting/port-for-health-check.png"
    alt="Port for health check"
    caption="Port for health check"
    max-width="40%"
    %}

## Related articles

[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)
