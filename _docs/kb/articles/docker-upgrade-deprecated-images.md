---
title: Upgrade Docker images
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2025-04-07 ZT
---

This article describes how to upgrade deprecated Docker image formats and manifests to the latest supported versions.

Docker issued a deprecation notice for older versions of images:
{{site.data.callout.callout_tip}}
**[DEPRECATION NOTICE]** Docker Image Format v1 and Docker Image manifest version 2, schema 1 support is disabled by default and will be removed in an upcoming release. Suggest the author of <image-name> to upgrade the image to the OCI Format or Docker Image manifest v2, schema 2. More information at https://docs.docker.com/go/deprecated-image-specs/
{{site.data.callout.end}}

If you see this deprecation notice in the logs of your pipeline builds, you must upgrade older versions of image formats and manifests to the new versions as required.

For more information, see Docker's offical article on [Pushing and pulling with image manifest v2 schema 1](https://docs.docker.com/engine/deprecated/#pushing-and-pulling-with-image-manifest-v2-schema-1){:target="\_blank"}.




## How to

Upgrading the image manifest or formats is as simple as pulling the image via modern Docker and pushing it back to the registry.

* Use the following step in your Codefresh pipelines:

```yaml
version: "1.0"

steps:
  push:
    title: "Re-pushing deprecated image"
    type: push
    candidate: <source-image-name>
    registry: <desired-registry>
    tag: <target-image-tag>
    image_name: <target-image-name>
    
#   Example:
#   push:
#     title: "Re-pushing deprecated image"
#     type: push
#     candidate: docker/whalesay:latest
#     registry: docker
#     tag: new-manifest
#     image_name: codefresh/whalesay
```

