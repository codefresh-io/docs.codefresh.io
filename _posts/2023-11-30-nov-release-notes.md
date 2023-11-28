---
title: "Release Notes: November 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements
For our November release, we are starting with GitOps, introducing two groundbreaking features: Environments and Products!

### GitOps: Environments 
Welcome to the first ever GitOps dashboard for Environments! If you are familiar with our wide range of dashboards for Argo CD applications in Codefresh, you are also aware of the unique insights these dashboards offer into Argo CD applications and their deployments. 

What these dashboards don't inherently reveal is the relationships between different but interconnected Argo CD Applications.

Enter the GitOps Environments dashboard! A game-changer that changes your GitOps experience with Argo CD applications. 

SCREENSHOT

What do you get?
* Contextual visbility: Argo CD applications are displayed within the context of their Environments, providing a comprehensive view of their journey through the software development and deployment lifecycle. 
* Version identification: Unified visibility across Environments allows you to track deployed versions effortlessly, ensuring users always access the latest or most appropriate version. You can also discern which services were rolled out in specific versions and view detailed commit information.
* Enhanced insights: Beyond contextual visibility, you can delve into the deployment history of individual applications and take actions such as synchronization and refresh, among others.


**How to start?**  
You start by creating Environments. An Environment is a custom resource in Codefresh comprising one or more pairs of clusters and namespaces. Our user-friendly UI simplifies Environment creation, allowing you to define Environments by criteria meaningful to your organization and applications – from development cycles to deployment regions. 

Once you create an Environment, Codefresh automatically populates them with the applications deployed to clusters and namespaces that are mapped to it, and showcases them in the GitOps Environments dashboard. 

**Working with Environments**
From this point, interacting with Environments is straightforward and intuitive: 
* Reorder Environments effortlessly through drag-and-drop
* Edit settings or delete Environments as needed

**Working with Argo CD Applications in Environments**  
Managing Argo CD applications within Environments is just as simple:
* View modes that allow you to decide the extent of information to track  
* Deployment timeline tracing all releases for the application, identifying issues or failures that require attention
* Access to the full Timeline view in the GitOps Apps dashboard in parallel
* Options to manage individual applications available through the app's context menu  



For details, see ???

### GitOps: Products

GitOps Products is yet another groundbreaking concept in GitOps from Codefresh!  
A Product represents a cohesive unit of Argo CD applications, enabling you to define and treat sets of applications as a unified entity. 

Products bridge the gap between Argo CD applications and Environments. They allow you to group Argo CD applications that seem different, but are essentially the same application, promoted and deployed to different Environments.

This unified view of multiple applications not only helps track technical aspects of the releases, but more importantly, correlate the view with additional layers of information that artiaffect theM

  * Artifacts created, updated, removed Deployments (Kubernetes)
  * Changes that caused the deployment, when, and by whom (Git commits and committers)
  * Features released in the deployment (Jira)facts, Git commits and Pull Requests, Jira issues and more, all in the same view.  



**How to start?**
Similar to Environments, you start by creating Products. A Product, also a custom resource in Codefresh, connects one or more Argo CD applications. 

Again, our intuitive UI makes it simple to create a Product. You can connect applications using K8s-native annotations, either Codefresh's default annotation or custom annotations that you add to the Product's definitions.  
You can also create Products and assign applications to them later directly from the Products dashboard.

Once you create Products and connect applications, Codefresh completes what needs to be done, from identifying applications assigned to Products, organizing them in the Environments they are deployed to, and showcasing them in the Products dashboard. 

**Working with Products**  
 you can edit settings for existing Products, or remove Products.
You can also assign unassigned Argo CD applications to existing Products.

**Working with Argo CD applications in Products**
Working with Argo CD applications in Products is as intuitive as working with them in Environments. First of all, you have similar functionality as in the Environments dashboard to remain in the same view. So you have the release timeline and options to manage individual applications here as well. 
 

What's unique to Products is the:
* Unified view of related applications in their Environments. Instead of a list of individual applications in their Environments, Products shows connected applications  
* Integrated information from Kubernetes, Git, and Jira providing perspectives for different stakeholders

For details, see ??? 

### GitOps: Share logs for Helm Runtimes

???

### Pipelines: New `timeout` functionality for pipeline steps

We are happy to announce a new field for pipeline steps, the `timeout` flag to further enhance control over your pipelines!
The `timeout` flag, when assigned to a step, prevents that step from running beyond a specific duration if so required.

Add the `timeout` flag with the <duration> and <units> to any of these step types: `git-clone`, `freestyle`, `build`, `push`, `composition`, `pending-approval`.

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
For details, see ??

### Pipelines: Custom audiences for OIDC
You’ll be happy with our latest enhancement for OIDC in Codefresh pipelines. Now, our OIDC integration supports multiple audiences. This flexibility is crucial for working with audiences that require distinct names instead of defaulting to the platform’s hostname, such as the Codefresh platform URL.

**Customize your audience**  
In the `obtain-oidc-id-token` step, tailor your audience by defining custom values — either a single value or multiple values separated by commas.

Here’s an example of a single custom audience:

```yaml
obtain_id_token:
  title: Obtain ID Token
  type: obtain-oidc-id-token
  arguments:
    AUDIENCE: "cosign"
```

For details, see ???



## Bug fixes

**General**  
* (On-premises only) Removing users removing users from Codefresh UI, or via API or Terraform results in 504 error. (CR-21192 - Vadim)
* Events missing from Audit log. 

<br>

**Pipelines**  
* Branch information for Gerrit as Git provider not loaded in Codefresh. (CR-21414 - Alina)
* Branches not loaded for GitLab repos within sub-groups. (CR-21413)
* CR-21202 Zhenya to ask if valid
* Incorrect step-level metrics for `build` step when `buildx` is set to `true` and the `builder driver` is set to `docker-container`. (CR-21193 - Zhenya)
* For Azure DevOps Pull Request (PR) (push commit, push reviewers changed, votes score changed, status changed) events, the build status in Azure DevOps is not identical to the build status in Codefresh.(CR-21171 Olek)
* Incorrect volume sort in Volume Provisioner. (CR-21168 - Noam)
* `stepTemplate` runs in default volume path ignoring `WORKING_DIR` environment variable. (CR-21167 - Zhenya)
* Webhook for Bitbucket triggers three builds for a single event. (CR-21159 - Olek)
* Helm step does not support latest Helm versions. (CR-21055 - Vadim)
* CR-21024 Mikhail
* Incorrect error message for Glob expressions. (CR-20956 - Vadim)
* Incorrect results for CLI command `codefresh get pip --label`. (CR-20734 - Yosi)
* Actions for Bitbucket Codefresh slow to load (CR-18913 - Andrii)
<br>


**GitOps**  
* GitOps Runtimes missing from List view and Personal Access Token lists. (CR-21197 - Oleg)
* Unable to add managed clusters to GitOps Runtimes. (CR-21030 - Mikhail)
* CR-20998 Mikhail
* Incomplete list of Pull Requests and Jira issues in Timeline tab of GitOps Apps dashboard when Kubernetes and deployments and Rollouts are both used in the same application. (CR-20848 - Olek) 
* Incorrect behavior with ServerSideApply for Hybrid GitOps Runtimes. (CR-20837 - Pasha)
* Not found screen for analysis run (CR-20808 - Victor - verify if customer issue)
* (On-premises?)Clicking Truncated Labels on clicking More filters in GitOps Apps dashboard. (CR-20792 Alina)