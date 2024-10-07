---
title: "How To: Add a new AWS EKS cluster to Codefresh programmatically"
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



This article describes how to add a new cluster created in a pipeline to Codefresh programmatically.

## How to

1. Create a variable for the cluster name, such as `$K8S_NAME`.
2. After the cluster is created, run the following API call, replacing all placeholders with your values or variables:

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

{{site.data.callout.callout_tip}}
See the detailed [EKS workflow](https://github.com/codefresh-io/eks-installer).
{{site.data.callout.end}}

## Related articles
[API documentation - clusters](https://g.codefresh.io/api/#tag/Clusters)  
