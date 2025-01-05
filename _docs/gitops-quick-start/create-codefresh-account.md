---
title: "Creating a Codefresh account"
description: "Start working in Codefresh"
group: gitops-quick-start
redirect_from:
  - /docs/getting-started/create-a-codefresh-account/
  - /docs/
  - /docs/create-an-account/
  - /docs/getting-started/
  - /docs/getting-started/introduction/
toc: true
---

Begin your GitOps journey by setting up a Codefresh account.

Creating an account provides access to the Codefresh platform, where you can install Runtimes, and create and manage GitOps entities.

After you select the IdP (identity provider), Codefresh requests permission to access your basic details, and for Git providers, to access your Git repositories. 
The permissions requested by Codefresh are needed in order to build and deploy your projects.

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
Verify that you are ready to install the GitOps Hybrid Runtime, the foundation for GitOps operations. 

[Quick start: Preparing for Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/gitops-quick-start/gitops-runtimes/verify-requirements/)





