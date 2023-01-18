---
title: "Multiline variable gets truncated with cf_export"
description: "Exporting multiline variables to subsequent pipeline steps"
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/troubleshooting/common-issues/cf-export-limitations/
toc: true
---




## Issue 
Exporting a multi-line variable with `cf_export` within a pipeline truncates the variable.  

Running the pipeline in the example below, in the step `test` the value of the variable is truncated and only `line1` will appear.

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

Every Codefresh pipeline has access to the  that allows you to pass [environment variables]({{site.baseurl}}/docs/codefresh-yaml/variables/) from [one step to the next].

## Solution

Encode the variable with `base64` to handle all special characters in the exported variable.

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



## Related articles
[cf_export utility in pipelines]({{site.baseurl}}/docs/pipelines/variables/#using-cf_export-command)  
[Passing variables between steps]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#using-docker-containers-as-build-tooling)  
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)





