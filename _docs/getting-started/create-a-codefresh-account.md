---
title: "Create a Codefresh Account"
description: "Welcome to Codefresh!"
group: getting-started
redirect_from:
  - /docs/
  - /docs/create-an-account/
  - /docs/getting-started/
  - /docs/getting-started/introduction/
---
Before you can start building and deploying your applications
you need to create a Codefresh account.

Creating an account is free (no credit card is required) and can be done in 3 simple steps.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/create-account-steps.png" 
url="/images/getting-started/create-account/create-account-steps.png"
alt="Codefresh account creation steps" 
max-width="90%" 
%}

## 1. Select your Identity Provider

First, navigate to the [Codefresh Sign Up page](https://g.codefresh.io/signup).  
Codefresh currently supports GitHub, Bitbucket and GitLab as a Git provider. If you are using another Git provider
please [contact us](https://codefresh.io/contact-us/) to discuss alternative options. You can also select
Azure or Google as an identity provider.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/select-identity-provider.png" 
url="/images/getting-started/create-account/select-identity-provider.png"
alt="Codefresh sign-up page" 
caption="Sign-up page (click image to enlarge)" 
max-width="40%" 
%}

The login method is not really important when it comes to git repositories as regardless of your sign-up process
you can add git repositories from any of your GIT accounts in  [GIT integrations]({{site.baseurl}}/docs/integrations/git-providers/).

> Don't worry if by mistake you use multiple sign-up methods. As long as your email
address is the same, Codefresh will automatically forward you to your account dashboard.


## 2. Accept the Permissions Request

After you select the Identity provider, Codefresh requests permission to access your basic details (and for GIT providers to access your Git repositories).

Don't worry, Codefresh will not do anything without your explicit approval, so don't be scared by the permissions shown
in the request window. The permissions requested by Codefresh are needed in order to build and deploy your projects.


This is the GitHub permissions window. Click the button labeled *Authorize codefresh-io* to continue.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/github-authorize.png" 
url="/images/getting-started/create-account/github-authorize.png"
alt="GitHub authorization page" 
caption="GitHub authorization page (click image to enlarge)" 
max-width="50%" 
%}

If you use Bitbucket the following permissions window will appear instead. Click the button labeled *Grant access* to continue.


{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/bitbucket-authorize.png" 
url="/images/getting-started/create-account/bitbucket-authorize.png"
alt="Bitbucket authorization page" 
caption="Bitbucket authorization page (click image to enlarge)" 
max-width="50%" 
%}

Finally if you use GitLab you will see the permissions window shown below. Click the button labeled *Authorize* to continue.


{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/gitlab-authorize.png" 
url="/images/getting-started/create-account/gitlab-authorize.png"
alt="GitLab authorization page" 
caption="GitLab authorization page (click image to enlarge)" 
max-width="50%" 
%}

Once you accept the respective permissions window, Codefresh will automatically connect to your Git provider and fetch your basic account details (such as your email).


## 3. Verify Your Account Details

Once Codefresh reads your details from your Identity provider it will present to you the account details for your new account. Review your account details, make the relevant changes, and click *NEXT*. 

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/codefresh-signup.png" 
url="/images/getting-started/create-account/codefresh-signup.png" 
alt="Codefresh account details" 
caption="Codefresh account details (click image to enlarge)" 
max-width="40%" 
%}

Name your account, and click *NEXT*.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/codefresh-accountname.png" 
url="/images/getting-started/create-account/codefresh-accountname.png" 
alt="Codefresh account name" 
caption="Codefresh account name (click image to enlarge)" 
max-width="40%" 
%}

Finally, answer the questions to personalize your account and click *FINISH*.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/codefresh-personalize.png" 
url="/images/getting-started/create-account/codefresh-personalize.png" 
alt="Codefresh personalize account" 
caption="Codefresh personalize account (click image to enlarge)" 
max-width="40%" 
%}

Congratulations! Your new Codefresh account is now ready.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/codefresh-dashboard.png" 
url="/images/getting-started/create-account/codefresh-dashboard.png" 
alt="Codefresh dashboard" 
caption="Codefresh dashboard (click image to enlarge)" 
max-width="40%" 
%}



The next step is learning how to [build your first application]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/).


## Other Git connection options



Codefresh also supports Atlassian Stash/Bitbucket Server. You need to [contact us](https://codefresh.io/contact-us/) to enable this integration before you can use it for your account.


{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/stash.png" 
url="/images/getting-started/create-account/stash.png" 
alt="Codefresh and Atlassian Stash" 
caption="Codefresh and Atlassian Stash" 
max-width="100%" 
%}


Once that is done, follow the [Stash instructions]({{site.baseurl}}/docs/integrations/git-providers/#atlassian-stash) for more information. 



## Using Codefresh in a secure corporate environment

If your source code repositories are in a private Git account that lies behind your company firewall, or simply has no access to the Internet, we can still help you!

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/create-account/git-firewall.png" 
url="/images/getting-started/create-account/git-firewall.png" 
alt="Git behind firewall" 
caption="Git behind firewall" 
max-width="100%" 
%}

We can establish a VPN / tunnel to your network or discuss options for an on-premises Codefresh deployment. Please [contact us to get started](https://codefresh.io/contact-us/).


## What to read next

* [Create a Basic pipeline]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/)
* [Deploy to Kubernetes]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)
* [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Pipeline examples]({{site.baseurl}}/docs/yaml-examples/examples/)


