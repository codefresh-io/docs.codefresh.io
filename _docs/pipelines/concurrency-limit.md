---
title: "Selectors for concurrency synchronization"
description: ""
group: pipelines
toc: true
---


Argo Workflows has a synchronization mechanism to limit parallel execution of specific workflows or templates within workflows, as required.  
The mechanism enforces this with either semaphore or mutex synchronization configurations. For detailed information, see [Synchronization](https://argoproj.github.io/argo-workflows/synchronization/).

CSDP supports an additional level of concurrency synchronization, with _selectors_, for both workflows and templates.  

Selectors enable access to all workflow properties such as `annotations`, `labels`, or `parameters` using Go template formats. Selector-based concurrency configurations support parallel executions of workflows or templates within workflows. And equally important, selectors work with both semaphore and mutex synchronization configurations.  

This article has examples for semaphore synchronization configurations.  

Semaphore synchronization is configured in the `ConfigMap`, which is referenced from workflows or templates within workflows.  

Here's an example of the `ConfigMap` with the concurrency definition:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
 name: semaphore-config
data:
 workflow: "1"
```

### Concurrency selector definitions
A concurrency synchronization selector is defined through a `name`-`template` pair in workflows or templates:  

* The `name` is any meaningful/logical name that describes the selector. For example, Git repo or branch.
* The `template` is the parameter mapping for the name, that is resolved to the selector value when the pipeline is run.  
  For example:  
  {% highlight yaml %}{% raw %}{{workflow.parameters.REPO_OWNER/workflow.parameters.REPO_NAME}}{% endraw %}{% endhighlight %} or {% highlight yaml %}{% raw %}{{workflow.parameters.GIT_BRANCH}}{% endraw %}{% endhighlight %}

Selectors are added to the `synchronization` section, under `selectors`, as in the sample YAML below.

{% highlight yaml %}
{% raw %}
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
 generateName: synchronization-wf-2
spec:
 entrypoint: whalesay
 arguments:
   parameters:
   - name: REPO_OWNER
     value: denis-codefresh
   - name: REPO_NAME
     value: argo-workflows
   - name: GIT_BRANCH
     value: main
 synchronization:
   semaphore:
     configMapKeyRef:
        name: semaphore-config
        key: workflow
     selectors:
      - name: repository
        template: "{{ workflow.parameters.REPO_OWNER }}/{{ workflow.parameters.REPO_NAME }}"
      - name: branch
        template: "{{ workflow.parameters.GIT_BRANCH }}"
 templates:
   - name: whalesay
     container:
       image: docker/whalesay:latest
       command: [sleep]
       args: ["5000"]
{% endraw %}
{% endhighlight %}


### When and how does selector concurrency configuration work?
Let's review a viable use case for selector-based concurrency synchronization, and different scenarios to illustrate when and how it works:  
* Default concurrency synchronization without selectors
* Selector concurrency synchronization resolving to the _same `template`_ values
* Selector concurrency synchronization resolving to _different `template`_ values 

**Use case**  
  
We have two workflows, `synchronization-wf-1` and `synchronization-wf-2`.  

Both workflows commit to the _same Git repo_, but to _different branches in the repo_. The first workflow commits to the `main` branch, and the second workflow commits to a `feature` branch.  When there are commits to the `main` and `feature` branches, we want the workflows to run in parallel.

#### Default concurrency synchronization
Both workflows have the same default values for the arguments, and share the same semaphore configuration and key with weight 1.   

{% include image.html 
  lightbox="true" 
  file="/images/pipeline/concurrency/concurrency-default-config.png" 
  url="/images/pipeline/concurrency/concurrency-default-config.png"
       alt="Workflows with default concurrency configuration"
       caption="Workflows with default concurrency configuration"
       max-width="30%"
       %}

With the default concurrency configuration, only one workflow at a time can use the key. Meaning that while `synchronization-wf-1` is `Running`, `synchronization-wf-2` is in `Pending` status.

#### Selector concurrency synchronization resolving to same template values
Here are the same workflows, `synchronization-wf-1` and `synchronization-wf-2`, this time configured with _selector_ concurrency.  
Both workflows share the same semaphore key with a weight of 1.  
Both workflows also _use the same set of selectors_. As you can see in the image below, the Git repo and the Git branch arguments have the same values in both.  

{% include image.html 
  lightbox="true" 
  file="/images/pipeline/concurrency/selector-concurrency-sync.png" 
  url="/images/pipeline/concurrency/selector-concurrency-sync.png"
       alt="Workflows with selector concurrency configuration"
       caption="Workflows with selector concurrency configuration"
       max-width="30%"
       %}

In this case, the selectors have no impact as the `selector templates` in both workflows resolve to the same values, resulting in the same semaphore key.
If you look at the status of both workflows, you can see that they have the same semaphore key.

```yaml
synchronization:
 semaphore:
   holding:
   - holders:
     - synchronization-wf-6lf8b
     semaphore: argo/ConfigMap/semaphore-config/workflow?repository=denis-codefresh/argo-workflows&branch=main
```


#### Selector concurrency synchronization resolving to different template values

In the third scenario, we have the same workflows, `synchronization-wf-1` and `synchronization-wf-2`, also configured with the _selector_ concurrency.  
They also share the same semaphore configuration and key with weight 1.  

The difference is that in this scenario, the `selector templates` in both workflows resolve to different values, resulting in different semaphore keys for each workflow.  
In `synchronization-wf-1`, the Git branch is set to `main`, and in `synchronization-wf-2`, it is set to `feature`. 

{% include image.html 
  lightbox="true" 
  file="/images/pipeline/concurrency/selector-concurrency-sync-git-branch.png" 
  url="/images/pipeline/concurrency/selector-concurrency-sync-git-branch.png"
       alt="Workflows with selector concurrency and different Git branches"
       caption="Workflows with selector concurrency and different Git branches"
       max-width="30%"
       %}

Now, because the workflows use different semaphore keys, both workflows run in parallel.  
If you look at the status of both workflows, you can see that they have different semaphore keys.  

```yaml
synchronization:
 semaphore:
   holding:
   - holders:
     - synchronization-wf-6lf8b
     semaphore: argo/ConfigMap/semaphore-config/workflow?repository=denis-codefresh/argo-workflows&branch=main
```

```yaml
synchronization:
 semaphore:
   holding:
   - holders:
     - synchronization-wf-8lf9b
     semaphore: argo/ConfigMap/semaphore-config/workflow?repository=denis-codefresh/argo-workflows&branch=feature
```

