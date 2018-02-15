---
layout: docs
title: "Execution Flow"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/execution-flow
toc: true
---
Execution of a Codefresh YAML is comprised of several consecutive phases:

1. Resolution
2. Planning
3. Pre-execution preparation.
4. Step execution.
5. Post-execution cleanup.

Let's take a deeper look into each phase.

### Resolution

The YAML is resolved from the pipeline's Git repository; by default, Codefresh searches for a file named `codefresh.yml` in the root of the repository.
You can also configure an alternative location in your Codefresh pipeline settings.
After the YAML is resolved, Codefresh replaces all [User Provided Variables]({{ site.baseurl }}/docs/codefresh-yaml/variables/#custom-user-provided-variables) in the descriptor.

### Planning
During the planning phase, Codefresh translates the YAML file to a plan structure and enriches it with further details such as pipeline context, SCM context and integration configurations.

### Pre-Execution Preparation
Before executing steps, Codefresh prepares the infrastructure required for the pipeline.
This preparation includes recovery of the pipeline's most recent workspace, filesystem, and pre-pulling Docker images required for the process.

{{site.data.callout.callout_warning}}
##### Privileged mode
For security reasons, we do not allow pipelines to run in privileged mode. If you need privileged mode please [contact us](https://codefresh.io/contact-us/){:target="_blank"}. 
{{site.data.callout.end}}

### Step Execution
In the execution phase, Codefresh chains and runs all steps specified in the YAML. At this point, every step resolves any [Context Related Variables]({{ site.baseurl }}/docs/codefresh-yaml/variables/#context-related-variables), and exports its own produced resources. 
A step that fails to execute terminates the whole execution flow, unless you configure the `fail-fast` attribute to `false`. You can define conditions that configure whether a step executes or is skipped, instead. 

### Post-Execution Cleanup
After executing the YAML steps, successfully or unsuccessfully, Codefresh performs a series of operations to tie any loose ends.
These operations include storing the used workspace and cleaning up used resources.
