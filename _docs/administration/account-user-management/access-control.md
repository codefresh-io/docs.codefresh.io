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

Codefresh provides several mechanisms to enforce access control for pipelines within your organization through user roles, CRUD privileges, and entity attributes such as tags. 
You can then create rules that combine roles, attributes, and CRUD (Create/Read/Update/Delete) privileges to create permissions. 

* **Role-based access**  
  Role-based access restricts access based on the _who (the kind of user)_. Access is granted based on the user's job responsibilities or position within an organization. Codefresh administrators can access UI functionality that you would deny to other users. For example, only account administrators can create and modify integrations with Git providers and cloud services, while other users can create, run, and modify pipelines. 

  See [Role-based access for users and administrators](#role-based-access-for-users-and-administrators).

* **Attribute-based access control (ABAC)**    
  ABAC restricts access to entities based on attributes, allowing for a more flexible and secure form of access control. In Codefresh, these attributes are referred to as tags.  
  Codefresh uses a combination of teams, CRUD operations, and tags to define access control rules for ABAC. For general information on ABAC, see [ABAC on Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control){:target="\_blank"}. 

  
  By assigning tags to projects for example, you can control access to pipelines through project-level tags rather than individual pipeline-level tags. This simplifies access management and enhances security. For instance, you can create tags for projects, and then through CRUD privileges define which teams can view and run the pipelines in the projects, and which create, edit, or delete the pipelines within them.
 
  See [Assigning tags to entities for ABAC](#assigning-tags-to-entities-for-abac) and [Creating rules for ABAC](#creating-rules-for-abac).

* **YAML source and Git-repository access**  
  YAML source and Git-repository access is a specialized form of access control that controls the Git repositories from which users can load pipeline definitions.  
  
  See [Git-repository access for pipeline definitions](#git-repository-access-for-pipeline-definitions).

Let's review the different access mechanisms in more detail, including privileges available for each entity, and examples of rule definitions.
  
## Role-based access for users and administrators

Role-based access is usually defined when you [add teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh) to accounts. Role-based access means assigning either a user or an administrator role.

>**NOTE**  
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




## Assigning tags to entities for ABAC

ABAC (Attribute-Based Access Control), allows fine-grained access to all entities such as Kubernetes clusters, pipelines, projects, pipeline runtime enviroments, and additional resources through the use of tags and rules.  
 
Tags give you the flexibility to control access to entities and resources by specific teams. Tags serve as labels that help organize and control access to these entities and resources.

Tag names are entirely customizable and can align with your company's processes and requirements. They can encompass a wide range of categories, including product names, software lifecycle phases, departmental designations, or labels designed to enforce security policies. 

You can assign tags to:
* Kubernetes clusters and Git contexts
* Pipeline Runtimes
* Projects
* Pipelines
* Shared Configurations




### Assign tags to Kubernetes clusters and Git contexts

After integrating Kubernetes clusters/Git providers in Codefresh, you can add one or more tags to each cluster/Git provider. Adding tags makes it easy to define multiple policies for the same cluster and Git provider (also referred to as Git Contexts). For example, you can define access by project and by team.

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-abac.png"
  url="/images/administration/access-control/kubernetes-abac.png"
  alt="Cluster tags"
  caption="Cluster tags"
  max-width="70%"
    %}

 

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
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

{:start=4"}
1. Click **Add** and type in the tag. 
1. Continue to add tags and when finished, click **Save**. 

>**NOTE**  
  By default, all clusters/Git integrations are displayed and can be modified by all users (but not deleted). As soon as you add at least one tag to a cluster/Git integration, it is only accessible to users with the required policy rules.

### Assign tags to Pipeline Runtimes
Assign tags to Pipeline Runtimes, and use the tags to control which runtime environments are available to users within pipelines, and specific aspects of the runtime environments within pipelines.

By assigning tags to Pipeline Runtimes, you can define the specific runtime environments available to teams for pipelines. 
For example, you can assign a tag to runtime environments used for production builds. And ensure that only the platform operations team can assign environments for pipelines to protect production resources from unauthorized access. 
Or ensure that a development team working on a high-priority project can assign a high-performance runtime environment ensuring they have the necessary resources.


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Runtimes**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select the Runtime for which to add tags, and then from the context menu on the right, select **Edit Tags**.

   {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-runtimes-add-tags.png"
  url="/images/administration/access-control/pipeline-runtimes-add-tags.png"
  alt="Add tags to Pipeline Runtimes"
  caption="Add tags to Pipeline Runtimes"
  max-width="60%"
  %} 

{:start="3"}
1. Click **+Tag** and add the tag. 
1. Repeat to add more tags.
1. When finished, click **Save**. 

For examples, see [Creating rules for Pipeline Runtimes](#creating-rules-for-runtime-environments).

### Assign tags to projects 

Add tags to projects for filtering and defining permissions. 

{{site.data.callout.callout_tip}}
**TIP**  
  If [**Auto-create projects for teams**]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams) is enabled in global pipeline settings for your account, then creating the team also creates a project and tag for the project, both with the same name as the team name.
{{site.data.callout.end}}

1. In the Codefresh UI, on the toolbar, from the sidebar, select [**Projects**](https://g.codefresh.io/projects/){:target="\_blank"}. 
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



### Assign tags to pipelines 

Similar to other entities, you can also add tags to Codefresh pipelines. 

In addition to the privileges to manage pipelines, tags allow you to select specific privileges for different aspects of the runtime environment, ensuring that teams can only modify what they are authorized to. See [CRUD privileges for entities and resources](#crud-privileges-for-entitiesresources).


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipelines**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
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



### Assign tags to Shared Configurations
Shared configuration can be environment variables, Helm values, encrypted secrets for access tokens and YAMLs.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Shared Configuration**](https://g.codefresh.io/account-admin/account-conf/shared-config){:target="\_blank"}. 
1. In the row with the configuration for which to add tags, click the tag icon on the right.  
1. Type in the tag, press Enter, and continue to add the tags you need.
1. When finished, click **Save**.  



## Creating rules for ABAC 
Rules combine teams (who), privileges (what), and tags (where) to create fine-grained access control policies.  
Codefresh supports ABAC with the flexibility to use both OR and AND operations for tags.

>**NOTE**  
_AND_ operations for tags are not supported in on-premises environments.

Define rules using the *who, what, where* pattern to control access to entities and resources. Rules can be based on OR or AND relationships. See 

For each rule, select:
1. The team the rule applies to 
1. The [CRUD privileges](#crud-privileges-for-entitiesresources) the team has to the entity/resource 
  * For almost all entities, the Create privilege requires a separate rule. 
  * The other privileges can be defined in the same rule.
1. The tags that control access to the entity/resource:
  * Any tags (`any`): Grants access to entity as long as it has a tag. The tag name is not relevant.
  * All named tags (`all of these`): **AND** logic between list of defined tags. Grants access only to the entities with _all_ the tags defined in the list.
  * Any named tag (`any of these`): **OR** logic between list of defined tags. Grants access to the entity with _at least one_ of the tags defined.
  * No tags (`no`): Grants access to the entity _without_ any tags.  

See [Define rules for entities/resources](#define-rules-for-entitiesresources). 

Also review our examples in [Creating rules for pipelines by project tags](#creating-rules-for-pipelines-by-project-tags) and [Creating rules for Pipeline Runtimes](#creating-rules-for-pipeline-runtimes-and-runtime-environments).


### Define rules for entities/resources 

##### Before you begin
Make sure you have:
* [Created at least one team]({{site.baseurl}}/docs/administration/account-user-management/add-users/#teams-in-codefresh)
* Reviewed [CRUD privileges for entities/resources](#crud-privileges-for-entitiesresources)   
* Added tags for all entities, except pipelines

##### How to
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. On the sidebar, from Access & Collaboration, select [**Permissions**](https://g.codefresh.io/account-admin/permissions/teams){:target="\_blank"}.
1. For each entity, do the following to define a rule:
    1. Select the team to which assign the rule.
    1. Select the privileges to assign to the team for that entity.
      >**NOTE**  
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



### CRUD privileges for entities/resources

CRUD privileges define Create/Read/Update/Delete permissions available for the entity when you create a rule.  Specific entities can have additional or different permissions.

>**NOTE**    
  You cannot grant Create privileges together with other privileges.  
  `Any` indicates that _none of the privileges_ are granted.

  {: .table .table-bordered .table-hover}
| Entity          | Privilege                |  
| --------------  | --------------                      | 
| Cluster          |  {::nomarkdown}<ul><li><b>Create</b>: Granted to account administrators only.</li><li><b>Read</b>: View cluster integrations.</li><li><b>Update</b>: View and edit existing allowed cluster resources, including <a href="https://codefresh.io/docs/docs/ci-cd-guides/helm-best-practices/">installing, removing, and rollback Helm charts</a>.<br>Tags are managed from account settings, so this permission doesn’t apply to it currently.</li><li><b>Delete</b>: Granted to account administrators only.</li></ul>{:/}            | 
| Pipeline Runtimes          |  Allow teams to view Runtime Environments in pipelines by tags assigned to the Pipeline Runtimes. <br> See  <a href="https://codefresh.io/docs/docs/administration/account-user-management/access-control/#assign-tags-to-pipeline-runtimes">Assigning tags to Pipeline Runtimes</a>.| 
| Project          |  {::nomarkdown}<ul><li><b>Create</b>: Create projects, and add tags to the projects.</li><li><b>Read</b>: View projects.</li><li><b>Update</b>: View and edit projects, including the tags assigned to them.</li><li><b>Delete</b>: Delete projects.</li></ul>{:/}| 
| Pipeline          | There are three levels of permissions for pipelines:{::nomarkdown}<ul><li><b>Access to pipelines by tags</b><ul><li><b>Create</b>: Create new pipelines and add tags to the pipelines when creating them. This permission does not include view and edit (which includes tagging them) or delete. This permission should also go hand in hand with additional permissions like read/edit untagged pipelines.</li><li><b>Read</b>: View allowed pipelines only.</li><li><b>Update</b>: View and edit allowed pipelines, including editing the tags assigned to them.<li><b>Delete</b>: Delete allowed pipelines only.</li><li><b>Run</b>: Run allowed pipelines only.</li><li><b>Approve</b>: Resume pipelines pending manual <a href="https://codefresh.io/docs/docs/pipelines/steps/approval">approval</a>.</li><li><b>Debug</b>: Use <a href="https://codefresh.io/docs/docs/pipelines/debugging-pipelines/">pipeline debugger</a>.</li></ul></li><li><b>Access to pipelines by projects and tags in projects</b><br> All or any of the above permissions for pipelines based on projects with/without/specified tags.</li><li><b>Access to runtime environments and resources in pipelines</b>.<br> Any permission assigned here must include also the Update permission.<ul><li><b>Manage resources</b>: Select the CPU, memory, and minimum disk space combination best suited for the runtime environment.</li><li><b>Set cloud builds</b>: Select cloud builds and adjust the resource size for the build.</li><li><b>Set runtime environment</b>: Assign a runtime environment to the pipeline from those available based on tags assigned to Pipeline Runtimes. <br>This permission requires also the Build Runtime Environments permission.</li></ul></li></ul>{:/}| 
| Chart          |  **Read**: View Helm charts| 
| Git contexts          |  Git contexts refer to the permissions to create and manage integrations with Git providers and use them in pipelines. Tags are used to control access to teams and execution contexts. {::nomarkdown}<ul><li><b>Create</b>: Add integrations to Git providers.</li><li><b>Update</b>: View and edit Git provider integrations, including editing the tags assigned to them.</li><li><b>Delete</b>: Delete Git provider integrations.</li><li><b>Use</b>: <ul><li>Create triggers in pipelines for Git provider</li><li>Retrieve YAML definitions from a repository</li><li>Use a Git integration in pipelines, in the <code class="highlighter-rouge">git-clone</code> step for example, via Execution Context.</li></ul></li></ul>{:/}| 
| Shared configs<br>Secrets<br>YAMLs          |  Shared configuration permissions relate to managing: <br>{::nomarkdown}<ul><li>Environment variables, unencrypted (<b>Shared Configuration</b>), and encrypted for sensitive data such as access tokens (<b>Shared Secret</b>).</li><li>Helm values or other generic information, unencrypted (<b>Shared YAML</b>), and encrypted (<b>Shared Secret YAML</b>).</li></ul><li><b>Create</b>: Create unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.<li><b>Read</b>: View unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.</li><li><b>Update</b>: View and edit unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.</li><li><b>Delete</b>: Delete unencrypted or encrypted Shared Configuration, Shared Secret, Shared YAML, Shared Secret YAML.</li></ul>{:/} | 



### Creating rules for pipelines by project tags

Create rules for pipeline entities by project tags instead of pipeline tags. 

This option gives you almost unlimited flexibility in enforcing access control for pipelines without compromising security, as you can now define access scopes for pipelines on the basis of the projects that house the pipelines. Instead of tagging each pipeline, you tag the project. New pipelines in the project inherit those permissions. 

It also reduces the effort and time to create and maintain permissions for teams and entities. You can define which teams have no access, partial access (Read and Run), and full access.  
Users without access to a pipeline cannot view or run its builds. 



#### Example 1: Create rule to define access to projects by teams

This example illustrates how to create rules for projects and restrict access by teams. 

**Scenario**:  
We have two projects and we want to restrict access to them based on the tags assigned to the projects.
 
We want:
* All teams to have Read permissions to projects with tag `shared` 
* Only the DevOps team to have full permissions to projects tagged with `DevOps` 

**Step 1: Enable Auto-create projects for teams**  
This option, available as an account-level pipeline setting, avoids the need to create a project after creating the team.
It automatically creates the project: 
* With the same name as the team
* Adds a tag identical to the team name
* Creates a project rule and a pipeline rule 

See [Auto-create projects for teams]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams).

1. Go to [Pipeline Settings](https://g.codefresh.io/account-admin/account-conf/pipeline-settings), and make sure that **Auto-create projects...** is enabled.


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


**Step 3: Create the projects**  
We will need to create only one project, as the DevOps project has already been created with the `DevOps` tag. 
* Create a project: `Sandbox` and assign tag `shared`. See [Create project for pipelines]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/#create-a-project-for-pipeline).


**Step 4: Define the project rules**   
Finally, we'll define the rules for the `DevOps` and '`Sandbox` projects.

1. For team DevOps: 
      1. Modify the existing Project rule with Read access to also allow Delete and Update access to projects with the `DevOps` tag, and `All tags`.
      1. Create a Project rule with Create access to projects with `All tags`. Note that this tag includes those projects `without tags` as well. 
1. For team Users:
      1. Create a Project rule with Read access to all projects with `shared` tags.



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

>**NOTE**  
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
  max-width="70%"
  %}

* For team Marvel:
    1. Rule 1: Create pipelines in projects only with _all of these_ tags: both `frontend` AND `shared`.
    1. Rule 2: All other permissions for pipelines in projects only with _all of these_ tags: both `frontend` AND `shared`.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/example-project-tags-marvel.png"
  url="/images/administration/access-control/example-project-tags-marvel.png"
  alt="Example: Restricting pipeline permissions by _all_ project tags"
  caption="Example: Restricting pipeline permissions by _all_ project tags"
  max-width="70%"
  %}

* For team Users: 
   * Rule: View and run for pipelines in projects only with _all of these_ tags: `shared`.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/example-project-tags-users.png"
  url="/images/administration/access-control/example-project-tags-users.png"
  alt="Example: Restricting team permissions for pipelines by _all_ project tags"
  caption="Example: Restricting team permissions for pipelines by _all_ project tags"
  max-width="70%"
  %}

### Creating rules for Pipeline Runtimes and runtime environments

Create rules for runtime environments and how to use the environment and resources in pipelines. 

#### Example 1: Create rule to define access to Pipeline Runtimes

This example illustrates how to create rules for Pipeline Runtimes to restrict access by teams, and grant the same team all privileges to manage runtime environments within pipelines. 

**Scenario**:  
We want the DevOps team to be able to:
* Access all runtime environments with the `devops` tag when they create pipelines or run pipeline builds 
* Assign a runtime environment to the pipeline from those available
* Adjust the CPU, memory, and minimum disk space compatible with the selected runtime environment
* Set cloud builds and select the resource size for the cloud build





**Step 1: Add tags to Pipeline Runtimes**  
* Add the `devops` tag to one or more Pipeline Runtimes. See [Assign tags to Pipeline Runtimes](#assign-tags-to-pipeline-runtimes).


**Step 2: Define the rule for Pipeline Runtimes**    

* Create a Pipeline Runtimes rule for the `DevOps` team with _any of these_ tags:`devops`.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/build-runtime-env-setting.png"
  url="/images/administration/access-control/build-runtime-env-setting.png"
  alt="Example: Rule for Build Runtime Environment"
  caption="Example: Rule for Build Runtime Environment"
  max-width="60%"
  %}

**Step 3: Define the rule to manage aspects of runtime environments in pipeline**  

* Create a Pipeline rule (by project or by pipeline) for the DevOps team with _all_ runtime environment-related privileges.


 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipelines-all-runtime-env-permissions.png"
  url="/images/administration/access-control/pipelines-all-runtime-env-permissions.png"
  alt="Example: Rule for Pipelines by project with all privileges for runtime environments"
  caption="Example: Rule for Pipelines by project with all privileges for runtime environments"
  max-width="60%"
  %}

  Here's the result when users in the DevOps team opens **Pipeline > Settings**.
  As you can see, users can:
  * Assign any one of the runtime environments from the list to the pipeline
  * Adjust CPU, memory, and the minimum disk space 

  {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-build-runtime-settings1.png"
  url="/images/administration/access-control/pipeline-build-runtime-settings1.png"
  alt="Example: Pipeline > Settings for rule with all runtime environment privileges"
  caption="Example: Pipeline > Settings for rule with all runtime environment privileges"
  max-width="60%"
  %}


#### Example 2: Create rule to define access only to resources for runtime environments

This example illustrates how to create a rule at the pipeline-level to allow users only to modify resources for the selected runtime environment for the pipeline.  
Note that with this permission, users can view but not change the runtime environment. 

<br>

**Scenario**:  
We want the Marvel team to be able to: 
* Change CPU, memory and minimum disk space for the selected runtime environment


**Step 1: Add tags to Pipeline Runtimes**  
We already have the DevOps tags assigned to Pipeline Runtimes. If you need to add tags, see [Assign tags to Pipeline Runtimes](#assign-tags-to-pipeline-runtimes).


**Step 2: Define a rule to manage resources for Runtime Environments for the pipeline**  

Create a Pipeline rule with only the Manage resources privilege for runtime environments.

* Create a Pipeline rule for the Marvel team with Update and Manage resources privileges with _any of these_ tags: `devops`.

  {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipelines-manage-resources.png"
  url="/images/administration/access-control/pipelines-manage-resources.png"
  alt="Example: Rule with only Manage resource privilege for runtime environments"
  caption="Example: Rule with only Manage resource privilege for runtime environments"
  max-width="60%"
  %}

Here's the result when users in the Marvel team opens **Pipeline > Settings**.
As you can see, users can:
* View the runtime environment selected for the pipeline but not change it
* Adjust CPU, memory, and the minimum disk space

  {% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-build-runtime-settings-manage-resources.png"
  url="/images/administration/access-control/pipeline-build-runtime-settings-manage-resources.png"
  alt="Example: Pipeline > Settings for rule with only Manage resource privilege for runtime environments"
  caption="Example: Pipeline > Settings for rule with only Manage resource privilege for runtime environments"
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

{{site.data.callout.callout_tip}}
**TIP**    
  You can further restrict access to Git repos, as described in [Define access to Git repositories for pipeline YAMLs](#define-access-to-git-repositories-for-pipeline-yamls).
{{site.data.callout.end}}

##### How to 

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
[Managing your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  

