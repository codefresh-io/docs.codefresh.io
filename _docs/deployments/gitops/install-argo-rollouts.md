---
title: "Progressive delivery with GitOps"
description: ""
group: deployments
sub_group: gitops
redirect_from:
  - /csdp-docs/docs/deployment/install-argo-rollouts/
toc: true
---


Install Argo Rollouts on managed clusters with a single click. With Argo Rollouts installed on your cluster, you can visualize rollout progress for deployed applications in the [GitOps Apps dashboard]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#rollout-progress-visualization).  
If Argo Rollouts has not been installed, an **Install Argo Rollouts** button is displayed on selecting the managed cluster. 

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. From Runtimes in the sidebar, select [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Select **Topology View**.
1. Select the target cluster, and then select **+ Install Argo Rollouts**.
 
{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/cluster-install-rollout.png" 
	url="/images/runtime/cluster-install-rollout.png" 
	alt="Install Argo Rollouts" 
	caption="Install Argo Rollouts"
  max-width="40%" 
%}

## Related articles
[Add external clusters to runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  