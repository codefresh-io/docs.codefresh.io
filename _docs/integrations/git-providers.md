---
title: "Git provider pipeline integrations"
description: "Easily check out code in Codefresh CI pipelines"
group: integrations
redirect_from:
  - /docs/integrations/git-providers/
  - /docs/git-provider/
  - /docs/integrations/
  - /docs/integrations/git-provider/
  - /docs/integrations/git-providers/integrating-codefresh-with-multiple-git-providers/
  - /docs/integrations/git-providers/configure-a-bitbucket-server-webhook/  
toc: true
---
Creating an account with Codefresh for one of the supported Git providers (GitHub, GitLab, Bitbucket), gives you immediate access to the repositories of the linked provider.

You can also add repositories from other Git providers regardless of the one you used for sign-up. For example, you can use GitLab to sign up with Codefresh, but still build repositories that exist in Bitbucket.

You can even add multiple accounts for each Git provider (if you have more than one), allowing you to use Codefresh as a central CI/CD solution that can access all your Git repositories regardless of the backing Git provider.

Currently Codefresh supports:

* GitHub Cloud
* GitHub On-premises
* Bitbucket
* GitLab Cloud
* GitLab On-premises
* Azure DevOps Git
* Atlassian Stash (old version of Bibucket Server)
* Bitbucket Server (new version of Stash)

Atlassian Stash/Bitbucket server, as well as the on-premises version of GitLab and GitHub, are only available to Codefresh enterprise customers.

## Adding more Git providers to your Codefresh Account

By default, you have direct access to Git repositories that exist in the Git provider that you used while signing up for Codefresh. You can easily create Codefresh projects that checkout code from that Git provider without any extra configurations.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Configuration in the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Git** and then click **Configure**.
1. From the **Add Git Provider** drop-down, select the Git provider to add. 
1. Define the settings as required. 


{% include image.html lightbox="true" file="/images/integrations/codefresh-integrations.png" url="/images/integrations/codefresh-integrations.png" alt="Codefresh Account Integration" max-width="80%" %}


{% include image.html
lightbox="true"
file="/images/integrations/git/git-provider-menu.png"
url="/images/integrations/git/git-provider-menu.png"
max-width="60%"
caption="Add Git provider"
alt="Add Git provider"
%}

For each Git provider you need to set up authentication, for Codefresh to get access to the public and private repositories of the respective provider.

The easiest way to set up authentication is with OAuth2 if supported by the Git provider. You only need to name your integration
and Codefresh will automatically set it up once you accept the permissions required. If you have problems with OAuth2
or the provider does not support it, you need to manually create credentials by yourself in your git account and then enter them into Codefresh.

In the case of an on-premises Git provider, you also need to fill in the URL where the provider is installed.

## SSH Keys

> Please contact support to enable this feature.

You have the ability to specify whether you want to clone via HTTPS or SSH.  

1. Select the required Git integration, and click **Edit**.
1. Expand **Advanced Options** and toggle to **HTTPS** or **SSH**.
1. For SSH, paste your **raw**, private key into the SSH Key text box and click **Save**.


{% include image.html
lightbox="true"
file="/images/integrations/git/github-ssh.png"
url="/images/integrations/git/github-ssh.png"
max-width="40%"
caption="Git clone via SSH"
alt="Git clone via SSH"
%}


For more information on generating SSH keys and adding your public key to your VCS provider, see its official documentation:

