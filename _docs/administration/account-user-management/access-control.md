---
title: "Configuring access control for pipelines"
description: "Restrict resources to pipelines in a company environment"
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

Codefresh provides several mechanisms to enforce access control within your organization through user roles, CRUD privileges, and entity attributes such as tags. 
You can then create rules that combine roles, attributes, and CRUD (Create/Read/Update/Delete) privileges to create permissions. 

* **Role-based access**  
  [Role-based access](#role-based-access-for-users-and-administrators) restricts access based on the _who (the kind of user)_. Access is granted based on the user's job responsibilities or position within an organization. Codefresh administrators can access UI functionality that you would deny to other users. For example, only account administrators can create and modify integrations with Git providers and cloud services, while other users can create, run, and modify pipelines. 

* **Attribute-based access control (ABAC)**  
  Access control via attributes, restricts access to entities based on the _what (the type of access)_. Assigning attributes or tags as they are also referred to, to Codefresh  entities makes it easy to enforce a more flexible and secure form of access control.  
  For example, by adding tags to projects, you can enforce access control for pipelines through project tags, instead of relying on pipeline-level tags. So you can add tags to projects with pipelines that all teams can view and run (Read), but only the platform team can Create/Edit/Delete.  
  See [ABAC for entities with tags and rules](#abac-for-entities-with-tags-and-rules).

* **YAML source and Git-repository access**  
  YAML source and Git-repository access is a specialized form of access control that controls the Git repositories from which users can load pipeline definitions. See [Git-repository access for pipeline definitions](#git-repository-access-for-pipeline-definitions).

Let's review the different access mechanisms in more detail, including privileges available for each entity, and examples of rule definitions.
  
## Role-based access for users and administrators

Role-based access is usually defined when you [add teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh). Role-based access means assigning either a user or an administrator role.

>**NOTE:**  
Only a user with an administrator role can add other users, and assign or change user roles.


{% include 
  image.html 
  lightbox="true" 
  file="/images/administration/users/invite-users.png" 
  url="/images/administration/users/invite-users.png" 
  alt="User roles for access control" 
  caption="User roles for access control"
    max-width="60%" 
%}

The table below lists the functionality available for the `Admin` and `User` roles.

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
|[SSO Settings]({{site.baseurl}}/docs/administration/single-sign-on/)      | `Admin`|
|[Runtime environment selection]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings)      | `Admin`|
|[Slack settings]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)      | `Admin`|
|[Audit logs]({{site.baseurl}}/docs/administration/audit-logs/)      | `Admin`|
|ABAC for Kubernetes clusters      | `Admin`|
|Billing and charging      | `Admin`|




## ABAC for entities with tags and rules

ABAC (Attribute-Based Access Control), allows fine-grained access to all entities, Kubernetes clusters, Codefresh pipelines, projects, and additional resources through the use of tags and rules.  
For general information on ABAC, see [ABAC on Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control){:target="\_blank"}. 

**Tags**  
Tags give you the flexibility to assign entities and resources to specific teams while determining the type of access each team has. Tags serve as labels that help organize and control access to these entities and resources.

Tag names are entirely customizable and can align with your company's processes and requirements. They can encompass a wide range of categories, including product names, software lifecycle phases, departmental designations, or labels designed to enforce security policies. 

**Rules**  
Rules combine teams (who), privileges (what), and tags (where) to create fine-grained access control policies.  
Codefresh supports ABAC with the flexibility to use both OR and AND operations for tags.

### Tags for entities

#### Assign tags to Kubernetes clusters and Git contexts

After integrating Kubernetes clusters/Git providers in Codefresh, you can add one or more tags to each cluster/Git provider. Adding tags makes it easy to define multiple policies for the same cluster, and Git provider which is also referred to as Git Contexts. For example, you can define access by project and by team.

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-abac.png"
  url="/images/administration/access-control/kubernetes-abac.png"
  alt="Cluster tags"
  caption="Cluster tags"
  max-width="70%"
    %}

 

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

