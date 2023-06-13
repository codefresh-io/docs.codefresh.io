---
title: "Gerrit Git provider integration"
description: ""
group: gitops-integrations
toc: true
---



Codefresh supports integration with Gerrit, the open-source web-based code review tool for Git repositories. Configure Gerrit as the primary Git provider for Codefresh GitOps. Codefresh can fetch the approved changes from Gerrit and build, test, and deploy the application based on your predefined workflows.

>**NOTE**:
Currently, Gerrit is supported as a Git provider for only Hosted GitOps Runtimes.


By integrating Gerrit with Codefresh GitOps, you can select Gerrit as your Git provider for your [Hosted GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/), and connect external clusters and create Git Sources for the Runtime.  
You can then [create]({{site.baseurl}}/docs/deployments/gitops/create-application/) and manage GitOps applications in the Gerrit Git repo.




## Set up GitOps Git integration for Gerrit
To set up an integration with Gerrit for GitOps, you need to:
1. [Create Codefresh GitOps user with access permissions in Gerrit](#step-1-gerrit-gitops-create-codefresh-gitops-user-with-required-permissions-in-gerrit)
1. [Generate HTTP password for Codefresh GitOps user in Gerrit](#step-2-gerrit-gitops-generate-http-password-for-codefresh-gitops-user-in-gerrit)

### Step 1 Gerrit GitOps: Create Codefresh GitOps user with required permissions in Gerrit

Create a user for Codefresh with the required permissions.

1. Create a profile in Gerrit's web interface for your Codefresh user.
1. Add permissions to create projects:
    1. Select **Browse > Repositories > All Projects**.
    1. From the sidebar, select **Access**.
    1. Below **Global Capabilities**, assign **Create Project: ALLOW**.

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/gerrit/allow-create-project-permission.png" 
   url="/images/integrations/gerrit/allow-create-project-permission.png" 
   alt="Example: Allow Create Projects for Service Users group" 
   caption="Example: Allow Create Projects for Service Users group"
   max-width="50%" 
   %}

{:start="3"}
1. Add permissions for repositories:
    1. Go to **Reference: ref/heads/***.
    1. Add **Push: ALLOW**
    1. Add **Read: ALLOW**

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/gerrit/allow-push-read-repo-access.png" 
   url="/images/integrations/gerrit/allow-push-read-repo-access.png" 
   alt="Example: Allow Push and Read for Service Users group" 
   caption="Example: Allow Push and Read for Service Users group"
   max-width="50%" 
   %}

{:start="4"}
1. Continue with [Step 2 Gerrit GitOps: Generate HTTP password for Codefresh GitOps user in Gerrit](#step-2-gerrit-gitops-generate-http-password-for-codefresh-gitops-user-in-gerrit).

### Step 2 Gerrit GitOps: Generate HTTP password for Codefresh GitOps user in Gerrit
Generate the HTTP Password in Gerrit as an access token to authenticate HTTP requests. 


>**NOTE**:  
Regenerating the HTTP Password automatically revokes the current password. 

1. Log in to Gerrit with the Codefresh user you created in _Step 1_.
1. In the toolbar, click the **Settings** icon.
1. From the sidebar, select **HTTP Credentials**, and below **HTTP Credentials** on the right, click **Generate New Password**.
1. Copy the generated password to a secure location as you will need it to set up the Gerrit Git account in Codefresh.
1. Click **Close**.

You can now connect to Gerrit as your Git provider for the Hosted GitOps Runtime. 
 


## Related articles
[Hosted GitOps Runtime setup]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)  
