---
title: "Codefresh Platform IP addresses"
description: "How to allowlist the IP addresses of the Codefresh platform"
group: administration
toc: true

---

If you want to use Codefresh for [a Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) that has a strict firewall, you can only allow access to specific IP addresses
that the Codefresh platform is using. This will allow you to deploy to your cluster even when it is not accessible from the public internet

>Note that this is needed only for customers that use the [SAAS version of Codefresh]({{site.baseurl}}/docs/administration/installation-security/). If you use the [Codefresh runner]({{site.baseurl}}/docs/administration/codefresh-runner/), there is no need to open any IPs and ports in your firewall.

## Current IPs used by the Codefresh platform (updated July 31st 2021)

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

All the IPs are NAT gateways, and therefore you only need to enable specific IPs instead of ranges.

> We have a plain text version of the IP Addresses located [here]({{site.baseurl}}/docs/administration/cf-ip4.txt). Recomended if you need it for monitoring changes.

## Old Codefresh IPs

These IP addresses have been removed, please replace these with the IP addresses above.

- 104.154.63.253
- 104.197.160.122
- 18.213.176.41
- 13.59.201.170
- 104.155.130.126
- 147.234.23.250
- 34.233.31.180
- 104.154.99.188
- 146.148.100.14
- 34.237.229.16

## What to read next

- [Codefresh installation options]({{site.baseurl}}/docs/administration/installation-security/)
- [Codefresh runner]({{site.baseurl}}/docs/administration/codefresh-runner/)
- [Codefresh behind the firewall]({{site.baseurl}}/docs/administration/behind-the-firewall/)
- [Managing your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
