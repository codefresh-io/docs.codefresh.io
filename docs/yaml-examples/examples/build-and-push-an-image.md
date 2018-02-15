---
layout: docs
title: "Build and Push an Image"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/build-and-push-an-image
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: *building Docker images* and *pushing*.

This project uses `Node JS` to build an application which will eventually become a distributable Docker image.

## Looking around
In the root of this repository you'll find a file named `codefresh.yml`, this is our [build descriptor]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) and it describes the different steps that comprise our process.

In this example, the **push-the-image** step references the image built by the **build-the-image** step, using the ```candidate``` attribute.
Make sure to configure your account’s Docker registry details and credentials before you execute a push.

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'

steps:

  build_image:
    title: Building Voting Image
    type: build
    #Important: rename this image to to a valid repository in your registry. For example: myUserName/vote
    image_name: codefresh/vote
    #The directory should be relative to git repository that is used for cloning
    working_directory: {% raw %}${{main_clone}}{% endraw %}
    #Dockerfile location should be relative to the working directory
    dockerfile: Dockerfile

  push_to_registry:
    title: Pushing to Docker Registry (with credentials)
    type: push

    #A candidate is the image that we want to push to registry
    candidate: {% raw %}'${{build_image}}'{% endraw %}

    # You can push the image with whatever tag you want. In our example we use CF_BRANCH, which is a variable in
    # the build process, accessible throughout the entire flow.
    tag: {% raw %}'${{CF_BRANCH}}'{% endraw %}

    #uncomment the registry and add your own registry if you want to use any registry other than dockerhub. See docs.codefresh.io for more information
    #registry:
    credentials:
      #make sure that you have a dockerUsername and dockerPassword define on the pipeline.
      username: {% raw %}'${{dockerUsername}}'{% endraw %}
      password: {% raw %}'${{dockerPassword}}'{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-build-and-push){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}

For more information about the fields for the **push-the-image** step, [see]({{ site.baseurl }}/docs/codefresh-yaml/steps/push-1/).

{{site.data.callout.callout_info}}
##### Push to Dockerhub

If you want to push your image to Dockerhub, change the ```myuser``` field for your ```image-name``` on your name of Dockerhub account. 
{{site.data.callout.end}}

{{site.data.callout.callout_info}}
##### Docker registries

You can integrate with other [docker registries]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/) .
If you want to push your image to Dockerhub, change the ```myuser``` field for your ```image-name``` on your name of Dockerhub account. 
{{site.data.callout.end}}

After adding this repository as new service to codefresh, go to pipelines of this service and provide your dockerhub credentials as environment variables.

{% include image.html 
lightbox="true" 
file="/images/dd06fa9-codefresh_push_credentials.png" 
url="/images/dd06fa9-codefresh_push_credentials.png" 
alt="codefresh_push_credentials.png" 
max-width="40%" 
%}

If your credentials are correct you can see that the created image was pushed to your dockerhub account

{% include image.html 
lightbox="true" 
file="/images/ae0409d-codefresh_push_dockerhub.png" 
url="/images/ae0409d-codefresh_push_dockerhub.png" 
alt="codefresh_push_credentials.png" 
max-width="40%" 
%}
