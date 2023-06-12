



Codefresh supports integration with Gerrit, the open-source web-based code review tool for Git repositories. Configure Gerrit as the primary Git provider for Codefresh GitOps. Codefresh can fetch the approved changes from Gerrit and build, test, and deploy the application based on your predefined workflows.

>**NOTE**:
Currently, Gerrit is supported as a Git provider for only Hosted GitOps Runtimes.


By integrating Gerrit with Codefresh GitOps, you can select Gerrit as your Git provider for your hosted runtime environment. 
You can then:
connect a managed cluster to the Runtime, create Git Sources, and Argo Applications.

To set up an integration with Gerrit for GitOps, you need to:
* [Set up access permmissions for a Codefresh user in Gerrit](#set-up-access-permmissions-for-codefresh-user-in-gerrit)
* [Define Gerrit-GitOps integration settings in Codefresh](#gerrit-gitops-integration-settings-in-codefresh)

## Set up GitOps Git integration for Gerrit

### Gerrit GitOps integration:  Step 1 - Create Codefresh GitOps user with repo access permmissions in Gerrit

Gerrit has a special **Service Users** access-group. We recommend adding your Codefresh user in Gerrit to this group.

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

### Gerrit GitOps integration:  Step 2 - Generate HTTP password  for Codefresh GitOps user in Gerrit
Generate an access token in Gerrit to authenticate or authorize HTTP requests. 
The access token is the HTTP Password, and is different from the login password.

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
