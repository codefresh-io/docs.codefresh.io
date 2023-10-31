---
title: "Runner behind firewalls"
description: "Run Codefresh pipelines in your own secure infrastructure"
group: installation
redirect_from:
  - /docs/administration/behind-the-firewall/
  - /docs/enterprise/behind-the-firewall/
toc: true
---

As described in [installation options]({{site.baseurl}}/docs/installation/installation-options/), Codefresh offers the Hybrid Runner option for Codefresh pipelines.
This articles focuses on how the Runner works within infrastructure behind firewalls.

## Running Codefresh in secure environments

Codefresh has an on-premises installation in which the Codefresh platform is installed on the customer's premises. While
this solution is very effective as far as security is concerned, it places a lot of overhead on the customer, as all updates
and improvements done in the platform must also be transferred to the customer premises.

Hybrid Runner installs the Runner within the customer premises, while the UI (and management platform) stays in Codefresh.

Here is a visual representation of the CI/CD flow between the Runner in the customer environment and Codefresh client in the public internet:

{% include image.html
  lightbox="true"
  file="/images/runtime/behind-the-firewall/architecture.png"
  url="/images/runtime/behind-the-firewall/architecture.png"
  alt="Codefresh Hybrid CD/CD behind the firewall"
  caption="Codefresh Hybrid CD/CD behind the firewall"
  max-width="100%"
    %}   

The advantages for this scenario are multi-fold: 

**Regarding platform maintenance** 

 1. Codefresh is responsible for the heavy lifting for platform maintenance, instead of the customer.
 1. Updates to the UI, build engine, integrations etc., happen automatically, without any customer involvement.
 1. Actual builds run in the customer premises under fully controlled conditions.
 1. Codefresh Runner is fully automated. It handles volume claims and build scheduling on its own within the Kubernetes cluster it is placed.

**Regarding security of services**

 1. Pipelines can run in behind-the-firewall clusters with internal services.
 1. Pipelines can use integrations (such as Docker registries) that are private and secure.
 1. Source code does not ever leave the customer premises.

**Regarding firewall security**

 1. Uni-directional, outgoing communication between the Runner and Codefresh. The Runner polls the platform for jobs. 
 1. Codefresh never connects to the customer network. No ports need to be open in the customer firewall for the runner to work.
 1. Codefresh Runner is fully open-sourced, so its code can be scrutinized by any stakeholder.



## Using secure services in your pipelines

After installing the [Codefresh Runner]({{site.baseurl}}/docs/installation/codefresh-runner/) on your private Kubernetes cluster in your infrastructure, all pipelines in the private Kubernetes cluster have access to all other internal services that are network reachable. 

You can easily create pipelines that:

 * Use databases internal to the company
 * Run integration tests against services internal to the company
 * Launch [compositions]({{site.baseurl}}/docs/pipelines/steps/composition/) that communicate with other secure services
 * Upload and download artifacts from a private artifact repository (e.g., Nexus or Artifactory)
 * Deploy to any other cluster accessible in the secure network
 * Create infrastructure such as machines, load balancers, auto-scaling groups etc.

 Any of these pipelines will work out the box without extra configuration. In all cases,
 all data stays within the private local network and does not exit the firewall.

 >**INFO**:  
 [Long-running compositions]({{site.baseurl}}/docs/pipelines/steps/composition/) (preview test environments) are not yet available via the Codefresh Runner.



### Checking out code from a private GIT repository

To check out code from your private Git repository, you need to connect first to Codefresh via  [Git integrations]({{site.baseurl}}/docs/integrations/git-providers/). However, once you define your GIT provider as *on premise*, you also need to mark it as *behind the firewall* as well:

{% include image.html
  lightbox="true"
  file="/images/runtime/behind-the-firewall/behind-the-firewall-toggle.png"
  url="/images/runtime/behind-the-firewall/behind-the-firewall-toggle.png"
  alt="Behind the firewall toggle"
  caption="Behind the firewall toggle"
  max-width="100%"
    %} 

Once you do that save your provider and make sure that it has the correct tags. The name you used for the Git provider will also be used in the pipeline. You cannot "test the connection" because 
the Codefresh SAAS doesn't have access to your on-premises GIT repository.

{% include image.html
  lightbox="true"
  file="/images/runtime/behind-the-firewall/behind-the-firewall-tag.png"
  url="/images/runtime/behind-the-firewall/behind-the-firewall-tag.png"
  alt="Behind the firewall tags"
  caption="Behind the firewall tags"
  max-width="100%"
    %} 

To check out code just use a [clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) like any other clone operation.
The only thing to remember is that the Git URL must be fully qualified. You need to [create a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-creation-modes) on it its own from the *Pipelines* section of the left sidebar (instead of one adding a Git repository to Codefresh)



