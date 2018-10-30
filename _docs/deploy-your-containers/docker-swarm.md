---
title: "Docker SWARM"
description: "How to deploy to Docker Swarm with Codefresh"
group: deploy-your-containers
redirect_from:
  - /docs/docker-swarm/
  - /docs/deploy-to-docker-swarm/
toc: true
---

Codefresh can easily deploy your application to [Docker Swarm](https://docs.docker.com/engine/swarm/) using either [GUI or YAML]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/pipelines/)  pipelines.

You will need to provide

1. The `docker-stack.yml` that contains the definition of the application
1. The host where your Docker Swarm is running
1. An SSH key that Codefresh can use to access remotely the Docker Swarm host
1. The stack name that will be used once the application is deployed.

All this information will be passed to the pipeline in the form of build parameters.


## Example application

An example Docker Swarm application can be found at [https://github.com/codefreshdemo/example-voting-app](https://github.com/codefreshdemo/example-voting-app)

To launch it locally you need to download [Docker](https://www.docker.com/products/overview). If you are on Mac or Windows, [Docker Compose](https://docs.docker.com/compose) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).


Run in this root directory:

{% highlight bash %}
{% raw %}

docker-compose up

{% endraw %}
{% endhighlight %}

The app will be running at [http://localhost:5000](http://localhost:5000), and the results will be at [http://localhost:5001](http://localhost:5001).

Alternately, if you want to run it on a Docker Swarm, first make sure you have a swarm. If you don't, run:

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

## Deploy to Remote Swarm with Codefresh

First you need to setup the following environment variables in your Codefresh pipeline

{: .table .table-bordered .table-hover}
| `RDOCKER_HOST`       | remote Docker swarm master machine, accessible over SSH (for example, ubuntu@ec2-public-ip)                    |
| `STACK_NAME`         | is new Docker stack name (use \"vote\", for example)                                                           |
| `SSH_KEY`            | private SSH key, used to access Docker swarm master machine                                                    |
| `SPLIT_CHAR`         | split character, you've used to replace `newline` in SSH key. Recommendation: use `,` (`comma` character).     |

The `SSH_KEY` variable has the contents of the [SSH key](https://www.ssh.com/ssh/public-key-authentication) that can access the Docker swarm host. Currently in order to pass SSH key through Codefresh UI, you need to convert it to single line string (replacing `newline` with `comma`), like this:

{% highlight bash %}
{% raw %}
SSH_KEY=$(cat ~/.ssh/my_ssh_key_file | tr '\n' ',')
{% endraw %}
{% endhighlight %}

The `SPLIT_CHAR` variable should hold the replacement character that was used for the SSH key (in the example above it is the comma character)

{% include image.html 
lightbox="true" 
file="/images/2f1884a-codefresh_env_vars.png" 
url="/images/2f1884a-codefresh_env_vars.png"
alt="Docker Swarm build parameters"
caption="Docker Swarm build parameters"
max-width="70%"
%}


### Deploy to Docker Swarm with a YML step

Once all the variables are set you can use the following [freestyle step]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/) to deploy to your cluster.

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

You can also pass custom credentials like this:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}

deploy_to_swarm:
    image: codefresh/remote-docker
    working_directory: ${{main_clone}}
    commands:
      - rdocker ${{RDOCKER_HOST}} docker login ${{CFCR_REGISTRY}} -u ${{CF_USER_NAME}} -p ${{CFCR_PASSWORD}} \&\& docker stack deploy --compose-file docker-compose.yml --with-registry-auth ${{STACK_NAME}}
    environment:
      - SSH_KEY=${{SSH_KEY}}
    when:
      branch:
        only:
          - master
{% endraw %}
{% endhighlight %}






### Deploy to Docker Swarm using the pipeline's UI deploy step

You can also use the [GUI pipeline]({{ site.baseurl }}/docs/getting-started/create-a-basic-pipeline/) within Codefresh to deploy to Docker swarm.


1. Select **Codefresh's Deploy Images** in the pipeline's and select `codefresh/remote-docker:latest`.
1. As a deploy command use <br>
   {% raw %}`rdocker ${{RDOCKER_HOST}} docker stack deploy --compose-file docker-stack.yml ${{STACK_NAME}}`{% endraw %}.


{% include 
image.html 
lightbox="true" 
file="/images/0a66a41-image3.png" 
url="/images/0a66a41-image3.png"
alt="image3.png" 
caption="GUI Deploy Step"
max-width="70%"
%}
     

**Notice:** The UI deploy step will run on any build. Make sure that your automated builds run only on a specific branch trigger.


