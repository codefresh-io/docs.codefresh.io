---
title: "User settings"
description: "Manage email notifications and API keys"
group: administration
toc: true
---

To access your individual user settings navigate to [https://g.codefresh.io/user/settings](https://g.codefresh.io/user/settings) or click on *User settings* on the left sidebar.

## Email notifications for builds 

In the part section of the screen you can choose what email notifications you want to be active. 
The options are:

* Email address that will receive the notifications. By default it is the same address that you used for [sign-up]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/)
* Toggle for receiving emails of successful builds
* Toggle for receiving emails of failed builds
* Toggle for receiving emails only when your email was the Git committer 

{% include image.html
lightbox="true"
file="/images/administration/user-settings/notifications.png"
url="/images/administration/user-settings/notifications.png"
alt="email settings"
caption="email settings"
max-width="50%"
%}

The last option is especially useful in big teams, where multiple people commit on the same Git repository.


## Weekly updates for build usage

Codefresh will send you every week a summary of your builds across your pipelines along with other statistical data. This information can be useful if you want to understand your overall project build health and capacity usage.

If you don't want to receive these emails, you can disable them by toggling the checkbox and clicking the *Save* button.


## Git provider private access

When you connect your [Git provider]({{site.baseurl}}/docs/integrations/git-providers/) during sign-up, you may choose to let Codefresh access only your public Git repositories.

To allow Codefresh to also add [Git triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) on private repositories you need to explicitly enable it in this section. 

Note that options available highly depend on what Git provider you are using with Codefresh.

## API key creation

In this section you can create API keys so that you can access Codefresh features from your scripts or applications outside the UI. To create a new token click the *Generate* button as described in the [API documentation page]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions) and select the appropriate scopes.

{% include image.html
lightbox="true"
file="/images/integrations/api/generate-token.png"
url="/images/integrations/api/generate-token.png"
alt="Generating a key for the API"
caption="Generating a key for the API"
max-width="80%"
%}

For each token you can also delete it or edit it and change its applicable scopes.

Note that tokens are visible only during creation. You cannot "view" an existing token. If you want to re-enable API access for an existing application you need to delete the old token and create a new one.



## What to read next

* [Add users]({{site.baseurl}}/docs/administration/invite-your-team-member/)
* [Account management]({{site.baseurl}}/docs/administration/ent-account-mng/)
* [Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/)

