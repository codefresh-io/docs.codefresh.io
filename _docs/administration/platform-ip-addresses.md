---
title: "Codefresh IP addresses"
description: "How to allowlist the IP addresses of the Codefresh platform"
group: administration
toc: true

---
Access to Kubernetes clusters behind strict firewalls not accessible from the public internet is governed through authorized IP addresses.
Codefresh provides a list of IP addresses to be configured on clusters to allow access to them.

{% if page.collection != site.gitops_collection %}
You can register multiple external clusters to the Codefresh Runner and GitOps Runtimes.
{% endif %}
All Runtimes require Codefresh platform IPs to be configured on the clusters.
<!--- In addition, managed clusters registered to Hosted GitOps Runtimes must be configured with a set of specific IP addresses to authorize access. -->


## Codefresh IPs (updated July 2026)

All the IPs are NAT gateways, and need to enable specific IPs instead of ranges.

{{site.data.callout.callout_warning}}
**IMPORTANT**
If you do use these IPs, we **strongly recommend** that you monitor this page on a regular basis.
{{site.data.callout.end}}

## Platform IPs

- 54.221.236.3
- 23.21.197.195
- 34.238.37.0
- 54.86.228.102
- 107.22.212.247
- 54.235.42.99
- 3.210.49.238
- 13.216.208.171
- 54.162.159.149
- 34.231.18.115
- 100.49.100.123

{% if page.collection != site.gitops_collection %}
## Pipeline Runtime IPs

### All tiers

- 3.232.154.67
- 34.192.31.53
- 34.193.111.98
- 52.6.148.44
- 52.73.90.9
- 44.212.192.83
{% endif %}

>**NOTE**
We have a {% if page.collection != site.gitops_collection %}[plain text version of the IP addresses]({{site.baseurl}}/docs/administration/cf-ip4.txt){:target="\_blank"}{% endif %}{% if page.collection == site.gitops_collection %}[plain text version of the IP addresses]({{site.baseurl}}/gitops/administration/cf-gitops-cloud-ip4.txt){:target="\_blank"}{% endif %}. Recommended for monitoring changes.

## API access to IPs for clusters
Clusters must be configured with API access to the authorized Codefresh IPs.
If you haven't configured your clusters with the required IPs, use the links below to complete the configuration for the clusters listed:
* [AKS (Azure Kubernetes Service)](https://docs.microsoft.com/en-us/azure/aks/api-server-authorized-ip-ranges){:target="\_blank"}
* [EKS (Amazon Elastic Container Service)](https://aws.amazon.com/premiumsupport/knowledge-center/eks-lock-api-access-IP-addresses/){:target="\_blank"}
* [GKE (Google Kubernetes Engine)](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters){:target="\_blank"}

## Related articles
[Installing GitOps Runtimes with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)
[Installing GitOps Runtimes with new Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-new-argo-cd/)
{% if page.collection != site.gitops_collection %}
[Codefresh Runner installation]({{site.baseurl}}/docs/installation/runner/install-codefresh-runner/)
{% endif %}
