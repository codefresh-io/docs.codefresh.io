---
title: "Troubleshooting Argo CD applications"
description: ""
group: deployments
sub_group: gitops
toc: true
---



## Current release version stuck in Progressing state
In the GitOps Apps dashboard, when viewing the Timeline tab for the selected Argo CD application, the Current Version is shown as **Progressing**, though the application status is Healthy and Synced.

{% include 
	image.html 
	lightbox="true" 
	file="/images/troubleshooting/gitops-apps/timeline-current-version-progressing.png" 
	url="/images/troubleshooting/gitops-apps/timeline-current-version-progressing.png" 
	alt="Current version stuck in Progressing" 
	caption="Current version stuck in Progressing"
  max-width="60%" 
%}

### Possible Cause
This issue can occur when Istio VirtualService and Argo Rollouts are used in your application in Codefresh.  
The default behavior of VirtualService weights in Argo Rollouts can lead to synchronization issues with Git as the Rollout progresses.  
For more information, see [Argo Rollouts with Istio](https://argoproj.github.io/argo-rollouts/features/traffic-management/istio/#istio){:target="\_blank"}.

In Codefresh, this issue leads to a loop with the following behavior:
* Current release remains as **Progressing** in the Timeline tab.
* A new release when triggered, changes the previous release to **Terminated**, and the new release now remains stuck as **Progressing**.


### Possible Actions
To resolve this issue when using Istio with Argo Rollouts, configure the application following the best practices for [integration with GitOps](https://argoproj.github.io/argo-rollouts/features/traffic-management/istio/#integrating-with-gitops){:target="\_blank"} in the Argo Rollouts documentation.

## Not receiving application-scoped sync notifications with ACR Controller  
You enabled the Application Change Revision (ACR) Controller and configured application-scoped sync notifications, but are not receiving notifications.

### Possible Causes
This issue can occur if any of the following are not configured:
1. Incorrect Runtime version
1. ACR controller is not enabled for the Runtime
1. Missing required annotation in the application manifest
1. Notification controller and template not using `.app.status.operationState.operation.sync.changeRevision`


### Possible Actions
Either roll back to the previous notification template or trigger, or follow the steps listed below to identify and fix the issue.

##### Runtime configuration
1. Ensure that your Runtime version is `0.13.0` or higher.
1. Confirm that the [ACR controller is enabled]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#enable-precise-sync-detection-for-monorepo-apps) for the Runtime.

##### Application configuration
1. Verify if the application manifest includes the following:  
    `argocd.argoproj.io/manifest-generate-paths` annotation, set to the application's relative path.  
    `.app.status.operationState.operation.sync.changeRevision`, automatically added when ACR is enabled for the Runtime.
1. Ensure that the correct revision is detected:
    * Manually sync the application in the GitOps Apps dashboard by clicking **Synchronize**.
    * Review the logs for entries similar to the following:
```
time="2024-10-15T18:35:54Z" level=info msg="Change revision for application helm-guestbook2 is 804146ff6b6de77329d73f732e7af61d5ba3fe66"
time="2024-10-15T18:35:54Z" level=info msg="Patch operation sync result for application helm-guestbook2"
```
##### Notification configuration
1. Confirm that the revision field in the notification controller is set to `.app.status.operationState.operation.sync.changeRevision`. 

##### Check notification controller logs
1. If all configurations are correct, review the notification controller logs for these messages:
  * `Revision for application %s is empty`, indicating that the controller couldn’t detect an actual change between the two revisions. 
  * `Calculate revision for application %s, current revision %s, previous revision %s` to confirm whether there were any relevant changes between the two revisions. 
1. If relevant changes are detected:
  * Enable debug logs on the repository server.
  * Repeat the process.
1. Send the logs collected to the Support team for further investigation.


## Filter by Kubernetes labels in Current State is disabled

### Possible Causes
You have installed the GitOps Runtime with an existing Argo CD instance.  
This filter option in the Current State tab is currently not supported.  

Stay tuned for updates on this feature.

## Ignore Extraneous filter in the Current State tab is disabled

### Possible Causes
You have installed the GitOps Runtime with an existing Argo CD instance.  
This filter option in the Current State tab is currently not supported.  

