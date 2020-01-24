---
title: "Deployment environments"
description: "How to update the environment status from builds"
group: codefresh-yaml
toc: true
---

Codefresh includes an environment dashboard that can be used to monitor your applications and the builds associated with them.

{% include
image.html
lightbox="true"
file="/images/codefresh-yaml/environments/environments.png"
url="/images/codefresh-yaml/environments/environments.png"
alt="Environment Dashboards"
caption="Environment Dashboards"
max-width="90%"
%}

Currently two types of environments are supported (they look identical in the UI)
 * Helm releases
 * Plain Kubernetes deployments

In any pipeline that does a deployment you can add an extra `env` property to instruct Codefresh which environment(s) is affected by that build.

The relationship between environments and builds are many to many. A single environment can be affected by different pipelines, and a single pipeline might tamper with multiple environments.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
    env:
      name: prod
      endpoints:
      - name: app
        url: https://g.codefresh.io
      type: kubernetes
      change: code update
      filters:
      - cluster: my-cluster
        namespace: default
{% endraw %}            
{% endhighlight %}

`codefresh.yml`
{% highlight yaml %}
{% raw %}
    env:
      name: stage
      endpoints:
      - name: login
        url: https://g.codefresh.io
      type: helm-release
      change: config map change
      filters:
      - cluster: cf-load@codefresh-load
        releaseName: istio
{% endraw %}            
{% endhighlight %}

## What to read next

* [Image annotations]({{site.baseurl}}/docs/docker-registries/metadata-annotations/)
* [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
