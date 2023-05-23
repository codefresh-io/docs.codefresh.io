---
title: "Codefresh On-Prem Installation & Configuration"
description: "Use Helm to install the Codefresh On-Premises platform "
group: installation
redirect_from:
  - /docs/administration/codefresh-on-prem/
  - /docs/enterprise/codefresh-on-prem/
toc: true
---


This article guides you through the installation of the Codefresh platform in your on-premises environment.  
The latest on-premises version is based on an Helm chart.  

This article summarizes the following:
* On-premises system requirements, prerequsities and installation for Helm-based on-premises installation
* Generic configuration post installation 

The installation [ReadMe](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13){:target="\_blank"} with all the information you need, including chart configuration options, is available in ArtifactHub. 



## On-premises system requirements

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |  
| --------------         | --------------           |  
|Kubernetes cluster      | Server versions v1.22+. |
|Helm                    | Versions 3.8.0+. |
|Operating systems|{::nomarkdown}<ul><li>Windows 10/7</li><li>Linux</li><li>OSX</li>{:/}|
|Git providers    |{::nomarkdown}<ul><li>GitHub: SaaS and on-premises versions</li><li>Bitbucket: SaaS and Bitbucket server (on-premises) 5.4.0 version and above</li><li>GitLab: SaaS and on-premise versions (API v4 only)</li></ul>{:/}|
|Minimum node sizes |{::nomarkdown}<ul><li>Single node: 8 CPU core and 16GB RAM</li><li>Multi node: master(s) + 3 nodes with 4 CPU core and 8GB RAM (24 GB in total)</li>{:/}|





## Prerequisites

* Service Account (SA) JSON  
  The file, `sa.json` is provided by Codefresh.  Get the file _before_ installation from `support@codefresh.io` 
* Firebase URL and secret
* Valid TLS certificates for ingress
* For external PostgreSQL, enabled `pg_cron` and `pg_partman` extensions must be enabled for pipeline analytics  




## Install the Codefresh on-premises platform

### Before you begin
Verify that you have:
* Met system requirements
* Completed the prerequisites

### Step1 : Get repo info and pull chart
Download the binary for `kcfi`. It is a single binary without dependencies.

`helm repo add codefresh http://chartmuseum.codefresh.io/codefresh`
`helm repo update`

### Step 2: Install chart

Install the chart by editing either the default `values.yaml`, or by creating an empty `cf-values.yaml` file.

1. Pass `sa.json` as a single line to `.Values.imageCredentials.password`:
```yaml
global:
  # -- Application root url. Will be used in Ingress as hostname
  appUrl: onprem.mydomain.com

  # -- Firebase URL for logs streaming.
  firebaseUrl: <>
  # -- Firebase Secret.
  firebaseSecret: <>
```
1. Specify `.Values.ingress.tls.cert` and `.Values.ingress.tls.key`, OR `.Values.ingress.tls.existingSecret`:
```yaml
ingress:
  # -- Enable the Ingress
  enabled: true
  # -- Set the ingressClass that is used for the ingress.
  # Default `nginx-codefresh` is created from `ingress-nginx` controller subchart
  ingressClassName: nginx-codefresh
  tls:
    # -- Enable TLS
    enabled: true
    # -- Default secret name to be created with provided `cert` and `key` below
    secretName: "star.codefresh.io"
    # -- Certificate (base64 encoded)
    cert: ""
    # -- Private key (base64 encoded)
    key: ""
    # -- Existing `kubernetes.io/tls` type secret with TLS certificates (keys: `tls.crt`, `tls.key`)
    existingSecret: ""
```
1. Install the chart.
   >**IMPORTANT**:  
    > Make sure to use `cf` as the Release Name.
```yaml
helm upgrade --install cf codefresh/codefresh \
    -f cf-values.yaml \
    --namespace codefresh \
    --create-namespace \
    --debug \
    --wait \
    --timeout 15m
```


## Additional post-installation configuration

After you install the Codefresh platform on-premises, you can configure the Helm chart, and configure other aspects that do not impact the Helm chart.

