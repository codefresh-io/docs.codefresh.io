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

Codefresh provides several mechanisms to enforce access control within your organization:

* **Role-based access**  
  [Role-based access]({{site.baseurl}}/docs/administration/account-user-management/add-users/#users-in-codefresh), restricts access based on _who_ requires access. Access is granted based on the user's job responsibilities or position within an organization. You can restrict access to parts of the Codefresh UI to only administrators versus users. For example, only account administrators can create and modify integrations with Git providers and cloud services, while users can create, run, and modify pipelines. 

* **Attribute-based access control (ABAC)**  
  Policy-based access control via attributes (ABAC), restricts access to entities based on the _what (the type of access)_. Assigning attributes, or tags as in Codefresh, makes it easy to grant access to entities across teams and  allows Tagging entities with relevant keywords and categories can make it easier to search for and organize them. Tags allow users to quickly find entities that share similar characteristics, even if they are stored in different locations or have different names. For example, you can grant access to production clusters only to a subset of trusted developers/operators. On the other hand, access to a QA/staging cluster can be less strict.

* **Git-repository access**
  Restrict the Git repositories from which to load [pipeline definitions](#enable-disable-access-to-pipeline-yamls-by-source).

You can then create rules combining roles, entities, attributes and permissions to achieve fine-grained access control.
  
## Role-based access for users and administrators

Role-based access is usually defined when you [add users to Codefresh accounts]({{site.baseurl}}/docs/administration/account-user-management/add-users/#users-in-codefresh). Role-based access means assigning either a user or an administrator role.

> Only a user with an administrator role can add other users, and assign or change user roles.


{% include 
  image.html 
  lightbox="true" 
  file="/images/administration/users/invite-users.png" 
  url="/images/administration/users/invite-users.png" 
  alt="User roles for access control" 
  caption="User roles for access control"
    max-width="60%" 
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
|[Cloud provider settings]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster)      | `Admin`|
|[Cloud storage settings]({{site.baseurl}}/docs/testing/test-reports/#connecting-your-storage-account)      | `Admin`|
|[Shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/)      | `Admin`|
|[API token generation]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions)      | `Admin`|
|[SSO Settings]({{site.baseurl}}/docs/single-sign-on/single-sign-on/)      | `Admin`|
|[Runtime environment selection]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings)      | `Admin`|
|[Slack settings]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)      | `Admin`|
|[Audit logs]({{site.baseurl}}/docs/administration/audit-logs/)      | `Admin`|
|ABAC for Kubernetes clusters      | `Admin`|
|Billing and charging      | `Admin`|




## ABAC access control for entities

ABAC (Attribute-Based Access Control), allows fine-grained access to all entities, Kubernetes clusters, Codefresh pipelines, projects, and additional resources through the use of tags.  
For more information on ABAC, see [ABAC on Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control){:target="\_blank"}. 

tags can be used to allocate entities and resources to teams. Define which team has access to which entities and resources, and also the type of access. 
   
1. Defining rules using teams, resources, and attributes (who, what, where)
   Using tags you can define rules that dictate the policy as to which teams (who), can access which resources (what), and how 

### Define tags for entities 

Codefresh allows you to define tags for Kubernetes entities and Codefresh resources such as pipelines and projects. 
Tag names are arbitrary, and can be anything you choose that matches your company process. Tags can be product names, software lifecycle phases, department names, or names that help define security policies.  



#### Assign tags to Kubernetes clusters and Git contexts

After integrating Kubernetes clusters and Git providers in Codefresh, you can add one or more tags to each cluster and Git provider. Adding tags makes it easy to define multiple policies for the same cluster, and Git provider, also referred to as Git Contexts. For example, you can define access by project and by team.

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-abac.png"
  url="/images/administration/access-control/kubernetes-abac.png"
  alt="Cluster tags"
  caption="Cluster tags"
  max-width="70%"
    %}

**Before you begin**  

