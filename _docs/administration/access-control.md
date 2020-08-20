---
title: "Access control"
description: "How to restrict resources in a company environment"
group: administration
redirect_from:
  - /docs/enterprise/access-control/
toc: true

---

Codefresh provides several complementary ways for access control within an organization. 

The [first mechanism](#users-and-administrators) is a way to restrict access to parts of the UI that are intended for account administrators. For example, only an account administrator should be able to change integrations with [git providers]({{site.baseurl}}/docs/integrations/git-providers/) and [cloud services]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/). 

The [second mechanism](#access-to-kubernetes-clusters-and-pipelines) is policy-based access control via attributes (ABAC) on Kubernetes clusters and pipelines. This allows account administrators to define exactly which teams have access to which clusters and pipelines. For example, access to production clusters should only be granted to a subset of trusted developers/operators. On the other hand, access to a QA/staging cluster can be less strict.

The [third mechanism](#pipeline-definition-restrictions) allows you to restrict the Git repositories used for loading pipeline definitions.

There is also the additional layer of permissions for resources (such as concurrent builds and environments) as explained in the [Enterprise Account Management]({{site.baseurl}}/docs/administration/ent-account-mng/) page. 

## Users and administrators

You can define the level of access (**user** or **administrator**) from the same screen where you [add collaborators]({{site.baseurl}}/docs/accounts/invite-your-team-member/) to your account. From the left sidebar of the Codefresh UI choose *Account Settings* and then click on the *People* menu item under *User Management*.

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/user-access-control.png"
  url="/images/administration/access-control/user-access-control.png"
  alt="User access control"
  caption="User access control"
  max-width="80%"
    %}

Next to each user you can click the drop-down box to decide the level access. There is another drop-down for the [SSO configuration]({{site.baseurl}}/docs/administration/single-sign-on/) as well.

> Note that you need to be an administrator yourself, in order to add new users and change their roles.

People with **User** access level can still use the Codefresh UI for day-to-day operations such as running pipelines, looking at Docker images and inspecting [test reports]({{site.baseurl}}/docs/testing/test-reports/) but they *don't* have access to following screens:

*  [Git Integrations]({{site.baseurl}}/docs/integrations/git-providers/)
*  [External docker registry settings]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
*  [External Helm repositories]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
*  [Cloud provider settings]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
*  [Cloud storage settings]({{site.baseurl}}/docs/testing/test-reports/#connecting-your-storage-account)
*  [Shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/)
*  [API token generation]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions)
*  [SSO Settings]({{site.baseurl}}/docs/administration/single-sign-on/)
*  [Runtime environment selection]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings)
*  [Slack settings]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)
*  [Team/Users settings]({{site.baseurl}}/docs/administration/ent-account-mng/)
*  ABAC for Kubernetes clusters
*  Billing and charging

Only people with **Administrator** level have access to the respective UI screens.

Note however that **Users** can still control their own email notification settings.


## Access to Kubernetes clusters and Pipelines

Codefresh also provides fine-grained control to Kubernetes clusters and pipelines via attributes ([ABAC](https://en.wikipedia.org/wiki/Attribute-based_access_control)). The process involves 3 steps:

1. Assigning custom attributes to your Kubernetes clusters and/or pipelines
1. Creating teams and assigning users to them
1. Defining policies using teams, clusters and attribute (who, what, where)

Let's see these steps in order.

### Marking Kubernetes clusters with policy attributes

You can mark your clusters in the [Cloud provider integration page]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/).

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-abac.png"
  url="/images/administration/access-control/kubernetes-abac.png"
  alt="Cluster tags"
  caption="Cluster tags"
  max-width="70%"
    %}

To add a new tag/attribute, hover your mouse on a cluster and click on the *Edit tags* button on the right. You will get a new dialog where you can add multiple tags on a single cluster.

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/tagging-kubernetes-clusters.png"
  url="/images/administration/access-control/tagging-kubernetes-clusters.png"
  alt="Assigning attributes to a cluster"
  caption="Assigning attributes to a cluster"
  max-width="60%"
    %}

The tag names are arbitrary and can be anything you choose that matches your company process. You can mark your clusters with product names, software lifecycle phases, department names or anything that helps your security policies. Note that each cluster
can be assigned multiple tags, so it very easy to define multiple policies on the same cluster (e.g per project and per team).

>Notice that by default, all untagged clusters are seen and can be edited by all users (but not deleted). As soon as you add at least one tag on a cluster, this cluster will only be accessible to people that match the affected policy rules (explained in the next sections).

