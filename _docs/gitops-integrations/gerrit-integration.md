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
1. [Create Codefresh GitOps user with repo access permissions in Gerrit](#step-1-gerrit-gitops-create-codefresh-gitops-user-with-repo-access-permissions-in-gerrit)
1. [Generate HTTP password for Codefresh GitOps user in Gerrit](#step-2-gerrit-gitops-generate-http-password-for-codefresh-gitops-user-in-gerrit)

### Step 1 Gerrit GitOps: Create Codefresh GitOps user with repo access permissions in Gerrit

Gerrit has a special **Service Users** access-group for CI systems and other bots. We recommend adding your Codefresh user in Gerrit to this group, and setting the required access permissions required for the target repository.

1. Create a profile in Gerrit's web interface for your Codefresh user.
1. Add the user to the predefined Service Users access group:
  1. Navigate to **Browse > Groups**, and select **Service Users**.
  1. Click the **Members** tab, and click **Add Members**.
  1. Type the email address of the Codefresh user, and select the user from the search results.
  1. Click **Add**.
1. Browse to **Repositories** and select the repository for which to set permissions.
1. Select **Access > Edit**, and set the following permissions:
    * **Reference**: Set to **refs/*** to grant permissions to all references in the selected repository.
      * **Read**: **ALLOW** for Service Users
      * **Owner**: **ALLOW** for Service Users as `webhooks.config` in `refs/meta/config` requires [owner-level permissions](https://gerrit-review.googlesource.com/Documentation/access-control.html#category_submit){:target="\_blank"}.
      * **Label Verified**: **-1**, **+1** for Service Users. Gives permission to apply the `Verified` label with either a `-1` or `+1` value.
1. Continue with [Step 2: Generate access token for user in Gerrit](#step-2-generate-access-token-for-user-in-gerrit).

### Step 2 Gerrit GitOps: Generate HTTP password for Codefresh GitOps user in Gerrit
Generate the HTTP Password in Gerrit as an access token to authenticate HTTP requests. 


>**NOTE**:  
Regenerating the HTTP Password automatically revokes the current password. 

1. Log in to Gerrit with the Codefresh user you created in _Step 1_.
1. In the toolbar, click the **Settings** icon.
1. From the sidebar, select **HTTP Credentials**, and under HTTP Credentials on the right, click **Generate New Password**.
1. Copy the generated password to a secure location as you will need it to set up the Gerrit integration in Codefresh.
1. Click **Close**.

You can now connect to Gerrit as your Git provider for the Hosted GitOps Runtime. 
 


## Related articles
[Hosted GitOps Runtime setup]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)  
