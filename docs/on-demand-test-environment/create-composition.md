---
layout: docs
title: "Create composition"
description: ""
excerpt: "Composition can be launched as part of unit test step, integration test or for running an image for manual testing. Also based on your `docker-compose.yml` automatically can be created services that were described in this file.\nBelow how to create a composition."
group: on-demand-test-environment
redirect_from:
  - /docs/create-composition
toc: true
old_url: /docs/create-composition
was_hidden: true
---

## Create a composition by using the Codefresh UI

{:start="1"}
1. Click the **Composition** view icon in the left pane, and click the **Plus** icon.

{% include 
image.html 
lightbox="true" 
file="/images/5431ec6-create-composition.png" 
url="/images/5431ec6-create-composition.png"
alt="create-composition.png" 
max-width="40%"
%}

{:start="2"}
2. In the **Name** text box, type a name for your composition.

{% include 
image.html 
lightbox="true" 
file="/images/100013e-compsition-add-new.png" 
url="/images/100013e-compsition-add-new.png"
alt="compsition-add-new.png" 
max-width="40%"
caption="click on image to enlarge"
%}

{:start="3"}
3. To add a service, click the **Add Service** button.
 
You can add existing built services, or provide the name for Docker image that will be pulled from Docker registry.

{% include 
image.html 
lightbox="true" 
file="/images/cae1d69-composition-add-service-after.png" 
url="/images/cae1d69-composition-add-service-after.png"
alt="composition-add-service-after.png" 
max-width="40%"
caption="click on image to enlarge"
%}

4. (Optional) Click the **Edit** button to edit the content based on [Docker Compose YAML ](https://docs.docker.com/compose/compose-file/).

{% include 
image.html 
lightbox="true" 
file="/images/b9d2773-composition-edit-yaml.png" 
url="/images/b9d2773-composition-edit-yaml.png"
alt="composition-edit-yaml.png" 
max-width="40%"
caption="click on image to enlarge"
%}

5. Click the **Save** icon on the upper right corner

{{site.data.callout.callout_warning}}
##### Build command is not supported in Compositions

Please note, "build" command is not supported. Images are built as part of the services pipelines at the services module. The images can then added to the compositions with the "image" attribute. 
{{site.data.callout.end}}

## Create a composition by using a Docker Compose YAML

{:start="1"}
1. Click the **Composition** view icon in the left pane, and click the **Plus** icon.

{:start="2"}
2. Toggle the **Advance** option to the on position.

{% include 
image.html 
lightbox="true" 
file="/images/9338532-compose-advance-mode.png" 
url="/images/9338532-compose-advance-mode.png"
alt="compose-advance-mode.png" 
max-width="40%"
caption="click on image to enlarge"
%}

{:start="3"}
3. Copy and paste your existing ```docker-compose.yaml``` file.

  `docker-compose.yaml`
{% highlight yaml %}
{% raw %}
# Let's Chat: Docker Compose
# https://docs.docker.com/compose/
#
# Usage: docker-compose up

app:
  image: sdelements/lets-chat:latest
  links:
    - mongo
  ports:
    - 80:8080
    - 5222:5222
  command: ls .


mongo:
  image: mongo:latest
  ports :
    - 27017:27017
{% endraw %}
{% endhighlight %}
    
{% include 
image.html 
lightbox="true" 
file="/images/182c468-docker-compose-advance-error.png" 
url="/images/182c468-docker-compose-advance-error.png"
alt="docker-compose-advance-error.png" 
max-width="40%"
caption="click on image to enlarge"
%}

{{site.data.callout.callout_danger}}
##### Yaml validation error

In this example, the error message appears because the mapping ports are enabled only on the Pro payment plan. To fix this issue, leave the port number without mapping, in this example **27017** instead of **27017:27017** 
{{site.data.callout.end}}

{:start="4"}
4. Save the composition.

{% include 
image.html 
lightbox="true" 
file="/images/cf81de2-compose-advanced-yaml-fixed.png" 
url="/images/cf81de2-compose-advanced-yaml-fixed.png"
alt="compose-advanced-yaml-fixed.png" 
max-width="40%"
caption="click on image to enlarge"
%}

## Great! You created a composition, run it!

Click the **Launch** icon.

{% include 
image.html 
lightbox="true" 
file="/images/a059835-compose-launch-button.png" 
url="/images/a059835-compose-launch-button.png"
alt="compose-launch-button.png" 
max-width="40%"
caption="click on image to enlarge"
%}

The progress log window displays, and when the launch is complete, a link for running the environment displays.

{% include 
image.html 
lightbox="true" 
file="/images/40f6b38-composition-launch-log.png" 
url="/images/40f6b38-composition-launch-log.png"
alt="composition-launch-log.png" 
max-width="40%"
caption="click on image to enlarge"
%}

