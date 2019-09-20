---
title: "Forbidden Kubernetes Resources"
description: "Cannot list namespaces or nodes in the Kubernetes dashboard"
group: troubleshooting
sub_group: common-issues
toc: true
---

Codefresh is accessing your Kubernetes cluster via the standard Kubernetes API. As such, Codefresh needs correct [RBAC privileges](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) in order to work with the cluster. The service account used by Codefresh should have at least view privileges if you want to monitor your cluster
and additional privileges if you also want to deploy.

## Problem description

The issue occurs when you get errors in the Kubernetes dashboard view:

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/kubernetes-access/forbidden.png" 
url="/images/troubleshooting/kubernetes-access/forbidden.png" 
alt="Kubernetes access error" 
caption="Kubernetes access error" 
max-width="80%" 
%}

You might also get a more generic error:

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/kubernetes-access/unknown-error.png" 
url="/images/troubleshooting/kubernetes-access/unknown-error.png" 
alt="Kubernetes unknown error" 
caption="Kubernetes unknown error" 
max-width="80%" 
%}

This means that the service account you have connected in Codefresh does not have enough permission for your cluster.


## The solution

You should check

1. What service account Codefresh is using
1. What role is assigned to this service account
1. What access rights are possible with that role

You can see the role access with the standard `kubectl` commands:

```
kubectl get clusterrole codefresh-role -o yaml
```

Make sure that the privileges are at least those described in the [integration page]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#the-propersecure-way).



