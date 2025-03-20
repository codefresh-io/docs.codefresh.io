---
title: "Creating Argo CD applications"
description: "Step-by-step instructions to create an Argo CD application in GitOps"
group: deployments
toc: true
---

## GitOps & Argo CD applications 
Create Argo CD applications that are fully GitOps-compliant from the GitOps Apps dashboard. 
When you commit the changes, the application manifest is generated and stored in Git, ensuring a declarative and auditable deployment process.

For example Argo CD applications, see this [repo](https://github.com/oleksandr-codefresh/argocd-example-apps){:target="_blank"}.  




## Create an Argo CD application
Create a new application from the GitOps Apps dashboard. 
Define settings in Form mode, or edit the manifest directly in YAML mode, toggling between them as needed.  

##### Before you begin
* Make sure you have a valid [Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
* Review:    
  [General configuration settings]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#application-general-configuration-settings)  
  [Advanced configuration settings]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings#application-advanced-configuration-settings)  


##### How to
1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
1. On the top-right, select **Add Application**.
1. In the Add Application panel, add definitions for the application:
  * Application name: Must be unique within the cluster.
  * Runtime: The runtime to associate with the application.  
  * YAML filename: The name of the application's configuration manifest, assigned on commit to Git. By default, the manifest is assigned the application name. Change the name as required.

    >**NOTE**  
    The application definitions cannot be changed after you continue to the Configuration settings.

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-definitions.png" 
   url="/images/applications/add-app-definitions.png" 
   alt="Add Application panel" 
   caption="Add Application panel"
   max-width="50%" 
   %} 

{:start="4"}
1. Select **Next** to go to the Configuration tab.  
  By default you are in Form mode. You can toggle between the Form and YAML modes as you define the application's configuration settings. You can edit the YAML manifest.
1. Define the **General** settings for the application. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-general-settings.png" 
   url="/images/applications/add-app-general-settings.png" 
   alt="Add Application: Advanced settings" 
   caption="Add Application: Advanced settings"
   max-width="70%" 
   %} 


{:start="6"}
1. Define the **Advanced** settings for the application. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-advanced-settings.png" 
   url="/images/applications/add-app-advanced-settings.png" 
   alt="Add Application: Advanced settings" 
   caption="Add Application: Advanced settings"
   max-width="70%" 
   %} 

{:start="7"}   
1. To commit all your changes, click **Commit**.  
  The Commit form is displayed with the application's definition on the left, and the read-only version of the manifest with the configuration settings you defined on the right.
1. Enter the path to the **Git Source** to which to commit the application configuration manifest.

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-final-commit.png" 
   url="/images/applications/add-app-final-commit.png" 
   alt="Add Application: Commit to Git" 
   caption="Add Application: Commit to Git"
   max-width="70%" 
   %} 

{:start="9"} 
1. Add a commit message and then select **Commit** on the bottom-right of the panel.


Your application is first committed to Git, and then synced to the cluster which may take a few moments.  

## YAML version of application manifest
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: demo-trioapp-dev
  finalizers:
    - resources-finalizer.argocd.argoproj.io/foreground
  annotations:
    codefresh.io/product: demo-trioapp
spec:
  project: default
  destination:
    name: in-cluster
    namespace: demo-dev
  source:
    path: demo-applications/trioapp-dev
    repoURL: https://github.com/codefresh-sandbox/codefresh-quickstart-demo.git
    targetRevision: main
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - PrunePropagationPolicy=foreground
      - Replace=false
      - PruneLast=false
      - Validate=true
      - CreateNamespace=true
      - ApplyOutOfSyncOnly=false
      - ServerSideApply=true
      - RespectIgnoreDifferences=false
```

## Related articles
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/)  
[Managing Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/)  
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)    
[Product dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/)  
[Trigger promotions for applications]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
{% if page.collection != site.gitops_collection %}[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/){% endif %}  
