---
layout: docs
title: "How to Create GKE Cluster?"
description: ""
group: deploy-to-kubernetes
redirect_from:
  - /docs/how-to-create-gke-cluster
toc: true
old_url: /docs/how-to-create-gke-cluster
was_hidden: true
---

{% include image.html 
lightbox="true" 
file="/images/dfdf973-Kubernetes_logos.png" 
url="/images/dfdf973-Kubernetes_logos.png" 
alt="Kubernetes logos" 
max-width="40%" 
%}

## 1. Create Google Account
If you don't have Google account, you can create it from [here](https://accounts.google.com/SignUp)
 
## 2. Create Project
Sign in to [Google Cloud Console](https://console.cloud.google.com/)

## 3. Get access to Google Cloud resources

{:.text-secondary}
### Enable [Billing](https://console.cloud.google.com/billing)
* If you are a new user, you will get $300 credit on your sign up
* Notice that you are paying for running resources. Therefore, If you are not planning to use them after this tutorial, it is suggested to delete them.
* For more information - Check GKE pricing

{:.text-secondary} 
### Enable [Container Engine API](https://console.cloud.google.com/apis/api/container/overview)

{:.text-secondary}
### Enable [Compute Engine API](https://console.cloud.google.com/apis/api/compute_component/overview) 

## 4. Create your cluster"
To create a Kubernetes cluster, visit this [short guide](https://cloud.google.com/container-engine/docs/quickstart).
