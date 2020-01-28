---
title: "Deployment environments"
description: "How to update the environment status from builds"
group: codefresh-yaml
toc: true
---

Codefresh includes an environment dashboard that can be used to monitor your applications and the builds associated with them. You can access the dashboard by clicking on *Environments* in the left sidebar of the Codefresh UI.

{% include
image.html
lightbox="true"
file="/images/codefresh-yaml/environments/environments.png"
url="/images/codefresh-yaml/environments/environments.png"
alt="Environment Dashboards"
caption="Environment Dashboards"
max-width="80%"
%}

Currently two types of environments are supported (they look identical in the UI)
 * Helm releases
 * Plain Kubernetes deployments

In any pipeline that does a deployment you can add an extra `env` property to instruct Codefresh which environment(s) is affected by that build. The first time that you run the build, the environment GUI screen will be automatically populated with an entry for that environment. Any subsequents builds with then update the environment entry with build and deployment status.


## Usage

Syntax for a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that deploys to a Kubernetes environment.

  `YAML`
{% highlight yaml %}
{% raw %}
step_name:
  title: Step Title
  description: Step description
  image: image/id
  working_directory: ${{step_id}}
  commands: 
    - command1
    - command2
  env:
    name: my-prod-env
    endpoints:
    - name: app
      url: https://prod.example.com
    type: kubernetes
    change: code update
    filters:
    - cluster: my-cluster
      namespace: default    
{% endraw %}
{% endhighlight %}

Syntax for a freestyle step that deploys to a Helm environment.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
step_name:
  title: Step Title
  description: Step description
  image: image/id
  working_directory: ${{step_id}}
  commands: 
    - command1
    - command2
  env:
    name: my-stage-env
    endpoints:
    - name: app
      url: https://stage.example.com
    type: helm-release
    change: config map change
    filters:
    - cluster: my-cluster
      releaseName: istio
{% endraw %}            
{% endhighlight %}

## Fields

{: .table .table-bordered .table-hover}
| Field         | Description         | 
| -------------| ------------------------|
| `name`      | Arbitrary name of the environment. It can be anything you want. It will appear in the Environment Dashboard GUI |       
| `endpoints`      | Array of `name`, `url` pairs that mark the accessible endpoints of this environment (if any). They appear in the Environment GUI as links and allow you to quickly visit an environment with your browser |
| `type`      | Type of environment. Accepted values are either `kubernetes` or `helm-release` | 
| `change`      | Any text that you want to appear as a description on what the build did to an environment. You can use free text or any Codefresh [variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) such `CF_COMMIT_MESSAGE` to get the commit message of the git trigger |
| `filters`      | An array of cluster characteristics so that Codefresh can pull live data from the cluster to display pod and deployment status. For a Kubernetes environment you enter `cluster`, `namespace` and for Helm environments you enter `cluster`, `releaseNames` |

In all cases the `cluster` name is the unique identifier of your cluster as seen in the [Kubernetes dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#work-with-your-services) screen.

Also notice that the relationship between environments and builds are many to many. A single environment can be affected by different pipelines, and a single pipeline might deploy to multiple environments.


## What to read next

* [Image annotations]({{site.baseurl}}/docs/docker-registries/metadata-annotations/)
* [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
