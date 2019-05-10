---
title: "Go: Hello World"
description: ""
excerpt: ""
group: learn-by-example
sub_group: golang
redirect_from:
  - /docs/go/cf-example-golang-hello-world/
toc: true
---

Codefresh can work with Go projects of any version using built-in modules or any other dependency mechanism.

## The example golang project

You can see the example project at [https://github.com/codefresh-contrib/golang-sample-app](https://github.com/codefresh-contrib/golang-sample-app). The repository contains a simple Golang web application including unit tests. There are 3 Dockerfiles available

* Simple Dockerfile (with old Go version that requires `GOPATH` building)
* Dockerfile with Go modules (optimized for Docker caching)
* Multi-stage Dockerfile (with Go modules and unit tests)

Let's see these in order

## Create a Docker image for a Golang application


## Run unit tests as part of the pipeline

## Create a multi-stage Docker image for GO


