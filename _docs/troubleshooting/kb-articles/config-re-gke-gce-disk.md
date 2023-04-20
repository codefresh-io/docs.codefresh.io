---
title: "How-to: Configuring an existing Runtime Environment with GCE disks"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Runtimes, Settings]
support-reviewed: 2023-04-18 LG
---

## Overview

By default, a Runtime Environment (RE) is configured to use node's local
storage to create the corresponding PV's for the pipeline volumes, but you can
also configure your Runtime Environment to use GCE disks instead.

When using the node's local storage, the pipeline-volume depends on the node.
If that node is deleted, all the PVs stored in it are lost as well. Or, if
your build is scheduled in a node different to where the pipeline-volume
resides, then, the build will start with an empty Pipeline Volume. Both
scenarios have negative consequences in terms of caching.

In this article we're going to describe the process of configuring your RE to
use a k8s-node-independent volume backend, such as GCE disks.

Take into consideration that these instructions are intended to cover the
scenario of an **existing** RE. If you're planning to use GCE disks, and you
haven't created|installed your RE yet, then, you can do all this configuration
automatically by using the correct flags during the RE-creation process. More
information about it here:
https://codefresh.io/docs/docs/administration/codefresh-runner/#docker-cache-
support-for-gke

## Details

For the purpose of this guide, this is the information of the environment
being used:

  * The cluster name: `my-gke-cluster`
  * The cluster is hosted in the Region/Zone: `us-east4-a`
  * The namespace where the RE is configured: `codefresh-runtime`
  * The RE name: `my-gke-cluster/codefresh-runtime`

### Create a new Storage Class

Create a new customer Storage Class in `my-gke-cluster` with the following
spec:

`custom-sc.yaml`:

    
    
    apiVersion: storage.k8s.io/v1
    kind: StorageClass
    metadata:
      labels:
        app: dind-volume-provisioner
      name: dind-gcedisk-us-east4-a-runner-codefresh-runtime
    parameters:
      fsType: ext4
      type: pd-ssd
      volumeBackend: gcedisk
      zone: us-east4-a
    provisioner: codefresh.io/dind-volume-provisioner-runner-codefresh-runtime
    reclaimPolicy: Delete
    volumeBindingMode: Immediate
    

> Note: the name of the `provisioner` is the same provisioner used by the
> current SC used by your Runner. You can get its name by executing:
>  
>  
>     kubectl get sc -l app=dind-volume-provisioner
> -o=jsonpath='{.items[*].metadata.name}'
>  

And apply it to your cluster:

    
    
    kubectl apply -f custom-sc.yaml
    

### Patch the Runtime Environment

  1. Identify your RE. List your Runtime Environments so you can get the full name of the RE you would like to modify. For that purpose, execute the following command:

    
    
    codefresh get runtime-environments
    

  2. Get the RE spec. Once you know the name of the RE, get its spec and store it in a file, by executing the following command:

    
    
    codefresh get runtime-environments <my_re_name> -o yaml > my_re.yaml
    

Generally, a RE name is composed of `the_cluster_name`+`/`+`the_namespace`.
Example: `my_cluster/codefresh-runtime`

In the case of this example, the RE is called `my-gke-cluster/codefresh-
runtime`, so to get its spec the command would be:

    
    
    codefresh get runtime-environments my-gke-cluster/codefresh-runtime -o yaml > re.yaml
    

  3. Modify the `re.yaml` file. This is just a snippet of the YAML:

    
    
    version: 2
    metadata:
      ...
    runtimeScheduler:
      cluster:
        ...
        nodeSelector:
          failure-domain.beta.kubernetes.io/zone: us-east4-a
    dockerDaemonScheduler:
      cluster:
        ...
        nodeSelector:
          failure-domain.beta.kubernetes.io/zone: us-east4-a    
      ...
      pvcs:
        dind:
          storageClassName: dind-gcedisk-us-east4-a-runner-codefresh-runtime
          ...
    ...
    

> **Note** : this is just a snippet of the full RE spec. The rest of it is
> represented by "`...`". You should **not** remove the other sections of your
> RE spec when editing it.
>
> Anything that's explicitly listed in your runtime environment config will be
> used, otherwise the setting will be inherited from a parent runtime
> environment. So if these fields don't already exist in your config, add
> them.

In summary, the fields to modify in the YAML are:

  * `runtimeScheduler.cluster.nodeSelector`: adding a new element (`failure-domain.beta.kubernetes.io/zone: us-east4-a`). This way builds are only scheduled in a zone where the provisioner is configured to create PVs.
  * `dockerDaemonScheduler.cluster.nodeSelector`: adding a new element (`failure-domain.beta.kubernetes.io/zone: us-east4-a`). This way builds are only scheduled in a zone where the provisioner is configured to create PVs.
  * `dockerDaemonScheduler.pvcs.dind.storageClassName`: this field should reference the Storage Class previously created.

**Optional:**

While performing these changes, you can also take advantage of this process
and change these fields of the YAML (the modification of these two fields is
not something mandatory or required for the goal of this guide):

  * `dockerDaemonScheduler.pvcs.dind.volumeSize`: this is the size of the PVs to be created by the provisioner. In this field you should define the size by using the `XGi` notation. For example: `30Gi` (to set 30 Gibibytes for the Pipeline Volume). Example (optional):

    
    
        ...
        pvcs:
          dind:
            volumeSize: 30Gi
            ...
    

  * `dockerDaemonScheduler.pvcs.dind.reuseVolumeSelector`: this defines the reuse-policy of the PV. Some valid values|options are:

  * `'codefresh-app,io.codefresh.accountName,pipeline_id'`

  * `'codefresh-app,io.codefresh.accountName'`

Example (optional):

    
    
        ...
        pvcs:
          dind:
            reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'
            ...
    

Save the changes in the file.

  4. Apply the changes. Using the Codefresh CLI proceed to upload the new RE spec:

    
    
       codefresh patch runtime-environments -f re.yaml
    

### Remove the old PVs

This configuration will take effect only on new PVs that are created after
this change. You need to delete the old PVs (created with the old
StorageClass), otherwise the `dind-volume-provisioner` will try to re-use
those old PVs.

### Test it

Trigger a new build on the corresponding RE, and check that the new PV is
using the correct StorageClass.

### Additional considerations

  * Before starting this process, it's recommended to make sure you have the latest version of the CF-CLI installed. More information here: https://codefresh-io.github.io/cli/installation/.

