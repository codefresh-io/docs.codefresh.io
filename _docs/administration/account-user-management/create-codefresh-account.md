---
title: "Create a Codefresh account"
description: "Welcome to Codefresh!"
group: administration
sub_group: account-user-management
redirect_from:
  - /docs/getting-started/create-a-codefresh-account/
  - /docs/
  - /docs/create-an-account/
  - /docs/getting-started/
  - /docs/getting-started/introduction/
toc: true
---

Creating an account in Codefresh is the first step to begin working with the Codefresh platform.

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/create-account-steps.png" 
url="/images/administration/create-account/create-account-steps.png"
alt="Codefresh account creation steps" 
max-width="90%" 
%}

<!--- Creating an account provides access to the Codefresh platform, where you can install Runtimes, and create and manage GitOps entities.
After you select the IdP (identity provider), Codefresh requests permission to access your basic details, and for Git providers, to access your Git repositories. 

The permissions requested by Codefresh are needed in order to build and deploy your projects. -->

## Supported IdPs
Codefresh currently supports the following IdPs:
* GitHub
* Bitbucket
* GitLab 
* Azure
* Google 
* LDAP

If you need an IdP that is not in the list, please [contact us](https://codefresh.io/contact-us/){:target="\_blank"} with the details.


>**NOTE**     
For Git repositories, the login method is less important, as you can access Git repositories through Git integrations, regardless of your sign-up process. <br><br>
If you have multiple sign-up methods, as long as you use the same email address in all the sign-ups, Codefresh automatically redirects you to the account dashboard.

## Create Codefresh account
1. Go to the [Codefresh Sign Up page](https://g.codefresh.io/signup).  <!---need to change the URL and the screenshot-->
1. Select the IdP for sign-up.  


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/create-account/select-identity-provider.png" 
url="/images/quick-start/create-account/select-identity-provider.png"
alt="Codefresh sign-up page" 
caption="Codefresh sign-up page" 
max-width="50%" 
%}

{:start="3"}
1. If required, accept the permissions request for the selected IdP:
  * For Google, enter the email to use.
  * For GitHub: To continue, click **Authorize codefresh-io**.
  * For Bitbucket: To continue, click **Grant access**.
  * For GitLab: To continue, click **Authorize**.
  Once you confirm the permissions for your Git provider, Codefresh automatically connects to your Git provider and fetches your basic account details, such as your email.

{:start="4"}
1. In the Verification screen, do the following:
    1. Select the required country code, enter your phone number, and then click **Send**.
    1. Enter the verification code you received, and click **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/create-account/verify-phone.png" 
url="/images/quick-start/create-account/verify-phone.png" 
alt="Verify phone number" 
caption="Verify phone number" 
max-width="50%" 
%}

{:start="5"}
1. Fill in the fields with your organization's information, including your email, and click **Next**. 

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/create-account/organization-details.png" 
url="/images/quick-start/create-account/organization-details.png" 
alt="Enter organization information" 
caption="Enter organization information" 
max-width="50%" 
%}

{:start="6"}
1. Enter a name for your account, and click **Next**.
1. In the Organization type screen, select **Business use** and click **Next**.
1. Select the use cases for your organization and account from among those displayed.  

<!---
Need to change this screenshot or not include any
{% include 
image.html 
lightbox="true" 
file="/images/quick-start/create-account/select-use-cases.png" 
url="/images/quick-start/create-account/select-use-cases.png" 
alt="Quick start account creation: Select use cases" 
caption="Quick start account creation: Select use cases" 
max-width="50%" 
%}

-->

{% if page.collection != site.gitops_collection %}
For Codefresh on-premises, see [On-premises account & user setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/).
{% endif %}



## Rename/delete Codefresh accounts
Account administrators can rename and delete Codefresh accounts.

##### Rename Codefresh account
You may want to rename your existing account, for example, either due to a sign-up error or change of business name.

At this time, only Codefresh Support can rename accounts.  
Please submit a support ticket with the following details:
* Current account name
* New account name  
  If the new account name already exists due to a sign-up error, please indicate this as well.

##### Delete Codefresh account

>**NOTE:**  
Only account owners can delete the account. 


1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Organization Information**.
1. Scroll down to Delete Account and click **Delete Account**.
1. To confirm, click **Delete Account** once again. 
 

## Related articles
[Adding users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users-teams/)  
[Single sign-on]({{site.baseurl}}/docs/administration/single-sign-on/)  
[Codefresh IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/)  
[Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
{% if page.collection != site.gitops_collection %}
[Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control-pipelines/)  
{% endif %}




