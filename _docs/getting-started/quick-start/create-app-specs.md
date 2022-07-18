---
title: "Create resources for codefresh-guestbook"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---

Before you can create an application in Codefresh, you need to create the resources used by the application:

1. Install Argo Rollouts on the target cluster to which you will deploy the application
1. `Rollout` resource defining the deployment strategy 
1. Service resource to expose the application to external traffic
1. Analysis Template resource defining the validation requirements before deployment

### Install Argo Rollouts on the target cluster
To apply the `Rollout` resource for the application, you must have Argo Rollouts installed on the target cluster. If not installed, follow the steps to install Argo Rollouts.

1. In the Codefresh UI, go to [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Select **Topology View**.
1. Select the target cluster, and then select **+ Install Argo Rollouts**.

{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/cdops-app-install-rollout.png" 
   url="/images/getting-started/quick-start/cdops-app-install-rollout.png" 
   alt="Install Argo Rollouts on target cluster" 
   caption="Install Argo Rollouts on target cluster"
   max-width="50%" 
   %}

### Create folder in Git for application resources
Create a folder in the Git repo in which to save all the resources. 

* In your Git repo, create a folder to store the resources needed to deploy the application.  

  For example, `/quick-start/`

### Create rollout.yaml

Create a rollout resource for the application you want to deploy.  
  

To leverage Argo Rollout's deployment capabilities, we are using the Argo's Rollout resource instead of the native Kubernetes Deployment object.
For detailed information on the fields you can define, see [Argo Rollout specification](https://argoproj.github.io/argo-rollouts/features/specification/){:target="\_blank"}. 


* In the Git repository create the `rollout.yaml` file, as in the example below.


```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: codefresh-guestbook-rollout
spec:
  replicas: 4
  revisionHistoryLimit: 2
  selector:
    matchLabels:
      app: codefresh-guestbook
  template:
    metadata:
      labels:
        app: codefresh-guestbook
    spec:
      containers:
        - image: gcr.io/heptio-images/ks-guestbook-demo:0.1
          name: codefresh-guestbook
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
  minReadySeconds: 30
  strategy:
    canary:
      analysis:
        templates:
          - templateName: background-analysis
        startingStep: 1
      steps:
        - setWeight: 25
        - pause: {duration: 20s}
        - setWeight: 75
        - pause: {duration: 15s}
```

####  Fields in `rollout.yaml`

{: .table .table-bordered .table-hover}
|  Rollout Field                             | Notes        |  
| --------------                     | -------------|  
| `replicas`                         | When deployed, the rollout creates four replicas of the `codefresh-guestbook` application.|  
| `revisionHistoryLimit`             | The number of replica sets to retain.  |      
| `matchLabels`                      | The pods to select for this rollout. In our example, all pods with the label `codefresh-guestbook` are selected.|      
| `image`                            | The container image for the application with the version tag, `gcr.io/heptio-images/ks-guestbook-demo:0.1` in our example.|                             
| `name`                             | The name of the application, `codefresh-guestbook` in our example. |       
| `canary`                           | The deployment strategy, `canary` meaning that the traffic is gradually routed to the new application. Starting with `setWeight` of `25%` followed by a `pause` of 20 seconds, and the remaining `75%` after verification.|  
| `templateName`                      | The analysis template used to validate the application metrics. Our example has the `background-analysis` template, and interfaces with Prometheus to monitor and validate metric thresholds.|  


### Create a service resource
Create a service resource to expose your application to external traffic. 

* Create a `service.yaml` resource for the application you want to deploy, as in the example below.  
  > Create it in the same folder in which you saved `rollout.yaml`. 

```yaml
apiVersion: v1
kind: Service
metadata:
  name: codefresh-guestbook-svc
spec:
  ports:
    - port: 8080
      targetPort: 80
  selector:
    app: codefresh-guestbook # must be the same as the selector defined in rollouts.yaml
  type: LoadBalancer
```

####  Fields in `service.yaml`

{: .table .table-bordered .table-hover}
|  Service field            |  Notes |  
| --------------            | --------------           |  
| `spec.ports`              | The internal `port`, 8080 in our example, and external `targetPort`, 80 in our example.| 
| `selector.app`            | The pods to select, and MUST be identical to that defined in `rollouts.yaml`, `codefresh-guestbook` in our example.| 

### Create an AnalysisTemplate for rollout validation
Create an `AnalysisTemplate` resource to validate that your changes conform to the requirements before deployment. This is the final resource you need before you can create the application.

The name of the `AnalysisTemplate` in the quick start example is `background-analysis`. The template interfaces with Prometheus as the third-party metric provider to validate metrics.  

You can use any third-party metric provider supported by Argo Rollouts, such as Prometheus, Datadog, Wavefront, and more. Read the official documentation on [Analysis section in Argo Rollouts](https://argoproj.github.io/argo-rollouts/){:target="\_blank"}. 


* In the Git repository create the `analysisTemplate.yaml` file, as in the example below.


```yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: background-analysis
spec:
  metrics:
    - name: prometheus-metric
      count: 4
      interval: 5s
      successCondition: result[0] >= 100
      failureLimit: 1
      provider:
        prometheus:
          address: http://a95910c83807a4089a2458554bf5c21e-1864259807.us-east-1.elb.amazonaws.com:9090
          query: |
            sum(argocd_app_reconcile_sum)
```

####  Fields in `analysisTemplate.yaml`

{: .table .table-bordered .table-hover}
|  Analysis Template field            |  Notes |  
| --------------            | --------------           |  
| `count`                   | The total number of measurements taken, `4` in our example.| 
| `interval`                | The interval between measurement samplings, `5s` in our example.| 
| `successCondition`        | The requirement for the rollout to be considered a success. In our example, the resulting metric value must be equal to or greater than 100.|
| `failureLimit`            | The maximum number of failures permitted, `1` in our example. If the metric value is below 100 more than once, the rollout is aborted.|
| `query`                   | The query submitted to the Prometheus server.|

You are now ready to create the application in Codefresh. 

### What to do next
[Create the codefresh-guestbook application]({{site.baseurl}}/docs/getting-started/quick-start/create-app-ui)