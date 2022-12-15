---
title: "Manage personal user settings"
description: "Manage your personal settings"
group: administration
sub_group: user-self-management
toc: true
---

As a Codefresh user, you can manage several settings in your personal account, including:

* Email notifications for builds and build usage
* Grant account access to Codefresh support
* Grant access to private Git repositories
* Create and manage API keys

> To manage Git personal access tokens for GitOps, see [Managing PATs]({{site.baseurl}}/docs/administration/user-self-management/manage-pats).

## Access user settings
* In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **User Settings** (https://g.codefresh.io/user/settings){:target="\_blank"}.

## Email notifications for pipeline builds 

Configure the email notifications you want to receive for builds based on the build status: only successful, only failed, or for both successful and failed builds.  

> By default, email notifications for builds are disabled for _all users_.

* In **Notifications**, define the email address and select the notifications:    
  * Email address for the notifications. By default, it's the same address you used to [sign up]({{site.baseurl}}/docs/administration/account-user-management/create-a-codefresh-account/).
* Select the build statuses for which to receive notifications.



{% include image.html
lightbox="true"
file="/images/administration/user-settings/notifications.png"
url="/images/administration/user-settings/notifications.png"
alt="Email notifications for pipeline builds"
caption="Email notifications for pipeline builds"
max-width="50%"
%}



## Weekly updates of build usage

Select to receive weekly summaries of builds across your pipelines along with other statistical data. This information can be useful if you want to understand your overall project build health and capacity usage.

* In **Updates**, select or clear **Receive updates...**.


## Enable access for Codefresh support

Enable Codefresh support personnel to access your user account. Access to your account is useful for visibility during troubleshooting. If you have an issue with the Codefresh platform, our support personnel can log into your account and look at running builds, inspect Docker images, run pipelines for you etc.

You can disable this security setting at any time.

>Codefresh personnel takes action only after confirmation from you, and all actions are audited.

* In **Security**, select **Allow Codefresh support team to log in…**..


{% include image.html
lightbox="true"
file="/images/administration/user-settings/allow-support-access.png"
url="/images/administration/user-settings/allow-support-access.png"
alt="Allow access to Codefresh support"
caption="Allow access to Codefresh support"
max-width="100%"
%}


<!--- Enable after confirmation
## Git Provider Private Access

When you connect your [Git provider]({{site.baseurl}}/docs/integrations/git-providers/) during sign-up, you may choose to let Codefresh access only your public Git repositories.

To allow Codefresh to also add [Git triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) on private repositories you need to explicitly enable it in this section. 

Note that options available highly depend on what Git provider you are using with Codefresh. -->

## Create and manage API keys

Generate new API keys to access Codefresh functionality from your scripts or applications, outside the Codefresh UI. Edit scopes for existing keys, or revoke them when needed.  
For details, see [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions).

>Tokens are visible only during creation. You cannot "view" an existing token. To re-enable API access for an existing application, you must delete the old token and create a new one.


1. In **API Keys**, to generate a new API key, click **Generate**.
1. Select the scopes for the key.


{% include image.html
lightbox="true"
file="/images/integrations/api/generate-token.png"
url="/images/integrations/api/generate-token.png"
alt="Generating a key for the API"
caption="Generating a key for the API"
max-width="80%"
%}


## Related articles

<!--why do we need this? this is for admins; also SSO[Add users]({{site.baseurl}}/docs/administration/invite-your-team-member/)  -->
[Manage Git PATs]({{site.baseurl}}/docs/administration/manage-pats)  
[Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/)  


