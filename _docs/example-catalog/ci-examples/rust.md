---
title: "Compile and test a Rust application"
description: "Using Codefresh pipelines"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/learn-by-example/rust/
toc: true
---

Codefresh can work with any Rust application very easily as both `rustc` and `cargo` are already offered in Dockerhub. 

## The example Rust project

You can see the example project at [https://github.com/codefresh-contrib/rust-sample-app](https://github.com/codefresh-contrib/rust-sample-app){:target="\_blank"}. The repository contains a Rust starter project with a dummy unit test.

* `cargo build` compiles the code.
* `cargo test` runs unit tests
* `cargo clean` removes artifacts and binaries.


## Create a CI pipeline for Rust applications

Creating a CI/CD pipeline for Rust is very easy, because Codefresh can run any [Rust image](https://hub.docker.com/_/rust){:target="\_blank"} that you wish. Rust docker images already contain the `cargo` package manager. 

{% include image.html 
lightbox="true" 
file="/images/examples/rust/rust-pipeline.png" 
url="/images/examples/rust/rust-pipeline.png" 
alt="Compiling a Rust application in a pipeline"
caption="Compiling a Rust application in a pipeline"
max-width="80%" 
%}

Here is the [full pipeline](https://github.com/codefresh-contrib/rust-sample-app/blob/master/codefresh.yml){:target="\_blank"} that compiles the application after checking out the code.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "test"
steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefresh-contrib/rust-sample-app"
    revision: "master"
    stage: "clone"
  compile:
    title: "Building Code"
    type: "freestyle" 
    image: "rust:1.44-stretch" 
    working_directory: "${{clone}}" 
    environment:
      - CARGO_HOME=/codefresh/volume/cargo
    commands:
      - "cargo build"
    stage: "build"    
  test:
    title: "Running tests"
    type: "freestyle" 
    image: "rust:1.44-stretch" 
    working_directory: "${{clone}}" 
    environment:
      - CARGO_HOME=/codefresh/volume/cargo    
    commands:
      - "cargo test"
    stage: "test"
   
{% endraw %}
{% endhighlight %}

This pipeline clones the source code, compiles the code and runs unit tests. In all cases we use the public Docker image of Rust that also contains `cargo`.

We also pass the `CARGO_HOME` environment variable to place the Cargo cache on the [shared Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps). See the [Caching documentation]({{site.baseurl}}/docs/pipelines/pipeline-caching/#traditional-build-caching) for more details.



## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  