`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    type: git-clone
    description: Step description
    repo: https://github-internal.example.com/my-username/my-app
    git: my-internal-git-provider
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-image
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

Once you trigger the pipeline, the Codefresh Build Runtimes communicates with your private Git instance and checks out code.

>Note that currently there is a limitation on the location of the `codefresh.yml` file. Only the [inline mode]({{site.baseurl}}/docs/pipelines/pipelines/#writing-codefresh-yml-in-the-gui) is supported by default. You will need to install the [App-Proxy]({{site.baseurl}}/docs/installation/codefresh-runner/#app-proxy-installation) to be able to use the YAML from Repository.

You can also use a [network proxy]({{site.baseurl}}/docs/pipelines/steps/git-clone/#using-git-behind-a-proxy) for the Git clone step.

#### Adding triggers from private Git repositories


In the previous section we have seen how a pipeline can check out code from an internal Git repository. We also need to set up a trigger,
so that every time a commit or any other supported event occurs, the Codefresh pipeline is triggered automatically.

If you have installed the [optional app-proxy]({{site.baseurl}}/docs/installation/codefresh-runner/#optional-installation-of-the-app-proxy), adding a trigger can be done exactly like the SAAS version of Codefresh, using only the Codefresh UI.

If you haven't installed the app-proxy, then adding a Git trigger is a two-step process:

1. First we set up a webhook endpoint in Codefresh.
1. Then we create the webhook call in the side of the the GIT provider.

> To support triggers based on  PR (Pull Request) events, it is mandatory to install `app-proxy`.

For the Codefresh side, follow the usual instructions for creating a [basic Git trigger]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/).

Once you select your GIT provider, you need to manually enter your username and repository that you wish to trigger the build.

{% include image.html
  lightbox="true"
  file="/images/runtime/behind-the-firewall/enter-repo-details.png"
  url="/images/runtime/behind-the-firewall/enter-repo-details.png"
  alt="Entering repository details"
  caption="Entering repository details"
  max-width="60%"
    %}

All other details (git events, branch naming, monorepo pattern, etc.) are still the same as normal SAAS GIT providers.
Once that is done, Codefresh will show you the webhook endpoint along with a secret for triggering this pipeline. Note them down.


{% include image.html
  lightbox="true"
  file="/images/runtime/behind-the-firewall/codefresh-webhook.png"
  url="/images/runtime/behind-the-firewall/codefresh-webhook.png"
  alt="Codefresh webhook details"
  caption="Codefresh webhook details"
  max-width="60%"
    %}

This concludes the setup on the Codefresh side. The final step is create a webhook call on the side of your GIT provider.
The instructions are different per GIT provider:

* [GitHub webhooks](https://developer.github.com/webhooks/){:target="\_blank"}
* [GitLab webhooks](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html){:target="\_blank"}
* [Stash webhooks](https://confluence.atlassian.com/bitbucketserver/managing-webhooks-in-bitbucket-server-938025878.html){:target="\_blank"}

In all cases make sure that the payload is JSON, because this is what Codefresh expects.

* For GitHub the events monitored should be `Pull requests` and `Pushes`.
* For GitLab the events monitored should be `Push events`,`Tag push events` and `Merge request events`.

After the setup is finished, the Codefresh pipeline will be executed every time a git event happens.

### Accessing an internal docker registry

To access an internal registry just follow the instructions for [adding registries]({{site.baseurl}}/docs/integrations/docker-registries/). Like Git repositories, you need to mark the Docker registry as *Behind the firewall*.

Once that is done, use the [push step]({{site.baseurl}}/docs/pipelines/steps/push/) as usual with the name you gave to the registry during the integration setup.


`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  gitClone:
    type: git-clone
    description: Step description
    repo: https://github-internal.example.com/my-username/my-app
    git: my-internal-git-repo
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-image
    dockerfile: Dockerfile
  PushingDockerImage:
    title: Pushing a docker image
    type: push
    candidate: '${{BuildingDockerImage}}'
    tag: '${{CF_BRANCH}}'
    registry: my-internal-docker-registry  
{% endraw %}
{% endhighlight %}


### Deploying to an internal Kubernetes cluster

To connect a cluster that is behind the firewall follow the [connecting cluster guide]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster), paying attention to the following two points:

1. Your cluster should be added as a _Adding any other cluster type (not dependent on any provider_.
1. You need to mark the cluster as internal by using the toggle switch.




{% include image.html
  lightbox="true"
  file="/images/runtime/behind-the-firewall/cluster-behind-firewall.png"
  url="/images/runtime/behind-the-firewall/cluster-behind-firewall.png"
  alt="Marking a Kubernetes cluster as internal"
  caption="Marking a Kubernetes cluster as internal"
  max-width="60%"
    %}

The cluster where the runner works on should have network connectivity with the cluster you wish to deploy to.

>Notice that the service account used in the cluster configuration is completely independent from the privileges granted to the Codefresh build runner. The privileges needed by the runner are only used to launch Codefresh pipelines within your cluster. The Service account used in the "custom provider" setting should have the needed privileges for deployment.

Once your cluster is connected you can use any of the familiar deployment methods such as the [dedicated deploy step]({{site.baseurl}}/docs/deployments/kubernetes/) or [custom kubectl commands]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/).

## Related articles
[Google marketplace integration]({{site.baseurl}}/docs/integrations/google-marketplace/)  
[Managing your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
