---
title: "Git providers"
description: ""
group: integrations
redirect_from:
  - /docs/git-provider/
  - /docs/integrations/
  - /docs/integrations/git-provider/
  - /docs/integrations/git-providers/integrating-codefresh-with-multiple-git-providers/
toc: true
---
Creating an account with Codefresh using one of the supported Git providers (Github, Gitlab, Bitbucket) gives you immediate access to the repositories of the linked provider.

You can add repositories from the other git providers regardless of the one that you used for sign-up. For example, you can use Gitlab to signup with Codefresh, but still build repositories that exist in bitbucket.

You can even add multiple accounts from each Git provider (if you have more than one) allowing you to use Codefresh as a central CI/CD solution that can access all your git repositories regardless of the backing git provider

Currently Codefresh supports:

* Github Cloud
* Github On premises
* Bitbucket
* Gitlab Cloud
* Gitlab On premises
* Atlassian Stash

Atlassian Stash as well as the on-premise version of Gitlab and Github are only available to Codefresh enterprise customers


## Adding more GIT providers to your Codefresh account.

By default, you have direct access to git repositories that exist in the GIT provider that you used while signing up for Codefresh. You can easily create Codefresh projects that checkout code from that GIT provider without any extra configurations.

To add additional GIT providers click *Configuration* from the left sidebar and from the *integrations* tab, select *Git providers*.

{% include image.html 
lightbox="true" 
file="/images/integrations/git/git-integrations.png" 
url="/images/integrations/git/git-integrations.png"
max-width="60%"
caption="GIT integrations"
alt="GIT integrations"
%}

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

In the case of an on-premise GIT provider you also need to fill in the URL where the provider is installed.


## Github

For Github you need:

* a friendly name for the git context. It can be anything you want
* an access token


To create an access token, go to your Github *settings* and select the *Developer settings* option from the left
sidebar. The select *Personal access tokens* from the .
For more information see the [Github Documentation page](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/){:target="_blank"}

The "token description" you enter in your Github account in order to create the token is completely arbitrary (use "Codefresh" for an example).Once you have the token, paste it in the Codefresh UI and click *Test connection*. If everything is OK can
now save the git integration.

For Github on-premise you also need to provide the URL of the GitHub server in your organization.

## Gitlab

For Gitlab you need:

* a friendly name for the git context. It can be anything you want
* an access token


To create an access token, go to your Gitlab *settings* and select the *Access tokens* options.
For more information see the [Gitlab Documentation page](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html){:target="_blank"}

The name you enter in order to create the token in the Gitlab UI is completely arbitrary (use "Codefresh" for an example)

Once you have the token, paste it in the Codefresh UI and click *Test connection*. If everything is OK can
now save the git integration.

For Gitlab on-premise you also need to provide the URL of the GitHub server in your organization.

## Bitbucket

For Bitbucket you need

* a friendly name for the git context. It can be anything you want
* the name of your Bitbucket account/email address
* A Bitbucket application password.

To create an application password go to your *Bitbucket settings* and select *App passwords* from the sidebar.
Click the button to create one. For more information see the [Bitbucket Documentation page](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html){:target="_blank"}

The "label" you enter in your Bitbucket account in order to create the application password is completely arbitrary (use "Codefresh" for an example). Once you have the token, paste it in the Codefresh UI and click *Test connection*. If everything is OK can
now save the git integration.

## Atlassian Stash 

Atlassian stash is only available for an on-premise connection. Follow the same instructions as Bitbucket.
You also need to enter to provide the URL of the Stash server in your organization 


## Using your git provider

Once your provider is active, you can add a new project into Codefresh and the during the repository selection
screen you will have access to the additional setting providers

{% include image.html 
lightbox="true" 
file="/images/integrations/git/select-git.png" 
url="/images/integrations/git/select-git.png"
max-width="60%"
caption="Select GIT provider"
alt="Select GIT provider"
%}


After adding the repository Codefresh will behave exactly the same, regardless of the selected git provider.
You will be able to create pipelines for different git providers in exactly the same manner



