---
title: "Troubleshooting Argo CD applications"
description: ""
group: deployments
sub_group: gitops
toc: true
---



## Current release version stuck in Progessing state
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

## Not receiving application-scoped sync notifications
You configured application-scoped sync notifications with the ACR Controller but are not receiving any notifications.

### Possible Cause
This issue can occur if any of the following are not configured:
1. Incorrect Runtime version
1. ACR controller not enabled for the Runtime
1. The required annotation is not configured in the application manifest
1. Notification controller not using  `.app.status.operationState.operation.sync.changeRevision`


### Possible Actions
Rollback to the previous notification template or trigger.

OR

Follow the steps to identify and fix the issue.

1. Verify the following:
    1. Your Runtime version is `0.13.0` or higher
    1. [ACR controller is enabled]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#enable-precise-sync-detection-for-monorepo-apps) for the Runtime 
    1. Check if the following are configured in the application's manifest:  
          [`argocd.argoproj.io/manifest-generate-paths` annotation]({{site.baseurl}}/docs/deployments/gitops/manage-application#configure-application-scoped-sync-notifications), set to the application's relative path. 
          `.app.status.operationState.operation.sync.changeRevision`, automatically added when ACR is enabled for the Runtime.
1. Check if you switched the revision in the notification controller to `.app.status.operationState.operation.sync.changeRevision`. 
1. Do one of the following:
  * If one or more requirements are not configured in _Steps 1 and 2_, configure as needed.
  * If all requirements in n _Steps 1 and 2_ are verified, check the logs for the notification controller. Continue from the next step.
1. In the notification controller logs, search for the `Revision for application %s is empty` message.  
  If present, it indicates that the controller couldn’t detect an actual change between the two revisions. 
1. Look at the log entry `Calculate revision for application %s, current revision %s, previous revision %s` to confirm whether there were any relevant changes between the two revisions. 
1. If there were changes:
  * Enable debug logs on the repository server.
  * Repeat the process.
  * Send the logs to the Support team for further investigation.


