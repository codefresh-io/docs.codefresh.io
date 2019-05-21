---
title: "Codefresh behind the firewall"
description: "How to run Codefresh pipelines in your own secure infrastructure"
group: enterprise
toc: true

---

As explained in the [installation page]({{site.baseurl}}/docs/enterprise/installation-security/) Codefresh offers 3 installation options: pure cloud, on-premise and Hybrid.
In this page we are going to describe the Hybrid option and all the advantages it offers.

## Running Codefresh in secure environments

Codefresh has an on-premise installation where the whole platform is installed in the customer premises. While
this solution is very effective as far as security is concerned, it places a lot of overhead on the customer as all updates
and improvements done in the platform must also be transferred to the customer premises.

The hybrid approach places only a Codefresh runner within customer premises while the UI (and management platform) stays in the Codefresh SAAS.

Here is the overall architecture:

{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/architecture.png"
  url="/images/enterprise/behind-the-firewall/architecture.png"
  alt="Codefresh behind the firewall"
  caption="Codefresh behind the firewall"
  max-width="100%"
    %}   

The advantages for this scenario are multi-fold. Regarding platform maintenance:

 1. The heavy lifting for platform maintenance is still happening by Codefresh instead of the customer
 1. Updates to the UI, build engine, integrations etc are happening automatically without any customer involvement
 1. Actual builds are happening in the customer premises under fully controlled conditions
 1. The Codefresh runner is fully automated. It handles volume claims and build scheduling on its own within the Kubernetes cluster it is placed.

Regarding security of services:

 1. Pipelines can run in behind-the-firewall clusters with internal services
 1. Pipelines can use integrations (such as docker registries) that are private and secure
 1. Source code does not ever leaves the customer premises

Regarding firewall security:

 1. Communication between the Codefresh runner and Codefresh SAAS is uni-directional. The runner is polling the Codefresh platform for jobs. 
 1. Communication between the Codefresh runner and Codefresh SAAS is only outgoing. The Codefresh SAAS never connects to the customer network. No ports need to be open in the customer firewall for the runner to work.
 1. The Codefresh runner is fully open-source, so its code can by scrutinized by any stakeholder.



## Using the Codefresh Build Runner 

