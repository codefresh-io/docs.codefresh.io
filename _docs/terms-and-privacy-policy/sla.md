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

## Support Specific Information

### SLA Response Times


{: .table .table-bordered .table-hover}
| Priority         | Silver*     | Gold*                         | Platinum** |
| -------------- | ---------------------------- | ---------------------------- | -------------|
|Urgent          | 4 Hours | 2 Hours | 1 Hour |
| High           | 6 Business Hours | 4 Business Hours | 2 Hours| 
| Normal | 1 Business Day | 6 Business Hours| 3 Business Hours |
| Low | 1 Business Week | 2 Business Days | 8 Business Hours |

***Silver and Gold:** 9AM - 5PM PST support. Production down events will be handled with utmost urgency.

****Platinum:** 24/7 support. Customers with Platinum SLA can open urgent tickets in our Off-hours.

### Severity Definitions

{: .table .table-bordered .table-hover}
| Severity level         | Description     |
| -------------- | ---------------------------- | 
| 1 - Urgent | Services are not available or material functionality of the Services is not available and there is no acceptable work around provided |
| 2 - High | Disabled functionality, errors that result in a lack of significant functionality in the Services which prevent the user from accomplishing their testing with no acceptable work around provided|
| 3 - Normal | Errors that cause previously-working non-critical features to malfunction. |
| 4 - Low | General questions, How-To’s, best practices questions, and feature requests|

[Severity Examples](https://support.codefresh.io/hc/en-us/articles/360018951039-Codefresh-SLA-definitions)

### Support Channels

{: .table .table-bordered .table-hover}
| Channel         | Free     | Silver   | Gold | Platinum|
|----------------|-----------|--------- |------|---------|
| Support Portal | X         |   X      | X    | X       |
| SLA            |           |   X      | X    | X       |
| Phone*         |           |          | X    | X       |
| Slack**        |           |          |      | X       |

***Phone**: An initial reply by our answering service who will open a support ticket immediately which will be prioritized accordingly. This does include the 'Live support'/co-piloting/on boarding features offered by our Professional Services.

****Slack:** Not intended to be used for off-hour critical issues.

## Revision Control

{: .table .table-bordered .table-hover}
| Version Number         | Nature of Change     | Date Approved                          |
| -------------- | ---------------------------- | ---------------------------- |
|1.1 | Added support information | April 7, 2021 |
|1.0 | Initial version | January 17, 2021 |

