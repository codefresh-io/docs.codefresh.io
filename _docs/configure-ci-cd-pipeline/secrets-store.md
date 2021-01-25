---
title: "Using secrets"
description: "Use Kubernetes secrets in Codefresh"
group: configure-ci-cd-pipeline
toc: true
---

Once you have [connected Codefresh to your secrets storage]({{site.baseurl}}/docs/integrations/secret-storage/), you can use them in any pipeline or GUI screen.

> Note: This feature is for Enterprise accounts only.

## Using secrets in pipelines

The syntax for using the secret is {% raw %}`${{secrets.NAME_IN_CODEFRESH.KEY}}`{% endraw %}.

> Note that if you did not include the resource-name as a part of your secret store context creation, the syntax for using your secret differs slightly:
The syntax is: {% raw %}${{secrets.NAME_IN_CODEFRESH.RESOURCE-NAME@KEY}}{% endraw %} The previous KEY portion is now made of two parts separated using @, where the left side is the name of the resource in the namespace, and the right side the key in that resource.

To use the secret in your pipeline, you have two options:

Define it as a pipeline variable:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/secrets/secrets-pipeline-var.png" 
url="/images/pipeline/secrets/secrets-pipeline-var.png"
alt="Secrets Pipeline Variable" 
caption="Secrets stored in Pipeline Variable" 
max-width="80%" 
%}

`codefresh.yaml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  step:
    type: freestyle
    arguments:
      image: alpine
      commands:
        - echo $SECRET
{% endraw %}
{% endhighlight %}

Or use it directly in your yaml

`codefresh.yaml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  step:
    type: freestyle
    arguments:
      image: alpine
      environment:
        - SECRET=${{secrets.test.key1}}
      commands:
        - echo $SECRET
{% endraw %}
{% endhighlight %}


## What to Read Next

* [Shared Configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/)
* [Git triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/)
* [Running pipelines locally]({{site.baseurl}}/docs/configure-ci-cd-pipeline/running-pipelines-locally/)
* [Debugging Pipelines]({{site.baseurl}}/docs//yaml-examples/examples/trigger-a-k8s-deployment-from-docker-registry/)

