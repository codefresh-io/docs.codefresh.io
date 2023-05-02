---
title: "How To: Adding a new AWS EKS cluster to Codefresh programmatically"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines, API]
support-reviewed: 2023-04-18 LG
---

## Overview

As part of your pipeline, you create a new cluster and want to add it to Codefresh

## Details

1. Note the name of the cluster in a variable, such as `$K8S_NAME`.
2. After the cluster is created, run the following API call, replacing all with your values or variables:

{% raw %}

```yaml

add_new_cluster:
    image: <your-image>
    commands:
        - curl -s --fail \
            -H "Authorization: <CF_API_KEY>" \
            -H "content-type: application/json;charset=UTF-8" \
            -d \
            "{
                \"type\": \"sat\",
                \"selector\": \"<K8S_NAME>\",
                \"host\": \"<K8S_HOST>\",
                \"clientCa\": \"<K8S_CA>\",
                \"serviceAccountToken\": \<$K8S_TOKEN\>,
                \"provider\": \"local\",
                \"providerAgent\": \"eks\"
            }" \
            "$CF_API_HOST/api/clusters/local/cluster"
```

{% endraw %}

>_**Note**:_ A more detailed [EKS workflow can be foundhere](https://github.com/codefresh-io/eks-installer).

## Related Items

* [EKS Installer](https://github.com/codefresh-io/eks-installer)
* [API documentation - clusters](https://g.codefresh.io/api/#tag/Clusters)
