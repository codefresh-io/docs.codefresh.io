---
title: "GitOps container registry integrations"
description: "Seamlessly integrate container registries with GitOps for image enrichment"
group: gitops-integrations
toc: true
---

Codefresh supports integration with popular container registries, including Docker Hub, JFrog Artifactory, and others, enabling seamless management of container images in GitOps workflows.

By adding a container registry integration in Codefresh, you can reference it by name in third-party CI tools like GitHub Actions or Codefresh Pipelines, rather than using explicit credentials. This simplifies your workflow and enhances security.  
See [Image enrichment with integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/) and [CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/).  

You add a container registry integration in Codefresh by:
* Defining the integration name 
* Selecting the runtime or runtimes it is shared with
* Defining the arguments
* Testing the connection 
* Committing the changes

You can add multiple integrations for the same registry, providing flexibility for your environment. Codefresh displays a list of existing integrations along with their sync status. You can easily edit or delete any registry integration as needed.


<!--- To see all images from all your container registries integrated with Codefresh in the Codefresh UI, go to [Images](https://g.codefresh.io/2.0/images){:target="\_blank"}. For documentation details, see [Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/)--->


## Configure container registry integrations for GitOps in Codefresh
Configure the settings for a container registry integration with GitOps in Codefresh.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **GitOps Integrations**. 
1. Filter by **Container Registry**, select the container registry, and then click **Configure**.
1. If you already have integrations, click **Add**.
1. Define the arguments for the container registry:  
    * [Amazon ECR]({{site.baseurl}}/docs/gitops-integrations/container-registries/amazon-ecr/#amazon-ecr-gitops-integration-settings-in-codefresh)   
    * [Docker Hub]({{site.baseurl}}/docs/gitops-integrations/container-registries/dockerhub/#docker-hub-gitops-integration-settings-in-codefresh)  
    * [GitHub Container Registry]({{site.baseurl}}/docs/gitops-integrations/container-registries/github-cr/#github-container-registry-ghcr-gitops-integration-settings-in-codefresh)   
    * [JFrog Artifactory]({{site.baseurl}}/docs/gitops-integrations/container-registries/jfrog/#jfrog-artifactory-gitops-integration-settings-in-codefresh)    
    * [Quay]({{site.baseurl}}/docs/gitops-integrations/container-registries/quay/#quay-gitops-integration-settings-in-codefresh)  
1. To test the connection to the container registry before committing the changes, click **Test Connection**.
1. To confirm, click **Commit**.
  It may take a few moments for the new integration to be synced to the cluster before it appears in the list.

## Integration resource in shared configuration repo
The integration resource for the container registry is created in the Git repository with the shared configuration, within `resources`.  
The exact location depends on whether the integration is shared with all or specific Runtimes:  
* All runtimes: Created in `resources/all-runtimes-all-clusters/`
* Selected runtimes: Created in `resources/runtimes/<runtime-name>/`

## View container registry integrations for GitOps
Selecting a container registry integration displays the existing integrations for that registry in Codefresh.  
<!--- The example below shows integrations for JFrog Artifactory.  

{% include image.html 
lightbox="true" 
file="/images/integrations/jfrog/jfrog-int-list.png" 
url="/images/integrations/jfrog/jfrog-int-list.png"
alt="JFrog integrations in Codefresh"
caption="JFrog integrations in Codefresh"
max-width="70%"
%}
-->

Every container registry integration displays the following information:
* Name of the integration
* Runtime or runtimes it is shared with
* Sync status

## Edit/delete container registry integrations for GitOps
If you have existing integrations, you can change the connection details, or delete an integration.

{{site.data.callout.callout_warning}}
**IMPORTANT**  
Deleting an integration deletes the integration resource from the Shared Configuration Repository, its secrets, and the CI workflows that 
use it. 
{{site.data.callout.end}}

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **GitOps Integrations**. 
1. Filter by **Container Registry**, and select the specific container registry integration.
1. In the row with the integration to edit or delete, click the three dots and select **Edit** or **Delete**.
1. To edit, update the **Username** and **Password** fields, and click **Test Connection** to verify the account credentials.
1. To delete, type **DELETE** in the text box as instructed.

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/jfrog/delete-jfrog.png" 
   url="/images/integrations/jfrog/delete-jfrog.png" 
   alt="Delete container registry integration" 
   caption="Delete container registry integration"
   max-width="50%" 
   %}

## Related articles
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
 