Chart configuration is covered in the [ReadMe in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13){:target="\_blank"}: 
* [Configure external services](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#configuring-external-services){:target="\_blank"}
* [Configure ingress-NGINX](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#configuring-ingress-nginx){:target="\_blank"}
* [Configure Application Load Balancer (ALB)](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#configuration-with-alb-application-load-balancer){:target="\_blank"}
* [Configure private registry](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#configuration-with-private-registry){:target="\_blank"}
* [Configure multi-role cf-api](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#configuration-with-multi-role-cf-api){:target="\_blank"}
* [Configure high-availability (HA)](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#high-availability){:target="\_blank"}


Generic configuration options that do not impact the chart are described below.


### Selectively enable SSO provider for account
Codefresh supports out-of-the-box Git logins with your local username and password, your Git provider, or your SSO provider if SSO is configured.

When [SSO sign-in]({{site.baseurl}}/docs/single-sign-on/single-sign-on/) is configured, as a Codefresh administrator, you can select the providers you want to enable for SSO in your organization, for both new and existing accounts.  
SSO providers that are disabled are not displayed during sign-up/sign-in.

>You can always renable an SSO provider that you disabled when needed.


1. Sign in as Codefresh admin.
1. From the left pane, select **Providers**.
1. Disable the providers not relevant for the accounts.
These providers are not displayed as options during sign-up/sign-in.
<!--- change screenshot  -->
{% include image.html
  lightbox="true"
  file="/images/administration/sso/enable-disable-providers.png"
  url="/images/administration/sso/enable-disable-providers.png"
  alt="Enable/disable providers for SSO"
  caption="Enable/disable providers for SSO"
  max-width="60%"
%}


### Retention policy for Codefresh builds
Define a retention policy to manage Codefresh builds. The retention settings are controlled through `cf-api` deployment environment variables, all of which have default settings which you can retain or customize. 

There are two mechanisms to define the retention policy. Both mechanisms are implemented as Cron jobs.
1. Legacy retention mechanism: Allows you to delete builds in chunks, and also, optionally, delete offline logs from the database. 
1. New retention mechanism: Allows you delete builds by days, and does not delete offline logs.


#### Configure retention policy for builds and logs
With this method, Codefresh by default deletes builds older than six months, including offline logs for these builds.

The retention mechanism, implemented as a Cron Job, removes data from collections such as:
* `workflowproccesses`
* `workflowrequests`
* `workflowrevisions`

{: .table .table-bordered .table-hover}
| Env Variable   | Description             | Default                |
|---------------|--------------------------- |----------------------  |
|`RETENTION_POLICY_IS_ENABLED` | Determines if automatic build deletion through the Cron job is enabled.         | `true`                 |
|`RETENTION_POLICY_BUILDS_TO_DELETE`| The maximum number of builds to delete by a single Cron job. To avoid database issues, especially when there are large numbers of old builds, we recommend deleting them in small chunks. You can gradually increase the number after verifying that performance is not affected.  | `50`                  |
|`RETENTION_POLICY_DAYS`         | The number of days for which to retain builds. Builds older than the defined retention period are deleted.                                  | `180`              |
|`RUNTIME_MONGO_URI`             | Optional. The URI of the Mongo database from which to remove MongoDB logs (in addition to the builds). |              |

#### Configure TTL-based retention policy for builds

The TTL-based retention mechanism is implemented as a Cron job, and deletes data from the `workflowprocesses` collection. Build logs are not deleted.

>**IMPORTANT**:  
  > * For existing environments, for the retention mechanism to work, you must first drop the index in MongoDB. This requires a maintenance window that depends on the number of builds to be deleted, approximately three hours per MongoDB node.
  >* If you have more than one `cf-api`, you must update the configuration for all of them.

{: .table .table-bordered .table-hover}
| Env Variable   | Description             | Default                |
|---------------|--------------------------- |----------------------  |
|`TTL_RETENTION_POLICY_IS_ENABLED` | Determines if automatic build deletion through the Cron job is enabled.         | `false`                 |
|`TTL_RETENTION_POLICY_IN_DAYS`    | The number of days for which to retain builds, and can be between `30` (minimum) and `365` (maximum). Builds older than the defined retention period are deleted.  | `365`              |



1. (Optional) For existing environments: 
    1. In MongoDB, drop the index on `created` field in `workflowprocesses` collection.
1. In `cf-api`, add to `env`:
    1. `TTL_RETENTION_POLICY_IS_ENABLED` set to `true`.
    1. `TTL_RETENTION_POLICY_IN_DAYS`.
1. Verify that the `created` field in the `workflowprocesses` collection has a new index.   
1. Restart `cf-api`.




## Cluster & external storage reference

Codefresh uses both cluster storage (volumes) and external storage.

### Databases

The following table displays the list of databases created as part of the on-premises installation:

| Database | Purpose | Latest supported version |
|----------|---------| ---------------|
| `mongoDB` | Stores all account data (account settings, users, projects, pipelines, builds etc.) | 4.2.x |
| `postgresql` | Stores data about events for the account (pipeline updates, deletes, etc.). The audit log uses the data from this database. | 13.x |
| `redis` | Used for caching, and as a key-value store for trigger manager. | 6.0.x |

### Volumes

These are the volumes required for Codefresh on-premises:


{: .table .table-bordered .table-hover}
| Name           | Purpose                | Minimum Capacity | Can run on netfs (nfs, cifs) |
|----------------|------------------------|------------------|------------------------------|
| cf-mongodb*    | Main database - Mongo  | 8GB              | Yes**                        |
| cf-postgresql* | Events databases - Postgres | 8GB         | Yes**                        |
| cf-rabbitmq*   | Message broker         | 8GB              | No**                         |
| cf-redis*      | Cache                  | 8GB              | No**                         |
| cf-store       | Trigger Redis data     | 8GB              | No**                         |
| cf-cronus      | Trigger crontab data   | 1GB              | Yes                          |
| datadir-cf-consul-0 | Consul datadir    | 1GB              | Yes                          |
| cf-chartmuseum | chartmuseum            | 10GB             | Yes                          |
| cf-builder-0   | /var/lib/docker for builder | 100GB       | No***                        |
| cf-runner-0    | /var/lib/docker for composition runner | 100GB | No***                   |

{% raw %}

 (*) Possibility to use external service

 (**) Running on netfs (nfs, cifs) is not recommended by product admin guide

 (***) Docker daemon can be run on block device only

{% endraw %}

StatefulSets (`cf-builder` and `cf-runner`) process their data on separate physical volumes (PVs) and can be claimed using Persistent Volume Claims (PVCs) with default initial sizes of 100Gi. Also, those StatefulSets have the ability to connect to existing pre-defined PVCs.

The default initial volume size (100 Gi) can be overridden in the custom `config.yaml` file. Values descriptions are in the `config.yaml` file.
The registry’s initial volume size is 100Gi. It also can be overridden in a custom `config.yaml` file. There is a possibility to use a customer-defined registry configuration file (`config.yaml`) that allows using different registry storage back-ends (S3, Azure Blob, GCS, etc.) and other parameters. More details can be found in the [Docker documentation](https://docs.docker.com/registry/configuration/).

Depending on the your Kubernetes version, we can assist with PV resizing. Details are can be found in this [Kubernetes blog post](https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/).

### Automatic Volume Provisioning

Codefresh installation supports automatic storage provisioning based on the standard Kubernetes dynamic provisioner Storage Classes and Persistent Volume Claims. All required installation volumes will be provisioned automatically using the default Storage Class or custom Storage Class that can be specified as a parameter in `config.yaml` under `storageClass: my-storage-class`.








### Configure CSP (Content Security Policy)
Add CSP environment variables to `config.yaml`, and define the values to be returned in the CSP HTTP headers.
```yaml
cfui:
  env:
    CONTENT_SECURITY_POLICY: "<YOUR SECURITY POLICIES>"
    CONTENT_SECURITY_POLICY_REPORT_ONLY: "default-src 'self'; font-src 'self'
      https://fonts.gstatic.com; script-src 'self' https://unpkg.com https://js.stripe.com;
      style-src 'self' https://fonts.googleapis.com; 'unsafe-eval' 'unsafe-inline'"
    CONTENT_SECURITY_POLICY_REPORT_TO: "<LIST OF ENDPOINTS AS JSON OBJECTS>"
```
`CONTENT_SECURITY_POLICY` is the string describing content policies. Use semi-colons to separate between policies.
`CONTENT_SECURITY_POLICY_REPORT_TO` is a comma-separated list of JSON objects. Each object must have a name and an array of endpoints that receive the incoming CSP reports.

For detailed information, see the [Content Security Policy article on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### Enable x-hub-signature-256 signature for GitHub AE
Add the `USE_SHA256_GITHUB_SIGNATURE` environment variable to **cfapi** deployment in `config.yaml`.
```yaml
cfapi:
  env:
    USE_SHA256_GITHUB_SIGNATURE: "true"
```

For detailed information, see the [Securing your webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks) and [Webhooks](https://docs.github.com/en/github-ae@latest/rest/webhooks).

### Configure custom Root CA for volumes and containers
Reference the K8s secret containing the root CA in `config.yaml`.
Define the volume or volumes with the K8s secret objects, and then the volume mounts for the container.

 
>Requires on-premises version 1.4.6 or higher.

**Before you begin**  
Make you have a K8s secret containing the CA

**How to**  

1. Add the following to the `global` section:

```yaml
global:
  env:
    NODE_EXTRA_CA_CERTS: /etc/ssl/custom/ca.crt  

  volumes:
    custom-ca: 
      enabled: true
      type: secret
      existingName: my-custom-ca-cert #replace with the name of K8s secret object with the CA cert
      optional: true

  container:
    volumeMounts:
      custom-ca: 
        path:
        - mountPath: /etc/ssl/custom/ca.crt 
          subPath: ca.crt
```







## App Cluster Autoscaling

Autoscaling in Kubernetes is implemented as an interaction between Cluster Autoscaler and Horizontal Pod Autoscaler

{: .table .table-bordered .table-hover}
|             | Scaling Target| Trigger | Controller | How it Works |
| ----------- | ------------- | ------- | ---------  | --------- |
| [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler)| Nodes | **Up:** Pending pod <br/> **Down:** Node resource allocations is low | On GKE we can turn on/off autoscaler and configure min/max per node group can be also installed separately | Listens on pending pods for scale up and node allocations for scaledown. Should have permissions to call cloud api. Considers pod affinity, pdb, storage, special annotations |
| [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) | replicas on deployments or StatefulSets | metrics value thresholds defined in HPA object | part of Kubernetes controller | Controller gets metrics from "metrics.k8s.io/v1beta1" , "custom.metrics.k8s.io/v1beta1", "external.metrics.k8s.io/v1beta1" requires [metrics-server](https://github.com/kubernetes-sigs/metrics-server) and custom metrics adapters ([prometheus-adapter](https://github.com/kubernetes-sigs/prometheus-adapter), [stackdriver-adapter](https://github.com/GoogleCloudPlatform/k8s-stackdriver/tree/master/custom-metrics-stackdriver-adapter)) to listen on this API (see note (1) below) and adjusts deployment or sts replicas according to definitions in  HorizontalPodAutocaler <br/> There are v1 and beta api versions for HorizontalPodAutocaler: <br/> [v1](https://github.com/kubernetes/api/blob/master/autoscaling/v1/types.go) - supports  for resource metrics (cpu, memory) - `kubect get hpa` <br/> [v2beta2](https://github.com/kubernetes/api/blob/master/autoscaling/v2beta2/types.go)  and [v2beta1](https://github.com/kubernetes/api/blob/master/autoscaling/v2beta1/types.go) - supports for both resource and custom metrics - `kubectl get hpa.v2beta2.autoscaling` **The metric value should decrease on adding new pods.** <br/> *Wrong metrics Example:* request rate <br/> *Right metrics Example:* average request rate per pod |

Note (1)
```
kubectl get apiservices | awk 'NR==1 || $1 ~ "metrics"'
NAME                                   SERVICE                                      AVAILABLE   AGE
v1beta1.custom.metrics.k8s.io          monitoring/prom-adapter-prometheus-adapter   True        60d
v1beta1.metrics.k8s.io                 kube-system/metrics-server                   True        84d
```


**Implementation in Codefresh**

* Default “Enable Autoscaling” settings for GKE
* Using [prometheus-adapter](https://github.com/kubernetes-sigs/prometheus-adapter) with custom metrics

We define HPA for cfapi and pipeline-manager services

**CFapi HPA object**

It's based on three metrics (HPA controller scales of only one of the targetValue reached):

```
kubectl get hpa.v2beta1.autoscaling cf-cfapi -oyaml
```

{% highlight yaml %}
{% raw %}
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  annotations:
    meta.helm.sh/release-name: cf
    meta.helm.sh/release-namespace: default
  labels:
    app.kubernetes.io/managed-by: Helm
  name: cf-cfapi
  namespace: default
spec:
  maxReplicas: 16
  metrics:
  - object:
      metricName: requests_per_pod
      target:
        apiVersion: v1
        kind: Service
        name: cf-cfapi
      targetValue: "10"
    type: Object
  - object:
      metricName: cpu_usage_avg
      target:
        apiVersion: apps/v1
        kind: Deployment
        name: cf-cfapi-base
      targetValue: "1"
    type: Object
  - object:
      metricName: memory_working_set_bytes_avg
      target:
        apiVersion: apps/v1
        kind: Deployment
        name: cf-cfapi-base
      targetValue: 3G
    type: Object
  minReplicas: 2
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cf-cfapi-base
{% endraw%}
{% endhighlight %}

* `requests_per_pod` is based on  `rate(nginx_ingress_controller_requests)` metric ingested from nginx-ingress-controller
* `cpu_usage_avg` based on cadvisor (from kubelet) rate `(rate(container_cpu_user_seconds_total)`
* `memory_working_set_bytes_avg` based on cadvisor `container_memory_working_set_bytes`

**pipeline-manager HPA**

based on `cpu_usage_avg`

{% highlight yaml %}
{% raw %}
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  annotations:
    meta.helm.sh/release-name: cf
    meta.helm.sh/release-namespace: default
  labels:
    app.kubernetes.io/managed-by: Helm
  name: cf-pipeline-manager
spec:
  maxReplicas: 8
  metrics:
  - object:
      metricName: cpu_usage_avg
      target:
        apiVersion: apps/v1
        kind: Deployment
        name: cf-pipeline-manager-base
      targetValue: 400m
    type: Object
  minReplicas: 2
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cf-pipeline-manager-base
{% endraw%}
{% endhighlight %}

**prometheus-adapter configuration**

Reference: [https://github.com/DirectXMan12/k8s-prometheus-adapter/blob/master/docs/config.md](https://github.com/DirectXMan12/k8s-prometheus-adapter/blob/master/docs/config.md
)

{% highlight yaml %}
{% raw %}
Rules:
  - metricsQuery: |
      kube_service_info{<<.LabelMatchers>>} * on() group_right(service)
        (sum(rate(nginx_ingress_controller_requests{<<.LabelMatchers>>}[2m]))
          / on() kube_deployment_spec_replicas{deployment='<<index .LabelValuesByName "service">>-base',namespace='<<index .LabelValuesByName "namespace">>'})
    name:
      as: requests_per_pod
      matches: ^(.*)$
    resources:
      overrides:
        namespace:
          resource: namespace
        service:
          resource: service
    seriesQuery: kube_service_info{service=~".*cfapi.*"}
  - metricsQuery: |
      kube_deployment_labels{<<.LabelMatchers>>} * on(label_app) group_right(deployment)
        (label_replace(
          avg by (container) (rate(container_cpu_user_seconds_total{container=~"cf-(tasker-kubernetes|cfapi.*|pipeline-manager.*)", job="kubelet", namespace='<<index .LabelValuesByName "namespace">>'}[15m]))
        , "label_app", "$1", "container", "(.*)"))
    name:
      as: cpu_usage_avg
      matches: ^(.*)$
    resources:
      overrides:
        deployment:
          group: apps
          resource: deployment
        namespace:
          resource: namespace
    seriesQuery: kube_deployment_labels{label_app=~"cf-(tasker-kubernetes|cfapi.*|pipeline-manager.*)"}
  - metricsQuery: "kube_deployment_labels{<<.LabelMatchers>>} * on(label_app) group_right(deployment)\n
      \ (label_replace(\n    avg by (container) (avg_over_time (container_memory_working_set_bytes{container=~\"cf-.*\",
      job=\"kubelet\", namespace='<<index .LabelValuesByName \"namespace\">>'}[15m]))\n
      \ , \"label_app\", \"$1\", \"container\", \"(.*)\"))\n  \n"
    name:
      as: memory_working_set_bytes_avg
      matches: ^(.*)$
    resources:
      overrides:
        deployment:
          group: apps
          resource: deployment
        namespace:
          resource: namespace
    seriesQuery: kube_deployment_labels{label_app=~"cf-.*"}
  - metricsQuery: |
      kube_deployment_labels{<<.LabelMatchers>>} * on(label_app) group_right(deployment)
        label_replace(label_replace(avg_over_time(newrelic_apdex_score[15m]), "label_app", "cf-$1", "exported_app", '(cf-api.*|pipeline-manager|tasker-kuberentes)\\[kubernetes\\]'), "label_app", "$1cfapi$3", "label_app", '(cf-)(cf-api)(.*)')
    name:
      as: newrelic_apdex
      matches: ^(.*)$
    resources:
      overrides:
        deployment:
          group: apps
          resource: deployment
        namespace:
          resource: namespace
    seriesQuery: kube_deployment_labels{label_app=~"cf-(tasker-kubernetes|cfapi.*|pipeline-manager)"}
{% endraw%}
{% endhighlight %}

**How to define HPA in Codefresh installer (kcfi) config**

Most of Codefresh's Microservices subcharts contain `templates/hpa.yaml`:

{% highlight yaml %}
{% raw %}
{{- if .Values.HorizontalPodAutoscaler }}
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name:  {{ template "cfapi.fullname" . }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ template "cfapi.fullname" . }}-{{ .version | default "base" }}
  minReplicas: {{ coalesce .Values.HorizontalPodAutoscaler.minReplicas .Values.replicaCount 1 }}
  maxReplicas: {{ coalesce .Values.HorizontalPodAutoscaler.maxReplicas .Values.replicaCount 2 }}
  metrics:
{{- if .Values.HorizontalPodAutoscaler.metrics }}
{{ toYaml .Values.HorizontalPodAutoscaler.metrics | indent 4 }}
{{- else }}
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 60
{{- end }}
{{- end }}
{% endraw%}
{% endhighlight %}

To configure HPA for CFapi add `HorizontalPodAutoscaler` values to config.yaml, for example:

(assuming that we already have prometheus adapter configured for metrics `requests_per_pod`, `cpu_usage_avg`, `memory_working_set_bytes_avg`)

{% highlight yaml %}
{% raw %}
cfapi:
  replicaCount: 4
  resources:
    requests:
      memory: "4096Mi"
      cpu: "1100m"
    limits:
      memory: "4096Mi"
      cpu: "2200m"
  HorizontalPodAutoscaler:
    minReplicas: 2
    maxReplicas: 16
    metrics:
    - type: Object
      object:
        metricName: requests_per_pod
        target:
          apiVersion: "v1"
          kind: Service
          name: cf-cfapi
        targetValue: 10
    - type: Object
      object:
        metricName: cpu_usage_avg
        target:
          apiVersion: "apps/v1"
          kind: Deployment
          name: cf-cfapi-base
        targetValue: 1
    - type: Object
      object:
        metricName: memory_working_set_bytes_avg
        target:
          apiVersion: "apps/v1"
          kind: Deployment
          name: cf-cfapi-base
        targetValue: 3G
{% endraw%}
{% endhighlight %}

**Querying metrics (for debugging)**

CPU Metric API Call

```
kubectl get --raw /apis/metrics.k8s.io/v1beta1/namespaces/codefresh/pods/cf-cfapi-base-****-/ | jq
```

Custom Metrics Call

```
kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1/namespaces/codefresh/services/cf-cfapi/requests_per_pod | jq
```




