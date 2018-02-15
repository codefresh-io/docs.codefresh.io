---
layout: docs
title: "Go: Hello World"
description: ""
excerpt: ""
group: learn-by-example
sub_group: golang
redirect_from:
  - /docs/cf-example-golang-hello-world
  - /docs/go/cf-example-golang-hello-world
  - /docs/cf-example-golang-hello-world/
  - /docs/nodejs/cf-example-golang-hello-world/
toc: true
---
So, you’ve decided to try Codefresh? Welcome on board!

We’ll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses [**golang**](https://golang.org/){:target="_blank"} (or just Go) to build an application which will eventually become a distributable Docker image.

## Looking around
cf-example-golang-hello-world is an example `hello world` project in Golang, demonstrating Codefresh features. In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:

  perform_tests:
    image: golang:latest
    working_directory: ${{main_clone}}
    description: Performing unit tests...
    commands:
      # Need to have the source in the correct GOPATH folder - let's do that
      - mkdir -p /go/src/github.com/${{CF_REPO_OWNER}}
      - ln -s /codefresh/volume/${{CF_REPO_NAME}} /go/src/github.com/${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}
      # Install pre-requisites and execute tests
      - cd /go/src/github.com/${{CF_REPO_OWNER}}/${{CF_REPO_NAME}} && go get
      - cd /go/src/github.com/${{CF_REPO_OWNER}}/${{CF_REPO_NAME}} && go test

  build_image:
    type: build
    description: Building the image...
    image_name: ${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}
    tag: '${{CF_BRANCH}}'
    
  launch_composition:
    type: launch-composition
    description: Launching an environment from a composition...
    composition:
      version: '2'
      services:
        prest:
          image: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}:${{CF_BRANCH}}'
          environment:
            - PREST_PG_HOST=postgres
            - PREST_PG_USER=prest
            - PREST_PG_PASS=prest
            - PREST_PG_DATABASE=prest
            - PREST_PG_PORT=5432
          depends_on:
            - postgres
          ports:
            - '3000'
        postgres:
          image: mbrung/postgres-no-volume
          environment:
            - POSTGRES_USER=prest
            - POSTGRES_DB=prest
            - POSTGRES_PASSWORD=prest
          ports:
            - '5432'
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-golang-hello-world){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
