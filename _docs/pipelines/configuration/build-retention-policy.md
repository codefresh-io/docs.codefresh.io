---
title: "Configure build retention policy for pipelines"
description: "Define workflow retention"
group: pipelines
sub_group: configuration
toc: true
---

Define the retention policy for pipeline builds in your environments. 

Save storage space for existing environments by deleting older builds. As the number of builds accumulate over time, they can take up a significant amount of storage space which you can free up by removing older builds. Fewer pipeline builds to manage, make it easy to navigate to and find relevant builds for monitoring and troubleshooting. 

For new environments, defining a retention policy ensures that your build environments are always controlled,  and storage and disk space are always optimized. 
Retention settings are controlled through environment variables in `cf-api`. By default, when enabled, Codefresh implements a Cron job that deletes builds older than 30 days. The job removes data from collections such as `workflowproccesses`. 

>**NOTE**:  
>Build logs are _not_deleted.


## Pipeline build retention settings

{: .table .table-bordered .table-hover}
| Env Variable   | Description             | Default                |
|---------------|--------------------------- |----------------------  |
|`TTL_RETENTION_POLICY_IS_ENABLED` | Determines if automatic build deletion through the Cron job is enabled.         | `true`                 |
|`TTL_RETENTION_POLICY_IN_DAYS`    | The number of days for which to retain builds, and can be between `30`(minimum) and `365` (maximum). Builds older than the defined retention period are deleted.  | `30`              |

## Configure the build retention policy
The retention mechanism is implemented as a Cron job, and deletes data from the `workflowprocesses` collection.

>**IMPORTANT**:  
  >For existing environments, for the retention mechanism to work, you must first drop the index in MongoDB.

1. Optional. For existing environments: 
    1. In MongoDB, drop the index for `created` field in `workflowprocesses` collection.
    1. Restart `cf-api`.
1. In `cf-api`, add `ttlDataRetentionPolicy`, and add the `TTL_RETENTION_POLICY_IS_ENABLED` and `TTL_RETENTION_POLICY_IN_DAYS` parameters with the required values.
   
## Related articles
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)  
[Pipeline integrations with Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)  