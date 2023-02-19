---
title: "Kubernetes Integration"
description: "How Codefresh supports Kubernetes clusters"
group: integrations
toc: true
---

Codefresh is one of the few CI/CD solutions that has native support for Kubernetes clusters, not only for deploying applications to them, but also running pipelines on Kubernetes.

Codefresh has native support for Kubernetes in the following areas:

- [Connecting a cluster globally]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
- [Viewing the cluster status]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
- [Viewing the environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)
- [Deploying to a cluster with the GUI]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#deploying-a-new-service)
- [Deploying to a cluster with a pipeline]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/)
- [Running pipelines on a cluster]({{site.baseurl}}/docs/administration/codefresh-runner/)


## Connecting a Kubernetes cluster to Codefresh

Like all other Codefresh integrations, Kubernetes clusters are [connected once]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) on an Account level. You can add a cluster from a specific cloud provider
or a "generic" cluster for any compliant cluster:

{% 
  include image.html 
  lightbox="true" 
file="/images/integrations/kubernetes/kubernetes-integration.png" 
url="/images/integrations/kubernetes/kubernetes-integration.png" 
alt="Global Kubernetes integrations" 
caption="Global Kubernetes integrations" 
max-width="100%" 
%}

Once you connect a cluster it gets a unique name inside your account that is important when it comes to using this cluster inside a pipeline. From the same screen you can also connect [internal clusters that are behind your firewall]({{site.baseurl}}/docs/administration/behind-the-firewall/#deploying-to-an-internal-kubernetes-cluster/)
.

## Viewing the Codefresh cluster dashboard

After you connect a cluster, several graphical dashboards are automatically populated. The first one is the [Codefresh Kubernetes dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/).

{% 
  include image.html 
  lightbox="true" 
file="/images/integrations/kubernetes/kubernetes-dashboard.png" 
url="/images/integrations/kubernetes/kubernetes-dashboard.png" 
alt="Integrated Kubernetes Dashboard" 
caption="Integrated Kubernetes Dashboard" 
max-width="100%" 
%}

You can use this Dashboard to get basic information for your cluster such such as services, pods, deployments etc.

{% 
  include image.html 
  lightbox="true" 
file="/images/integrations/kubernetes/change-kubernetes-manifest.png" 
url="/images/integrations/kubernetes/change-kubernetes-manifest.png" 
alt="Changing a Kubernetes Manifest" 
caption="Changing a Kubernetes Manifest" 
max-width="100%" 
%}

From the same dashboard you can also add/change configmaps and even edit directly the manifest of a resource.



## Viewing the environment dashboard

The second dashboard that is enabled after you connect a cluster (but not automatically populated) is the [environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/).

{% include
image.html
lightbox="true"
file="/images/codefresh-yaml/environments/environments.png"
url="/images/codefresh-yaml/environments/environments.png"
alt="Codefresh Environment Dashboard"
caption="Codefresh Environment Dashboard"
max-width="100%"
%}

This dashboard shows a live view of a Kubernetes application along with the status of the latest builds that affected this environment. You can define such environments either directly from the GUI or [programmatically in a pipeline]({{site.baseurl}}/docs/codefresh-yaml/deployment-environments/).

## Ad-hoc deployments with the Codefresh GUI

One of the [easiest ways to deploy to Kubernetes]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) is to use the Codefresh GUI and [manually deploy a docker image]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#deploying-a-new-service):

{% include image.html 
lightbox="true" 
file="/images/d07104d-Screen_Shot_2017-07-23_at_6.46.17_PM.png" 
url="/images/d07104d-Screen_Shot_2017-07-23_at_6.46.17_PM.png" 
alt="Deploying with the quick GUI dialog"
caption="Deploying with the quick GUI dialog"
max-width="80%" 
%}

You can also [create a Pull Secret]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/) from the GUI.


## Automated deployments with Codefresh pipelines

You can also deploy to a cluster in a pipeline. Codefresh offers [several ways for Kubernetes deployments]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/). The important point here is that all connected clusters are automatically available to all pipelines with their unique name as a `kubectl` context.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/deployment-build.png" 
url="/images/getting-started/quick-start-k8s/deployment-build.png" 
alt="Kubernetes deployment in a pipeline" 
caption="Kubernetes deployment in a pipeline" 
max-width="100%" 
%}


You can use the [integrated Codefresh deployment methods]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/) or even run [custom kubectl commands directly on your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/).

Codefresh also offers a simple solution for [templating]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/) but you can use another templating methods such as [kustomize]({{site.baseurl}}/docs/yaml-examples/examples/deploy-with-kustomize/).



## Using a cluster for running CI/CD pipelines

Finally you can also use the [Codefresh Runner]({{site.baseurl}}/docs/administration/codefresh-runner/) to run pipelines in your cluster.



## What to read next

- [Add your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
- [Manage your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
- [Cloning Git repositories]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/)
