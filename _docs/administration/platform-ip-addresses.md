---
title: "Codefresh IP addresses"
description: "How to allowlist the IP addresses of the Codefresh platform"
group: administration
toc: true

---
Access to Kubernetes clusters behind strict firewalls not accessible from the public internet is governed through authorized IP addresses. 
Codefresh provides a list of IP addresses to be configured on clusters to allow access to them. 

You can register multiple external clusters to the Codefresh Runner and GitOps Runtimes. All Runtimes require Codefresh platform IPs to be configured on the clusters.  
In addition, managed clusters registered to Hosted GitOps Runtimes must be configured with a set of specific IP addresses to authorize access.


## Codefresh platform IPs (updated December 2023)

All the IPs are NAT gateways, and need to enable specific IPs instead of ranges.

{{site.data.callout.callout_warning}}
**IMPORTANT**  
If you do use these IPs, we **strongly recommend** that you monitor this page on a regular basis.
{{site.data.callout.end}}



- 107.20.62.112
- 107.21.238.215
- 107.22.208.170
- 18.209.185.91
- 18.215.207.215
- 18.233.130.31
- 18.210.174.176
- 23.20.5.235
- 3.85.182.203
- 3.211.224.172
- 3.232.154.67
- 3.228.62.77
- 34.192.31.53
- 34.193.111.98
- 34.195.17.245
- 34.196.33.69
- 34.198.38.4
- 34.200.163.76
- 34.235.30.144
- 44.205.132.73
- 44.212.192.83
- 52.6.148.44
- 52.73.90.9
- 52.72.0.154
- 52.73.76.60
- 54.160.88.80  
- 72.44.39.224

>**NOTE**    
We have a [plain text version of the IP addresses]({{site.baseurl}}/docs/administration/cf-ip4.txt). Recommended for monitoring changes.
 
## Codefresh IPs for Hosted GitOps Runtimes

- 18.204.66.119
- 18.210.81.87
- 18.213.23.1
- 52.5.116.137
- 3.212.173.12
- 3.85.182.203
- 3.211.224.172
- 34.200.130.17
- 72.44.39.224

## API access to IPs for clusters
Clusters must be configured with API access to the authorized Codefresh IPs.  
If you haven't configured your clusters with the required IPs, use the links below to complete the configuration for the clusters listed:
* [AKS (Azure Kubernetes Service)](https://docs.microsoft.com/en-us/azure/aks/api-server-authorized-ip-ranges){:target="\_blank"}  
* [EKS (Amazon Elastic Container Service)](https://aws.amazon.com/premiumsupport/knowledge-center/eks-lock-api-access-IP-addresses/){:target="\_blank"}  
* [GKE (Google Kubernetes Engine)](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters){:target="\_blank"}  

## Related articles
[Codefresh Runner installation]({{site.baseurl}}/docs/installation/runner/install-codefresh-runner/)  
[Set up a Hosted GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)  
[Install Hybrid GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
[Codefresh platform architecture]({{site.baseurl}}/docs/installation/installation-options/)   
