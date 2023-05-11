---
title: "Configure build retention policy for pipelines"
description: "Define workflow retention"
group: pipelines
sub_group: configuration
toc: true
---

QUESTIONS:
Is it per pipeline or per account?
What do you mean by existing vs new environments?
Does it also delete the build logs?


Define the retention policy for pipeline builds for existing and new environments. 

For existing environments, deleting older builds saves storage space and makes for easier management. As the number of builds accumulate over time, they can take up a significatent amount of storage space which youcan free up by  Remvoing older builds. With fewer pipeline builds to manage, it is easier to navigate to and find relevant builds for monitoring and troublshooting. 
For new environments, defining a retention policy ensures that your builds don't get out of hand, and storage and disk space are always optimied. 
Retention settings are controlled through environment variables in cf-api. By default, when enabled, Codefresh deletes builds older than 30 days, including offline logs. The The retention mechanism, implemented as a Cron Job, removes data from collections such as:
* workflowproccesses


## Pipeline build retention settings

{: .table .table-bordered .table-hover}
| Env Variable   | Description             | Default                |
|---------------|--------------------------- |----------------------  |
|`TTL_RETENTION_POLICY_IS_ENABLED` | Determines if automatic build deletion through the Cron job is enabled.         | `true`                 |
|`TTL_RETENTION_POLICY_IN_DAYS`    | The number of days for which to retain builds, and between `30`(minimum) and `365` (maximum). Builds older than the defined retention period are deleted.  | `30`              |

## Configure the build retention policy
The retention mechanism is implemented as a Cron job and deletes data from the `workflowprocesses` collection.
For existing environemnts, the mechanism works only after dropping the index on the  only works 

For existing environments:
1. In MongoDB, drop the index on `created` field in `workflowprocesses` collection.
1. In `cf-api`, enable `ttlDataRetentionPolicy`.
1. Restart `cf-api`.


How to
1. In `cf-api`:
   
 with configuration enabling the . 

For existing environments, you must drop the index on created 


In order to deploy to existing environments it is needed to drop the index on created field in workflowprocesses collection in mongo database.
and restart 

environment variables to be set:

 = true

T = 365 (default is 365, minimum is 30 days hardcoded in order to avoid some mistakes)

if index is not dropped, there will be no effect on workflowprocess collection.