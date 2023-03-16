---
title: "Update image tag for application"
description: ""
group: getting-started
sub-group: gitops-quick-start
toc: true
---

You will now make a change in the application manifest, and update the image tag. Because we selected auto-sync in the application settings, Argo CD detects that the live state in the cluster is out of sync with the desired state in Git, and triggers the new rollout. <!---The rollout runs the analysis template you defined (`background-analysis` in the quick start).--->

### Before you begin

* [Create resources for application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-specs/)


### Update image tag in rollout.yaml
Update the image tag in the `codefresh-guestbook` application.  

1. Go to the Git repo with `rollout.yaml`.
1. Update the image tag from `0.1` to `0.2` as in the example below.

```yaml
...
template:
  metadata:
    labels:
      app: codefresh-guestbook
  spec:
    containers:
      - image: gcr.io/heptio-images/ks-guestbook-demo:0.2
        name: codefresh-guestbook
        ports:
          - name: http
            containerPort: 80
            protocol: TCP
...
```
{:start="3"}
1. Commit the change.

### View the rollout in the GitOps Apps dashboard
When the image tag is updated, the auto-sync initiates the rollout. 

1. Go back to the [GitOps Apps dashboard](https://g.codefresh.io/2.0/applications-dashboard?sort=desc-lastUpdated){:target="\_blank"}.  
1. Select the application you created.  
  The deployment entry for the application is displayed as progressing.

    {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/cdops-app-rollout-in-dashboard.png" 
   url="/images/quick-start/cdops-app-rollout-in-dashboard.png" 
   alt="Application dashboard with rollout in progress" 
   caption="Application dashboard with rollout in progress"
   max-width="60%" 
   %} 

{:start="3"}
1. To visualize the rollout analysis, click the rollout name.

    {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/cdops-app-rollout-panel.png" 
   url="/images/quick-start/cdops-app-rollout-panel.png" 
   alt="Rollout analysis in progress" 
   caption="Rollout analysis in progress"
   max-width="60%" 
   %} 

{:start="4"}
1. To view metric validation details, expand **Background Analysis** in the panel. 

You have created and deployed an application in Codefresh. 

  