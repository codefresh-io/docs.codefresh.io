---
title: "Create a Docker image for GO"
description: "Using Codefresh pipelines"
group: learn-by-example
sub_group: golang
redirect_from:
  - /docs/go/cf-example-golang-hello-world/
toc: true
---

Codefresh can work with Go projects of any version using built-in modules or any other dependency mechanism.

## The example golang project

You can see the example project at [https://github.com/codefresh-contrib/golang-sample-app](https://github.com/codefresh-contrib/golang-sample-app). The repository contains a simple Golang web application including unit tests. There are 3 Dockerfiles available:

* [Simple Dockerfile](https://github.com/codefresh-contrib/golang-sample-app/blob/master/Dockerfile) (with old Go version that requires `GOPATH` building),
* [Dockerfile with Go modules](https://github.com/codefresh-contrib/golang-sample-app/blob/master/Dockerfile.mod) (optimized for Docker caching), and
* [Multi-stage Dockerfile](https://github.com/codefresh-contrib/golang-sample-app/blob/master/Dockerfile.multistage) (with Go modules and unit tests).

Let's see these workflows in order.

## Simple Docker image pipeline

The most [simple pipeline](https://github.com/codefresh-contrib/golang-sample-app/blob/master/codefresh.yml) that you can create is just two [steps]({{site.baseurl}}/docs/codefresh-yaml/steps/). A [clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) to fetch the code and a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) to create a Docker image.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/golang-sample-app'
    revision: master
    git: github
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-golang-image
    working_directory: ./
    tag: full
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

Once you run this pipeline Codefresh will create a Docker image for the Golang application:

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/golang/golang-simple-pipeline.png" 
url="/images/learn-by-example/golang/golang-simple-pipeline.png" 
alt="Simple pipeline for Golang" 
caption="Simple pipeline for Golang" 
max-width="80%" 
%}

The big advantage of this workflow is that the Dockerfile you use can define any Go version and dependency tool. As long as the Dockerfile is self-contained (i.e. it compiles GO on its own), the pipeline will work as expected.

In the example application, the simple (unoptimized) Dockerfile has an old Go version that still requires `GOPATH` folders.

`Dockerfile`
{% highlight docker %}
{% raw %}
FROM golang:1.10

# Set the Current Working Directory inside the container
WORKDIR $GOPATH/src/github.com/codefresh-contrib/go-sample-app

# Copy everything from the current directory to the PWD (Present Working Directory) inside the container
COPY . .

# Download all the dependencies
RUN go get -d -v ./...

# Install the package
RUN go install -v ./...

# This container exposes port 8080 to the outside world
EXPOSE 8080

# Run the executable
CMD ["go-sample-app"]
{% endraw %}
{% endhighlight %}


## Run unit tests as part of the pipeline

If you want to run Go specific steps in your pipeline, you can use [freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) steps with any GO image that you want. If your GO application is using GO modules, this is even easier as you don't need to place the application into a specific GOPATH compliant directory first.

This [pipeline](https://github.com/codefresh-contrib/golang-sample-app/blob/master/codefresh-gomod.yml) is running unit tests as a separate step and then builds the docker image.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - test
  - build
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    stage: checkout
    repo: 'codefresh-contrib/golang-sample-app'
    revision: master
    git: github
  MyUnitTests:
    title: Unit test
    stage: test
    image: 'golang:1.12'
    commands:
      - go test -v
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: build
    image_name: my-golang-image
    working_directory: ./
    tag: modules
    dockerfile: Dockerfile.mod
{% endraw %}
{% endhighlight %}

If the unit tests fail, then the docker image will never be created (Codefresh automatically stops a pipeline when there is an error).

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/golang/golang-ci-pipeline.png" 
url="/images/learn-by-example/golang/golang-ci-pipeline.png" 
alt="Golang pipeline with unit tests" 
caption="Golang pipeline with unit tests" 
max-width="80%" 
%}

Notice that in this case we have added module support in the Go application. The new Dockerfile is the following:

`Dockerfile`
{% highlight docker %}
{% raw %}
FROM golang:1.12-alpine

RUN apk add --no-cache git

# Set the Current Working Directory inside the container
WORKDIR /app/go-sample-app

# We want to populate the module cache based on the go.{mod,sum} files.
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

# Build the Go app
RUN go build -o ./out/go-sample-app .


# This container exposes port 8080 to the outside world
EXPOSE 8080

# Run the binary program produced by `go install`
CMD ["./out/go-sample-app"]
{% endraw %}
{% endhighlight %}

The Dockerfile will also automatically take advantage of the Codefresh distributed docker cache.



## Create a multi-stage Docker image for GO

Especially with Go applications, the recommended way to create Docker images is with [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/). This makes the resulting Docker image as compact as possible.

You can also embed unit tests in the Docker creation process, which guarantee the correctness of image (integration tests are best kept in the pipeline).

Here is the new Dockerfile:

`Dockerfile`
{% highlight docker %}
{% raw %}
FROM golang:1.12-alpine AS build_base

RUN apk add --no-cache git

# Set the Current Working Directory inside the container
WORKDIR /tmp/go-sample-app

# We want to populate the module cache based on the go.{mod,sum} files.
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

# Unit tests
RUN CGO_ENABLED=0 go test -v

# Build the Go app
RUN go build -o ./out/go-sample-app .

# Start fresh from a smaller image
FROM alpine:3.9 
RUN apk add ca-certificates

COPY --from=build_base /tmp/go-sample-app/out/go-sample-app /app/go-sample-app

# This container exposes port 8080 to the outside world
EXPOSE 8080

# Run the binary program produced by `go install`
CMD ["/app/go-sample-app"]
{% endraw %}
{% endhighlight %}

Codefresh has native support for multi-stage builds. The [pipeline](https://github.com/codefresh-contrib/golang-sample-app/blob/master/codefresh-multi-stage.yml) is the same as the first one with just two steps.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/golang-sample-app'
    revision: master
    git: github
  MyAppDockerImage:
    title: Building Docker Multi-stage Image
    type: build
    image_name: my-golang-image
    working_directory: ./
    tag: multi-stage
    dockerfile: Dockerfile.multistage
{% endraw %}
{% endhighlight %}

You should see a much smaller Docker image at the end.


## Viewing Docker images

All successful Codefresh pipelines automatically push their images to the [internal Codefresh registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/). If you look at the images created the advantages of the multi-stage build are very clear:

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/golang/golang-image-size.png" 
url="/images/learn-by-example/golang/golang-image-size.png" 
alt="Creating different Docker images" 
caption="Creating different Docker images" 
max-width="80%" 
%}

We recommend using Go modules and multi-stage builds in your Go projects.

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)

