---
title: "Gerrit Git provider integration"
description: ""
group: gitops-integrations
toc: true
---



Codefresh supports integration with Gerrit, the open-source web-based code review tool for Git repositories. Configure Gerrit as the primary Git provider for Codefresh GitOps. Codefresh can fetch the approved changes from Gerrit and build, test, and deploy the application based on your predefined workflows.

>**NOTE**:
Currently, Gerrit is supported as a Git provider for only Hosted GitOps Runtimes.


By integrating Gerrit with Codefresh GitOps, when you set up your [Hosted GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/), you can:
* Select Gerrit as your Git provider
* Connect an external cluster to the Runtime
* Create Git Sources for the Runtime  

You can then [create]({{site.baseurl}}/docs/deployments/gitops/create-application/) and manage GitOps applications in the Gerrit Git repo.

If you have third-party CI tools/platforms such as Codefresh pipelines, GitHub Actions, or Jenkins for example, you can use Gerrit-specific arguments in your pipelines/workflows for image enrichment and reporting. See [CI integration flow for image enrichment]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/#ci-integration-flow-for-image-enrichment).   




## Gerrit-Codefresh GitOps integration in Gerrit

A GitOps integration with Gerrit requires:
1. [Correct access permissions](#step-1-gerrit-gitops-create-codefresh-gitops-user-with-required-permissions-in-gerrit)
1. [HTTP password for authentication](#step-2-gerrit-gitops-generate-http-password-for-codefresh-gitops-user-in-gerrit)

### Access permissions in Gerrit

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

>**NOTE**:  
Regenerating the HTTP Password automatically revokes the current password. 

<!---To generate an HTTP
1. Log in to Gerrit with the Codefresh user you created in _Step 1_.
1. In the toolbar, click the **Settings** icon.
1. From the sidebar, select **HTTP Credentials**, and below **HTTP Credentials** on the right, click **Generate New Password**.
1. Copy the generated password to a secure location as you will need it to set up the Gerrit Git account for the Hosted Runtime in Codefresh.
1. Click **Close**.-->



## Gerrit-Codefresh GitOps integration in Codefresh
Once you have a user with the required permissions, you are all set to use Gerrit as your Git provider.

### Gerrit credentials to connect as Git provider
When 

### Enrich images with Codefresh report
  
## Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/) 
