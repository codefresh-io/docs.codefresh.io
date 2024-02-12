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
Before you can create pipelines, build, and deploy applications in Codefresh, you need to create a Codefresh account.

Creating an account in Codefresh is free (no credit card is required) and can be done in three simple steps:

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/create-account-steps.png" 
url="/images/administration/create-account/create-account-steps.png"
alt="Codefresh account creation steps" 
max-width="90%" 
%}

For Codefresh on-premises, see [On-premises account & user setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration).

## Step 1: Select your Identity Provider
As the first step in setting up your account in Codefresh, select the identity provider (IdP) to use. 
Codefresh currently supports the following IdPs:
* GitHub
* Bitbucket
* GitLab 
* Azure
* Google 
* LDAP

If you need an IdP that is not in the list, please [contact us](https://codefresh.io/contact-us/) with the details.

>**NOTE**  
  For Git repositories, the login method is less important, as you can Git repositories through [Git integrations]({{site.baseurl}}/docs/integrations/git-providers/), regardless of your sign-up process.  

  If you have multiple sign-up methods, as long as you use the same email address for all sign-ups, Codefresh automatically redirects you to the account dashboard.

1. Go to the [Codefresh Sign Up page](https://g.codefresh.io/signup){:target="\_blank"}.  <!---need to change the URL and the screenshot-->


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
1. Select the IdP for sign-up.
1. Continue with  [Step 2: Accept the permissions request](#step2-accept-the-permissions-request).



## Step 2: Accept the permissions request

After you select the IdP (identity provider), Codefresh requests permission to access your basic details, and for Git providers, to access your Git repositories. The Permissions window that is displayed differs according to the IdP selected in the previous step.

Don't worry, Codefresh will not do anything without your explicit approval. Codefresh needs the permissions to build and deploy your projects.

1. Do any of the following:
  * For GitHub: To continue, click **Authorize codefresh-io**.

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/github-authorize.png" 
url="/images/administration/create-account/github-authorize.png"
alt="GitHub authorization page" 
caption="GitHub authorization page" 
max-width="50%" 
%}

  * For Bitbucket: To continue, click **Grant access**.


{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/bitbucket-authorize.png" 
url="/images/administration/create-account/bitbucket-authorize.png"
alt="Bitbucket authorization page" 
caption="Bitbucket authorization page" 
max-width="50%" 
%}

  * For GitLab: To continue, click **Authorize**.


{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/gitlab-authorize.png" 
url="/images/administration/create-account/gitlab-authorize.png"
alt="GitLab authorization page" 
caption="GitLab authorization page" 
max-width="50%" 
%}

  Once you confirm the permissions for your Git provider, Codefresh automatically connects to your Git provider and fetches your basic account details, such as your email.

{:start="2"}
1. Continue with [Step 3: Verify account details](#step-3-verify-account-details).

## Step 3: Verify account details

Verifying account details is the final step in creating your Codefresh account. 

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

{:start="2"}
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

{:start="3"}
1. Finally, answer the questions to personalize your account and click **FINISH**.

{% include 
image.html 
lightbox="true" 
file="/images/administration/create-account/codefresh-personalize.png" 
url="/images/administration/create-account/codefresh-personalize.png" 
alt="Codefresh personalize account" 
caption="Codefresh personalize account " 
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


## Rename/delete Codefresh accounts
Codefresh administrators can rename Codefresh accounts, and delete any account.

##### Rename Codefresh account
You want to rename your existing account, either due to a sign-up error or change of business name.

At this time, only Codefresh Support can rename accounts.  
Please submit a support ticket with the following details:
* Current account name
* New account name  
  If the new account name already exists due to a sign-up error, please indicate this as well.

##### Delete Codefresh account

1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Organization Information**.
1. Scroll down to Delete Account and click **Delete Account**.
1. To confirm, click **Delete Account** once again. 
 

## Related articles
[Adding users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/)  
[Configuring access control]({{site.baseurl}}/docs/administration/account-user-management/access-control/)  
[Codefresh IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/)  
[CI pipeline quick start]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/)  
[Kubernetes deployment quick start]({{site.baseurl}}/docs/quick-start/ci-quick-start/deploy-to-kubernetes)  
[Pipeline examples]({{site.baseurl}}/docs/example-catalog/ci-examples/)  




