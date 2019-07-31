---
title: "Create GKE Cluster"
description: "Create Kubernetes cluster on Google Cloud platform"
excerpt: "Create Kubernetes cluster on Google Cloud platform"
group: deploy-to-kubernetes
#sub_group: getting-started-with-gke
sub_group: get-ready-to-deploy
# hack/workaround for sub elements, because parent has permalink
permalink: /:collection/deploy-to-kubernetes/get-ready-to-deploy/create-cluster/
toc: true
---

{% include image.html 
lightbox="true" 
file="/images/2975abe-Kubernetes_logos.png" 
url="/images/2975abe-Kubernetes_logos.png" 
alt="Kubernetes logos" 
max-width="40%" 
%}
 
## 1. Create Google Account
If you don't have Google account, you can create it from [here](https://accounts.google.com/SignUp){:target="_blank"}.
 
## 2. Create Project
Sign in to [Google Cloud Console](https://console.cloud.google.com/){:target="_blank"} and select an existing project or create a new one:

{% include image.html 
lightbox="true" 
file="/images/0a523a6-Screen_Shot_2017-08-08_at_4.30.39_PM.png" 
url="/images/0a523a6-Screen_Shot_2017-08-08_at_4.30.39_PM.png" 
alt="Screen Shot 2017-08-08 at 4.30.39 PM.png" 
max-width="40%" 
%}

## 3. Get access to Google Cloud resources
 
Enable [Billing](https://console.cloud.google.com/billing){:target="_blank"}:

* Notice that you are paying for running resources. Therefore, If you are not planning to use them after this tutorial, it is suggested to delete them.
* For more information - Check [GKE pricing](https://cloud.google.com/kubernetes-engine/pricing){:target="_blank"}.
 
Enable [Container Engine API](https://console.cloud.google.com/apis/api/container/overview){:target="_blank"}.

Enable [Compute Engine API](https://console.cloud.google.com/apis/api/compute_component/overview){:target="_blank"}.



{{site.data.callout.callout_info}}
If you are a new user, you will get $500 credit. You need to create a Kubernetes cluster on Google Cloud and connect it to Codefresh to be eligible. After the cluster is connected to your Codefresh account you will receive an email prompting you to apply and claim your credits. 

Follow the link in the email to fill in the application. You will receive your free credits
as soon as Google approves it. The process usually takes a couple of days. Make sure to look in your spam folder if you can't see the email in your mailbox.

{{site.data.callout.end}}

## 4. Create your cluster

To create a Kubernetes cluster, visit this [short guide](https://cloud.google.com/container-engine/docs/quickstart).

Don't forget to enable basic authentication, as it is needed for Codefresh to access your cluster.
You can change this setting after cluster creation
by editing and changing the setting from the drop-down list.

{% include image.html
  lightbox="true"
  file="/images/kubernetes/add-cluster/gke-basic-auth.png"
  url="/images/kubernetes/add-cluster/gke-basic-auth.png"
  alt="Enabling GKE basic authentication"
  caption="Enabling GKE basic authentication"
  max-width="60%"
    %}

{{site.data.callout.callout_info}}
##### Verify your Kubernetes version

1. Ensure that you are running the latest version of Kubernetes
2. Ensure that your Permissions are at least "Project Editor"

If you create a new project/cluster, these whould be the default settings. 
{{site.data.callout.end}}