The Codefresh runner installer is available at [https://github.com/codefresh-io/venona](https://github.com/codefresh-io/venona). You can use Venona to create, upgrade and remove runner installations on any internal Kubernetes cluster.

Notice that a runner installation is needed for each cluster that will _run_ Codefresh pipelines. A runner is **not** needed
in clusters that are used for _deployment_. It is possible to deploy applications on different clusters other than the ones the runner is running on.

The [installation process](https://github.com/codefresh-io/venona/blob/master/README.md) takes care of all the components of the runner as well as the other resources (config-maps, secrets, volumes) needed by them. For Mac environments there is also a brew package.

Once installed the runner is fully automated. It polls on its own the Codefresh SAAS (by default every ten seconds) and 
creates automatically all resources needed for running pipelines.

Only the runner pod is long-living insider your cluster. All other components (such as the engine) are short lived and exist only during pipeline builds.

You can always see what the runner is doing by listing the resources inside the namespace you chose during installation:

```
$ kubectl get pods -n codefresh-runtime
NAME                                             READY     STATUS    RESTARTS   AGE
dind-5c5afbb02e9fd02917b33f06                    1/1       Running   0          1m
dind-lv-monitor-venona-kkkwr                     1/1       Running   1          7d
dind-volume-provisioner-venona-646cdcdc9-dqh8k   1/1       Running   2          7d
engine-5c5afbb02e9fd02917b33f06                  1/1       Running   0          1m
venona-8b5f787c5-ftbnd                           1/1       Running   2          7d
```
In the same manner you can list secrets, config-maps, logs, volumes etc. for the Codefresh builds.


### Registering the runner to your Codefresh account

Installation can happen from any workstation or laptop that has access (i.e. via `kubectl`) to the Kubernetes cluster that will run Codefresh builds. The Codefresh runner will authenticate to your Codefresh account by using the [Codefresh CLI token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions). It is therefore necessary to setup [Codefresh CLI access](https://codefresh-io.github.io/cli/getting-started/) first, in the machine where you install the runner from.

Notice that access to the Codefresh CLI is only needed during the runner installation. After that, the runner with authenticate on it own using the details provided. You do *NOT* need to install the Codefresh CLI on the cluster that is running Codefresh pipelines.

### Verifying the runner installation

Once installation is complete, you should see the cluster of the runner as a new [Runtime environment](https://g.codefresh.io/account-admin/account-conf/runtime-environments) in Codefresh at your *Account Settings*, in the respective tab.

{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/runtime-environments.png"
  url="/images/enterprise/behind-the-firewall/runtime-environments.png"
  alt="Available runtime environments"
  caption="Available runtime environments"
  max-width="60%"
    %} 

If you have multiple environments available you can change the default one (shown with a thin blue border) by clicking on the 3 dot menu on the right of each environment. The Codefresh runner installer comes with an option `set-default` that will automatically set as default the new runtime environment.

You can even override the runtime environment for a specific pipeline by specifying in the respective section in the [pipeline settings]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/). 

{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/environment-per-pipeline.png"
  url="/images/enterprise/behind-the-firewall/environment-per-pipeline.png"
  alt="Running a pipeline on a specific environment"
  caption="Running a pipeline on a specific environment"
  max-width="60%"
    %} 

You can also verify your environment from the terminal with the `venona status` command.

## Using Secure services in your pipelines

All pipelines that are executed in the private Kubernetes cluster have access to all other internal services that are network reachable. It is therefore very easy to create pipelines that

 * Use databases internal to the company
 * run integration tests against services internal to the company
 * launch [compositions]({{site.baseurl}}/docs/codefresh-yaml/steps/composition-1/) that communicate with other secure services
 * Upload and download artifacts from a private artifact repository (e.g. Nexus or Artifactory)
 * deploy to any other cluster accessible in the secure network
 * create infrastructure such as machines, load balancers, auto-scaling groups etc.

 Any of these pipelines will work out the box and no extra configuration is needed. In all cases
 all data will stay with the private local network and will never exit the firewall.

 >Notice that [long running compositions]({{site.baseurl}}/docs/codefresh-yaml/steps/composition-1/) (preview test environments) are not yet available via the Codefresh
 build runner.



### Checking out code from a private GIT repository

To check-out code from your private GIT repository, you need to connect first to Codefresh via the [GIT integrations]({{site.baseurl}}/docs/integrations/git-providers/). However once you define your GIT provider as *on premise* you also
need to mark it as *behind the firewall* as well:

{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/behind-the-firewall-toggle.png"
  url="/images/enterprise/behind-the-firewall/behind-the-firewall-toggle.png"
  alt="Behind the firewall toggle"
  caption="Behind the firewall toggle"
  max-width="100%"
    %} 

Once you do that save your provider and make sure that it has the correct tags. The name you used for the git provider will also be used in the pipeline. You cannot "test the connection" because 
the Codefresh SAAS doesn't have access to your on-premise GIT repository.

{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/behind-the-firewall-tag.png"
  url="/images/enterprise/behind-the-firewall/behind-the-firewall-tag.png"
  alt="Behind the firewall tags"
  caption="Behind the firewall tags"
  max-width="100%"
    %} 

To check out code just use a [clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) like any other clone operation.
The only thing to remember is that the GIT URL must be fully qualified. You need to [create a pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-creation-modes) on it its own from the *Pipelines* section of the left sidebar (instead of one adding a git repository to Codefresh)



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
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

Once you trigger the pipeline, the Codefresh builder will communicate with your private GIT instance and checkout code.

>Note that currently there is a limitation in regards to the location of the `codefresh.yml` file. Only the [inline mode]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#writing-codefresh-yml-in-the-gui) is supported. Soon we will allow the loading of the pipeline from the git repository itself.

#### Adding triggers from private GIT repositories

In the previous section we have seen how a pipeline can checkout code from the internal git repository. We also need to setup a trigger
so that every time a commit happens (or any other supported event), the Codefresh pipeline will be triggered automatically.

This is a two step process:
1. First we setup a webhook endpoint in Codefresh
1. Then we create the webhook call in the side of the the GIT provider.

For the Codefresh side, follow the usual instructions for creating a [basic git trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/).

Once you select your GIT provider, you need to manually enter your username and repository that you wish to trigger the build.

{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/enter-repo-details.png"
  url="/images/enterprise/behind-the-firewall/enter-repo-details.png"
  alt="Entering repository details"
  caption="Entering repository details"
  max-width="60%"
    %}

All other details (git events, branch naming, monorepo pattern etc) are still the same as normal SAAS GIT providers.
Once that is done, Codefresh will show you the webhook endpoint along with a secret for triggering this pipeline. Note them down.


{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/codefresh-webhook.png"
  url="/images/enterprise/behind-the-firewall/codefresh-webhook.png"
  alt="Codefresh webhook details"
  caption="Codefresh webhook details"
  max-width="60%"
    %}

This concludes the setup on the Codefresh side. The final step is create a webhook call on the side of your GIT provider.
The instructions are different per GIT provider.

* [Github webhooks](https://developer.github.com/webhooks/)
* [Gitlab webhooks](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html)
* [Stash webhooks](https://confluence.atlassian.com/bitbucketserver/managing-webhooks-in-bitbucket-server-938025878.html)

In all cases make sure that the payload is JSON, because this is what Codefresh expects.

* For Github the events monitored should be `Pull requests` and `Pushes`.
* For Gitlab the events monitored should be `Push events`,`Tag push events` and `Merge request events`.

After the setup is finished, the Codefresh pipeline will be executed every time a git event happens.

### Accessing an internal docker registry

To access an internal registry just follow the instructions for [adding registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) . Like GIT repositories
you need to mark the Docker registry as *Behind the firewall*.

Once that is done, use the [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/) as usual with the name you gave to the registry during the integration setup.


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

To connect a cluster that is behind the firewall follow the [connecting cluster guide]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/), paying attention to the following two points.

1. You cluster should be added as a [Custom provider]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#adding-any-other-cluster-type-not-dependent-on-any-provider)
1. You need to mark the cluster as internal by using the toggle switch.




{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/cluster-behind-firewall.png"
  url="/images/enterprise/behind-the-firewall/cluster-behind-firewall.png"
  alt="Marking a Kubernetes cluster as internal"
  caption="Marking a Kubernetes cluster as internal"
  max-width="60%"
    %}

The cluster where the runner works on should have network connectivity with the cluster you wish to deploy to.

>Notice that the service account used in the cluster configuration is completely independent from the privileges granted to the Codefresh build runner. The privileges needed by the runner are only used to launch Codefresh pipelines within your cluster. The Service account used in the "custom provider" setting should have the needed privileges for deployment.

Once your cluster is connected you can use any of the familiar deployment methods such as the [dedicated deploy step]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) or [custom kubectl commands]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/).

## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/enterprise/installation-security/)
* [Google marketplace integration]({{site.baseurl}}/docs/integrations/google-marketplace/)
* [Managing your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
