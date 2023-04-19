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

# How-to: Add a direct link to the Parent build from a Child build

#

## Overview

The Parent-Child approach is a common pattern when defining your CI/CD
processes. It's possible to implement that model in Codefresh when using the
`codefresh-run` plugin ([link](https://codefresh.io/steps/step/codefresh-
run)).

Given the popularity of this pattern, it's also common having to navigate from
the Parent-build to its Child-build. This functionality is natively provided
by the platform.

But, currently, it's not possible to easily navigate from the Child-build to
its parent.

In this article we'll provide a solution for that scenario.

## Details

Every build that is executed by a call to a `codefresh-run` plugin is enriched
with a special annotation that precisely identifies its parent.

The name of this annotation is `cf_predecessor`. We can query the value of
this annotation in the Child-build, and using that information we can know its
parent. Specifically, it's possible to get the ID of the Parent-build.

With that information, it's also possible to build a link to the Parent-build
by constructing the corresponding build-URL.

### Implementation

Since all the information can be inferred from the Child-build itself, there's
nothing to add or modify in the Parent-build.

You'll need to simply add this step to the Child-build. For example, at the
beginning of the pipeline:

    
    
    steps:
      ...
      linkToParentBuild:
        image: codefresh/cli
        commands:
          - export parentBuildId=$(codefresh get annotation build ${{CF_BUILD_ID}} cf_predecessor -o json | jq -r '.value')
          - cf_export linkToParentBuild_CF_OUTPUT_URL="${{CF_URL}}/build/${parentBuildId}"
      ...
    

![Link to Parent-
build](https://support.codefresh.io/hc/article_attachments/360024616939/how-
to-navigate-to-parent-build-from-child-build.png)

> Note:
>
> For the in-step-link to work, the name of the `cf_export`ed variable must
> follow this pattern: `<name|key_of_step>_CF_OUTPUT_URL`, and its value
> should be the URL to link to.

## Related Items

  * [Codefresh Run plugin](https://codefresh.io/steps/step/codefresh-run)
  * [Annotations in Codefresh](https://codefresh.io/docs/docs/codefresh-yaml/annotations/)

