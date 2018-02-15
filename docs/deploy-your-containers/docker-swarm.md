---
layout: docs
title: "Docker SWARM"
description: ""
group: deploy-your-containers
redirect_from:
  - /docs/docker-swarm
toc: true
---

## Getting Started

Download [Docker](https://www.docker.com/products/overview). If you are on Mac or Windows, [Docker Compose](https://docs.docker.com/compose) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).

{{site.data.callout.callout_info}}
##### Try this example

{% raw %}
Just head over to the example [__repository__](https://github.com/codefreshdemo/example-voting-app){:target="_blank"} in Github.
{% endraw %}
{{site.data.callout.end}}


Run in this directory:

{% highlight bash %}
{% raw %}

docker-compose up

{% endraw %}
{% endhighlight %}

The app will be running at [http://localhost:5000](http://localhost:5000), and the results will be at [http://localhost:5001](http://localhost:5001).

Alternately, if you want to run it on a [Docker Swarm](https://docs.docker.com/engine/swarm/), first make sure you have a swarm. If you don't, run:

{% highlight bash %}
{% raw %}

docker swarm init

{% endraw %}
{% endhighlight %}

Once you have your swarm, in this directory run:

{% highlight bash %}
{% raw %}

docker stack deploy --compose-file docker-stack.yml vote

{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_warning}}
The swarm master must have Python installed.
{{site.data.callout.end}}

## Deploy to Remote Swarm with codefresh.yml

  `codefresh.yml`
{% highlight yaml %}
{% raw %}

deploy_to_swarm:
    image: codefresh/remote-docker
    working_directory: ${{main_clone}}
    commands:
      - rdocker ${{RDOCKER_HOST}} docker stack deploy --compose-file docker-stack.yml ${{STACK_NAME}}
    environment:
      - SSH_KEY=${{SSH_KEY}}
    when:
      branch:
        only:
          - master

{% endraw %}
{% endhighlight %}

{: .table .table-bordered .table-hover}
| `RDOCKER_HOST`       | remote Docker swarm master machine, accessible over SSH (for example, ubuntu@ec2-public-ip)                    |
| `STACK_NAME`         | is new Docker stack name (use \"vote\", for example)                                                           |
| `SSH_KEY`            | private SSH key, used to access Docker swarm master machine                                                    |
| `SPLIT_CHAR`         | split character, you've used to replace `newline` in SSH key. Recommendation: use `,` (`comma` character).     |


{{site.data.callout.callout_warning}}
##### Passing SSH key through ENV variable

Currently in order to pass SSH key through Codefresh UI, you need to convert it to single line string (replacing `newline` with `comma`), like this:

{% highlight bash %}
{% raw %}
SSH_KEY=$(cat ~/.ssh/my_ssh_key_file | tr '\n' ',')
{% endraw %}
{% endhighlight %}

{{site.data.callout.end}}

## Deploy to Remote Swarm using the pipeline's UI deploy step

{:start="1"}
1. Select **Codefresh's Deploy Images** in the pipeline's and select `codefresh/remote-docker:latest`.

{:start="2"}
2. As a deploy command use <br>
   {% raw %}`rdocker ${{RDOCKER_HOST}} docker stack deploy --compose-file docker-stack.yml ${{STACK_NAME}}`{% endraw %}.

{:start="3"}
3.  Make sure you define the following variables in the pipeline as defined in the previous part:
     * `STACK_NAME`
     * `RDOCKER_HOST` 
     * `SSH_KEY`
     * `SPLIT_CHAR`

{% include 
image.html 
lightbox="true" 
file="/images/0a66a41-image3.png" 
url="/images/0a66a41-image3.png"
alt="image3.png" 
max-width="40%"
%}
     

**Notice:** The UI deploy step will run on any build. Make sure that your automated builds run only on a specific branch trigger.

{{site.data.callout.callout_warning}}
##### Syntax for environment variables

Remote Docker Swarm (sometimes called \"Docker Stack\") requires a specific syntax for passing variables from Codefresh:

{% highlight yaml %}
{% raw %}
SOME_VAR: ${SOME_VAR}
{% endraw %}
{% endhighlight %}

{{site.data.callout.end}}
