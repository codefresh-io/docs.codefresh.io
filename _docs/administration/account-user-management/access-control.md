---
title: "Configuring access control"
description: "Restrict resources in a company environment"
group: administration
sub_group: account-user-management
redirect_from:
  - /docs/administration/access-control/
  - /docs/enterprise/access-control/
  - /docs/enterprise-account-mng/ent-account-mng/
  - /docs/enterprise/ent-account-mng/
  - /docs/administration/ent-account-mng/  
toc: true
---
<!-- needs fine tuning for GitOps as well; all x-refs have to be updated-->
Codefresh provides several complementary ways for access control within an organization:

* **Role-based access**: [Role-based access]({{site.baseurl}}/docs/administration/account-user-management/add-users/#users-in-codefresh), restricts access to parts of the Codefresh UI intended for account administrators. For example, only an account administrator should be able to change integrations with [git providers]({{site.baseurl}}/docs/integrations/git-providers/) and [cloud services]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster). 

* **Attribute-based access control (ABAC)**: Policy-based access control via attributes (ABAC), restricts access to [Add Kubernetes clusters with policy attributes](##add-kubernetes-clusters-with-policy-attributes). This option allows account administrators to define exactly which teams have access to which clusters and pipelines. For example, you can grant access to production clusters only to a subset of trusted developers/operators. On the other hand, access to a QA/staging cluster can be less strict.

* **Git-repository access**: Restrict the Git repositories used to load [pipeline definitions](##enabledisable-access-to-pipeline-yamls-by-source).


## Role-based access for users and administrators

Role-based access, as either a user or an administrator, is usually defined when you [add users to Codefresh accounts]({{site.baseurl}}/docs/administration/add-users/#users-in-codefresh).

> To add users and assign or change user roles, you must be an administrator yourself.


{% include 
  image.html 
  lightbox="true" 
  file="/images/administration/users/invite-users.png" 
  url="/images/administration/users/invite-users.png" 
  alt="User roles for access control" 
  caption="User roles for access control"
    max-width="90%" 
%}

The table below lists the functionality available for role-based access.

{: .table .table-bordered .table-hover}
| Functionality          | Available for Role               |  
| --------------         | --------------           |  
|Run pipelines            | `User` and `Admin`|
|View Docker images      | `User` and `Admin`|
|Inspect text reports    | `User` and `Admin`|
|[Git Integrations]({{site.baseurl}}/docs/integrations/git-providers/)      | `Admin`|
|[External Docker registry settings]({{site.baseurl}}/docs/integrations/docker-registries/)      | `Admin`|
|[External Helm repositories]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/)      | `Admin`|
|[Cloud provider settings]({{site.baseurl}}/docs//integrations/kubernetes/#connect-a-kubernetes-cluster)      | `Admin`|
|[Cloud storage settings]({{site.baseurl}}/docs/testing/test-reports/#connecting-your-storage-account)      | `Admin`|
|[Shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/)      | `Admin`|
|[API token generation]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions)      | `Admin`|
|[SSO Settings]({{site.baseurl}}/docs/single-sign-on/)      | `Admin`|
|[Runtime environment selection]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings)      | `Admin`|
|[Slack settings]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)      | `Admin`|
|[Audit logs]({{site.baseurl}}/docs/administration/audit-logs/)      | `Admin`|
|ABAC for Kubernetes clusters      | `Admin`|
|Billing and charging      | `Admin`|



## ABAC access control for Kubernetes clusters and pipelines

ABAC (Attribute-Based Access Control), allows fine-grained access to Kubernetes clusters and pipelines. See ([ABAC](https://en.wikipedia.org/wiki/Attribute-based_access_control){:target="\_blank"}. 

ABAC access control includes: 

1. Assigning custom attributes to your Kubernetes clusters
1. Assiging custom attributes to your pipelines
1. Defining rules as policies using teams, clusters, and attributes (who, what, where)



### Add Kubernetes clusters with policy attributes <!---TITLE: add tags to Kubernetes clusters-->

After adding Kubernetes clusters, you can configure clusters with multiple tags.  

Tag names are arbitrary, and can be anything you choose that matches your company process. You can tag your clusters with product names, software lifecycle phases, department names, or name that helps your security policies.  

You can assign multiple tags to each cluster, making it easy to define multiple policies on the same cluster. For example, per project and per team.

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-abac.png"
  url="/images/administration/access-control/kubernetes-abac.png"
  alt="Cluster tags"
  caption="Cluster tags"
  max-width="70%"
    %}

**Before you begin**  
* If needed, [add a Kubernetes cluster]({{site.baseurl}}/docs//integrations/kubernetes/#connect-a-kubernetes-cluster)

**How to**  

1. Expand the provider under which you added the cluster.
1. Mouse over the cluster to which to add tags or attributes, and then click **Edit tags** on the right. 
  The Tags page displays existing tags if any, and allows you to add multiple tags for a single cluster.


{% include image.html
  lightbox="true"
  file="/images/administration/access-control/tagging-kubernetes-clusters.png"
  url="/images/administration/access-control/tagging-kubernetes-clusters.png"
  alt="Assigning tags to a cluster"
  caption="Assigning tags to a cluster"
  max-width="60%"
    %}

{:start="3"}
1. Click **Add** and type in the tag. 
1. Continue to add tags and when finished, click **Save**. 

>By default, all clusters, with and without tags, are displayed and can be edited by all users (but not deleted). As soon as you add at least one tag to a cluster, the cluster is only accessible to users with the required policy rules (explained in the next sections).

### Configure pipelines with policy attributes <!---TITLE: add tags to pipelines-->

Similar to Kubernetes clusters, you can also add tags to specific pipelines. 

**Before you begin**  
* If needed, [create a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/)

**How to**  

1. In the Codefresh UI, from Pipelines in the sidebar, select [Pipelines](https://g.codefresh.io/pipelines/all/){:target="\_blank"}.
1. In the row with the target pipline, click the context menu for the pipeline, and then select **Edit tags**.
1. Type in the new tag, press Enter, and continue to add the tags you need.
1. When finished, click **Save**.  


{% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-tags.png"
  url="/images/administration/access-control/pipeline-tags.png"
  alt="Assigning attributes to a pipeline"
  caption="Assigning attributes to a pipeline"
  max-width="80%"
    %}


### Define rules for access control 
Define security rules using the *who, what, where* pattern to control access to clusters and pipelines by departments, projects, roles etc.  

For each rule you define, select:
1. The team the rule applies to 
1. Cluster privileges (*Create/delete/read/update*) or pipeline privileges (*Create/delete/read/run/update*)
1. Effective tags


**Before you begin**  
* Make sure you have [created at least one team]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh)  

**How to**  
1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. On the sidebar, from Access & Collaboration, select [**Permissions**](https://g.codefresh.io/account-admin/permissions/teams){:target="\_blank"}.
1. For each entity, do the following to define a rule:
    1. Select the team to which assign the rule.
    1. Select the permissions to assign to the team for that entity.
    1. Select either all clusters with tags (**All tags**) or all clusters that are untagged (**Without tags**).

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-policies.png"
  url="/images/administration/access-control/kubernetes-policies.png"
  alt="Kubernetes policies"
  caption="Kubernetes policies"
  max-width="80%"
    %}

### Description of privileges 

**For clusters:**

* `Create`: cluster creation requires someone to be account administrator anyway so currently this permission isn’t really necessary .
* `Read` - can only see existing allowed clusters without any ability to change them.
* `Update` - can see and edit existing allowed cluster resources (which means also perform [installation, removal and rollbacks of Helm charts]({{site.baseurl}}/docs/new-helm/helm-best-practices/)). Tags are managed from account settings, so this permission doesn’t apply to it currently.
* `Delete` - cluster removal requires someone to be account administrator anyway so currently this permission isn’t really necessary.

**For pipelines:**  

* `Create` - can only create new pipelines, not see, edit (which includes tagging them) or delete them. This permission should also go hand in hand with additional permissions like read/edit untagged pipelines.
* `Read` - view allowed pipelines only.
* `Update` - see and edit allowed pipelines only (including tagging them).
* `Delete` - can delete allowed pipelines only.
* `Run` - can run allowed pipelines only.
* `Approve` - resume pipelines that are waiting for manual [approval]({{site.baseurl}}/docs/pipelines/steps/approval/).
* `Debug` - allow the usage of the [pipeline debugger]({{site.baseurl}}/docs/pipelines/debugging-pipelines/).



## Git-repository access restrictions 

By default, users can load pipeline definitions when [creating a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/), from the inline editor, or any private or public Git repository.  

You can change the default behavior to restrict loading pipeline definitions from specific Git repositories or completely disable loading the definitions from all Git repositories.

### Enable/disable access to pipeline YAMLs by source
Enable or disable access to pipeline definition YAMLs based on the source of the YAML. These global settings are effective for all pipelines in the account and enables or disables that method of pipeline creation from the Codefresh UI.
pipeline definitions from:
 * The inline editor in the Codefresh UI:  Disabling the inline editor for example, disables new and _all existing pipelines_
 with pipeline definitions defined in the Codefresh editor. The Run button is disabled for all such piplines.
 * Any Git repository connected to Codefresh 
 * **Any** public URL


1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From Configuration on the sidebar, select [**Pipeline Settings**](https://g.codefresh.io/account-admin/account-conf/pipeline-settings){:target="\_blank"}.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-restrictions.png"
  url="/images/administration/access-control/pipeline-restrictions.png"
  alt="Global pipeline restrictions"
  caption="Global pipeline restrictions"
  max-width="80%"
    %}

{:start="3"}
1. Turn on or off the options as needed. 


### Define access to Git repositories for pipeline YAMLs
If access to pipeline definitions are enabled for Git repositories, you can configure fine-grained restrictions through the integrations settings for your [Git provider]({{site.baseurl}}/docs/integrations/git-providers/).

1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From Configuration on the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}.
1. Select the Git provider integration, click **Edit**.
1. Scroll down and expand **YAML Options**.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-git-restrictions.png"
  url="/images/administration/access-control/pipeline-git-restrictions.png"
  alt="Pipeline restrictions per Git provider"
  caption="Pipeline restrictions per Git provider"
  max-width="80%"
    %}    

{:start="5"}
1. Configure restrictions for Git repositories that can be used for pipeline definitions:
  * **Allow only the following repositories**: Toggle **Manual selection** to on, and then select the Git repos, or define a regex according to which to select repos. 
  * **Allow only the following branches**: Select Git repositories by the branches that match the regex. For example, this regex `/^((pipeline-definition)$).*/g`, allows users to load pipeline YAMLs only from a branch named `pipeline-definition` in a Git repository.
  * **Allow only the following paths**: Select Git repositories by folders within the repo that match the glob pattern).
  


## Related articles
[Codefresh installation options]({{site.baseurl}}/docs/installation/installation-options/)  
[Managing your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
