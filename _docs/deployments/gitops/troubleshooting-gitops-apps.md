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

### Possible cause
This issue can occur when Istio VirtualService and Argo Rollouts are used in your application in Codefresh.  
The default behavior of VirtualService weights in Argo Rollouts can lead to synchronization issues with Git as the Rollout progresses.  
For more information, see [Argo Rollouts with Istio](https://argoproj.github.io/argo-rollouts/features/traffic-management/istio/#istio){:target="\_blank"}.

In Codefresh, this issue leads to a loop with the following behavior:
* Current release remains as **Progressing** in the Timeline tab.
* A new release when triggered, changes the previous release to **Terminated**, and the new release now remains stuck as **Progressing**.


### Possible actions
To resolve this issue when using Istio with Argo Rollouts, configure the application following the best practices for [integration with GitOps](https://argoproj.github.io/argo-rollouts/features/traffic-management/istio/#integrating-with-gitops){:target="\_blank"} in the Argo Rollouts documentation.


## Delayed reporting of application-change events to Codefresh





### Possible cause
The number of application-change events exceeds the number of events that can be handled by each replica of Application Reporter. 

Application-change events are distributed across Application Reporter instances using the hash-function on the application name divided by the number of replicas.  
If you have 100 apps and 5 Application Reporter replicas on the cluster, every Application Reporter instance is equipped to handle events from 20 apps. Codefresh recommends to have a ratio of 25-30 apps per Reporter instance.

It is essential to scale the Argo CD server and repo-server in tandem with the Application Reporter  Monitoring the memory consumption of these components is crucial. An increase in memory usage indicates a need for vertical or horizontal scaling. Codefresh recommends assessing and adjusting scaling strategies to maintain optimal performance.

### Possible actions
To resolve this issue, either increase the number of Application Server replicas or scale the ArgoCD server and repo-server components either vertically or horizontally.


In the context of your Codefresh documentation, the recommendation to "consider scaling them either vertically or horizontally" means that if the Argo CD server and repo-server are facing increased demands or resource constraints, you have two general approaches to address this:



The choice between vertical and horizontal scaling depends on the specific requirements and characteristics of your system, and it's often a strategic decision based on factors such as cost, performance, and ease of implementation.







