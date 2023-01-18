---
title: "Forbidden Kubernetes resources"
description: "Cannot list namespaces or nodes in the Kubernetes dashboard"
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/troubleshooting/common-issues/forbidden-cluster-resources/
toc: true
---

## Issue

Errors in the Kubernetes dashboard view:

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/kubernetes-access/forbidden.png" 
url="/images/troubleshooting/kubernetes-access/forbidden.png" 
alt="Kubernetes access error" 
caption="Kubernetes access error" 
max-width="80%" 
%}

OR

Generic error:

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/kubernetes-access/unknown-error.png" 
url="/images/troubleshooting/kubernetes-access/unknown-error.png" 
alt="Kubernetes unknown error" 
caption="Kubernetes unknown error" 
max-width="80%" 
%}



## Possible causes

The service account you have connected in Codefresh does not have enough permissions for your cluster. 

Codefresh accesses your Kubernetes cluster via the standard Kubernetes API. As such, to work with the cluster, Codefresh needs correct [RBAC privileges](https://kubernetes.io/docs/reference/access-authn-authz/rbac/){:target="\_blank"}. 

## Solution

To moinitor the cluster, the service account used by Codefresh should have at least view privileges, and to also deploy to the cluster, the service account requires additional privileges.

Check the following:

1. What service account Codefresh uses
1. What role is assigned to this service account
1. What access rights are possible with that role

You can see the role access with the standard `kubectl` commands:

```
kubectl get clusterrole codefresh-role -o yaml
```

Make sure that the privileges are at least those described in the [integration page]({{site.baseurl}}/docs/deployments/kubernetes/add-kubernetes-cluster/#the-propersecure-way).



## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)