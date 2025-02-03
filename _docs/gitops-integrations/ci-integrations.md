---
title: "GitOps CI integrations"
description: "Seamlessly integrate existing CI tools with GitOps for image enrichment"
group: gitops-integrations
toc: true
---

## Codefresh GitOps with CI solutions 

With Codefresh GitOps, you can integrate not only with Codefresh CI but also with other popular Continuous Integration (CI) solutions.

For example, you can connect a third-party CI tool like GitHub Actions to handle common CI tasks, such as building, testing, and scanning source code. Codefresh GitOps can then take care of deployment, image enrichment, and reporting. This integration ensures that all CI-related information is included in the images, which you can view in the Images dashboard.

For more details on how it works, see [Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).

## Codefresh image reporting and enrichment action
To support the integration with third-party CI platforms and tools, we offer dedicated actions in the Codefresh Marketplace. These actions combine image enrichment and reporting through integrations with issue tracking and container registry tools. 

>**NOTE**  
You can also configure these integration directly in the Codefresh UI, as described in [Connect a third-party CI platform/tool to Codefresh](#connect-a-third-party-ci-platformtool-to-gitops).


Use the action as follows:

1. Create your pipeline with your CI platform/tool as you usually do.
1. Use existing CI actions for compiling code, running unit tests, security scanning etc.
1. Place the final action in the pipeline as the "report image" action provided by Codefresh.  
  See:  
    * [GitHub Action Codefresh report image](https://github.com/marketplace/actions/codefresh-report-image){:target="\_blank"}  
    * [Codefresh pipeline Codefresh report image](https://codefresh.io/steps/step/codefresh-report-image){:target="\_blank"}  
1. When the pipeline completes execution, Codefresh retrieves the information on the image that was built and its metadata through the integration names specified (essentially the same data that Codefresh CI would send automatically).
1. View the image in the [Images dashboard]({{site.baseurl}}/docs/dashboards/images/), and in any [application]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/) in which it is used.

## Connect a third-party CI platform/tool to GitOps
Connecting the CI platform/tool to GitOps from the UI includes configuring the required arguments, and then generating and copying the YAML manifest for the report image to your pipeline.  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **GitOps Integrations**. 
1. Filter by **CI tools**, select the CI tool, and then click **Add**.
1. Define the arguments for the CI tool:  
    * [Codefresh pipelines]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/codefresh-classic/#codefresh-pipeline-gitops-integration-settings)  
    * [GitHub Actions]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/github-actions/#github-action-gitops-integration-settings)  
    * [Jenkins]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/jenkins/#jenkins-gitops-integration-settings)  
    
  >**NOTE**  
  For the complete list of arguments you can use, see [GitOps integrations argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-argument-reference/).

{:start="4"}
1. To generate a YAML snippet with the arguments, on the top-right, click **Generate Manifest**.  
   Codefresh validates the generated manifest, and alerts you to undefined arguments that are required, and other errors. 

   {% include image.html 
lightbox="true" 
file="/images/integrations/generated-manifest-with-error.png" 
url="/images/integrations/generated-manifest-with-error.png"
alt="Example of manifest generated for Codefresh pipeline with validation errors"
caption="Example of manifest generated for Codefresh pipeline with validation errors"
max-width="50%"
%}

{:start="5"}
1. If required, click **Close**, update as needed and generate the manifest again.
1. If there are no validation errors, click **Copy**.
1. Paste the copied manifest as the last step in your CI pipeline.

## CI integration argument reference 
The table has been moved to a dedicated standalone topic [here]({{site.baseurl}}/docs/gitops-integrations/ci-argument-reference/).


## Related articles
[Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
[Issue tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
[CI integrations argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/ci-argument-reference/)  






