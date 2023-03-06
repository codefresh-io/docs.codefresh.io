---
title: "Deploy to Docker SWARM"
description: "Deploy to Docker Swarm with Codefresh"
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/yaml-examples/examples/docker-swarm/
  - /docs/docker-swarm/
  - /docs/deploy-to-docker-swarm/
  - /docs/deploy-your-containers/docker-swarm/
  - /v1.0/docs/docker-swarm/
toc: true
---

Codefresh can easily deploy your application to [Docker Swarm](https://docs.docker.com/engine/swarm/){:target="\_blank"} using [Codefresh pipelines]({{site.baseurl}}/docs/pipelines/pipelines/).

You will need to provide:

1. The `docker-stack.yml` that contains the definition of the application
1. The host where your Docker Swarm is running
1. An SSH key that Codefresh can use to access remotely the Docker Swarm host
1. The stack name that will be used once the application is deployed

All this information will be passed to the pipeline in the form of build parameters.


## Example application

For an example Docker Swarm application, see [https://github.com/codefreshdemo/example-voting-app](https://github.com/codefreshdemo/example-voting-app){:target="\_blank"}

To launch it locally you need to download [Docker](https://www.docker.com/products/overview){:target="\_blank"}.  
If you are on Mac or Windows, [Docker Compose](https://docs.docker.com/compose){:target="\_blank"} is automatically installed.  
On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/){:target="\_blank"}.


Run in this root directory:

{% highlight bash %}
{% raw %}

docker-compose up

{% endraw %}
{% endhighlight %}

The app runs at `http://localhost:5000`, and the results are at `http://localhost:5001`.

Alternately, if you want to run it on a Docker Swarm, first make sure you have a Swarm.  
If you don't, run:

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

First you need to set up the following environment variables in your Codefresh pipeline:

{: .table .table-bordered .table-hover}
| `RDOCKER_HOST`       | remote Docker Swarm master machine, accessible over SSH (for example, ubuntu@ec2-public-ip)                    |
| `STACK_NAME`         | is new Docker stack name (use \"vote\", for example)                                                           |
| `SSH_KEY`            | private SSH key, used to access Docker Swarm master machine                                                    |
| `SPLIT_CHAR`         | split character, you've used to replace `newline` in SSH key. Recommendation: use `,` (`comma` character).     |

The `SSH_KEY` variable has the contents of the [SSH key](https://www.ssh.com/ssh/public-key-authentication){:target="\_blank"} that can access the Docker Swarm host. Currently, in order to pass SSH key through Codefresh UI, you need to convert it to single line string (replacing `newline` with `comma`), like this:

{% highlight bash %}
{% raw %}
SSH_KEY=$(cat ~/.ssh/my_ssh_key_file | tr '\n' ',')
{% endraw %}
{% endhighlight %}

The `SPLIT_CHAR` variable should hold the replacement character that was used for the SSH key (in the example above it is the comma character)

{% include image.html 
lightbox="true" 
file="/images/examples/docker-swarm/codefresh_env_vars.png" 
url="/images/examples/docker-swarm/codefresh_env_vars.png"
alt="Docker Swarm build parameters"
caption="Docker Swarm build parameters"
max-width="70%"
%}


## Deploy to Docker Swarm with a YAML step

Once you have defined all the variables, deploy to your cluster using the following [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).

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
      - rdocker ${{RDOCKER_HOST}} docker login ${{MY_REGISTRY}} -u ${{MY_REGISTRY_USER}} -p ${{MY_REGISTRY_PASSWORD}} \&\& docker stack deploy --compose-file docker-compose.yml --with-registry-auth ${{STACK_NAME}}
    environment:
      - SSH_KEY=${{SSH_KEY}}
    when:
      branch:
        only:
          - master
{% endraw %}
{% endhighlight %}



## Create a CI/CD pipeine for Docker Swarm

Here is the complete pipeline:

{% include 
image.html 
lightbox="true" 
file="/images/examples/docker-swarm/docker-swarm-pipeline.png" 
url="/images/examples/docker-swarm/docker-swarm-pipeline.png"
alt="Docker Swarm pipeline" 
caption="Docker Swarm pipeline"
max-width="100%"
%}

And here is the pipeline definition:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare   
  - build
  - deploy
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefreshdemo/example-voting-app'
    revision: master
    git: github-1    
  MyResultDockerImage:
    title: Building Result Docker Image
    stage: build
    type: build
    image_name: resultApp
    working_directory: ./result/
    tag: master
    dockerfile: Dockerfile  
  MyVoteDockerImage:
    title: Building Vote Docker Image
    stage: build
    type: build
    image_name: voteApp
    working_directory: ./vote/
    tag: master
    dockerfile: Dockerfile  
  MyWorkerDockerImage:
    title: Building Worker Docker Image
    stage: build
    type: build
    image_name: workedApp
    working_directory: ./worker/
    tag: master
    dockerfile: Dockerfile 
  DeployToSwarmNow:
    image: codefresh/remote-docker
    working_directory: ${{main_clone}}
    stage: deploy
    commands:
      - rdocker ${{RDOCKER_HOST}} docker login ${{MY_REGISTRY}} -u ${{MY_REGISTRY_USER}} -p ${{MY_REGISTRY_PASSWORD}} \&\& docker stack deploy --compose-file docker-compose.yml --with-registry-auth ${{STACK_NAME}}
    environment:
      - SSH_KEY=${{SSH_KEY}}
{% endraw %}
{% endhighlight %}

The values of `MY_REGISTRY`, `MY_REGISTRY_USER` and `MY_REGISTRY_PASSWORD` depend upon the type of [your connected registry]({{site.baseurl}}/docs/integrations/docker-registries/).

## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  

