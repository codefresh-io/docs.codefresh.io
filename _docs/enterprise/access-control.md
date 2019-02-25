---
title: "Access control"
description: "How to restrict resources in a company environment"
group: enterprise
toc: true

---

Codefresh provides two complementary ways to for access control within an organization. Both of them depend on the existence
of users and teams with proper access level.

The first mechanism is a way to restrict access to parts of the UI that are intended for account administrators. For example, only an account administrator should be able to change integrations with [git providers]({{site.baseurl}}/docs/integrations/git-providers/) and [cloud services]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/). 

The second mechanism is policy based access control via attributes (ABAC) on Kubernetes clusters. This allows account administrators to define exactly which teams have access to which clusters. For example, access to production clusters should only be granted to a subset of trusted developers/operators. One the other hand access to a QA/staging cluster can be less strict.

## Users and administrators

You can define the level of access (user or administrator) from the same screen where you [add collaborators]({{site.baseurl}}/docs/accounts/invite-your-team-member/) to your account. From the left sidebar of the Codefresh UI choose *Account Settings* and then click on the *People* menu item under *User Management*.

{% include image.html
  lightbox="true"
  file="/images/enterprise/access-control/user-access-control.png"
  url="/images/enterprise/access-control/user-access-control.png"
  alt="User access control"
  caption="User access control"
  max-width="80%"
    %}

Next to each user you can click the drop-down box to decide the level access. There is another drop-down for the [SSO configuration]({{site.baseurl}}/docs/enterprise/single-sign-on/) as well.

> Note that you need to be an administrator yourself, in order to add new users and change their roles.

People with **User** access level can still use the Codefresh UI for day-to-do operations such as running pipelines, looking at Docker images and inspecting test reports but they *don't* have access to following screens:

*  [Git Integrations]({{site.baseurl}}/docs/integrations/git-providers/)
*  [External docker registry settings]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
*  [External Helm repositories]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
*  [Cloud provider settings]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
*  [Cloud storage settings]({{site.baseurl}}/docs/testing/test-reports/#connecting-your-storage-account)
*  [Shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/)
*  [API token generation]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions)
*  [SSO Settings]({{site.baseurl}}/docs/enterprise/single-sign-on/)
*  [Runtime environment selection]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)
*  [Slack settings]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)
*  [Team/Users settings]({{site.baseurl}}/docs/enterprise/ent-account-mng/)
*  ABAC for Kubernetes clusters
*  Billing and charging

Only people with **Administrator** level have access to the respective UI screens.

Note however that **Users** can still control their own email notification settings, as well as access the [internal Codefresh registry externally]({{site.baseurl}}/docs/docker-registries/codefresh-registry/#generate-cfcr-login-token).


## Access to Kubernetes clusters

to be written

### What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/enterprise/installation-security/)
* [Account management]({{site.baseurl}}/docs/enterprise/ent-account-mng/)
* [Managing your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)