* [GitHub documentation](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent){:target="\_blank"}
* [GitLab documentation](https://docs.gitlab.com/ee/ssh/#generating-a-new-ssh-key-pair){:target="\_blank"}
* [Bitbucket documentation](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html){:target="\_blank"}
* [Azure documentation](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops&tabs=current-page){:target="\_blank"}

## GitHub

For the **OAuth2 method** you only need to decide on public/private repository access, enter a name for your connection and click *Save*. Then accept the permissions dialog. This is the easiest and recommended way to integrate GitHub. Notice that if
you used GitHub when you [created your Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-a-codefresh-account/), this integration is already setup for you.

For the **Access Token** method you need

* A friendly name for the Git context (it can be anything you want)
* An access token

>Note that the access token for an organization should be created by somebody who has **Owner** role and not just **Member** role.

To create an [access token](https://github.com/settings/tokens){:target="\_blank"}, go to your GitHub *settings* and select the *Developer settings* option from the left
sidebar. Then select *Personal access tokens* from the left menu.
For more information see the [GitHub Documentation page](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/){:target="_blank"}.

The "token description" you enter in your GitHub account in order to create the token is completely arbitrary (use "Codefresh" for an example). Once you have the token, paste it in the Codefresh UI and click *Test connection*. If everything is OK, you can
now save the Git integration.

The minimum permissions for the token are:

* `repo.*`
* `admin:repo_hook.*`

{% include image.html
lightbox="true"
file="/images/integrations/git/github-required-scopes.png"
url="/images/integrations/git/github-required-scopes.png"
max-width="40%"
caption="GitHub permissions"
alt="GitHub permissions"
%}

For GitHub on-premises you also need to provide the URL of the GitHub server in your organization. If enabled in your account you can setup [Pipeline definition restrictions]({{site.baseurl}}/docs/administration/account-user-management/access-control/#pipeline-definition-restrictions) by expanding the *YAML Options* segment.

### Using External Secrets for GitHub Token

If your GitHub installation is behind your firewall, you can also
use any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets) as values by entering a secrets value
with the same syntax [shown in pipelines]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/).

For example if you already have a `token` on a resource call `git-credentials` you can put in the token field the expression {% raw %}`${{secrets.git-credentials.token}}`{% endraw %}.

### Level of access

If **Allow access to all users** is cleared, another toggle appears: **Allow these credentials to be shared within a pipeline for cloning a repository**. 
This option has the following impact on pipelines:
* When selected, the user who runs a pipeline can clone the repo.
* When cleared, the user who runs a pipeline cannot use this integration.
In both cases, the user cannot decrypt the token used in Git integration with CLI or API.

>Important note: The credentials will be shared only to clone repos using an official git-clone step.

## GitHub-App

An alternative way to authenticate with Github is via the App mechanism.

### Codefresh Github App

> The Codefresh App has READ permissions to issues, metadata, and pull requests, and READ and WRITE permissions to code, commit statuses, and repository hooks. If you need additional permission for your integration, use the Manual Creation steps.

1. In the Codefresh UI, follow the steps to [add a new Git provider](#adding-more-git-providers-to-your-codefresh-account). 
1. From the list of Git providers, select **Codefresh Github App**.
1. Select Setup GitHub App integration via [**GitHub Marketplace**](https://github.com/apps/codefresh-githubapp){:target=\_blank"}.
1. Follow the instructions on GitHub to install the application.
   Once completed, the fields are automatically populated with the information.
1. To verify your integration, click **Test connection**.
1. To apply your changes, click **Save**.

### Manual creation

1. Log in your GitHub account and visit [https://github.com/settings/apps](https://github.com/settings/apps){:target="\_blank"}. 
1. Click **New GitHub App**.
1. Do the following in the New GitHub App screen:
     1. Give an arbitrary name to your app (e.g. codefresh-integration)
     1. Fill *Homepage URL* with `http://www.codefresh.io`
     1. Uncheck the *Active* checkbox under the Webhook section
     1. In the *Repository permissions* section give the minimum of
       * **Contents** - read
       * **Issues** - read
       * **Metadata** - read
       * **Pull requests** - read
       * **Webhooks** - read, write
       * **Commit statuses** - read, write
       * **Email addresses** - read 
     1. Click the *Create GitHub app* button.

1. In the next screen, do the following:
     1. Note down the **App ID** number under the About section.
     1. Click **Generate a private key**,  and save the file locally.
1. Click the **Install App** item from the left sidebar menu, and then click **Install** next to your codefresh app.
1. Accept the permissions, and in the next screen, define the repositories that you need Codefresh to access.  
  From the URL of the browser, note the ending number which is your installation ID.  
  For example if the URL is `https://github.com/settings/installations/10042353` then your installation number is `10042353`.
1. In the Codefresh UI, go to  [Pipeline Integrations > Git](https://g.codefresh.io/account-admin/account-conf/integration/git){:target="\_blank"}. 
1. From the **Add Git Provider** dropdown, select **Github App**.  
  For the required fields use: 
  * **Installation ID** which you noted down in _step 5_.
  * **App ID**, which you noted down in _step 4_.
  * **Private key**, which is the content of the file your created in step 4, converted to base64.
1. To verify your integration, click **Test connection**.
1. To apply your changes, click **Save**.  

>If enabled in your account you can setup [Pipeline definition restrictions]({{site.baseurl}}/docs/administration/account-user-management/access-control/#pipeline-definition-restrictions) by expanding the *YAML Options* segment.

## GitLab

For the **OAuth2 method**:  
You only need to enable private repository access, enter a name for your connection and click *Save*. Then accept the permissions dialog. This is the easiest and recommended way to integrate GitLab. Notice that if
you used GitLab when you [created your Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-a-codefresh-account/), this integration is already setup for you.

For the **Access Key** method you need:

* A friendly name for the Git context (it can be anything you want)
* An access token/key

To create an access token, go to your GitLab *settings* and select the *Access tokens* options.
For more information see the [GitLab Documentation page](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html){:target="_blank"}

The name you enter in order to create the token in the GitLab UI is completely arbitrary (use "Codefresh" for an example)

Once you have the token, paste it in the Codefresh UI and click *Test connection*. If everything is OK can
now save the Git integration.

For GitLab on-premises, you also need to provide the URL of the GitLab server in your organization.  If enabled in your account you can set up [Pipeline definition restrictions]({{site.baseurl}}/docs/administration/account-user-management/access-control/#pipeline-definition-restrictions) by expanding the *YAML Options* segment.

### Using External Secrets for GitLab Token

If your GitLab installation is behind your firewall, you can also
use any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets) as values by entering a secrets value
with the same syntax [shown in pipelines]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/).

For example if you already have a `token` on a resource call `git-credentials` you can put in the token field the expression {% raw %}`${{secrets.git-credentials@token}}`{% endraw %}.

## Bitbucket

For the **OAuth2 method** you only need to enter a name for your connection and click *Save*. Then accept the permissions dialog. This is the easiest and recommended way to integrate Bitbucket. Notice that if
you used Bitbucket when you [created your Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-a-codefresh-account/), this integration is already setup for you.

For the **Application Password** method you need:

* A friendly name for the Git context (It can be anything you want.)
* The name of your Bitbucket account/email address
* A Bitbucket application password

To create an application password, go to your *Bitbucket settings* and select *App passwords* from the sidebar.
Click the button to create one. For more information see the [Bitbucket Documentation page](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html){:target="_blank"}.

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
now save the Git integration.

 If enabled in your account you can setup [Pipeline definition restrictions]({{site.baseurl}}/docs/administration/account-user-management/access-control/#pipeline-definition-restrictions) by expanding the *YAML Options* segment.

## Azure DevOps

For Azure you need to create a [personal access token](https://docs.microsoft.com/en-us/azure/devops/integrate/get-started/authentication/pats?view=azure-devops){:target="\_blank"}. Sign in your Azure DevOps account and click on your profile icon on the top right corner. Then select *Security*:

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
time period and make sure that you have a policy in place for renewing your tokens so that Codefresh can continue to read your Git repo.

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
max-width="40%"
caption="Codefresh integration with Azure Devops"
alt="Codefresh integration with Azure Devops"
%}

Click on *Test connection* to verify your settings and finally click save. Now you can [create pipelines]({{site.baseurl}}/docs/pipeline /pipelines/)
that use Azure DevOps Git repos.

{% include image.html
lightbox="true"
file="/images/integrations/git/azure-devops-connected.png"
url="/images/integrations/git/azure-devops-connected.png"
max-width="40%"
caption="Codefresh integration with Azure Devops"
alt="Codefresh integration with Azure Devops"
%}

Your Azure DevOps repositories will be available when [creating a new project in Codefresh]({{site.baseurl}}/docs/quick-start/ci-quickstart/create-ci-pipeline/).

 If enabled in your account you can setup [Pipeline definition restrictions]({{site.baseurl}}/docs/administration/account-user-management/access-control/#pipeline-definition-restrictions) by expanding the *YAML Options* segment.

## Atlassian Stash

Atlassian stash is only available for an on-premises connection. Follow the same instructions as Bitbucket.
You also need to provide the URL of the Stash server in your organization.

This option is only for Atlassian stash until version 3.10 which is the old version. It was then renamed
to Bitbucket server.

## Bitbucket Server

Bitbucket server is the new and current name of Atlassian Stash. Again, it is only available for an on-premises
installation.

Codefresh supports Bitbucket server versions 5.4.0+ since those expose the API used by the integration.

### Using External Secrets for BitBucket Token

If your Bitbucket Server installation is behind your firewall, you can also
use any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets) as values by entering a secrets value
with the same syntax [shown in pipelines]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/).

For example if you already have a `token` on a resource call `git-credentials` you can put in the token field the expression {% raw %}`${{secrets.git-credentials@token}}`{% endraw %}.

## Using your Git provider

Once your provider is active, you can add a new project in Codefresh, and then during the [repository selection screen]({{site.baseurl}}/docs/quick-start/ci-quickstart/create-ci-pipeline/) you will have access to the additional Git providers.

{% include image.html
lightbox="true"
file="/images/integrations/git/select-git.png"
url="/images/integrations/git/select-git.png"
max-width="60%"
caption="Select Git provider"
alt="Select Git provider"
%}

>Notice that for all supported Git providers, Codefresh automatically creates all the webhooks needed for
triggering pipelines when a commit (or another event) happens.

After adding the repository, Codefresh behavior is identical for all Git providers.
You can [create pipelines]({{site.baseurl}}/docs/pipelines/pipelines/) for different Git providers in exactly the same manner.

## ABAC for Git Contexts

**Account Level:** Pro and above

> At this time, you will need to reach out to support to enable ABAC for Git Context and [Pipeline Execution Context]({{site.baseurl}}/docs/administration/account-user-management/pipeline-execution-context/).

ABAC for Git Context gives the ability to restrict using and handling of Git Contexts. We use tags on the git context to limit Teams and Execution Contexts for access control. There are four actions controlled by ABAC: Creating, Updating, Deleting, and Using Git Contexts.

The Using means the following use cases:

* Creating trigger
* Getting YAML from a repository
* Using the Git Context in a pipeline (git clone step etc.) via Execution Context.

You will get an error of Permission Denied or Forbidden to a Git Context that you do not have the correct permissions for that action.

### Tagging the Git Context

1. Navigate to Account Settings > Integrations > Configure for Git.
1. Hovering over the integration name (Git Context), you will see "Edit Tags" just before the edit symbol.
1. Select "Edit Tags," and you can add and remove tags.
1. Click Save when done.

### Setting the Permissions

1. Navigate to Account Settings > Permissions > Teams or Execution Context.
1. Scroll to Git Contexts.
1. Here, you can set [permissions]({{site.baseurl}}/docs/administration/access-control/#creating-a-security-policy) similar to other ABAC rules for Teams or Execution Context to Create or Use, Update, and Delete actions.
1. Click Add Rule when done.

## Related articles
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/)  
[Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/)  
[Checking out source code]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/)  

