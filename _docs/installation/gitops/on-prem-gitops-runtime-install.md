---
title: "On-premises GitOps Runtime installation"
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
  cf-gitops-runtime/gitops-runtime 
{% endhighlight %}
 
  where:  
  * `<namespace>` (required) is the namespace in which to install the Hybrid GitOps Runtime on-premises, either `codefresh`, or any custom name.  
  * `<codefresh-token>` (required) is the API token you have generated in Codefresh. You can use existing token, or [generate a new API token]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#create-and-manage-api-keys).
  * `<runtime-name>` (required) is the name of the runtime, either `codefresh`, or any custom name. 
  * `<on-prem-url>`(required) is the URL of your platform, for example, `https://codefresh-onprem.com`.
  * `<ingress-host>` (required) is the hostname used to access the runtime _without `https://`_.  Make sure the `"global.runtime.ingress.hosts[0]"` is within double quotes.
  * `global.runtime.ingress.enabled="true"` (required) value must be _within double quotes_.
  

## Values file for on-prem GitOps Runtime

Here's an example of the `values.yaml` for installing the GitOps Runtime on-premises. 

```yaml
global:
  codefresh:
    url: https://codefresh-onprem.com  ## required, replace with your platform URL
    

    userToken:
      token: 16363747847837838757885898 ## required, use an existing Codefresh API token or generate a new one

  runtime:
    name: noamg-runtime

    ingress:                                   # on-prem supports only ingress-based
      enabled: true
      hosts:
      - codefresh.ingress-host.com   ## required, replace with host used to access the runtime without `https://`

app-proxy:
  config:
    cors: https://codefresh-onprem.com  ## required, must be identical to platform URL
```

## Mirroring Helm chart in on-premises/air-gapped environments
_After installing the GitOps On-premises Runtime_ in on-premises or air-gapped environments, you can manage it as an Argo Application to establish GitOps as the single source of truth for the Runtime. You can monitor the health and synchronization statuses of your Runtime components.  

To manage the on-premises GitOps Runtime as an Argo Application, you need to:
* **Mirror** the Helm chart to a repository that can be accessed by `app-proxy`
* **Set an environment variable** in the `values` file in `.values.app-proxy` to reference the mirrored Helm repository, as shown in the example below.

{% highlight yaml %}
{% raw %}
...
app-proxy:
  env:
    HELM_REPOSITORY: https://codefresh-airgapped-helm-repo.s3.amazonaws.com/gitops-runtime
...
{% endraw %}
{% endhighlight %}



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
## Custom certificates for on-premises installations
For on-premises installations, you may need to configure custom platform and repository certificates:  
* **Platform** certificates are required for GitOps Runtimes to communicate with the Codefresh platform. 
* **Repository** certificates are required to authenticate users to on-premises Git servers. 

### Platform certificates

1. Get your certificate:

```yaml
HOST=codefresh-onprem.com # put in the hostname of your on-prem platform, without a schema
openssl s_client \
  -showcerts \
  -connect ${HOST}:443 \
  -servername ${HOST} \
  </dev/null 2>/dev/null \
  | awk '/^-----BEGIN CERTIFICATE-----$/,/^-----END CERTIFICATE-----$/ { print }'
```

{:start="2"}
1. Include them in `.values.global`. You can either reference an existing secret or create a new secret directly within the file.  
All certificates must be below `content: |`.

```yaml
global:
  codefresh:
    tls:
      caCerts:
        # optional - use an existing secret that contains the cert
        # secretKeyRef:
        #   name: my-certificate-secret
        #   key: ca-bundle.crt
        # or create "codefresh-tls-certs" secret
        secret:
          create: true
          content: |
            -----BEGIN CERTIFICATE-----
            ...
            -----END CERTIFICATE-----
```


### Repository certificates 
Add repository certificates to your Codefresh `values` file, in `.values.argo-cd`. These values are used by the argo-cd Codefresh deploys. 
For details on adding repository certificates, see this [section](https://github.com/codefresh-io/argo-helm/blob/argo-cd-5.29.2-cap-CR-18430/charts/argo-cd/values.yaml#LL336C7-L336C7){:target="\_blank"}.


```yaml
argo-cd:
  configs:
    tls:
      certificates:
        server.example.com: |
          -----BEGIN CERTIFICATE-----
          ...
          -----END CERTIFICATE-----
```

## Ingress controller configuration 
Ingress-based on-premises GitOps Runtimes require an ingress controller to be configured before the installation. For details, see [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#ingress-controller-configuration).
Depending on the ingress controller used, you may need post-installation configuration as well.


## Related articles
[Managing and monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)  
[On-premises platform architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-architecture)  
