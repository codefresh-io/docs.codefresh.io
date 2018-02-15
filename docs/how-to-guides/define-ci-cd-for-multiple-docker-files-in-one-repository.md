---
layout: docs
title: "Define CI/CD for Multiple Docker files in one repository"
description: ""
group: how-to-guides
redirect_from:
  - /docs/how-to-define-pipeline-for-multiple-micro-services-are-located-in-one-repo
  - /docs/how-to-define-pipeline-for-multiple-micro-services-are-located-in-one-repo
toc: true
old_url: /docs/how-to-define-pipeline-for-multiple-micro-services-are-located-in-one-repo
---
You can define CI/CD for multiple micro-services (Docker files) in a single repository by using the [```codefresh.yml``` file](https://docs.codefresh.io/v1.0/docs/what-is-the-codefresh-yaml) or the Codefresh UI.

## YAML file

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'

steps:

    build-step1:
        type: build
        image-name: yourname/step1
        dockerfile: path/to/Dockerfile1
        tag: ${{CF_BRANCH}}

    build-step2:
        type: build
        image-name: yourname/step2
        dockerfile: path/to/Dockerfile2
        tag: ${{CF_BRANCH}}
{% endraw %}
{% endhighlight %}

## Codefresh UI
Follow these steps to define CI/CD for multiple micro-services located in a single repository, using the Codefresh UI.

{:start="1"}
1. On your service profile, click the gear icon.

{% include image.html 
lightbox="true" 
file="/images/59ad2ea-2016-10-12_17-24-27.png" 
url="/images/59ad2ea-2016-10-12_17-24-27.png"
alt="2016-10-12_17-24-27.png"
max-width="40%"
%}

{:start="2"}
2. Click the **Add** button.

{% include image.html 
lightbox="true" 
file="/images/c8d60f9-2016-10-12_17-28-55.png" 
url="/images/c8d60f9-2016-10-12_17-28-55.png"
alt="2016-10-12_17-28-55.png"
max-width="40%"
%}

{:start="3"}
3. In the **Build and Unit Test** section, configure the pipeline settings.

{% include image.html 
lightbox="true" 
file="/images/176270d-2016-10-12_17-36-32.png" 
url="/images/176270d-2016-10-12_17-36-32.png"
alt="2016-10-12_17-36-32.png"
max-width="40%"
%}
