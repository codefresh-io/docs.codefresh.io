---
title: "Configure build retention policy for pipelines"
description: "Define workflow retention"
group: pipelines
sub_group: configuration
toc: true
---

Define the retention policy for pipeline builds in your environments. 

For existing environments, save storage space by deleting older builds. Fewer pipeline builds to manage, make it easy to navigate to and find relevant builds for monitoring and troubleshooting. 
For new environments, defining a retention policy to better control build environments and optimize storage space. 

Retention settings are controlled through environment variables in `cf-api`. By default, when enabled, Codefresh implements a Cron job that deletes removes data from the `workflowproccesses` collection. 

>**NOTE**:  

>Build logs are _not_ deleted.



## Pipeline build retention settings


{: .table .table-bordered .table-hover}
| Env Variable   | Description             | Default                |
|---------------|--------------------------- |----------------------  |
|`TTL_RETENTION_POLICY_IS_ENABLED` | Determines if automatic build deletion through the Cron job is enabled.         | `false`                 |
|`TTL_RETENTION_POLICY_IN_DAYS`    | The number of days for which to retain builds, and can be between `30` (minimum) and `365` (maximum). Builds older than the defined retention period are deleted.  | `365`              |




## (Optional) Drop MongoDB index for existing environments

For existing environments, for the retention mechanism to work, you must first drop the existing index in MongoDB.  
This action requires a maintenance window that depends on the number of workflows to delete, approximately three hours per MongoDB node. 

1. In MongoDB, drop the index for `created` field in `workflowprocesses` collection.
1. Continue with _Configure build retention policy_.

## Configure build retention policy
If you have more than one `cf-api`, you must configure _all_ of them.

1. In `cf-api`, add `env.TTL_RETENTION_POLICY_IS_ENABLED`, and set it to `true`.
1. Add `TTL_RETENTION_POLICY_IN_DAYS` and set to the required value. If not set, uses the default of `365` days.
1. Verify that the `created` field in the `workflowprocesses` collection has a new index.   
1. Restart `cf-api`.
   
## Related articles
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)  
[Pipeline integrations with Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)  