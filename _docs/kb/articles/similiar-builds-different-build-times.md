---
title: Similar builds have different build times
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

Multiple builds that are similar take different amounts of time to run.

## Details

Different builds may have different caches. Initial builds may not have images or repository files cached. Cache miss may also happen in subsequent builds if the cache has been cleaned up since the previous build, or a specific volume containing the relevant cache data is not available to the build. The latter most frequently occurs if you are running many builds in parallel.

* If it is the first build of this pipeline, a second build may improve performance.
* If you have changed the image, it may not be cached.
* If you believe that your cache has become corrupt or is otherwise slowing your builds down, consider resetting them in a manual build.
  1. Open your pipeline
  2. Click Run
  3. Expand Advanced Options
  4. Select the options to ignore Docker engine cache and Codefresh cache optimizations
  5. Run the build

## Related Items

[Pipeline Caching]({{site.baseurl}}/docs/pipelines/pipeline-caching/)

[Disabling caching mechanisms]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/)

[About reuseVolumeSelector options]({{site.baseurl}}/docs/kb/articles/about-reusevolumeselector-options/)
