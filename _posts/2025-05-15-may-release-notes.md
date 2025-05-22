---
title: "Release Notes: May 2025"
description: ""
---


This release addresses a number of fixes to improve your experience across the platform.


## Bug fixes

##### GitOps
* Wrong revision promoted when a Promotion Flow is triggered manually by clicking Trigger button or automatically. 
* Release status not updated for product when a Promotion Flow is triggered manually by clicking the Trigger button. <!--- runtime version with fix to be released -->
* Updated validation for the Name field in Promotion Workflows to not allow underscores.
* GitOps permission rule for applications including the Git Source attribute not supported for applications from ApplicationSets.<!--- runtime version with fix to be released  -->
* Removed the **SSH** option from the **Repository** field in the Create Git Source form. Selecting SSH resulted in the error `failed creating git-source. error: Invalid URL`, as SSH is not a valid option for Git Sources. 
{% if page.collection == "posts" %}
* Inaccurate change failure rate for DORA metrics. 
{% endif %}