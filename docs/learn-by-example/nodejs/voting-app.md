---
layout: docs
title: "Voting app"
description: ""
excerpt: ""
group: learn-by-example
sub_group: nodejs
redirect_from:
  - /docs/voting-app
  - /docs/nodejs/voting-app
  - /docs/voting-app/
  - /docs/nodejs/voting-app/
toc: true
---
This voting application is a demo with which you can build an advanced composition that uses `Python, Redis, Postgres, Node.js, and .Net`. 

The demo shows how to create a complex, micro-services application and push images to your docker registry.
 
## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
#build all the images
  build_image_vote:
    title: Building Voting Image
    type: build
    #Important: rename this image to to a valid repository in your registry. For example: myUserName/vote
    image_name: containers101/vote
    #The directory should be relative to git repository that is used for cloning
    working_directory: ./vote/
    #Dockerfile location should be relative to the working directory
    dockerfile: Dockerfile

  build_image_result:
    title: Building Result Image
    type: build
    image_name: containers101/result
    working_directory: ./result/
    dockerfile: Dockerfile

  build_image_worker:
    title: Building Worker Image
    type: build
    image_name: containers101/worker
    working_directory: ./worker/
    dockerfile: Dockerfile


#Push all the images
  push_to_registry_vote:
    title: Pushing to Vote Docker Registry
    type: push

    #A candidate is the image that we want to push to registry
    candidate: '${{build_image_vote}}'

    # You can push the image with whatever tag you want. In our example we use CF_BRANCH, which is a variable in
    # the build process, accessible throughout the entire flow.
    tag: '${{CF_BRANCH}}'

  push_to_registry_result:
    title: Pushing to Result Docker Registry
    type: push
    candidate: '${{build_image_result}}'
    tag: '${{CF_BRANCH}}'

  push_to_registry_worker:
    title: Pushing to Worker Docker Registry
    type: push
    candidate: '${{build_image_worker}}'
    tag: '${{CF_BRANCH}}'
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/containers101/voting-app){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
