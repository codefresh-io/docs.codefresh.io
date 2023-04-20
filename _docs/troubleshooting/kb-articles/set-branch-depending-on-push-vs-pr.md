---
title: "How-to: Set branch for build depending on whether it's a push or PR event"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

You want to run the same build for both push and PR events, but for PR events
you need to run the build on the target branch. During a PR triggered build
CF_BRANCH points to the source branch, so you can't just use the exact same
variable reference for both cases.

## Details

You can set up some freestyle steps to conditionally choose either `CF_BRANCH`
or `CF_PULL_REQUEST_TARGET`, depending on if this is a PR build or a push
build. You can either export this branch name to a third variable or overwrite
one of these existing branch variables, whichever is easier for your
implementation.

For example, this step will overwrite the value of `CF_BRANCH` with that of
`CF_PULL_REQUEST_TARGET`, if `CF_PULL_REQUEST_TARGET` exists (which would only
be the case for a PR event). Then you should be able to just continue using
`CF_BRANCH` in the rest of your build.

{% raw %}
    steps:
      set_branch:
        title: "Set branch variable"
        image: "alpine:latest"
        commands:
          - cf_export CF_BRANCH=${{CF_PULL_REQUEST_TARGET}}
        when:
          condition:
            all:
              whenPR: 'includes("${{CF_PULL_REQUEST_TARGET}}", "{{CF_PULL_REQUEST_TARGET}}") == false'
{% endraw %}

You could also do something in a similar vein to export to a third variable
instead. This example exports the branch name to a custom variable
`BUILD_BRANCH` depending on whether the current build is a PR build.

{% raw %}
    steps:
      set_push_branch:
        title: "Set branch variable for push"
        image: "alpine:latest"
        commands:
          - cf_export BUILD_BRANCH=${{CF_BRANCH}}
        when:
          condition:
            all:
              whenPR: 'includes("${{CF_PULL_REQUEST_TARGET}}", "{{CF_PULL_REQUEST_TARGET}}") == true'
      set_pr_branch:
        title: "Set branch variable for PR"
        image: "alpine:latest"
        commands:
          - cf_export BUILD_BRANCH=${{CF_PULL_REQUEST_TARGET}}
        when:
          condition:
            all:
              whenPR: 'includes("${{CF_PULL_REQUEST_TARGET}}", "{{CF_PULL_REQUEST_TARGET}}") == false'
{% endraw %}

_Notes_ This condition works because if a variable is not set, it is simply
replaced with the literal `{% raw %}${{}}{% endraw %}` variable reference string, so we are
checking whether the reference is getting us the literal string or some other
actual value.

## Related Items

[How-to: Check environment variable value or existence in
conditionals](https://support.codefresh.io/hc/en-us/articles/360015263359-How-
to-Check-environment-variable-value-or-existence-in-conditionals)
[Documentation for cf_export
command](https://codefresh.io/docs/docs/codefresh-yaml/variables/#using-
cf_export-command)
