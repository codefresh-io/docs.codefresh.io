---
title: "Troubleshoot Argo CD applications"
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