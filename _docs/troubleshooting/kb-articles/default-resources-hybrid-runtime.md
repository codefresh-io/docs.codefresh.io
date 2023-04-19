---
title: 
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

# How-to: Setting up default resources for your Runner Runtime Environment

#

## Overview

The Runner Runtime Environment is pre-configured with default definitions for
resources (`memory` and `cpu`). Those resources are inherited from the parent
Runtime Environment (RE) spec your RE is extending from.

It could be the case you want to set different defaults for the resources
assigned to the builds executed in a RE.

## Details

  1. Identify your RE. List your Runtime Environments so you can get the full name of the RE you would like to modify. For that purpose, execute the following command:

    
    
    codefresh get runtime-environments
    

  2. Get the RE spec. Once you know the name of the RE, get its spec and store it in a file, by executing the following command:

    
    
    codefresh get runtime-environments <my_re_name> -o yaml > my_re.yaml
    

Generally, a RE name is composed of `the_cluster_name`+`/`+`the_namespace`.
Example: `my_cluster/codefresh-runtime`

  3. Modify the `my_re.yaml` file. The default resources assigned to a build are defined in the `dockerDaemonScheduler.defaultDindResources` field of its spec. For example, to set the default `cpu` as 1 core (`1000m`) and 2 GiB of memory (`2048Mi`) your RE spec should look like this:

    
    
    ...
    dockerDaemonScheduler:
      defaultDindResources:
        requests: ''
        limits:
          cpu: 1000m
          memory: 2048Mi
    ...
    

> **Note 1** : this is just a snippet of the full RE spec. The rest of it is
> represented by "`...`". You should **not** remove the other sections of your
> RE spec when editing it.
>
> **Note 2** : by setting `requests: ''` we make sure that the container|pod
> where the builds will be executed, will have guaranteed resources
> (`requests==limits`). More information here: [What if you specify a
> Container's limit, but not its
> request?](https://kubernetes.io/docs/tasks/administer-cluster/manage-
> resources/cpu-default-namespace/) and here: [Pod with Guaranteed
> QoS](https://kubernetes.io/docs/tasks/administer-cluster/manage-
> resources/cpu-default-namespace).

Save the changes in the file.

  4. Apply the changes. Using the Codefresh CLI proceed to upload the new RE spec:

    
    
       codefresh patch runtime-environment <my_re_name> -f my_re.yaml
    

_**Note** :_

  * Before starting this process, it's recommended to make sure you have the latest version of the CF-CLI installed. More information here: https://codefresh-io.github.io/cli/installation/.
  * From the configuration performed in `dockerDaemonScheduler.defaultDindResources` field it can be inferred that is possible to set `requests<limits`. While possible, it is **not recommended**. This will lead your nodes to be overcommitted, thus, your builds could eventually suffer from throttling, or just fail due to lack of resources. Having Guaranteed QoS (`requests==limits`) for the pod for your build is the recommended configuration.

