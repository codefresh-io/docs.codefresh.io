---
title: "Git provider pipeline integrations"
description: "Easily check out code in Codefresh CI pipelines"
group: integrations
redirect_from:
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
* Bitbucket Server (new version of Stash)
* GitLab Cloud
* GitLab On-premises
* Azure DevOps Git
* Atlassian Stash (old version of Bibucket Server)
* Gerrit



Atlassian Stash/Bitbucket server, as well as the on-premises version of GitLab and GitHub, are only available to Codefresh enterprise customers.

## Adding more Git providers to your Codefresh Account

By default, you have direct access to Git repositories that exist in the Git provider you used while signing up for Codefresh. You can easily create Codefresh projects that check out code from that Git provider without any extra configurations.

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
* [Gerrit documentation](http://ec2-52-87-125-161.compute-1.amazonaws.com:8080/Documentation/user-upload.html#ssh){:target="\_blank"}

## GitHub

For the **OAuth2 method** you only need to decide on public/private repository access, enter a name for your connection and click *Save*. Then accept the permissions dialog. This is the easiest and recommended way to integrate GitHub. Notice that if
you used GitHub when you [created your Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/), this integration is already setup for you.

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
1. In the Codefresh UI, follow the steps to [add a new Git provider](#adding-more-git-providers-to-your-codefresh-account). 
1. From the **Add Git Provider** dropdown, select **Github App**.  
1. Define the settings:
  * **Installation ID** which you noted down in _step 5_.
  * **App ID**, which you noted down in _step 4_.
  * **Private key**, which is the content of the file your created in step 4, converted to base64.
1. To verify your integration, click **Test connection**.
1. To apply your changes, click **Save**.  

>If enabled in your account you can setup [Pipeline definition restrictions]({{site.baseurl}}/docs/administration/account-user-management/access-control/#pipeline-definition-restrictions) by expanding the *YAML Options* segment.

## GitLab

For the **OAuth2 method**:  
You only need to enable private repository access, enter a name for your connection and click *Save*. Then accept the permissions dialog. This is the easiest and recommended way to integrate GitLab. Notice that if
you used GitLab when you [created your Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/), this integration is already setup for you.

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
you used Bitbucket when you [created your Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/), this integration is already setup for you.

For the **Application Password** method you need:

* A friendly name for the Git context (It can be anything you want.)
* Your Bitbucket username
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

Click on *Test connection* to verify your settings and finally click save. Now you can [create pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)
that use Azure DevOps Git repos.

{% include image.html
lightbox="true"
file="/images/integrations/git/azure-devops-connected.png"
url="/images/integrations/git/azure-devops-connected.png"
max-width="40%"
caption="Codefresh integration with Azure Devops"
alt="Codefresh integration with Azure Devops"
%}

Your Azure DevOps repositories will be available when [creating a new project in Codefresh]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/).

 If enabled in your account you can setup [Pipeline definition restrictions]({{site.baseurl}}/docs/administration/account-user-management/access-control/#pipeline-definition-restrictions) by expanding the *YAML Options* segment.

## Atlassian Stash

Atlassian stash is only available for an on-premises connection. Follow the same instructions as Bitbucket.
You also need to provide the URL of the Stash server in your organization.

This option is only for Atlassian stash until version 3.10 which is the old version. It was then renamed
to Bitbucket server.

## Bitbucket Server

Bitbucket Server is the new and current name of Atlassian Stash. Bitbucket Server is supported in both on-premises and Runner installations.

Codefresh supports Bitbucket Server versions 5.4.0+ since those expose the API used by the integration.

### Using External Secrets for BitBucket Token

If your Bitbucket Server installation is behind your firewall, you can also
use any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets) as values by entering a secrets value
with the same syntax [shown in pipelines]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/).

For example if you already have a `token` on a resource call `git-credentials` you can put in the token field the expression {% raw %}`${{secrets.git-credentials@token}}`{% endraw %}.

## Gerrit
Codefresh supports integration with Gerrit, the open-source web-based code review tool for Git repositories. 
By integrating Gerrit in Codefresh, you can create pipelines to [trigger]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#gerrit-trigger-events) builds and tests whenever a new change is pushed to Git repos hosted in Gerrit, and see the status of builds and tests within Gerrit.

Gerrit has no explicit concept of pull requests, as in other version control systems, to map trigger event payloads to builds.  
Instead, Gerrit uses `Changes` which serves a similar purpose and functionality as pull requests.

You can achieve the same functionality in Codefresh with our `CF_PULL_REQUEST` group of environment variables. For the exact variables you can map to Gerrit `Changes`, see [System variables]({{site.baseurl}}/docs/pipelines/variables/#system-variables) and also [Gerrit changeId & change message variables]({{site.baseurl}}/docs/pipelines/variables/#gerrit-changeid--change-message-variables).

### Step 1: Set up permissions for Codefresh user in Gerrit

Gerrit has a special **Service Users** access-group for CI systems and other bots. We recommend adding your Codefresh user in Gerrit to this group, and setting the required permissions.

1. Create a profile in Gerrit's web interface for your Codefresh user.
1. Add the user to the predefined Service Users access group:
  1. Navigate to **Browse > Groups**, and select **Service Users**.
  1. Click the **Members** tab, and click **Add Members**.
  1. Type the email address of the Codefresh user, and select the user from the search results.
  1. Click **Add**.
1. Browse to **Repositories** and select the repository for which to set permissions, and do the following:
1. Select **Access > Edit**, and set the following permissions:
    * **Reference**: Set to **refs/***
        * **Read**: **ALLOW** for Service Users to read branches.  
          Note that you can also set this permission at the level of **All projects**.

        * **Owner**: **ALLOW** for Service Users to create webhooks for pipeline triggers.   
          `webhooks.config` in `refs/meta/config` requires [owner-level permissions](https://gerrit-review.googlesource.com/Documentation/access-control.html#category_submit){:target="\_blank"}.  
          Note that this permission must be set only at the _repository-level_.  

        * **Label Verified**: **-1**, **+1** for Service Users.  
          Gives permission to apply the `Verified` label, which is the typical label for CI, with either a `-1` or `+1` value.  
          Note that you can also set this permission at the level of **All projects**.

1. Continue with [Step 2: Generate password for user in Gerrit](#step-2-generate-password-for-user-in-gerrit).

### Step 2: Generate password for user in Gerrit
Generate an HTTP Password in Gerrit as an access token to authenticate HTTP requests. 

>**NOTE**:  
Regenerating the HTTP Password automatically revokes the current password. 

1. Log in to Gerrit with the Codefresh user you created in _Step 1_.
1. In the toolbar, click the **Settings** icon.
1. From the sidebar, select **HTTP Credentials**, and under HTTP Credentials on the right, click **Generate New Password**.
1. Copy the generated password to a secure location as you will need it to set up the Gerrit integration in Codefresh.
1. Continue with [Step 3: Define pipeline integration settings for Gerrit in Codefresh](#step-3-define-pipeline-integration-settings-for-gerrit-in-codefresh).

### Step 3: Define pipeline integration settings for Gerrit in Codefresh
As the final step to use Gerrit as your Git provider, define integration settings for Gerrit in Codefresh.

1. In the Codefresh UI, follow the steps to [add a new Git provider](#adding-more-git-providers-to-your-codefresh-account). 
1. From the **Add Git Provider** dropdown, select **Gerrit**.  
1. Define the settings:
  * **Name**: The name for your Gerrit integration. This is the name that will be used in pipelines to reference the Gerrit integration.
  * **Host URL**: The URL of your website with the Gerrit instance, for example, `https://git.company-name.io`.
  * **Username**: The username of your Gerrit account.
  * **Password**: The password you generated to use as the access token to authenticate HTTP requests to Gerrit.
1. Click **Save**.



## Using your Git provider

Once your provider is active, you can add a new project in Codefresh, and then during the [repository selection screen]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/) you will have access to the additional Git providers.

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

### Assigning tags to Git Contexts

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Configuration in the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Click Configure for Git to see the list of Git provider integrations (Git contexts).
1. Select the row with the integration for which to add tags.
1. On the right, click **Edit Tags**. 
1. Type in the tag or tags.
1. Click **Save**.

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

