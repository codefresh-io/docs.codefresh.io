---
title: "Managing personal user settings"
description: "Manage your personal settings"
group: administration
sub_group: user-self-management
redirect_from:
  - /docs/administration/user-settings/
toc: true
---

As a Codefresh user, you can manage several settings and resources through your personal account, including:

* Email notifications for builds and build usage
* Date and time formats for pipeline modules
* Updates on weekly usage
* Account access to Codefresh support
* API keys

> To manage Git user personal access tokens for GitOps, see [Managing Git PATs]({{site.baseurl}}/docs/administration/user-self-management/manage-pats).

## Access user settings
* In the Codefresh UI, on the toolbar, click the **Settings** icon and then select [**User Settings**](https://g.codefresh.io/user/settings){:target="\_blank"}.

## Enable email notifications for pipeline builds 

Configure the email notifications you want to receive for builds based on the build status: only successful, only failed, or for both successful and failed builds.  

>**NOTES**:  
By default, email notifications for builds are disabled for _all users_.<br><br> 
When you enable notifications, remember that you will receive notifications only for those builds:<br>
>- That you have permissions to access. If you don’t have access to a pipeline, you will not have access also to its builds.
>- Launched automatically by Git/Cron triggers. To enable email notifications also for builds launched manually, select the **Report notification on pipeline execution** option in the Git/Cron Settings for the specific pipeline. See [Git](({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) and [Cron]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/) triggers.

<br><br>

* In **Notifications**, define the email address and select the notifications:    
  * Email address for the notifications. By default, it's the same address you used to [sign up]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/).
* Select the build statuses for which to receive notifications.


{% include image.html
lightbox="true"
file="/images/administration/user-settings/notifications.png"
url="/images/administration/user-settings/notifications.png"
alt="Email notifications for pipeline builds"
caption="Email notifications for pipeline builds"
max-width="50%"
%}

## Customize date and time formats

Select your preferred formats for date (US or international) and time (24 or 12 hours) display in the Codefresh UI.

>Currently applies only to pipeline modules. 



## Receive weekly updates of build usage

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




## Create and manage API keys

Generate new API keys to access Codefresh functionality from your scripts or applications, outside the Codefresh UI. Edit scopes for existing keys, or revoke them when needed.  
For details, see [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions).

>Tokens are visible only during creation. You cannot "view" an existing token. To re-enable API access for an existing application, you must delete the old token and create a new one.  

  The UI shows the first few characters in the second part of the key, after the `.`, and not the characters at the beginning of the key.




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
[Managing Git PATs]({{site.baseurl}}/docs/administration/user-self-management/manage-pats/) 




