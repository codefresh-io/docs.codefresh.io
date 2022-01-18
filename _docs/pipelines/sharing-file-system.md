---
title: "Sharing file system"
description: ""
group: pipelines
toc: true
---

When working on CI/CD pipelines, sharing file system between steps is a common use case.  
For users coming from Codefresh Classic or similar systems, the ability to share a file system between different steps is a basic, native feature. Sharing a file system in the world of Argo Workflows, natively executed as they are on K8s pods, requires a change in mindset. Because K8s pods can run on different nodes, you cannot share, for instance, a local volume between Docker containers running on the same pod.  

Argo Workflows provides different ways to share a file system between steps. We have outlined the different approaches, with the suggested best approach by use case.

### Use previous step outputs as inputs
This approach passes outputs of previous steps as inputs to subsequent steps. You leverage the artifacts option and pass a file system to the step.
Argo Workflows pulls the artifact from the artifact repository that is configured (Minio, S3, GCS). An increase in the size of the artifact, also increases the initialization time for the step pod.  

The step-outputs-as-inputs approach best fits a file system that is small, both in terms of size, and in terms of the of number of files. Use this approach when you need to pass a CSV or a JSON file between steps.

For more information, see [native Argo Workflows documentation](https://argoproj.github.io/argo-workflows/workflow-inputs/#using-previous-step-outputs-as-inputs).

## Use Persistent Volume Claim (PVC)
The PVC approach leverages your cloud disk storage layer, and creates volumes that are fully maintained by Argo Workflows.

For this approach to work, you _must_ configure the correct `accessModes` for your volume:

* To run only one step at a specific point in time to access the volume, set the `accessMode` to a simple `ReadWriteOnce`.
* To run two steps in parallel that write to the same file system, set the `accessMode` to `ReadWriteMany`.  
  This is not always supported on all cloud providers, and your k8s cluster storage layer must have the capability to provision such disks.

The PVC approach is best to run parallel steps that are CPU or memory-intensive, and reads from or writes to the same disk.  

For more information, see [native Argo Workflows documentation](https://argoproj.github.io/argo-workflows/fields/#persistentvolumeclaim).

## Use Container Set Template
The Container Set Template approach creates multiple steps that will eventually run on the same pod, and can thus easily share a local file system that you can both read from and write to at the same time.  

The Container Set Template approach is best to run sequential steps that require the same file system, or run parallel steps that are not CPU or memory-intensive, and can live on the same pod, without having to scale.  

For more information, see [native Argo Workflows documentation](https://argoproj.github.io/argo-workflows/container-set-template/).