* If needed, [add a Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster)


**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Configuration in the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Click **Configure** for Kubernetes/Git to see the list of cluster/Git provider integrations (Git contexts).
1. Select the integration for which to add tags, and on the right click **Edit tags**. 
  The Tags page displays existing tags if any.  
  The example below shows the Tags panel for a Kubernetes cluster integration.


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

>By default, all clusters, with and without tags, are displayed and can be edited by all users (but not deleted). As soon as you add at least one tag to a cluster, the cluster is only accessible to users with the required policy rules.

#### Assign tags to pipelines 

Similar to Kubernetes clusters and Git Contexts, you can also add tags to Codefresh pipelines. 

**Before you begin**  
* If needed, [create a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/)

**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Configuration in the sidebar, select [**Shared Configuration**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select the row with the shared configuration for which to add tags, and then click the Tags icon on the right.
1. When finished, click **Save**.  


{% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-tags.png"
  url="/images/administration/access-control/pipeline-tags.png"
  alt="Assigning attributes to a pipeline"
  caption="Assigning attributes to a pipeline"
  max-width="80%"
    %}

#### Assign tags to Shared Configuration 
Shared configuration can be environment variables, Helm values, encrypted secrets for access tokens and YAMLs.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Configuration in the sidebar, select [**Shared Configuration**](hhttps://g.codefresh.io/account-admin/account-conf/shared-config){:target="\_blank"}. 
1. In the row with the configuration for which to add tags, click the tag icon on the right.  
1. Type in the tag, press Enter, and continue to add the tags you need.
1. When finished, click **Save**.  

### Define rules for access control 
Define rules using the *who, what, where* pattern to control access to entities and resources by departments, projects, roles etc. 
For Codefresh pipelines, you can define rules either at the pipeline or project levels. See 

For each rule to define, select:
1. The team the rule applies to 
1. The CRUD (*Create/delete/read/update*) permissions the team has to the entity/resource 
   Select all or any.
1. The tags that control access to the entity/resource
  * All tags
  * No tags
  * Explicitly named tags

**Before you begin**  
* Make sure you have [created at least one team]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh)  

**How to**  
1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. On the sidebar, from Access & Collaboration, select [**Permissions**](https://g.codefresh.io/account-admin/permissions/teams){:target="\_blank"}.
1. For each entity, do the following to define a rule:
    1. Select the team to which assign the rule.
    1. Select the permissions to assign to the team for that entity.
      > To assign all permissions, select each permission and Codefresh will show **Any** in the permissions field.
    1. To assign tags, select one of the following:
        *  **All tags**: Allows access only to entities with tags, regardless of the actual tag names.
        *  **Without tags**: Allows access only to entities that do not have tags assigned to them.
        * **Named tags**: Allows access only to those entities with the same tag names.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-policies.png"
  url="/images/administration/access-control/kubernetes-policies.png"
  alt="Kubernetes policies"
  caption="Kubernetes policies"
  max-width="80%"
    %}

### CRUD privileges for entities/resources

CRUD privileges define Create/Read/Update/Delete permissions for the entity.  Specific entities can have additional or different permissions.

> CRUD privileges when granted enable access to entities that are explicitly shared with all users.  
  `Any` indicates that none of the privileges are granted.

  {: .table .table-bordered .table-hover}
| Entity          | Privileges                |  
| --------------  | --------------                      | 
| Cluster          |  **Create**: Granted to account administrators only.<br>**Read**: View cluster integrations.<br>**Update**: View and edit existing allowed cluster resources, including [installing, removing, and rollback Helm charts]({{site.baseurl}}/docs/ci-cd-guides/helm-best-practices/). Tags are managed from account settings, so this permission doesn’t apply to it currently.<br> **Delete**: Granted to account administrators only.            | 
| Project          |  **Create**: Create projects, and add tags to the projects.<br>**Read**: View projects.<br>**Update**: View and edit projects, including the tags assigned to them.<br> **Delete**: Delete projects.| 
| Pipeline          | {::nomarkdown}There are two levels of permissions for pipelines:</br></br><ul><li><b>Access to pipelines by tags</b></br> <b>Create</b>: Create new pipelines and add tags to the pipelines when creating them.  only create new pipelines, not see, edit (which includes tagging them) or delete them. This permission should also go hand in hand with additional permissions like read/edit untagged pipelines.</br><b>Read</b>: View allowed pipelines only.</br><b>Update</b>: View and edit allowed pipelines, including editing the tags assigned to them.</br><b>Delete</b>: Delete allowed pipelines only.</br><b>Run</b>: Run allowed pipelines only.</br><b>Approve</b>: Resume pipelines pending manual <a href="https://codefresh.io/docs/docs/pipelines/steps/approval">approval</a>.</br><b>Debug</b>: Use <a href="https://codefresh.io/docs/docs/pipelines/debugging-pipelines/">pipeline debugger</a>.</li></br><li><b>Access to pipelines by projects and tags in projects</b></br> All or any of the above permissions for pipelines based on projects with/without/specified tags.{:/}| 
| Chart          |  **Read**: View Helm charts| 
| Git contexts          |  Git contexts refer to the permissions to create and manage integrations with Git providers and use them in pipelines. Tags are used to control access to teams and execution contexts. <br><br>**Create**: Add integrations to Git providers.<br>**Update**: View and edit Git provider integrations, including editing the tags assigned to them.<br>**Delete**: Delete Git provider integrations.<br>**Use**:<br>Create triggers in pipelines for Git provider<br>Retrieve YAML definitions from a repository<br>Use a Git integration in pipelines, in the `git-clone` step for example, via Execution Context. | 
| Shared configs<br>Secrets<br>YAMLs          |  Shared configuration permissions relate to managing: <br>{::nomarkdown}<ul><li>Environment variables, unencrypted (<b>Shared Configuration</b>), and encrypted for sensitive data such as access tokens (<b>Shared Secret</b>).</li><li>Helm values or other generic information, unencrypted (<b>Shared YAML</b>), and encrypted (<b>Shared Secret YAML</b>).</li></ul>{:/}<br>**Create**: Create unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.<br>**Read**: View unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.<br>**Update**: View and edit unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.<br>**Delete**: Delete unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML. | 



### Example 1: Permissions for pipelines based on projects and project tags

This example illustrates how to define rules to enforce access control for pipelines by projects.  

Adding tags to projects provides greater flexibility in managing access to pipelines and organizing them by teams. 
By defining CRUD rules based on project tags, you can control which teams have permissions to perform specific actions for pipelines across projects. While enforcing access restrictions between projects owned by different teams. 


**Scenario**:  
We have two teams: Backend, and Frontend. We want the teams to be able to modify their own pipelines, and view shared pipelines.  


**Step 1: Set up the teams**  
The first step is to create the two teams, and add the users you want to each team.  
See [Teams in Codefresh]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh).