>By default, all clusters/Git integrations are displayed and can be modified by all users (but not deleted). As soon as you add at least one tag to a cluster/Git integration, it is only accessible to users with the required policy rules.

<br>

#### Assign tags to projects 

Add tags to projects for filtering and defining permissions. 

>**TIP**:  
  If [**Auto-create projects for teams**]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams) is enabled in global pipeline settings for your account, then creating the team also creates a project and tag for the project, both with the same name as the team name.


1. In the Codefresh UI, on the toolbar, from Pipelines in the sidebar, select [**Projects**](https://g.codefresh.io/projects/){:target="\_blank"}. 
1. Select the project for which to add tags, and then click the **Settings** icon on the right.
1. In the **Project Tags** field, add as many tags as you need.
1. When finished, click **Save**.  


{% include image.html
  lightbox="true"
  file="/images/administration/access-control/tags-project.png"
  url="/images/administration/access-control/tags-project.png"
  alt="Assigning tags to a project"
  caption="Assigning tags to a project"
  max-width="80%"
    %}

<br>

#### Assign tags to pipelines 

Similar to other entities, you can also add tags to Codefresh pipelines. 

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Pipelines in the sidebar, select [**Pipelines**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select the row with the pipeline for which to add tags, and then from the context menu on the right, select **Edit Tags**.
1. When finished, click **Save**.  


{% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-tags.png"
  url="/images/administration/access-control/pipeline-tags.png"
  alt="Assigning tags to a pipeline"
  caption="Assigning tags to a pipeline"
  max-width="80%"
    %}

<br>

#### Assign tags to Shared Configurations
Shared configuration can be environment variables, Helm values, encrypted secrets for access tokens and YAMLs.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Configuration in the sidebar, select [**Shared Configuration**](https://g.codefresh.io/account-admin/account-conf/shared-config){:target="\_blank"}. 
1. In the row with the configuration for which to add tags, click the tag icon on the right.  
1. Type in the tag, press Enter, and continue to add the tags you need.
1. When finished, click **Save**.  

<br><br>

### Rules for access control 
Define rules using the *who, what, where* pattern to control access to entities and resources. Rules can be based on OR or AND relationships.

For each rule, select:
1. The team the rule applies to 
1. The CRUD (*Create/Delete/Read/Update*) privileges the team has to the entity/resource 
  * For almost all entities, the Create privilege requires a separate rule. 
  * The other privileges can be defined in the same rule.
1. The tags that control access to the entity/resource:
  * Any tags (`any`): Grants access to entity as long as it has a tag. The tag name is not relevant.
  * All named tags (`all of these`): **AND** relationship between list of defined tags. Grants access only to the entities with _all_ the tags defined in the list.
  * Any named tag (`any of these`): **OR** relationship between list of defined tags. Grants access to the entity with _at least one_ of the tags defined.
  * No tags (`no`): Grants access to the entity _without_ any tags.  


The examples in this section illustrate how to control access to projects and to pipelines through project tags:
* [Example 1: Create rule to define access to projects by teams](#example-1-create-rule-to-define-access-to-projects-by-teams)  
* [Example 2: Create rule to define access across teams to pipelines by projects and project tags](#example-2-create-rule-to-define-access-across-teams-to-pipelines-by-projects-and-project-tags)

<br>

#### Define rules for entities/resources 

**Before you begin**  
Make sure you have:
* [Created at least one team]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh)  
* Added tags for all entities, except pipelines

**How to**  
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. On the sidebar, from Access & Collaboration, select [**Permissions**](https://g.codefresh.io/account-admin/permissions/teams){:target="\_blank"}.
1. For each entity, do the following to define a rule:
    1. Select the team to which assign the rule.
    1. Select the privileges to assign to the team for that entity.
      >**NOTE:**  
        You cannot select the **Create** privilege together with the other privileges. The **Create** privilege requires a separate rule.  
       **Any** indicates no privileges are selected.
    1. To determine  tags, select one of the following:
        * **Any**: Allows access to entities _with_ any tag, regardless of the actual tag names.
        * **All of these tags**: Allows access only to those entities _with all_ the tags defined in the list (_AND_ relationship between the tags). Access is denied if the entity does not all the tag names.
        * **Any of these tags**: Allows access only to those entities _with any_ of the tags defined in the list. Access is allowed if the entity has at one of the tag names.
        * **No tags**: Allows access only to entities that do not have tags assigned to them.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-policies.png"
  url="/images/administration/access-control/kubernetes-policies.png"
  alt="Rules for Kubernetes clusters"
  caption="Rules for Kubernetes clusters"
  max-width="80%"
    %}

<br>

#### CRUD privileges for entities/resources

CRUD privileges define Create/Read/Update/Delete permissions for the entity.  Specific entities can have additional or different permissions.

> You cannot grant Create privileges together with other privileges.  
  `Any` indicates that _none of the privileges_ are granted.

  {: .table .table-bordered .table-hover}
| Entity          | Privileges                |  
| --------------  | --------------                      | 
| Cluster          |  **Create**: Granted to account administrators only.<br>**Read**: View cluster integrations.<br>**Update**: View and edit existing allowed cluster resources, including [installing, removing, and rollback Helm charts]({{site.baseurl}}/docs/ci-cd-guides/helm-best-practices/). Tags are managed from account settings, so this permission doesn’t apply to it currently.<br> **Delete**: Granted to account administrators only.            | 
| Project          |  **Create**: Create projects, and add tags to the projects.<br>**Read**: View projects.<br>**Update**: View and edit projects, including the tags assigned to them.<br> **Delete**: Delete projects.| 
| Pipeline          | {::nomarkdown}There are two levels of permissions for pipelines:</br></br><ul><li><b>Access to pipelines by tags</b></br> <b>Create</b>: Create new pipelines and add tags to the pipelines when creating them. This permission does not include view and edit (which includes tagging them) or delete them. This permission should also go hand in hand with additional permissions like read/edit untagged pipelines.</br><b>Read</b>: View allowed pipelines only.</br><b>Update</b>: View and edit allowed pipelines, including editing the tags assigned to them.</br><b>Delete</b>: Delete allowed pipelines only.</br><b>Run</b>: Run allowed pipelines only.</br><b>Approve</b>: Resume pipelines pending manual <a href="https://codefresh.io/docs/docs/pipelines/steps/approval">approval</a>.</br><b>Debug</b>: Use <a href="https://codefresh.io/docs/docs/pipelines/debugging-pipelines/">pipeline debugger</a>.</li></br><li><b>Access to pipelines by projects and tags in projects</b></br> All or any of the above permissions for pipelines based on projects with/without/specified tags.{:/}| 
| Chart          |  **Read**: View Helm charts| 
| Git contexts          |  Git contexts refer to the permissions to create and manage integrations with Git providers and use them in pipelines. Tags are used to control access to teams and execution contexts. <br><br>**Create**: Add integrations to Git providers.<br>**Update**: View and edit Git provider integrations, including editing the tags assigned to them.<br>**Delete**: Delete Git provider integrations.<br>**Use**:<br>Create triggers in pipelines for Git provider<br>Retrieve YAML definitions from a repository<br>Use a Git integration in pipelines, in the `git-clone` step for example, via Execution Context. | 
| Shared configs<br>Secrets<br>YAMLs          |  Shared configuration permissions relate to managing: <br>{::nomarkdown}<ul><li>Environment variables, unencrypted (<b>Shared Configuration</b>), and encrypted for sensitive data such as access tokens (<b>Shared Secret</b>).</li><li>Helm values or other generic information, unencrypted (<b>Shared YAML</b>), and encrypted (<b>Shared Secret YAML</b>).</li></ul>{:/}<br>**Create**: Create unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.<br>**Read**: View unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.<br>**Update**: View and edit unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.<br>**Delete**: Delete unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML. | 

<br>

#### About pipeline permissions by project tags

Create rules for pipeline entities by project tags instead of pipeline tags. 

This option gives you almost unlimited flexibility in enforcing access control for pipelines without compromising security, as you can now define access scopes for pipelines on the basis of the projects that house the pipelines. Instead of tagging each pipeline, you tag the project. New pipelines in the project inherit those permissions. 

It also reduces the effort and time to create and maintain permissions for teams and entities. You can define which teams have no access, partial access (Read and Run), and full access.  
Users without access to a pipeline cannot view or run its builds. 

<br>

#### Example 1: Create rule to define access to projects by teams

This example illustrates how to create rules for projects and restrict access by teams. 

**Scenario**:  
We have two projects and we want to restrict access to them based on the tags assigned to the projects.
 
We want:
* All teams to have Read permissions to projects with tag `shared` 
* Only the DevOps team to have full permissions to projects tagged with `DevOps` 

**Step 1: Enable Auto-create projects for teams**:
This option, available as an account-level pipeline setting, avoids the need to create a project after creating the team.
It automatically creates the project: 
* With the same name as the team
* Adds a tag identical to the team name
* Creates a project rule and a pipeline rule 

See [Auto-create projects for teams]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams).

1. Go to [Pipeline Settings](https://g.codefresh.io/account-admin/account-conf/pipeline-settings), and make sure that **Auto-create projects...** is enabled.

<br>

**Step 2: Create the DevOps team**  
Now we'll create the two teams, DevOps and Users. 

1. Create the DevOps team. See [Teams in Codefresh]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh).
1. Go to [Projects](https://g.codefresh.io/projects/).
  You'll see that we already have a project DevOps, with a tag, also DevOps.  

   {% include image.html
  lightbox="true"
  file="/images/administration/access-control/example1-auto-created-project.png"
  url="/images/administration/access-control/example1-auto-created-project.png"
  alt="Example: Auto-created project and tag"
  caption="Example: Auto-created project and tag"
  max-width="60%"
  %} 

{:start="3"}
1. Create a new team, Users.

<br>

**Step 3: Create the projects**  
We will need to create only one project, as the DevOps project has already been created with the `DevOps` tag. 
* Create a project: `Sandbox` and assign tag `shared`. See [Create project for pipelines]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/#create-a-project-for-pipeline).

<br>

**Step 4: Define the project rules**   
Finally, we'll define the rules for the `DevOps` and '`Sandbox` projects.

1. For team DevOps: 
      1. Modify the existing Project rule with Read access to also allow Delete and Update access to projects with the `DevOps` tag, and `All tags`.
      1. Create a Project rule with Create access to projects with `All tags`. Note that this tag includes those projects `without tags` as well. 
1. For team Users:
      1. Create a Project rule with Read access to all projects with `shared` tags.

<br>

#### Example 2: Create rule to define access across teams to pipelines by projects and project tags

This example illustrates how to define rules to enforce access control for pipelines by project tags. We will assign tags to the different projects that house different pipelines. 
Instead of adding tags to each pipeline, which means that you need to add the same tags every time you create a new pipeline in the project, we will add tags to the projects that house the pipelines. 


**Scenario**    
We have three teams: DevOps, Marvel, and Users.  
We want:
* Teams DevOps and Marvel to be able to create and modify their own pipelines, and view and run all pipelines 
* Team User to view and run only specific pipelines


**Step 1: Set up the teams**  
The first step is to create the teams, and add the users you want to each team.  
See [Teams in Codefresh]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh).

If you have already created the DevOps and Users teams, you'll need to create the Marvel team.


**Step 2: Create the projects and assign tags**  
Now we'll create three projects, with different tags. See [Create project for pipelines]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/#create-a-project-for-pipeline).
1. Project: `Platform`; Tag: `backend`
1. Project: `Frontend`; Tag: `frontend`
1. Project: `Shared`; Tag: `shared`

**Step 3: Define the rules**  
As the final step, let’s define the rules that govern access to pipelines in projects through the project tags.

We'll first define the access requirements for the pipelines:
* Team `DevOps` has full permissions for pipelines in all projects with _any of these_ tags (OR relationship): `backend`, `frontend` and `shared`
* Team `Marvel` has full permissions for pipelines in all projects with _all of these_ tags (AND relationship) `frontend` and `shared`
* Team `Users` can view and run pipelines in all projects with _all of these_ tags (AND relationship) `shared`

>**NOTE:**  
We are defining rules for pipelines _with project tags_ instead of _pipeline tags_.


Here's how you would define the rules:
We need to define a Create rule each for teams DevOps and Marvel, and then different rules for the three teams with the other permissions.

* For team DevOps: 
    1. Rule 1: Create pipelines in projects with _any of these_ tags: `frontend` OR `backend` OR `shared`.
    1. Rule 2: All other permissions for pipelines in projects with _any of these_ tags: `frontend` OR `backend` OR `shared`.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/example-project-tags-devops.png"
  url="/images/administration/access-control/example-project-tags-devops.png"
  alt="Example: Unrestricted pipeline permissions for DevOps team by _any_ project tags"
  caption="Example: Unrestricted pipeline permissions for DevOps team by _any_ project tags"
  max-width="60%"
  %}

* For team Marvel:
    1. Rule 1: Create pipelines in projects only with _all of these_ tags: both `frontend` AND `shared`.
    1. Rule 2: All other permissions for pipelines in projects only with _all of these_ tags: both `frontend` AND `shared` tags.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/example-project-tags-marvel.png"
  url="/images/administration/access-control/example-project-tags-marvel.png"
  alt="Example: Restricting pipeline permissions by _all_ project tags"
  caption="Example: Restricting pipeline permissions by _all_ project tags"
  max-width="60%"
  %}

* For team Users: 
   * Rule: View and run for pipelines in projects only with _all of these_ tags: `shared`.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/example-project-tags-users.png"
  url="/images/administration/access-control/example-project-tags-users.png"
  alt="Example: Restricting team permissions for pipelines by _all_ project tags"
  caption="Example: Restricting team permissions for pipelines by _all_ project tags"
  max-width="60%"
  %}

