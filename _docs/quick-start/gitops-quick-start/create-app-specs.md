---
title: "Create & commit resources for `codefresh-guestbook` application"
description: ""
group: getting-started
sub-group: gitops-quick-start
toc: true
---

Now that you have created `codefresh-guestbook` as an Argo CD application, you need to deploy it. Let's deploy the `codefresh-guestbook` application by creating and committing resources.  
You will create and commit the following resources:  
1. A folder in Git to save resources for the application 
1. `Rollout` resource defining the deployment strategy 
1. `Service` resource to expose the application to external traffic

### Before you begin
* [Create `codefresh-guestbook` Argo CD application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-ui/)  
* Make sure [Argo Rollouts is installed]({{site.baseurl}}/docs/deployments/gitops/install-argo-rollouts/) on the target cluster

### Create folder in Git for application resources
Create a folder in the Git repo in which to save all the resources for the `codefresh-guestbook` application. 

* In your Git repo, create a folder to store the resources needed to deploy the application.  
  For example, `/quick-start/`

### Create rollout.yaml

Create a rollout resource for the application you want to deploy.  
  

To leverage Argo Rollouts' deployment capabilities, we are using the Argo's `rollout` resource instead of the native Kubernetes Deployment object.
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

### View application resources in Codefresh
Once you create and commit the `rollout` and `service` resources, return to the GitOps Apps dashboard. After selecting the application, the Current State tab displays the application's resources.

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard?sort=desc-lastUpdated){:target="\_blank"}.  
1. Select the application. 
  The Current State tab is now populated with the `rollout` and `service` resources you added. 

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/cdops-app-current-state.png" 
   url="/images/getting-started/quick-start/cdops-app-current-state.png" 
   alt="Current State with resources for application" 
   caption="Current State with resources for application"
   max-width="70%" 
   %}

### What to do next
[(Optional) Update image tag for Argo CD application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-rollout/)