---
title: "Publish Jar"
description: "How to upload a JAR file to Nexus or artifactory"
excerpt: ""
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/learn-by-example/java/publish-jar/
toc: true
---

Even though Codefresh has great support for containers, it can still be used for traditional JAR uploads of libraries or applications that are not dockerized yet. In this example we will compile a JAR and upload it to Nexus. The process is the same for Artifactory or any other package manager.

For a Java application with Docker, see the [Gradle]({{site.baseurl}}/docs/example-catalog/ci-examples/gradle/) or 
 [Maven example]({{site.baseurl}}/docs/example-catalog/ci-examples/spring-boot-2/).

## The example Java library project

You can see the example project at [https://github.com/codefresh-contrib/plain-jar-sample-lib](https://github.com/codefresh-contrib/plain-jar-sample-lib). The repository contains a simple Java library built with Maven with the following goals:

* `mvn package` creates a jar file of the library. It also runs unit tests.
* `mvn upload` uploads the jar to a package manager such as Nexus or Artifactory.

We use Nexus for this example. To upload the Jar manually first edit the `pom.xml` with the URL of the package manager. The project also includes a [settings.xml](https://github.com/codefresh-contrib/plain-jar-sample-lib/blob/master/settings.xml) with parameterized credential.

{% include image.html 
lightbox="true" 
file="/images/examples/java/nexus-browser.png" 
url="/images/examples/java/nexus-browser.png" 
alt="The Nexus package manager"
caption="The Nexus package manager"
max-width="80%" 
%}

From your workstation you can upload the jar manually with:


```
mvn -s settings.xml -Dserver.password=my-nexus-user -Dserver.username=my-nexus-pass deploy
```
If you then visit Nexus you should see your JAR file in the snapshots repository.

## Create a CI pipeline for publishing a JAR file

[Create a new pipeline]({{site.baseurl}}/docs/pipelines/pipelines/) in Codefresh and define as parameters your Nexus credentials. You could also use [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/) or any other credential mechanism you already use in your other pipelines.

{% include image.html 
lightbox="true" 
file="/images/examples/java/nexus-credentials.png" 
url="/images/examples/java/nexus-credentials.png" 
alt="Parameters for Nexus"
caption="Parameters for Nexus"
max-width="50%" 
%}

Then copy/paste the [Codefresh YAML file](https://github.com/codefresh-contrib/plain-jar-sample-lib/blob/master/codefresh.yml) in the pipeline editor.
Here are the full contents of the file:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/plain-jar-sample-lib'
    revision: master
    git: github
  publish_jar:
    title: Upload to nexus
    image: 'maven:3.5.2-jdk-8-alpine'
    commands:
      - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -s settings.xml -Dserver.password=${{NEXUS_PASS}} -Dserver.username=${{NEXUS_USER}}  deploy
{% endraw %}
{% endhighlight %}

The pipeline starts by checking out the code using a [git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/). The next step is  a [freestyle]({{site.baseurl}}/docs/pipelines/steps/freestyle/) one and packages the jar file. We also use the [Codefresh volume for caching]({{site.baseurl}}/docs/pipelines/pipeline-caching/#traditional-build-caching).

You can define the version of Maven/JDK you want to use by picking the appropriate image from Dockerhub, or using any of your own images (even from [external registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)).

Note the use of the two user-defined environment variables passed to `server.password` and `server.username`.  You will need to define those yourself.  See the documentation on [User Procided Variables]({{site.baseurl}}/docs/pipelines/variables/#user-provided-variables).
{% include image.html 
lightbox="true" 
file="/images/examples/java/publish-jar-pipeline.png" 
url="/images/examples/java/publish-jar-pipeline.png" 
alt="Publish JAR pipeline"
caption="Publish JAR pipeline"
max-width="100%" 
%}

Once the pipeline has finished you should see the JAR file in the Nexus browser UI.

{% include image.html 
lightbox="true" 
file="/images/examples/java/nexus-upload.png" 
url="/images/examples/java/nexus-upload.png" 
alt="Upload finished"
caption="Upload finished"
max-width="70%" 
%}

You can use the same pipeline for Artifactory or any other compliant Java package registry.


## Related articles
[Gradle example]({{site.baseurl}}/docs/example-catalog/ci-examples/gradle/)  
[Spring boot example]({{site.baseurl}}/docs/example-catalog/ci-examples/spring-boot-2/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  