## Git-repository access for pipeline definitions 

Enforce access control for pipeline definitions:
* At the account level by disabling the YAML sources from which to load and use pipeline definitions
* Configuring restrictions to Git repositories through the integration settings for your Git provider 

### Enable/disable access to pipeline YAMLs by source
Enable or disable access to pipeline definition YAMLs based on the source of the YAMLs.  
These settings are effective for all pipelines in an account. 

When [creating a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/), users can by default use/load pipeline definitions from any of the following:
* Inline YAML: The inline YAML editor in the Workflows tab. Disabling this option prevents users from modifying existing pipelines, and creating new pipelines through the Codefresh inline YAML editor. The Run button is also disabled for all such pipelines. 
* YAML from repository: Any Git repository connected to Codefresh. 
* YAML from URL: Any public URL. 

>You can further restrict access to Git repos, as described in [Define access to Git repositories for pipeline YAMLs](#define-access-to-git-repositories-for-pipeline-yamls).

**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
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

By default, if configured for the account, users can also load pipeline definitions from any private or public Git repository when [creating a pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/). You can restrict this behavior to allow access to selected repos, to folders within repos, to selected branches, or even completely disable loading pipeline definitions from Git repositories.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
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
[Codefresh Provider for Terraform](https://registry.terraform.io/providers/codefresh-io/codefresh/latest/docs){:target="\_blank"}   
[Codefresh installation options]({{site.baseurl}}/docs/installation/installation-options/)  
[Managing your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  

