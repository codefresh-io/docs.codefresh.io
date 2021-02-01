---
title: "Service Commitment"
description: "Codefresh Cloud Service SLA Definition"
group: terms-and-privacy-policy
toc: true
---

Codefresh will use commercially reasonable efforts to make Codefresh available with a Quarterly Uptime Percentage, during any monthly billing cycle, of at least 99.5% (the “Service Commitment”).

## Definitions

* “Quarterly Uptime Percentage” is calculated as the average of the Availability for all 10-minute intervals in a quarterly billing cycle. Quarterly Uptime Percentage measurements exclude downtime resulting by the limitation specified in the “limitations” section.
* “Availability” is calculated for each 10-minute interval as the percentage of Requests initiated during this interval that do not fail with Errors. If you did not have Builds or API invocations in a given 10-minute interval, that interval is assumed to be 100% available.
* “Request” is an invocation of Codefresh to start the build process based on the customer’s project definition by directly calling the Codefresh API or triggered by a supported event source (e.g. Codefresh Console, Webhooks, etc.).
* An “Error” is any Request that finishes in “fault” terminal state with an HTTP status code of 500 (Internal Failure) or 503 (ServiceUnavailable).

## Limitations

This SLA and any applicable Service Levels do not apply to any performance or availability issues:

1. Due to factors outside our reasonable control (for example, natural disaster, war, acts of terrorism, riots, government action, or a network or device failure external to our data centers, including at your site or between your site and our data center);
1. That result from the use of services, hardware, or software not provided by us, including, but not limited to, issues resulting from inadequate bandwidth or related to third-party software or services;
1. Caused by your use of a Service after we advised you to modify your use of the Service, if you did not modify your use as advised;
1. During or with respect to preview, pre-release, beta or trial versions of a Service, feature or software (as determined by us)
1. That result from your unauthorized action or lack of action when required, or from your employees, agents, contractors, or vendors, or anyone gaining access to our network by means of your passwords or equipment, or otherwise resulting from your failure to follow appropriate security practices;
1. That result from your failure to adhere to any required configurations, use supported platforms, follow any policies for acceptable use, or your use of the Service in a manner inconsistent with the features and functionality of the Service (for example, attempts to perform operations that are not supported) or inconsistent with our published guidance;
1. That result from faulty input, instructions, or arguments (for example, requests to access files that do not exist);
1. That result from your attempts to perform operations that exceed prescribed quotas or that resulted from our throttling of suspected abusive behavior;
1. For licenses reserved, but not paid for, at the time of the Incident.

## Record of Changes

{: .table .table-bordered .table-hover}
| Type of information          | Document data                              |
| -------------- | ---------------------------- |
| Document Title:| Codefresh Cloud Service SLA Definition|
| Document Owner: | Sasha Shapirov - Codefresh Chief Information Security Officer (CISO) and VP R&D |
| Approved by: | Sharon Vendrov - Head of DevOps |
| Issued: | January 3, 2021 |
| Reviewed & Revised: | January 17, 2021 |

## Revision Control

{: .table .table-bordered .table-hover}
| Version Number         | Nature of Change     | Date Approved                          |
| -------------- | ---------------------------- | ---------------------------- |
1.0 | Initial version | January 17, 2021 |

## Document Distribution and Review

The document owner will distribute this document to all approvers when it is first created and as changes or updates are made. This document will be reviewed and updated annually or upon written request by an approver or stakeholder. Questions or feedback about this document can be directed to the owner or a listed approver.