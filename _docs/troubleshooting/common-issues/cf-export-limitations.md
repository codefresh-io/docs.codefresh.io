---
title: "Multi-line variable gets truncated with cf_export"
description: "Exporting multi line variables to subsequent pipeline steps"
group: troubleshooting
sub_group: common-issues
toc: true
---

Every Codefresh pipeline has access to the [cf_export utility]({{site.baseurl}}/docs/codefresh-yaml/variables/#using-cf_export-command) that allows you to pass [environment variables]({{site.baseurl}}/docs/codefresh-yaml/variables/) from [one step to the next]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#using-docker-containers-as-build-tooling).

## Problem description

You have a pipeline that is trying to export a multi-line variable with `cf_export`

{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  assign:
    image: alpine
    commands:
      - export TEST=`echo "line1" && echo "line2" && echo "line3"`
      - echo $TEST
      - cf_export TEST
  test:
    image: alpine
    commands:
      - echo $TEST
{% endraw %}
{% endhighlight %}

If you run this pipeline then in the step `test` the value of the variable is truncated and only `line1` will appear.

## The solution

You can use a workaround by encoding the variable with `base64` first. This will handle all strange characters in the exported variable.

{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  assign:
    image: alpine
    commands:
      - apk add --update coreutils
      - export TEST=`echo "line1" && echo "line2" && echo "line3"`
      - echo $TEST
      - cf_export TEST=`echo $TEST | base64 -w 0`
  test:
    image: alpine
    commands:
      - echo $TEST
      - echo `echo $TEST | base64 -d`
{% endraw %}
{% endhighlight %}

If you run this pipeline, the `test` step will correctly print `line1 line2 line3`