**Step 2: Create the projects**  
Now we'll create three projects, with different tags. See [Create project for pipelines]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/#create-a-project-for-pipeline).
1. Project: `Backend-pipelines`; Tag: `backend`
1. Project: `Frontend-pipelines`; Tag: `frontend`
1. Project: `Shared-pipelines`; Tag: `shared`

**Step 3: Define the rules**  
As the final step, let’s define the rules that govern access to the projects, and by extension to the pipelines in the projects.

We'll first define the access requirements for each of the projects:
* Team `Backend` can `Read` projects with tag `frontend`
* Team `Frontend` can `Read` projects with tag `frontend`
* Team `Backend` can `Read` projects with tags `backend`

Here's how you would define the rules:

Rule 1: For Backend team: Access to pipelines in projects with either the `frontend` or `backend` tags.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/example-project-pipeline-permissions-backend.png"
  url="/images/administration/access-control/example-project-pipeline-permissions-backend.png"
  alt="Team permissions for pipelines by multiple project tags"
  caption="Permissions for pipelines by multiple project tags"
  max-width="60%"
  %}

Rule 2: For Frontend team: Access to pipelines in projects with only the `frontend` tag.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/example-project-pipeline-permissions-backend.png"
  url="/images/administration/access-control/example-project-pipeline-permissions-backend.png"
  alt="Team permissions for pipelines by single project tag"
  caption="Team permissions for pipelines by single project tag"
  max-width="60%"
  %}

