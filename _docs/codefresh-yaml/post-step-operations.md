---
title: "Post-Step Operations"
description: "Annotating your builds and pipelines with dynamic metadata"
group: codefresh-yaml
redirect_from:
  - /docs/post-step-operations/
toc: true
---
Post-step operations are a set of optional predefined processes that can be configured on any step. These operations will be executed once the step has completed. The post-step operations allow you to annotate your builds, images and pipelines with extra metadata.

 
## Result Aware Post-Step Operations
You may execute post-step operations conditionally, based on the outcome of the step itself.

To execute operations only when the step has completed successfully, use `on_success`:


{% highlight yaml %}
step_name:
  ...
  on_success:
    ...
{% endhighlight %}

To execute operations only when the step has failed, use `on_fail`:

 
{% highlight yaml %}
step_name:
  ...
  on_fail:
    ...
{% endhighlight %}

## Result Agnostic Post-Step Operations
You may execute post-step operations regardless of the outcome of the step itself.

To execute operations regardless of the result, use `on_finish`:


{% highlight yaml %}
step_name:
  ...
  on_finish:
    ...
{% endhighlight %}

## Available Post-Step Operations

- [Image Metadata]({{site.baseurl}}/docs/docker-registries/metadata-annotations/)
- [Custom Annotations]({{site.baseurl}}/docs/codefresh-yaml/annotations/)

## Example

Marking a Docker image with the results of unit tests:

{% highlight yaml %}
{% raw %}
build_step:
  title: Building My Docker image
  type: build
  image_name: my-app-image
  tag: 1.0.1
  dockerfile: Dockerfile
run_tests:
  title: Running unit tests
  image: ${{build_step}}
  commands:
   - npm install
   - npm run test
  on_success: # Execute only once the step succeeded
    metadata: 
      set: 
        - ${{build_step.imageId}}: 
          - unit_tests: passed
{% endraw %}
{% endhighlight %}

## Running other steps

Post operations are only for metadata. If you want to run a step when another step fails or succeeds you need to use [conditional execution of steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) and the `fail_fast` property.

{% highlight yaml %}
{% raw %}
run_tests:
  title: Running unit tests
  image: node:11
  fail_fast: false
  commands:
   - npm install
   - npm run test
print_error_message:
  image: alpine:latest
  title: Marking pipeline status
  commands:
  - echo "Unit tests failed"
  when:
    condition:
      all:
        myCondition: run_tests.result == 'failure'
{% endraw %}
{% endhighlight %}

In this example the step `print_error_message` will only run if step `run_tests` has failed.

See also [advanced workflows]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/#single-step-dependencies).

## What to read next

* [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/)
* [Condition Expression Syntax]({{site.baseurl}}/docs/codefresh-yaml/condition-expression-syntax/)
* [Working Directories]({{site.baseurl}}/docs/codefresh-yaml/working-directories/)
* [Annotations]({{site.baseurl}}/docs/codefresh-yaml/annotations/)
* [Pipeline/Step hooks]({{site.baseurl}}/docs/codefresh-yaml/hooks/)


