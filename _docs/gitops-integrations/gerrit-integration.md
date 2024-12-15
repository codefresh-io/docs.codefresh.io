---
title: "GitOps Gerrit Git provider integration"
description: ""
group: gitops-integrations
toc: true
---



Codefresh supports integration with Gerrit, the open-source web-based code review tool for Git repositories. Configure Gerrit as the primary Git provider for Codefresh GitOps. Codefresh can fetch the approved changes from Gerrit and build, test, and deploy the application based on your predefined workflows.

>**NOTE**   
Currently, Gerrit is supported as a Git provider for only Hosted GitOps Runtimes.   
We support Gerrit version 3.6 (tested with 3.6.3) and 3.10 (tested with 3.10.1).
>For your next Gerrit upgrade, we’ll make our best effort to support the new version, but cannot guarantee specific timelines.


By integrating Gerrit with Codefresh GitOps, when you set up your [Hosted GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/), you can select Gerrit as your Git provider.

You can then [create]({{site.baseurl}}/docs/deployments/gitops/create-application/) and manage GitOps applications in the Gerrit Git repo.

If you have third-party CI tools/platforms such as Codefresh pipelines, GitHub Actions, or Jenkins for example, you can add Gerrit-specific arguments in your pipelines/workflows for image enrichment and reporting. See [CI integration flow for image enrichment]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/#ci-integration-flow-for-image-enrichment).   




## Gerrit-Codefresh GitOps integration in Gerrit

A GitOps integration with Gerrit requires:
1. [Correct permissions](#required-permissions-in-gerrit)
1. [HTTP password for authentication](#http-password-for-authentication)

### Required permissions in Gerrit

Permissions are required for creating projects and managing repositories.  

There are two options for user roles: admin user or a user with the following permissions.

| Repositories      | Access         |
| ----------        |  ----------------- |
| **All Projects**  |  **Global Capabilities**{::nomarkdown} <ul><li><b>Create Project: ALLOW</b></li></ul>{:/} |
|                   |  **Reference: ref/heads/**<br>{::nomarkdown} <ul><li><b>Push: ALLOW</b></li><li><b>Read: ALLOW</b></li></ul>{:/} |


    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/gerrit/allow-create-project-permission.png" 
   url="/images/integrations/gerrit/allow-create-project-permission.png" 
   alt="Example: Allow Create Projects for Service Users group" 
   caption="Example: Allow Create Projects for Service Users group"
   max-width="60%" 
   %}


    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/gerrit/allow-push-read-repo-access.png" 
   url="/images/integrations/gerrit/allow-push-read-repo-access.png" 
   alt="Example: Allow Push and Read for Service Users group" 
   caption="Example: Allow Push and Read for Service Users group"
   max-width="60%" 
   %}



### HTTP password for authentication
The HTTP Password in Gerrit is required as an access token to authenticate HTTP requests. 

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/gerrit/generate-http-password.png" 
   url="/images/integrations/gerrit/generate-http-password.png" 
   alt="HTTP password in Gerrit" 
   caption="HTTP password in Gerrit"
   max-width="60%" 
   %}

>**NOTE**   
Regenerating the HTTP Password automatically revokes the current password. 

<!---To generate an HTTP
1. Log in to Gerrit with the Codefresh user you created in _Step 1_.
1. In the toolbar, click the **Settings** icon.
1. From the sidebar, select **HTTP Credentials**, and below **HTTP Credentials** on the right, click **Generate New Password**.
1. Copy the generated password to a secure location as you will need it to set up the Gerrit Git account for the Hosted Runtime in Codefresh.
1. Click **Close**.
-->



## Gerrit-Codefresh GitOps integration in Codefresh
Once you have a user with the required permissions, you are all set to use Gerrit as your Git provider in Codefresh:

### Connect to Gerrit as Git provider
During the setup of your Hosted GitOps Runtime, choose Gerrit as the Git provider and provide the required credentials.  
See [Connect to Git provider]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/#step-2-connect-git-provider) for Hosted Runtime.


### Enrich image information
To enrich images with relevant information from Gerrit, incorporate Codefresh's image reporting step into your pipelines/workflows,  providing relevant Gerrit arguments.
Look for `CF_GERRIT_` in [CI integration argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/#ci-integration-argument-reference).  
  
## Related articles
[Shared Configuration Repo]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/) 
