---
title: "Jira"
description: ""
group: integrations
redirect_from:
  - /docs/jira-integration-1/
  - /docs/integrations/jira-integration-1/
toc: true
---
Codefresh integrates with Jira in a variety of ways. This site will show how you can integrate with Jira for the highest observability of your GitOps deployments. Alternatively, you can connect to Jira
* Through a [custom step]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#use-jira-within-your-codefresh-pipeline) from our step marketplace so that you can connect your pipelines with Jira
* Through using your own [jira-cli]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#using-your-own-jira-cli)

**Prerequisites needed**:
* [Codefresh Account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
* [Jira Account](https://www.atlassian.com/software/jira)

## Setting up the Jira Integration For GitOps

The goal of the Codefresh [GitOps Dashboard]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/) is to provide the highest observability into your deployments. The Codefresh GitOps Dashboard tags the Jira issues associated to deployments automatically through the Codefresh Jira Integration. This section will provide an overview of setting up the integration.

On the main Codefresh Dashboard, navigate to `Account Settings`. 

{% include image.html 
lightbox="true" 
file="/images/integrations/jira/codefresh-dashboard.png" 
url="/images/integrations/jira/codefresh-dashboard.png" 
alt="Codefresh Dashboard" 
max-width="90%" 
%}

On the `Integration` tap, you will find all of your integrations. Go to `Atlassian Jira` to connect your Jira account with Codefresh.

{% include image.html 
lightbox="true" 
file="/images/integrations/jira/account-settings.png" 
url="/images/integrations/jira/account-settings.png" 
alt="Codefresh Integrations" 
max-width="90%" 
%}

When you Add a new integration, you can choose to authenticate either using the [Codefresh Marketplace App]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#authenticate-with-the-jira-client-key) or with your [Jira Account Details]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#provide-account-details).

### Authenticate with the Codefresh Marketplace App

> Note that Codefresh currently has to provide you with access to use the Jira Marketplace App. Please get in touch for more information.

This is the recommended way to set-up your Jira Integration. To use the Codefresh Marketplace App on Jira, select `Jira Marketplace App` within the Jira Integration Setting in your Codefresh Account.
{% include image.html 
lightbox="true" 
file="/images/integrations/jira/jira-marketplace-auth.png" 
url="/images/integrations/jira/jira-marketplace-auth.png" 
alt="Authenticate with the Codefresh Marketplace App" 
max-width="90%" 
%}

To access the information needed to set-up the integration with the Codefresh Marketplace App, follow these steps:
* Visit the [Codefresh Application](https://marketplace.atlassian.com/apps/1224560/codefresh) on the Atlassian Marketplace.
    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/add-app.png" 
    url="/images/integrations/jira/add-app.png" 
    alt="Add Codefresh from Jira App Marketplace" 
    max-width="90%" 
    %}
* Install the application through `Get it now`. This will open up a screen to confirm the installation. Confirm the installation.
    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/confirm.png" 
    url="/images/integrations/jira/confirm.png" 
    alt="Confirm Installation" 
    max-width="90%" 
    %}
* Once the installation has finished, go to the `Apps` menu within your Jira Account.
* Access `Manage your apps`.
    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/manage-apps.png" 
    url="/images/integrations/jira/manage-apps.png" 
    alt="Select Manage Apps within Your Jira Account" 
    max-width="90%" 
    %}
* You should find a section called `User-installed apps`. Within this section, you should find the Codefresh CI/CD platform integration.
* Click on `Configure`.
    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/configure.png" 
    url="/images/integrations/jira/configure.png" 
    alt="Account Information" 
    max-width="90%" 
    %}
* This will provide you with your Organization URL and the Client Key. Copy and Paste both into the Jira Integration within your Codefresh Integration Settings.
    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/client-key.png" 
    url="/images/integrations/jira/client-key.png" 
    alt="Client Key Information" 
    max-width="90%" 
    %}
* Lastly, test your integration to ensure the credentials are set-up correctly.

You are all set!

### Provide Account Details

Using your account details to set-up the integration, you will have to provide
* An `Integration Name`: Any name that you fancy
* The `Jira URL`: This is the URL of your organisation e.g. ‘https://company-name.atlassian.net’
* Your `Jira Username`: This is usually the e-mail that you are logged in with at Jira
* Your Jira `Password`
Alternatively, you could authenticate with the Jira Client Key. 

{% include image.html 
lightbox="true" 
file="/images/integrations/jira/add-jira-password.png" 
url="/images/integrations/jira/add-jira-password.png" 
alt="Account Information" 
max-width="90%" 
%}

## Using the Jira Integration

Once Jira is connected to your Codefresh account, you can use both platforms in combination and integrate Jira into your [GitOps workflow]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/).

## What to read next

* [GitOps deployments]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
* [Example for sending notifications to Jira]({{site.baseurl}}/docs/yaml-examples/examples/sending-the-notification-to-jira/)
* Have a look at other things that you can do with your Codefresh Pipeline in the [example section]({{site.baseurl}}/docs/yaml-examples/examples/)
* [Create a pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)