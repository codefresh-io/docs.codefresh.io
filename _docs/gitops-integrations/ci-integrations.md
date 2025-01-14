---
title: "GitOps CI integrations"
description: ""
group: gitops-integrations
toc: true
---

Use Codefresh Hosted GitOps with any popular Continuous Integration (CI) solution, not just with Codefresh CI.

You can connect a third-party CI solution to Codefresh, such as GitHub Actions for example, to take care of common CI tasks such as building/testing/scanning source code, and have Codefresh Hosted GitOps still responsible for the deployment, including image enrichment and reporting.  
The integration brings in all the CI information to your images which you can see in the Images dashboard.   

See [Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).

## Codefresh image reporting and enrichment action
To support the integration between Codefresh and third-party CI platforms and tools, we have created dedicated actions for supported CI tools in the Codefresh Marketplace. These actions combine image enrichment and reporting through integrations with issue tracking and container registry tools. 

>**NOTE**  
You can also configure the integration directly in the Codefresh UI, as described in [Connect a third-party CI platform/tool to Codefresh](#connect-a-third-party-ci-platformtool-to-gitops).


Use the action as follows:

1. Create your pipeline with your CI platform/tool as you usually do.
1. Use existing CI actions for compiling code, running unit tests, security scanning etc.
1. Place the final action in the pipeline as the "report image" action provided by Codefresh.  
  See:  
  [GitHub Action Codefresh report image](https://github.com/marketplace/actions/codefresh-report-image){:target="\_blank"}  
  [Codefresh pipeline Codefresh report image](https://codefresh.io/steps/step/codefresh-report-image){:target="\_blank"}  
1. When the pipeline completes execution, Codefresh retrieves the information on the image that was built and its metadata through the integration names specified (essentially the same data that Codefresh CI would send automatically).
1. View the image in Codefresh's [Images dashboard]({{site.baseurl}}/docs/dashboards/images/), and in any [application]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/) in which it is used.

## Connect a third-party CI platform/tool to GitOps
Connecting the CI platform/tool to GitOps from the UI includes configuring the required arguments, and then generating and copying the YAML manifest for the report image to your pipeline.  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**GitOps Integrations**](https://g.codefresh.io/2.0/account-settings/integrations){:target="\_blank"}. 
1. Filter by **CI tools**, then select the CI tool and click **Add**.
1. Define the arguments for the CI tool:  
  [Codefresh pipelines]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/codefresh-classic/)  
  [GitHub Actions]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/github-actions/)  
  [Jenkins]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/jenkins/)  
    
  >**NOTE**  
  For the complete list of arguments you can use, see [CI integration for GitOps argument reference](#ci-integration-argument-reference) in this article.

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
The table has been moved to a dedicated standalone topic [here]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/ci-argument-reference/).


## Related articles
[Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
[Issue tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
[CI integrations argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/ci-argument-reference/)  






