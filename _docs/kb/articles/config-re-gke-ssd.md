---
title: "How-to: Configuring an existing Runtime Environment with Local SSDs (GKEonly)"
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

By default, a Runtime Environment (RE) is configured to use node's local storage to create the corresponding PV's for the pipeline volumes, but you can also configure your Runtime Environment to use local SSDs for your pipeline volumes.

This is specially useful if you need the speed and performance that local SSDs can provide.

In this article we're going to describe the process of configuring your RE to use SSD disks already attached to your K8s nodes.

Take into consideration that these instructions are intended to cover the scenario of an **existing** RE. If you're planning to use local SSD disks, and you haven't created|installed your RE yet, then, you can do all this configuration automatically by using the correct flags during the [RE-creation process]({{site.baseurl}}/docs/installation/codefresh-runner/#docker-cache-support-for-gke).

## Details

For the purpose of this guide, this is the information of the environment
being used:

* The cluster name: `my-gke-cluster`
* The namespace where the RE is configured: `codefresh-runtime`
* The RE name: `my-gke-cluster/codefresh-runtime`

### 0 - Prerequisites

The cluster should have a separate node pool with local SSDs enabled. More information in this link: [Local SSDs - GKE](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd).

>**Note**: be sure to assign **only** one local SSD per node.

### 1 - Create a new Storage Class

Create a new customer Storage Class in `my-gke-cluster` with the following spec:

`custom-sc.yaml`:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  labels:
    app: dind-volume-provisioner
  name: dind-localssd-volumes-runner-<my_re_namespace>
parameters:
  volumeBackend: local
  volumeParentDir: /mnt/disks/ssd0/codefresh/dind-volumes
provisioner: <the_cf_re_provisioner_name>
reclaimPolicy: Delete
volumeBindingMode: Immediate
```

> Where:
>
> `<my_re_namespace>` = The namespace of the RE.
>
> `<the_cf_re_provisioner_name>` = The name of the CF provisioner for that
> specific RE and Namespace. You can it get by running `kubectl get sc`. Check
> the `PROVISIONER` column, and look for the SC that includes the namespace
> name. E.g: `dind-local-volumes-runner-cfns` is a _StorageClass_ , its
> provisioner is `codefresh.io/dind-volume-provisioner-runner-cfns` and the
> namespace is `cfns`.
>  
>```shel
>kubectl get sc -l app=dind-volume-provisioner -o=jsonpath='{.items[*].metadata.name}'
>```

And apply it to your cluster:

```shell
kubectl apply -f custom-sc.yaml
```

Example of a Storage Class for a RE in a namespace called " _codefresh-
runtime_ ":

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  labels:
    app: dind-volume-provisioner
  name: dind-localssd-volumes-runner-codefresh-runtime
parameters:
  volumeBackend: local
  volumeParentDir: /mnt/disks/ssd0/codefresh/dind-volumes
provisioner: codefresh.io/dind-volume-provisioner-runner-codefresh-runtime
reclaimPolicy: Delete
volumeBindingMode: Immediate
```

### 2 - Patch the Runtime Environment

GKE adds a label: `cloud.google.com/gke-local-ssd: 'true'` , to the nodes in
the "Local-SSD node pool". To enforce the Runtime Environment to use that node
pool you need to add the corresponding NodeSelector. Also, you need to
reference the new SC in the RE spec.

To do that, follow these steps:

1. Identify your RE. List your Runtime Environments so you can get the full name of the RE you would like to modify. For that purpose, execute the following command:

    ```shell  
    codefresh get runtime-environments
    ```

2. Get the RE spec. Once you know the name of the RE, get its spec and store it in a file, by executing the following command:

    ```shell
    codefresh get runtime-environments <my_re_name> -o yaml > my_re.yaml
    ```

    Generally, a RE name is composed of `the_cluster_name`+`/`+`the_namespace`.

    Example: `my_cluster/codefresh-runtime`

    In the case of this example, the RE is called `my-gke-cluster/codefresh-runtime`, so to get its spec the command would be:

    ```shell
    codefresh get runtime-environments my-gke-cluster/codefresh-runtime -o yaml > re.yaml
    ```

3. Modify the `re.yaml` file. This is just a snippet of the YAML:

    ```yaml
    version: 2
    metadata:
      ...
    ...
    
    runtimeScheduler:
      cluster:
        ...
        nodeSelector:
          cloud.google.com/gke-local-ssd: 'true'
    ... 
    dockerDaemonScheduler:
      cluster:
        ...
        nodeSelector:
          cloud.google.com/gke-local-ssd: 'true' 
      ...
      pvcs:
        dind:
          storageClassName: dind-localssd-volumes-runner-<my_re_namespace>
    ...
    ```

    > **Note** : this is just a snippet of the full RE spec. The rest of it is represented by "`...`". You should **not** remove the other sections of your RE spec when editing it.
    >
    > Anything that's explicitly listed in your runtime environment config will be used, otherwise the setting will be inherited from a parent runtime environment. So if these fields don't already exist in your config, add them.

    In summary, the fields to modify in the YAML are:

    * `runtimeScheduler.cluster.nodeSelector`: adding a new element (`cloud.google.com/gke-local-ssd: 'true'`). This way builds (the `engine` pod) are only scheduled in a node with an attached SSD. You can omit configuring this field, if you would like to keep running the engine pods in another Node Pool (e.g.: the default one).
    * `dockerDaemonScheduler.cluster.nodeSelector`: adding a new element (`cloud.google.com/gke-local-ssd: 'true'`). This way builds (the `dind` pod) are only scheduled in a node with an attached SSD.
    * `dockerDaemonScheduler.pvcs.dind.storageClassName`: this field should reference the Storage Class previously created.

    **Optional:**

    While performing these changes, you can also take advantage of this process and change these fields of the YAML (the modification of these two fields is not something mandatory or required for the goal of this guide)

    * `dockerDaemonScheduler.pvcs.dind.volumeSize`: this is the size of the PVs to be created by the provisioner. In this field you should define the size by using the `XGi` notation. For example: `30Gi` (to set 30 Gibibytes for the Pipeline Volume). Example (optional):

        ```yaml
        ...
        pvcs:
          dind:
            volumeSize: 30Gi
            ...
        ```

    * `dockerDaemonScheduler.pvcs.dind.reuseVolumeSelector`: this defines the reuse-policy of the PV. Some valid values|options are:

    * `'codefresh-app,io.codefresh.accountName,pipeline_id'`

    * `'codefresh-app,io.codefresh.accountName'`

    Example (optional):

    ```yaml
    ...
    pvcs:
      dind:
        reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'
        ...
    ```

    Save the changes in the file.

4. Apply the changes. Using the Codefresh CLI proceed to upload the new RE spec:

    ```shell
    codefresh patch runtime-environments -f re.yaml
    ```

### 3 - Edit the dind-lv-monitor-runner DaemonSet

Edit the `dind-lv-monitor-runner` DaemonSet and set this path:
`/mnt/disks/ssd0/codefresh/dind-volumes` in all the required places. Once it's
done delete old pods of the DaemonSet `dind-lv-monitor-runner` to let the new
changes take effect.

Like this:

```yaml
...   
    spec:
      containers:
      - command:
        - /bin/local-volumes-agent
        env:
        - name: VOLUME_PARENT_DIR
          value: /mnt/disks/ssd0/codefresh/dind-volumes
        ...
        volumeMounts:        
        - mountPath: /mnt/disks/ssd0/codefresh/dind-volumes
          name: dind-volume-dir

      ...

      volumes:
      - hostPath:
          path: /mnt/disks/ssd0/codefresh/dind-volumes
          type: ""
        name: dind-volume-dir
...
```

> **Note** : this is just a snippet of the full DaemonSet spec. The rest of it is represented by "`...`". You should **not** remove the other sections of your dnd-lv-monitor-runner DaemonSet spec when editing it.

Summary of fields to be edited with `/mnt/disks/ssd0/codefresh/dind-volumes`:

* `spec.template.spec.containers[0].env[1].value`
* `spec.template.spec.containers[0].volumeMounts[0].mountPath`
* `spec.template.spec.volumes[0].hostPath.path`

### 4 - Remove the old PVs

This configuration will take effect only on new PVs that are created after this change. You need to delete the old PVs (created with the old StorageClass), otherwise the `dind-volume-provisioner` will try to re-use those old PVs.

### 5 - Test it

Trigger a new build on the corresponding RE, and check that the new PV is using the correct StorageClass.

## Additional considerations

**Get the latest CLI version:**

Before starting this process, it's recommended to make sure you have the latest version of the [CLI installed](https://codefresh-io.github.io/cli/installation/).

**Specific scenarios where SSD performance could be impacted:**

While using Local SSDs provides a significant improvement on performance, there are specific scenarios where using this type of storage could actually lower the performance of your builds. Specifically on steps where processes or applications are constantly flushing the write-cache (e.g.: databases). More information in this [link](https://cloud.google.com/compute/docs/disks/optimizing-local-ssd-
performance#disable_flush):

> File systems, databases, and other apps use [cache flushing](https://en.wikipedia.org/wiki/Disk_buffer#Cache_flushing) to ensure that data is committed to durable storage at various checkpoints. For most storage devices, this default makes sense. However, write cache flushes are fairly slow on local SSDs. **You can increase the write performance for some apps by disabling automatic flush commands in those apps or by disabling flush options at the file system level.**

With this in mind, there could some options to address this:

A. Apply the `nobarrier` option when mounting the volume: take into consideration that our controller assumes the SSD disk is already mounted. Managing the mounting process and the options used for it are out of Codefresh's scope. An example on how to automatically mount the SSD disks with this option is described here: [Link](https://gist.github.com/tennix/528d7e907526a3aeae9c5291a8e3a26c#file-local_volume_provisioner-gce_ssd-yaml-L23-L54)

B. If applying the `nobarrier` option is not possible, then, another approach could be to fine-tune the application configuration, so it reduces (or completely disable) the write-cache flushes it performs. For example, MySQL has a configuration called `innodb_flush_method`, with a `nosync` option.
