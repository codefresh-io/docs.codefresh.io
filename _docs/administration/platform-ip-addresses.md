---
title: "CSDP platform IP addresses"
description: " "
group: administration
toc: true

---
To use CSDP for [a Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) that has a strict firewall, you can only allow access to specific IP addresses used by the CSDP platform. Using these IPs allows you to deploy to your cluster even when it is not accessible from the public internet.


### Current IPs used by the Codefresh platform (updated July 31st 2021)

All the IPs are NAT gateways, and therefore you only need to enable specific IPs instead of ranges.

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
 
