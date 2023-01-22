---
title: "Post-step operations"
description: "Annotate your builds and run extra steps"
group: pipelines
sub_group: steps
redirect_from:
  - /docs/pipelines/post-step-operations/
  - /docs/post-step-operations/
toc: true
---
Post-step operations are a set of optional predefined processes that can be configured on any step. These operations will be executed once the step has completed. The post-step operations allow you to annotate your builds, images, and pipelines with extra metadata or run other steps.

 
## Result-aware post-step operations
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

## Result-agnostic post-step operations
You may execute post-step operations regardless of the outcome of the step itself.

To execute operations regardless of the result, use `on_finish`:


{% highlight yaml %}
step_name:
  ...
  on_finish:
    ...
{% endhighlight %}

## Available Post-Step Operations

- [Image Metadata]({{site.baseurl}}/docs/pipelines/metadata-annotations/)
- [Custom annotations]({{site.baseurl}}/docs/pipelines/annotations/)
- [Hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/)

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

If you want to run a different step in the pipeline when a step fails or succeeds, you need to use [conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) and the `fail_fast` property. You can also use [step hooks]({{site.baseurl}}/docs/pipelines/hooks/) for dedicated post step actions.

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

See also [advanced workflows]({{site.baseurl}}/docs/pipelines/advanced-workflows/#single-step-dependencies).

## Related articles
[Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)  
[Working directories]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Annotations in pipelines]({{site.baseurl}}/docs/pipelines/annotations/)  
[Hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/)


