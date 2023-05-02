---
title: "Volume provisioning issues after Kubernetes upgrade to 1.23. Amazon EBS CSI driver."
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Runtimes]
support-reviewed: 2023-04-18 LG
---


## Use case

After upgrading or creating a cluster with k8s version 1.23, the EBS volumes
can't be attached and Codefresh builds stay in pending status. There may be
the following errors in pod logs:

```shell
Warning  FailedMount 112s   kubelet  Unable to attach or mount volumes:
unmounted volumes=[dind], unattached volumes=[dind-config dind codefresh-certs-server]:
timed out waiting for the condition
```

## Solution

With k8s versions 1.23 and higher the Amazon EBS CSI driver is required for the EBS volumes management from EKS clusters, more information from AWS documentation: [Amazon EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html)

The Amazon EBS CSI driver isn't installed when you first create or update the cluster. To use the driver, you must add it as an Amazon EKS add-on or as a self-managed add-on.

* For instructions on how to add it as an Amazon EKS add-on, see [Managing the Amazon EBS CSI driver as an Amazon EKS add-on.](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html)
* For instructions on how to add it as a self-managed add-on, see the [Amazon EBS Container Storage Interface (CSI) driver project](https://github.com/kubernetes-sigs/aws-ebs-csi-driver) on GitHub.

## Related Items

[Failure to perform actions on your selected Kubernetes context]({{site.baseurl}}/docs/kb/articles/failure-to-perform-action-k8s-context)