### Marking pipelines with policy attributes

You can also mark specific pipelines with tags. To do this click on the *Configure* menu on a pipeline and select *edit tags*


{% include image.html
  lightbox="true"
  file="/images/administration/access-control/pipeline-tags.png"
  url="/images/administration/access-control/pipeline-tags.png"
  alt="Assigning attributes to a pipeline"
  caption="Assigning attributes to a pipeline"
  max-width="80%"
    %}

Tagging pipelines works in a similar manner to Kubernetes clusters.


Once your clusters and pipelines are tagged, you should create teams that work on these clusters.


### Creating teams 

To create and manage teams of people, from the left sidebar of the Codefresh UI choose *Account Settings* and then click on the *Team* menu item under *User Management*.


> Only Enterprise customers can add new teams. Other Codefresh plans can only use the predefined *Users* and *Admin* teams. [Contact us](https://codefresh.io/contact-us/) if you wish to upgrade to an Enterprise plan.

**Note that team names should only contain lower case alphanumeric characters and hyphens. Spaces are not allowed**. See the screenshot below for some sample team names.

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/teams.png"
  url="/images/administration/access-control/teams.png"
  alt="Managing teams"
  caption="Example teams in Codefresh"
  max-width="80%"
    %}

On this screen you can:
 * Create a new team by clicking on the respective button on the top right
 * Search for a specific team by typing on the top left field
 * Edit a team by clicking on it and assigning people

 You can only assign existing collaborators that were added in the *People* screen as explained in the first part of this page.
 You can (and should) assign the same person to multiple teams. In most companies, people have multiple overlapping roles. 

 >Note that by default there are already two teams for *users* and *admins* which contain the people you [invited as collaborators]({{site.baseurl}}/docs/accounts/invite-your-team-member/).

 With the teams in place, the final step is to create security policies.

### Creating a security policy

 To define security policies from the left sidebar of the Codefresh UI choose *Account Settings* and then click on the *Permissions* menu item under *User Management*


 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/kubernetes-policies.png"
  url="/images/administration/access-control/kubernetes-policies.png"
  alt="Kubernetes policies"
  caption="Kubernetes policies"
  max-width="80%"
    %}

Here you can create new security rules using the *who, what, where* pattern. For each rule you select:

1. The team the rule applies to,
1. Cluster privileges (*Create/delete/read/update*) or pipeline privileges (*Create/delete/read/run/update*), and
1. The effective tags (multiple tags can be used).

This way you can define any policy you wish per departments, projects, roles etc. for cluster/pipeline access.

There are two custom tags that you can use in rules which are "special":

* `untagged` is a "tag" which refers to all clusters that don't have any tag.
* `*` (the star character) means *all tags*.

> Note that you cannot add any rules for administrators. Administrators by default have access to all clusters.

#### Description of privileges 

For clusters:

* `Create` - cluster creation requires someone to be account administrator anyway so currently this permission isn’t really necessary .
* `Read` - can only see existing allowed clusters without any ability to change them.
* `Update` - can see and edit existing allowed cluster resources (which means also perform [installation, removal and rollbacks of Helm charts]({{site.baseurl}}/docs/new-helm/helm-best-practices/)). Tags are managed from account settings, so this permission doesn’t apply to it currently.
* `Delete` - cluster removal requires someone to be account administrator anyway so currently this permission isn’t really necessary.

For pipelines:

* `Create` - can only create new pipelines, not see, edit (which includes tagging them) or delete them. This permission should also go hand in hand with additional permissions like read/edit untagged pipelines.
* `Read` - view allowed pipelines only.
* `Update` - see and edit allowed pipelines only (including tagging them).
* `Delete` - can delete allowed pipelines only.
* `Run` - can run allowed pipelines only.
* `Approve` - resume pipelines that are waiting for manual [approval]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/).
* `Debug` - allow the usage of the [pipeline debugger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/debugging-pipelines/).

## Pipeline definition restrictions

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

 Clicking on any of the toggle buttons has a global effect. It will disable the respective GUI method during pipeline creation and will disable
 running of existing pipelines that use that method. For example if you disable the inline editor by clicking the first toggle, all existing pipelines
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


For example if you enter `/^((pipeline-definition)$).*/g` in the second field, then users will be able to load pipeline yamls only from a branch named `pipeline-definition` in a Git repository.


## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/administration/installation-security/)
* [Account management]({{site.baseurl}}/docs/administration/ent-account-mng/)
* [Managing your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)