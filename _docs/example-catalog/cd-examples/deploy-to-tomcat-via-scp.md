---
title: "Deploy to a VM via SCP"
description: "Deploy your application to Tomcat using SCP"
group: example-catalog
sub_group: cd-examples
toc: true
---

## Prerequisites

- A [Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account)
- A distribution of [Tomcat](https://tomcat.apache.org/download-90.cgi){:target="\_blank"} setup on a remote server (running with port 8080 exposed)

## The example Java Application

You can find the example project on [GitHub](https://github.com/codefresh-contrib/scp-war-app){:target="\_blank"}.

The example application is a simple Hello World Java application using the [Spark Java framework](http://sparkjava.com/){:target="\_blank"}:

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/scp-hello-world.png" 
url="/images/examples/deployments/scp-hello-world.png" 
alt="Hello World!"
caption="Hello World!"
max-width="100%" 
%}


```java
	@Override
	public void init() {
		get("/hello", (req, res) -> "Hello World");
	}
```

## Create the pipeline

Our pipeline has three stages: clone, package, and transfer.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/scp-pipeline.png" 
url="/images/examples/deployments/scp-pipeline.png" 
alt="SCP pipeline"
caption="Codefresh UI Pipeline View"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line editor of the Codefresh UI.  It will automatically clone the project for you.

Note that you need to change the environment variables under the `transfer` step to your respective values.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
# More examples of Codefresh YAML can be found at
# https://codefresh.io/docs/docs/example-catalog/example

version: "1.0"
# Stages can help you organize your steps in stages
stages:
  - "clone"
  - "package"
  - "transfer"

steps:
  clone:
    title: "Cloning repository..."
    type: "git-clone"
    stage: "clone"
    arguments:
      repo: "codefresh-contrib/scp-war-app"
      
  package:
    title: "Packaging war..."
    type: "freestyle"
    stage: "package"
    arguments:
      image: "maven:3.5.2-jdk-8-alpine"
      working_directory: "${{clone}}"
      commands:
        - "mvn -Dmaven.repo.local=/codefresh/volume/m2_repository clean package"

  transfer:
    title: "Transferring war to Tomcat..."
    type: "freestyle"
    stage: "transfer"
    arguments:
        image: "ictu/sshpass:latest"
        working_directory: "${{package}}/target"
        environment:
          - USER=<USER>
          - HOST=<HOST.IP.ADDRESS>
          - PASSWORD=<PASSWORD>
          - TOMCAT_DIR=<path/to/tomcat/webapps>
        commands:
          - "echo | ssh-keygen -P '' -t rsa"
          - "sshpass -p $PASSWORD ssh-copy-id -i /root/.ssh/id_rsa.pub -o StrictHostKeyChecking=no $USER@$HOST"
          - "scp sparkjava-hello-world-1.0.war $USER@$HOST:$TOMCAT_DIR"
{% endraw %}
{% endhighlight %}

The above pipeline does the following:

1. Clones the main repository through the [git-clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
2. Installs the dependencies via Maven and packages our `war` file through a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).
3. Transfers our application via scp to a Tomcat server through another freestyle step.  

Note that you will need to change the listed environment variables accordingly, either through the YAML itself, or through your pipeline settings:

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/scp-variables.png" 
url="/images/examples/deployments/scp-variables.png" 
alt="Pipeline variables"
caption="Pipeline variables"
max-width="100%" 
%}
  
## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)
