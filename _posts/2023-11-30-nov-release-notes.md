---
title: "Release Notes: November 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements


### Pipelines: New `timeout` functionality for pipeline steps

We are happy to announce a new field for pipeline steps, the `timeout` flag to further enhance control over your pipelines!
The `timeout` flag, when assigned to a step, prevents that step from running beyond a specific duration if so required.

Add the `timeout` flag with the `<duration>` and `<units>` to any of these step types: `git-clone`, `freestyle`, `build`, `push`, `composition`, `pending-approval`.

**How it works**  
* Steps that exceed the timeout limit are automatically terminated. If the steps are completed before the timeout limits are exceeded, the timeout values are ignored.
* Steps terminated through timeouts have the same behavior as failed steps. If you notice any inconsistencies, kindly report them as bugs.
* In parallel steps, by default, the timeout defined for the parent is inherited by child steps.

**Example**  

```yaml
version: '1.0'
steps:
  parallel:
    type: parallel
    timeout: 1m
    steps:
      first:
        image: alpine
      second:
        image: alpine
        timeout: 2m 
      third:
        image: alpine
        timeout: null 
```
For details, see [Git-clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) and [Add timeouts for parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/#add-timeouts-for-parallel-steps).

### Pipelines: Share log URLs for pipeline builds with timestamps
Our latest enhancement simplifies troubleshooting and resolution process for issues in pipeline builds! How? By introducing the ability to share the URL of the build log with your team! 

By selecting the part of the build log you want your team to look at for a specific step or for the entire build: a single row, a specific segment, or whatever you need, and clicking **Share**, you get a unique URL. 
When colleagues, logged in to the same account, access the shared URL link, the build log opens directly to the highlighted section for easy identification.

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/nov23/rel-notes-nov-23-share-logs-select-lines.png" 
url="/images/whats-new/nov23/rel-notes-nov-23-share-logs-select-lines.png" 
alt="Sharing URL for build logs" 
caption="Sharing URL for build logs" 
max-width="50%" 
%}

**Please note**  
Sharing build log URLs requires timestamps in the logs. Codefresh will enable timestamps for all accounts, which can affect automation you may have created based on log output formats without timestamps. To opt out, please contact Codefresh Support.  
This functionality will be available for all customers starting December 14.


For details, see [Sharing log URLs for pipeline builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#sharing-log-urls-for-pipeline-builds).

### Pipelines: Custom audiences for OIDC
You’ll be happy with our latest enhancement for OIDC in Codefresh pipelines. Now, our OIDC integration supports multiple audiences. This flexibility is crucial for working with audiences that require distinct names instead of defaulting to the platform’s hostname, such as the Codefresh platform URL.

**Customize your audience**  
In the `obtain-oidc-id-token` step, tailor your audience by defining custom values — either a single value or multiple values separated by commas.

Here’s an example of a single custom audience:

```yaml
obtain_id_token:
  title: Obtain ID Token
  type: obtain-oidc-id-token:1.2.1
  arguments:
    AUDIENCE: "cosign"
```

For details, see [Standard OIDC claims]({{site.baseurl}}/docs/integrations/oidc-pipelines/#standard-oidc-claims).


### Other changes
* **Pipelines**: Helm steps now support Helm releases 3.9.0 and higher.
* **GitOps**: We have restored the option in the UI to Download logs for GitOps Helm Runtimes.



## Bug fixes

**General**  
* Removing users from Codefresh UI, via API, or Terraform, results in 504 error.
* Organizations list not sorted in alphabetical order. 
* Events missing from Audit log. 

<br>

**Pipelines**  
* Branch information for Gerrit as Git provider not loaded in Codefresh. 
* Branches not loaded for GitLab repos within sub-groups. 
* `stepTemplate` runs in default volume path ignoring `WORKING_DIR` environment variable. 
* For Azure DevOps Pull Request (PR) (push commit, push reviewers changed, votes score changed, status changed) events, the build status in Azure DevOps is not identical to the build status in Codefresh.
* Incorrectly sorted list of volumes in Volume Provisioner results in less than optimal volume selected for caching. 
* Webhook for Bitbucket triggers three builds for a single event. 
* Helm step does not support latest Helm versions. 
* Long response times when loading large numbers of repos and branches for Bitbucket.
* Incorrect error message for Glob expressions in Modified Files for Triggers. 
* Incorrect step-level metrics for `build` step when `buildx` is set to `true` and the `builder driver` is set to `docker-container`. 
* Incorrect results for CLI command `codefresh get pip --label`. 
* Builds stuck indefinitely in `terminating` state. 

<br>


**GitOps**  
* Some GitOps Runtimes not displayed in List view.
* Incorrect behavior with `ServerSideApply` for Hybrid GitOps Runtimes. 
* Incomplete list of Pull Requests and Jira issues in Timeline tab of GitOps Apps dashboard when Kubernetes and deployments and Rollouts are both used in the same application.  
* Unable to add managed clusters to GitOps Runtimes.
* Unable to add a non-OpenShift cluster to GitOps Runtimes.
* Truncated names for the Labels filter when clicking **More filters** in GitOps Apps dashboard. 

