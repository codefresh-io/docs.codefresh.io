---
title: "Install GitOps Runtime on-premises"
description: "Install GitOps Runtime in on-premises environments using Helm"
group: installation
toc: true
---

Install the GitOps Runtime in your on-premises environments with Helm to create and manage Argo CD applications and deployments.


## Install GitOps Runtime on-premises

* Run: 
{% highlight yaml %}
helm upgrade --install cf-gitops-runtime \
  --create-namespace \
  --namespace codefresh \
  --set global.codefresh.userToken.token=<codefresh-token> \
  --set global.runtime.name=codefresh \
  --set global.codefresh.url=<on-prem-url> \
  --set app-proxy.config.cors=<on-prem-url> \
  --set global.runtime.ingress.enabled="true" \
  --set "global.runtime.ingress.hosts[0]"=<ingress-host> \
  cf-gitops-runtime/gitops-runtime --devel
{% endhighlight %}
 
  where:  
  * `<namespace>` is the namespace in which to install the Hybrid GitOps Runtime on-premises, either `codefresh`, or any custom name.  
  * `<codefresh-token>` is the API token you have generated in Codefresh. You can use existing token, or [generate a new API token]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#create-and-manage-api-keys).
  * `<runtime-name>` is the name of the runtime, either `codefresh`, or any custom name. 
  * `<on-prem-url>` is the URL of your platform, for example, `https://hermes-onprem-test.cf-op.com`.
  * `<ingress-host>` is the host name of the ingress controller component, _without `https://`_.  Make sure the `"global.runtime.ingress.hosts[0]"` is within double quotes.
  * `global.runtime.ingress.enabled="true"` value must be _within double quotes_.
  

## Values file for on-prem GitOps Runtime

Here's an example of the `values.yaml` for installing the GitOps Runtime on-premises. 

```yaml
global:
  codefresh:
    url: https://codefresh-onprem.com 
    

    userToken:
      token: 16363747847837838757885898

  runtime:
    name: noamg-runtime

    ingress:                                   # on-prem supports only ingress-based
      enabled: true
      hosts:
      - codefresh.ingress-host.com

app-proxy:
  config:
    cors: https://codefresh-onprem.com
```

## Image overrides for private registries
If you use private registries, you need to override specific image values for the different subcharts and container images.
We have a utility to help override image values for GitOps Runtimes. The utility creates values files that match the structure of the subcharts, allowing you to easily replace image registries. During chart installation, you can provide these values files to override the images, as needed.
For more details, see [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-gitops-runtime/gitops-runtime#using-with-private-registries---helper-utility){:target="\_blank"}.


## Argo project CRDs
If you already have Argo project CRDs on your cluster, do one of the following:
* Handle Argo projects CRDs outside of the chart (see [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"})  
  Disable CRD installation under the relevant section for each of the Argo projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the argo project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

* Adopt the CRDs<br>
  Adopting the CRDs allows them to be managed by the `gitops-runtime helm release`. Doing so ensures that a runtime upgrade also automatically upgrades the CRDs.

  Run this script _before_ installation:

```
#!/bin/sh
RELEASE=<helm-release-name>
NAMESPACE=<target-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```

## Ingress controller configuration 
Ingress-based on-premises GitOps Runtimes require an ingress controller to be configured before the installation. For details, see [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#ingress-controller-configuration).
Depending on the ingress controller used

