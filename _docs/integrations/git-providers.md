---
title: "Git providers"
description: "Easily checkout code in your pipelines"
group: integrations
redirect_from:
  - /docs/git-provider/
  - /docs/integrations/
  - /docs/integrations/git-provider/
  - /docs/integrations/git-providers/integrating-codefresh-with-multiple-git-providers/
  - /docs/integrations/git-providers/configure-a-bitbucket-server-webhook/  
toc: true
---
Creating an account with Codefresh using one of the supported Git providers (GitHub, GitLab, Bitbucket) gives you immediate access to the repositories of the linked provider.

You can add repositories from the other git providers regardless of the one that you used for sign-up. For example, you can use GitLab to sign up with Codefresh, but still build repositories that exist in Bitbucket.

You can even add multiple accounts from each Git provider (if you have more than one) allowing you to use Codefresh as a central CI/CD solution that can access all your git repositories regardless of the backing git provider.

Currently Codefresh supports:

* GitHub Cloud
* GitHub On premises
* Bitbucket
* GitLab Cloud
* GitLab On premises
* Azure DevOps Git
* Atlassian Stash (old version of Bibucket Server)
* Bitbucket Server (new version of Stash)

Atlassian Stash/Bitbucket server as well as the on-premise version of GiTlab and GitHub are only available to Codefresh enterprise customers.


## Adding more GIT providers to your Codefresh account.

By default, you have direct access to git repositories that exist in the GIT provider that you used while signing up for Codefresh. You can easily create Codefresh projects that checkout code from that GIT provider without any extra configurations.

To add additional GIT providers, go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *Git providers*.

{% include image.html lightbox="true" file="/images/integrations/codefresh-integrations.png" url="/images/integrations/codefresh-integrations.png" alt="Codefresh Account Integration" max-width="80%" %}

You can add a new git provider using the *Add Git provider* drop-down.

{% include image.html 
lightbox="true" 
file="/images/integrations/git/git-provider-menu.png" 
url="/images/integrations/git/git-provider-menu.png"
max-width="60%"
caption="Add GIT provider"
alt="Add GIT provider"
%}



For each git provider you need to setup authentication, so Codefresh can get access to the public and private repositories of the respective platform. 

The easiest way to setup authentication is with OAuth2 if supported by the git provider. You only need to name your integration
and Codefresh will automatically set it up once you accept the permissions required. If you have problems with OAuth2
or the provider does not support it, you need to manually create credentials by yourself in your git account and then enter them into Codefresh.

In the case of an on-premise GIT provider you also need to fill in the URL where the provider is installed.


## GitHub

For the **OAuth2 method** you only need to decide on public/private repository access, enter a name for your connection and click *Save*. Then accept the permissions dialog. This is the easiest and recommended way to integrate GitHub. Notice that if
you used GitHub when you [created your Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/), this integration is already setup for you.


For the **Access Token** method you need

* A friendly name for the git context (it can be anything you want)
* An access token


