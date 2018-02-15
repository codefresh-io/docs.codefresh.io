---
layout: docs
title: "Deploy to docker swarm"
description: ""
group: how-to-guides
redirect_from:
  - /docs/deploy-to-docker-swarm
  - /docs/deploy-to-docker-swarm
toc: true
old_url: /docs/deploy-to-docker-swarm
---

## Getting Started
Download [Docker](https://www.docker.com/products/overview). If you are on Mac or Windows, [Docker Compose](https://docs.docker.com/compose) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).

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

{{site.data.callout.callout_info}}
##### Try this example

Just head over to the example [__repository__](https://github.com/codefreshdemo/example-voting-app){:target="_blank"} in Github. 
{{site.data.callout.end}}

## Deploy to Remote Swarm

  `YAML`
{% highlight yaml %}
{% raw %}
deploy_to_swarm:
    image: codefresh/remote-docker
    working_directory: ${{main_clone}}
    commands:
      - rdocker ${{RDOCKER_HOST}} docker stack deploy --compose-file docker-stack.yml ${{STACK_NAME}}
    environment:
      - SSH_KEY=${SSH_KEY}
    when:
      branch:
        only:
          - master
{% endraw %}
{% endhighlight %}

{: .table .table-bordered .table-hover}
| `RDOCKER_HOST`       | remote Docker swarm master machine, accessible over SSH (for example, ubuntu@ec2-public-ip)                |
| `STACK_NAME`         | is new Docker stack name (use "vote", for example)                                                         |
| `SSH_KEY`            | private SSH key, used to access Docker swarm master machine                                                |
| `SPLIT_CHAR`         | split character, you've used to replace `newline` in SSH key. Recommendation: use `,` (`comma` character). |


{{site.data.callout.callout_info}}
##### Passing SSH key through ENV variable

Currently in order to pass SSH key through Codefresh UI, you need to convert it to single line string (replacing `newline` with `comma`), like this:
{% highlight bash %}
{% raw %}
SSH_KEY=$(cat ~/.ssh/my_ssh_key_file | tr '\n' ',') 
{% endraw %}
{% endhighlight %}
{{site.data.callout.end}}

{% include image.html 
lightbox="true" 
file="/images/2f1884a-codefresh_env_vars.png" 
url="/images/2f1884a-codefresh_env_vars.png"
alt="codefresh_env_vars.png"
max-width="40%"
%}

{% include image.html 
lightbox="true" 
file="/images/ef6768e-codefresh_builds_result.png" 
url="/images/ef6768e-codefresh_builds_result.png"
alt="codefresh_builds_result.png"
max-width="40%"
%}
