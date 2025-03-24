---
title: "Quick start: Creating a Codefresh account"
description: "Create a Codefresh account and start working in Codefresh"
group: gitops-quick-start
toc: true
---

Begin your GitOps journey by creating a Codefresh account.

Creating an account gives you access to the Codefresh platform, where you can install Runtimes and create and manage GitOps entities.  
After you select the IdP (identity provider), Codefresh requests permission to access your basic details, and for Git providers, to access your Git repositories. 

Codefresh requires these permissions in order to build and deploy your applications.

## Supported IdPs
Codefresh currently supports the following IdPs:
* GitHub
* Bitbucket
* GitLab 
* Azure
* Google 
* LDAP

If your preferred IdP is not listed, please [contact us](https://codefresh.io/contact-us/){:target="\_blank"} with the details.


>**NOTE**     
For Git repositories, the login method is less important, as you can access Git repositories through [Git integrations]({{site.baseurl}}/docs/integrations/git-providers/), regardless of your sign-up process. <br><br>
If you have multiple sign-up methods, as long as you use the same email address in all the sign-ups, Codefresh automatically redirects you to the account dashboard.

## Create Codefresh account
1. Go to the [Codefresh Sign Up page](https://g.codefresh.io/signup).  <!---need to change the URL and the screenshot-->
1. Select the IdP for sign-up.  


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/create-account/select-identity-provider.png" 
url="/images/quick-start/create-account/select-identity-provider.png"
alt="Quick start account creation: Codefresh sign-up page" 
caption="Quick start account creation: Codefresh sign-up page" 
max-width="50%" 
%}

{:start="3"}
1. If required, accept the permissions request for the selected IdP:
  * For Google, enter the email address you want to use.
  * For GitHub: To continue, click **Authorize codefresh-io**.
  * For Bitbucket: To continue, click **Grant access**.
  * For GitLab: To continue, click **Authorize**.
  Once you confirm permissions, Codefresh connects to your Git provider and retrieves your basic account details, such as your email.

{:start="4"}
1. In the Verification screen, do the following:
    1. Select the required country code, enter your phone number, and then click **Send**.
    1. Enter the verification code you received, and click **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/create-account/verify-phone.png" 
url="/images/quick-start/create-account/verify-phone.png" 
alt="Quick start account creation: Verify phone number" 
caption="Quick start account creation: Verify phone number" 
max-width="50%" 
%}

{:start="5"}
1. Fill in the fields with your organization's information, including your email, and click **Next**. 

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/create-account/organization-details.png" 
url="/images/quick-start/create-account/organization-details.png" 
alt="Quick start account creation: Enter organization information" 
caption="Quick start account creation: Enter organization information" 
max-width="50%" 
%}

{:start="6"}
1. Enter a name for your account, and click **Next**.
1. In the Organization type screen, select **Business use** and click **Next**.
1. Select the use cases for your organization and account from among those displayed.  
  In this case, you'll select **Continuous Delivery with GitOps** and then click **Finish**. 

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/create-account/select-use-cases.png" 
url="/images/quick-start/create-account/select-use-cases.png" 
alt="Quick start account creation: Select use cases" 
caption="Quick start account creation: Select use cases" 
max-width="50%" 
%}

Congratulations! Your new Codefresh account is now ready and you are directed to the Welcome screen.


## What's next
You are now ready to install the GitOps Runtime, the foundation for GitOps operations. 

[Quick start: Installing the GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-install-runtime/)





