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
Begin your CI journey by setting up a Codefresh account.


After you select the IdP (identity provider), Codefresh requests permission to access your basic details, and for Git providers, to access your Git repositories. The Permissions window that is displayed differs according to the IdP selected.  
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
1. Select the identity provider (IdP) to use:  
    1. Go to the [Codefresh Sign Up page](https://g.codefresh.io/signup).  <!---need to change the URL and the screenshot-->
    1. Select the IdP for sign-up.

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/select-identity-provider.png" 
url="/images/administration/create-account/select-identity-provider.png"
alt="Codefresh sign-up page" 
caption="Codefresh sign-up page" 
max-width="40%" 
%}

{:start="2"}
1. Accept the permissions request for the selected IdP:
  * For GitHub: To continue, click **Authorize codefresh-io**.
  * For Bitbucket: To continue, click **Grant access**.
  * For GitLab: To continue, click **Authorize**.

    Once you confirm the permissions for your Git provider, Codefresh automatically connects to your Git provider and fetches your basic account details, such as your email.

{:start="3"}
1. Review the details for your new account, make the relevant changes, and click **NEXT**. 

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/codefresh-signup.png" 
url="/images/administration/create-account/codefresh-signup.png" 
alt="Codefresh account details" 
caption="Codefresh account details" 
max-width="40%" 
%}

{:start="4"}
1. Enter a name for your account, and click **NEXT**.

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/codefresh-accountname.png" 
url="/images/administration/create-account/codefresh-accountname.png" 
alt="Codefresh account name" 
caption="Codefresh account name" 
max-width="40%" 
%}

{:start="5"}
1. Finally, answer the questions to personalize your account and click **FINISH**.

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/codefresh-personalize.png" 
url="/images/administration/create-account/codefresh-personalize.png" 
alt="Codefresh personalize account" 
caption="Codefresh personalize account" 
max-width="40%" 
%}

Congratulations! Your new Codefresh account is now ready.

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/codefresh-dashboard.png" 
url="/images/administration/create-account/codefresh-dashboard.png" 
alt="Codefresh dashboard" 
caption="Codefresh dashboard" 
max-width="40%" 
%}


## What's next
Verify that you are ready to install the GitOps Hybrid Runtime, the foundation for GitOps operations. 

[Quick start: Preparing for Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/gitops-quick-start/gitops-runtimes/verify-requirements/)





