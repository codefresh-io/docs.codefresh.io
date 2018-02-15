---
layout: docs
title: "Post-Step Operations"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/post-step-operations
toc: true
---
Post-step operations are a set of optional predefined processes that can be configured on any step. These operations will be executed once the step has completed.
 
## Result Aware Post-Step Operations
You may execute post-step operations conditionally, based on the outcome of the step itself.

To execute operations only when the step has completed successfully, use `on_success`:
  `on_success`
{% highlight yaml %}
step_name:
  ...
  on_success:
    ...
{% endhighlight %}

To execute operations only when the step has failed, use `on_fail`:
  `on_success`
{% highlight yaml %}
step_name:
  ...
  on_fail:
    ...
{% endhighlight %}

## Result Agnostic Post-Step Operations
You may execute post-step operations regardless of the outcome of the step itself.

To execute operations regardless of the result, use `on_finish`:
  `on_finish`
{% highlight yaml %}
step_name:
  ...
  on_finish:
    ...
{% endhighlight %}

## Available Post-Step Operations
- [Metadata Annotations]({{ site.baseurl }}/docs/codefresh-yaml/metadata-annotations/).
