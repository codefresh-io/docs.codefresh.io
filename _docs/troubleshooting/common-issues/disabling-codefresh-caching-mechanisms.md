---
title: "Disabling codefresh caching mechanisms"
description: ""
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/
  - /docs/disabling-codefresh-caching-mechanisms/
toc: true
---

Docker builds can be optimized by caching images and layers used during the build. Codefresh facilitates two kinds of caches:

1. Docker engine (local) cache: building images that reuse layers or are based on images that already exists will benefit from the docker engine cache fulfilling those dependencies immediately (just like when building on your local workstation). Codefresh takes care of persisting the docker cache and making it available for the current pipeline execution environment.
2. Last build cache: Codefresh will intelligently pull the last image successfully built and will use that when building the image using Docker's `--cache-from` build option. This optimization reduces build times for most scenarios.

You can choose to opt out of each cache mechanism, both at the step definition level, or temporarily at the build execution level.

### Disabling temporarily for the current build execution

In the Build execution dialog, click on the "Advanced Options" button, under "More Options", select "Ignore Codefresh cache optimizations for build" or "Ignore Docker engine cache for build".


{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/cache-options.png" 
url="/images/troubleshooting/cache-options.png"
alt="Cache options for a pipeline build" 
caption="Cache options for a pipeline build"
max-width="50%"
%}

Notice that these selections only affect the *specific* build that is launched from this dialog.
Any subsequent/automated builds will still use the default caching behavior.

### Disabling consistently at the build definition

In the build step YAML, set `no_cache: true` to disable docker local cache, and `no_cf_cache: true` to disable codefresh's additional optimizations such as `--cache-from`.

## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)