Users in Team Backend can view any pipeline in any project with either tag `backend` or tag `frontend`, while users in Team Frontend can view only pipelines in projects with tag `frontend`. 


## Git-repository access restrictions 

When [creating a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/), users can by default use/load pipeline definitions from any of the following:
* Inline YAML editor
* Private Git repository
* Public Git repository

You can change the default behavior to restrict loading pipeline definitions from _specific_ Git repositories, or completely disable loading definitions from _all_ Git repositories.

### Enable/disable access to pipeline YAMLs by source
Enable or disable access to pipeline definition YAMLs based on the source of the YAMLs.  
These settings are effective for all pipelines in an account. When selected, the setting enables or disables that method of pipeline creation from the Codefresh UI, and running exist


**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From Configuration in the sidebar, select [**Pipeline Settings**](https://g.codefresh.io/account-admin/account-conf/pipeline-settings){:target="\_blank"}.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-restrictions.png"
  url="/images/administration/access-control/pipeline-restrictions.png"
  alt="Global pipeline restrictions"
  caption="Global pipeline restrictions"
  max-width="60%"
  %}

{:start="3"}
1. Turn on or off the options as needed. 


### Define access to Git repositories for pipeline YAMLs
If access to pipeline definitions are enabled for Git repositories, you can configure fine-grained restrictions through the integration settings for your [Git provider]({{site.baseurl}}/docs/integrations/git-providers/).

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
  

By default, when a user [creates a pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/), the definition can be loaded from the inline editor or any private or public Git repository. You can restrict this behavior and allow only specific Git sources or even disable completely the loading of pipeline definitions from Git repositories.


The global pipeline settings are available at [https://g.codefresh.io/account-admin/account-conf/pipeline-settings](https://g.codefresh.io/account-admin/account-conf/pipeline-settings)


 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-restrictions.png"
  url="/images/administration/access-control/pipeline-restrictions.png"
  alt="Global pipeline restrictions"
  caption="Global pipeline restrictions"
  max-width="80%"
    %}

In this screen there are toggle buttons for the following options:

 * Disable/Enable pipeline definitions defined using the inline editor of the Codefresh UI
 * Disable/Enable pipeline definitions from Git repositories connected to Codefresh 
 * Disable/Enable pipeline definitions from **any** public URL

 Clicking on any of the toggle buttons has a global effect.  For example if you disable the inline editor by clicking the first toggle, all existing pipelines
 that have their pipeline definition defined in the editor will be disabled (the run button will not be clickable).

 For more fine-grained restrictions you can visit the Git integration screen of your [Git provider]({{site.baseurl}}/docs/integrations/git-providers/) and expand the *YAML Options* segment.


 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-git-restrictions.png"
  url="/images/administration/access-control/pipeline-git-restrictions.png"
  alt="Pipeline restrictions per Git provider"
  caption="Pipeline restrictions per Git provider"
  max-width="80%"
    %}    


  Here you can restrict the Git repositories that can be used for pipeline definitions

  * per git repository name (regex or manual selection)
  * branch name (regex)
  * folder name inside a git repository (glob pattern)


For example if you enter `/^((pipeline-definition)$).*/g` in the second field, then users can load pipeline YAMLs only from a branch named `pipeline-definition` in a Git repository.



## Related articles
[Codefresh installation options]({{site.baseurl}}/docs/installation/installation-options/)  
[Managing your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
