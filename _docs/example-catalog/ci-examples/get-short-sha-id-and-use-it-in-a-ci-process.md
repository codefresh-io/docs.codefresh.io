---
title: "Use Git Hash in CI"
description: "Get short SHA ID and use it in a CI Process"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/how-to-guides/
  - /docs/how-get-first-8-digits-of-sha/
toc: true
old_url: /docs/how-get-first-8-digits-of-sha
---

## Get the short SHA ID
Add the following variable to your script:

{% highlight text %}
{% raw %}
${{CF_SHORT_REVISION}} 
{% endraw %}
{% endhighlight %}


## Use the SHA ID in a tag


{% highlight text %}
{% raw %}
tag: ${{CF_SHORT_REVISION}} 
{% endraw %}
{% endhighlight %}


## YAML example

{% highlight yaml %}
{% raw %}
step-name:
  type: build
  description: Free text description
  working-directory: ${{clone-step-name}}
  dockerfile: path/to/Dockerfile
  image-name: owner/new-image-name
  tag: ${{CF_SHORT_REVISION}}
  build-arguments:
    - key=value
  fail-fast: false 
{% endraw %}
{% endhighlight %}

## Result in [hub.docker](https://hub.docker.com){:target="_blank"}

{% include image.html 
lightbox="true" 
file="/images/examples/git/sha-id-docker-hub.png" 
url="/images/examples/git/sha-id-docker-hub.png"
alt="SHA ID in Docker Hub"
caption="SHA ID in Docker Hub"
max-width="60%"
%}

## Result in Codefresh

{% include image.html 
lightbox="true" 
file="/images/examples/git/sha-id-codefresh.png" 
url="/images/examples/git/sha-id-codefresh.png"
caption="SHA ID in Codefresh"
alt="SHA ID in Codefresh"
max-width="60%"
%}


## Related articles 
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)    
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  