---
title: "Secure a Docker Container using HTTP Basic Auth"
description: ""
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/securing-docker-container-with-http-basic-auth/
  - /docs/on-demand-test-environment/examples-compositions/securing-docker-container-with-http-basic-auth/
  - /docs/on-demand-test-environment/example-compositions/secure-a-docker-container-using-http-basic-auth/ 
toc: true
---
Before making a product publicly available, you might want to restrict access to certain users. These are some options to accomplish this goal:

  - Implement custom authentication within the system
  - Configure the server to act as a proxy between the user and the application
  - Limit access to specific IP addresses

This article explains how to secure a container by exposing public ports, using an extra NGINX container to act as a proxy.

## Expose Web App Public Port

  `webapp`
{% highlight yaml %}
{% raw %}
version: '3'
services:
  web:  
    image: codefreshio/webapp
    ports:
      - "3000"
{% endraw %}
{% endhighlight %}

The architecture for this step is displayed in the diagram below. In this step example, Docker is forwarding an internal 3000 port to the host 80 port.

{% include 
image.html 
lightbox="true" 
file="/images/examples/docker-https/codefresh_webapp_container.png" 
url="/images/examples/docker-https/codefresh_webapp_container.png"
alt="codefresh_webapp_container.png" 
max-width="40%"
%}

## Add NGINX Proxy
To secure the web-app we are going to specify these commands in the ```docker-compose.yml``` file.

1. Remove the port that maps from the web-app (it won't be directly accessible)
2. Add an extra NGINX container with custom configuration (proxy all traffic)
3. Configure NGINX to communicate with the web-app

  `docker-compose.yml`
{% highlight yaml %}
{% raw %}
version: '3'
services:
  web:
    image: ${{build-prj}}
  auth:
    image: ${{build-nginx}}
    ports:
      - 80
    links:
      - web
    environment:
      USER: ${{USERNAME}}
      PASS: ${{PASSWORD}}
{% endraw %}
{% endhighlight %}
 
The architecture for the ```docker-compose.yml``` file is displayed in the diagram below.

{% include 
image.html 
lightbox="true" 
file="/images/examples/docker-https/codefresh_nginx_container.png" 
url="/images/examples/docker-https/codefresh_nginx_container.png"
alt="codefresh_nginx_container.png" 
max-width="40%"
%}

{{site.data.callout.callout_info}}
##### Example 

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-basic-auth-container){:target="_blank"} in GitHub and follow the instructions there.
{{site.data.callout.end}}

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)