---
title: "Sharing file system"
description: ""
group: pipelines
toc: true
---

When working on CI/CD pipelines it is a common use case to require to pass file system between subsequent steps and trying to avoid squashing multiple commands into the same step in order to avoid requiring to share the file system.

For users that are coming from Codefresh classic or other similar systems the ability to share a file system between different steps is a basic native feature, and when moving to a solution like Argo Workflows which is natively executed on k8s pods, this requires a slight change in the set of mind of how this can be achieved. Although k8s is more scalable, it also means that simple things like a local volume shared between docker containers that are running on the same pod (which was easy) is not possible anymore because k8s pods can run on different nodes.

Argo Workflows has different ways to provide the ability to share a file system between steps, we will go over the different approaches and explain which one should be used according to the use case.

## Using Previous Step Outputs As Inputs
By using this approach it is possible to pass outputs of previous steps into subsequent steps via inputs.

Using this approach you can leverage the artifacts option and pass a file system to the step.

This approach best fits a very small size file system, both in terms of size and in terms of amount of number of files due to the fact that using this approach Argo Workflows pulls the artifact from your configured artifact repository (minio, s3, gcs).

This process takes time and as the artifact becomes bigger, the initializing time for the step pod will increase.

Use this approach when you need to pass something like a .csv or a .json file between the steps.

Check the [native Argo Workflows documentation](https://argoproj.github.io/argo-workflows/workflow-inputs/#using-previous-step-outputs-as-inputs) for more information.

## Using Persistent Volume Claim
By using this approach you can leverage your cloud disk storage layer and create volumes that will be fully maintained by Argo Workflows.

These volumes can be passed easily between steps.

**Note:** that you need to configure the correct `accessModes` for your volume:

* if you need only one step in a specific point in time to access the volume then you can use a simple accessMode: `ReadWriteOnce`
* if you want to be able to run 2 steps in parallel that will write to the same file system you need to to configure the accessMode to `ReadWriteMany`. This is not always possible on all cloud providers and it will depend on having your k8s cluster storage layer able to provision such disks.

Use this approach when you need to run parallel steps that are cpu/memory intensive and require to read/write to the same disk.

Check the [native Argo Workflows documentation](https://argoproj.github.io/argo-workflows/fields/#persistentvolumeclaim) for more information.

## Using Container Set Template
By using this approach you can create multiple steps that will eventually run on the same pod and thus can easily share a local file system easily that you can both read and write to at the same time.

Use this approach when you need to run sequential steps that requires the same file system or when you have parallel steps that are not cpu/memory intensive and can live on the same pod that doesn't require to scale.

Check the [native Argo Workflows documentation](https://argoproj.github.io/argo-workflows/container-set-template/) for more information.



