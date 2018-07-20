---
title: "Configure a Bitbucket Server Webhook"
description: ""
group: integrations
sub_group: git-providers
permalink: /:collection/integrations/git-providers/configure-a-bitbucket-server-webhook/
# Permalink Example: will be like
# /docs/CATEGORY_OF_FILE/NEW_PAGE_NAME__INSTEAD_FILE_NAME/
toc: true
---

## Webhook to Codefresh

{:start="1"}
1. In Stash, install the Stash Webhook to Jenkins plugin.

{:start="2"} 
2. Navigate to your Bitbucket repository, and in the left navigation pane, click the **Settings** tab.

{% include image.html 
lightbox="true" 
file="/images/cbb9395-Pasted_image_at_2016_10_06_07_39_PM.png" 
url="/images/cbb9395-Pasted_image_at_2016_10_06_07_39_PM.png" 
alt="Pasted image at 2016_10_06 07_39 PM.png" 
max-width="40%" 
%}

{:start="3"} 
3. Under the Workflow section, click **Hooks**.

{:start="4"} 
4. Click the **Enabled** button for the Stash Post-Receive Webhook to Jenkins hook.

{% include image.html 
lightbox="true" 
file="/images/96931d1-codefresh_stash_hooks.png" 
url="/images/96931d1-codefresh_stash_hooks.png" 
alt="codefresh_stash_hooks.png" 
max-width="40%" 
%}

{:start="5"}
5. In the Jenkins URL text box, enter the URL https://g.codefresh.io/api/providers/stash/hook/{account_name} the Repository URL. {account_name} is your Stash account name in Codefresh. You can use the Repo Clone URL drop-down menu to get the clone URL for each supported protocol. 

{% include image.html 
lightbox="true" 
file="/images/064ad69-codefresh_stash_webhook.png" 
url="/images/064ad69-codefresh_stash_webhook.png" 
alt="codefresh_stash_webhook.png" 
max-width="40%" 
%}

{:start="6"}
6. Click the **Trigger Jenkins** button to test your configuration.

{% include image.html 
lightbox="true" 
file="/images/0ad6dc0-codefresh_stash_hook_test.png" 
url="/images/0ad6dc0-codefresh_stash_hook_test.png" 
alt="codefresh_stash_hook_test.png" 
max-width="40%" 
%}

## Enabling Auto Build / Webhook Settings
You can configure your pipeline to automatically trigger by setting a webhook on your git repository. 

See the [Git Trigger documentation]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) for more details.

**NOTE**: Only the repository owners can set webhooks.