To create an [access token](https://github.com/settings/tokens), go to your GitHub *settings* and select the *Developer settings* option from the left
sidebar. Then select *Personal access tokens* from the left menu.
For more information see the [GitHub Documentation page](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/){:target="_blank"}

The "token description" you enter in your GitHub account in order to create the token is completely arbitrary (use "Codefresh" for an example). Once you have the token, paste it in the Codefresh UI and click *Test connection*. If everything is OK, you can
now save the git integration.

The minimum permissions for the token are:
- `repo.*`
- `admin:repo_hook.*`

{% include image.html 
lightbox="true" 
file="/images/integrations/git/github-required-scopes.png" 
url="/images/integrations/git/github-required-scopes.png"
max-width="40%"
caption="Github permissions"
alt="Github permissions"
%}

For Github on-premise you also need to provide the URL of the GitHub server in your organization.

## Gitlab

For the **OAuth2 method** you only need to enable private repository access, enter a name for your connection and click *Save*. Then accept the permissions dialog. This is the easiest and recommended way to integrate Gitlab. Notice that if
you used Gitlab when you [created your Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/), this integration is already setup for you.

For the **Access Key** method you need:

* A friendly name for the git context (it can be anything you want.)
* An access token/key


To create an access token, go to your Gitlab *settings* and select the *Access tokens* options.
For more information see the [Gitlab Documentation page](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html){:target="_blank"}

The name you enter in order to create the token in the Gitlab UI is completely arbitrary (use "Codefresh" for an example)

Once you have the token, paste it in the Codefresh UI and click *Test connection*. If everything is OK can
now save the git integration.

For Gitlab on-premise you also need to provide the URL of the Gitlab server in your organization.

## Bitbucket

For the **OAuth2 method** you only need to enter a name for your connection and click *Save*. Then accept the permissions dialog. This is the easiest and recommended way to integrate Bitbucket. Notice that if
you used Bitbucket when you [created your Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/), this integration is already setup for you.

For the **Application Password** method you need:

* A friendly name for the git context (It can be anything you want.)
* The name of your Bitbucket account/email address
* A Bitbucket application password

To create an application password, go to your *Bitbucket settings* and select *App passwords* from the sidebar.
Click the button to create one. For more information see the [Bitbucket Documentation page](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html){:target="_blank"}

The minimum permissions needed by Codefresh are shown below.

{% include image.html 
lightbox="true" 
file="/images/integrations/git/bitbucket-permissions.png" 
url="/images/integrations/git/bitbucket-permissions.png"
max-width="40%"
caption="Bitbucket permissions"
alt="Bitbucket permissions"
%}

The "label" you enter in your Bitbucket account in order to create the application password is completely arbitrary (use "Codefresh" for an example). Once you have the token, paste it in the Codefresh UI and click *Test connection*. If everything is OK you can
now save the git integration.

## Azure DevOps

For Azure you need to create a [personal access token](https://docs.microsoft.com/en-us/azure/devops/integrate/get-started/authentication/pats?view=azure-devops). Sign in your Azure DevOps account and click on your profile icon on the top right corner. Then select *Security*:


{% include image.html 
lightbox="true" 
file="/images/integrations/git/azure-devops-security.png" 
url="/images/integrations/git/azure-devops-security.png"
max-width="60%"
caption="Azure DevOps Security"
alt="Azure DevOps Security"
%}


On the screen that will appear click the *New token* Button. Enter an arbitrary name for the token and select the correct
**Organization** from the drop-down menu. Remember your organization name as you will use it later in the Codefresh side.
Select an expiration date for your token

> At the time of writing Azure DevOps does not have the option to create a token that is valid for ever. Choose a large
time period and make sure that you have a policy in place for renewing your tokens so that Codefresh can continue to read your GIT repo.

{% include image.html 
lightbox="true" 
file="/images/integrations/git/azure-devops-token.png" 
url="/images/integrations/git/azure-devops-token.png"
max-width="60%"
caption="Azure DevOps Token"
alt="Azure DevOps Token"
%}

From the *Scope* section choose the option *Show all scopes* and choose the following:

* Code - read
* Code - status
* Graph - read
* Project and Team - read
* User profile - read

Finally click the *Create* button and copy your token (it will never be shown again).

Then at the Codefresh configuration enter your organization name and your token.

{% include image.html 
lightbox="true" 
file="/images/integrations/git/azure-devops-verify.png" 
url="/images/integrations/git/azure-devops-verify.png"
max-width="60%"
caption="Codefresh integration with Azure Devops"
alt="Codefresh integration with Azure Devops"
%}

Click on *Test connection* to verify your settings and finally click save. Now you can [create pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
that use Azure DevOps Git repos.

{% include image.html 
lightbox="true" 
file="/images/integrations/git/azure-devops-connected.png" 
url="/images/integrations/git/azure-devops-connected.png"
max-width="60%"
caption="Codefresh integration with Azure Devops"
alt="Codefresh integration with Azure Devops"
%}

Your Azure DevOps repositories will be available when [creating a new project in Codefresh]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/).


## Atlassian Stash 

Atlassian stash is only available for an on-premise connection. Follow the same instructions as Bitbucket.
You also need to provide the URL of the Stash server in your organization.

This option is only for Atlassian stash until version 3.10 which is the old version. It was then renamed
to Bitbucket server.


## Bitbucket Server

Bitbucket server is the new and current name of Atlassian Stash. Again, it is only available for an on-premise
installation.

Codefresh supports Bitbucket server versions 5.4.0+ since those expose the API used by the integration.


## Using your git provider

Once your provider is active, you can add a new project into Codefresh and then during the [repository selection screen]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/) you will have access to the additional git providers.

{% include image.html 
lightbox="true" 
file="/images/integrations/git/select-git.png" 
url="/images/integrations/git/select-git.png"
max-width="60%"
caption="Select GIT provider"
alt="Select GIT provider"
%}

>Notice that for all supported Git providers Codefresh will automatically create all the webhooks needed for
triggering pipelines when a commit (or another event) happens. 

After adding the repository Codefresh will behave exactly the same, regardless of the selected git provider.
You will be able to [create pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) for different git providers in exactly the same manner.

## What to read next

- [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) 
- [Git triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) 
- [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) 




