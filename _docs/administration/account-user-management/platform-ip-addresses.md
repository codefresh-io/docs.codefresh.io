---
title: "Codefresh IP addresses"
description: " "
group: administration
toc: true

---
Access to Kubernetes clusters behind strict firewalls not accessible from the public internet is governed through authorized IP addresses. 
Codefresh provides a list of IP addresses to be configured on clusters to allow access to them. 

You can register multiple external clusters to Codefresh runtimes, both hosted and hybrid. All runtimes require Codefresh platform IPs to be configured on the clusters.  
In addition, managed clusters registered to hosted runtimes must be configured with a set of specific IP addresses to authorize access.


### Codefresh platform IPs (updated July 31st 2021)

All the IPs are NAT gateways, and need to enable specific IPs instead of ranges.

>If you do use these IPs, we **strongly recommend** that you monitor this page on a regular basis.

- 107.21.238.215
- 18.209.185.91
- 18.215.207.215
- 18.233.130.31
- 18.210.174.176
- 23.20.5.235
- 3.232.154.67
- 34.192.31.53
- 34.193.111.98
- 34.195.17.245
- 34.196.33.69
- 34.198.38.4
- 34.200.163.76
- 44.238.236.43
- 44.234.209.117
- 44.239.141.205
- 44.228.66.171
- 44.238.167.159
- 44.237.63.217
 
### Codefresh IPs for managed clusters in hosted runtimes

- 34.207.5.18
- 34.232.79.230
- 44.193.43.5

### Define API access to IPs for clusters
Clusters must be configured with API access to the authorized Codefresh IPs.  
If you haven't configured your clusters with the required IPs, use the links below to complete the configuration for the clusters listed:

[AKS (Azure Kubernetes Service)](https://docs.microsoft.com/en-us/azure/aks/api-server-authorized-ip-ranges){:target="\_blank"}  

[EKS (Amazon Elastic Container Service)](https://aws.amazon.com/premiumsupport/knowledge-center/eks-lock-api-access-IP-addresses/){:target="\_blank"}  

[GKE (Google Kubernetes Engine)](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters){:target="\_blank"}  

### What to read next
[Set up a hosted (Hosted GitOps) environment]({{site.baseurl}}/docs/runtime/hosted-runtime/)  
[Install hybrid runtimes]({{site.baseurl}}/docs/runtime/installation/)  
[Codefresh architecture]({{site.baseurl}}/docs/getting-started/architecture/)