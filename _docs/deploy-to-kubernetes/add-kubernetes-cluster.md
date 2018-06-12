---
title: "Add Kubernetes Cluster"
description: ""
group: deploy-to-kubernetes
permalink: /:collection/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/
redirect_from:
  - /docs/adding-non-gke-kubernetes-cluster
  - /docs/adding-non-gke-kubernetes-cluster/
toc: true
---
  
On your Account settings, go to the **Integration** tab and choose **Kubernetes**.

{% include image.html
  lightbox="true"
  file="/images/c7b958e-Screen_Shot_2017-10-23_at_7.31.49_PM.png"
  url="/images/c7b958e-Screen_Shot_2017-10-23_at_7.31.49_PM.png"
  alt="Screen Shot 2017-10-23 at 7.31.49 PM.png"
  max-width="40%"
    %}

In the Kubernetes integration window, you will be able to add a cluster from known providers such as GKE or by manually adding your cluster settings.

{:.text-secondary}
## Adding GKE Cluster
Adding a cluster in GKE can be done by clicking the **Add cluster** button under **Google Cloud Provider** and selecting the desired project and cluster.

If this is your first time you'll be prompted to authenticate using your google credentials, make sure you're doing so with a user that have access to your GKE projects.


{{site.data.callout.callout_info}}

If you are a new customer of Google Cloud, you are also eligible to receive a Codefresh offer to get up to $500 in Google credits. As soon at the GKE integration is complete within Codefresh, you will get an email with extra details on how to claim your credits. 

Follow the link in the email to fill in an application for the free credits. Once Google approves the application (usually within 1-2 days) your credits will be available to your account. Make sure to check your spam folder for that email.

{{site.data.callout.end}}

{:.text-secondary}
## Adding any other cluster type (not dependent on any provider)
  
In order to add any other type of cluster, outside of GKE, use **Custom Providers**

{% include image.html
lightbox="true"
file="/images/eb1795e-codefresh_add_custom_cluster.png"
url="/images/eb1795e-codefresh_add_custom_cluster.png"
alt="codefresh_add_custom_cluster.png"
max-width="40%"
  %}
  
The integration between Codefresh and your Kubernetes cluster is API based and relies on a Kubernetes service account of your choosing that will be used to manage the integration.

The configurations you'll be required to add are:

{:start="1"}
1. Name - Any name of your choosing, that will represent your cluster context in Codefresh.
 
{:start="2"}
2. Host - The endpoint for your Kubernetes API

{:start="3"} 
3. Certificate - The Kubernetes service account certificate used for the integration with Codefresh

{:start="4"}
4. Token - The Kubernetes service account token used for the integration with Codefresh

{% include image.html
  lightbox="true"
  file="/images/6e92733-Screen_Shot_2017-10-16_at_9.40.32_PM.png"
  url="/images/6e92733-Screen_Shot_2017-10-16_at_9.40.32_PM.png"
  alt="Screen Shot 2017-10-16 at 9.40.32 PM.png"
  max-width="40%"
    %}
    
 In the section below we'll provide you with easy instructions how to get all your cluster configurations in order to add it to Codefresh.   

### Get cluster configurations

Copy and paste the below commands into your local shell, then save the outputs and paste them into Codefresh. The commands rely on kubectl so make sure it is configured against your cluster.

{{site.data.callout.callout_info}}
##### More than one cluster in kubeconfig?

  Before starting, make sure that you local context is the one you'de like to add to Codefresh.<br>
Switch to the desired context before continue
{{site.data.callout.end}}

`Host IP`
{% highlight shell %}
{% raw %}
export CURRENT_CONTEXT=$(kubectl config current-context) && export CURRENT_CLUSTER=$(kubectl config view -o go-template="{{\$curr_context := \"$CURRENT_CONTEXT\" }}{{range .contexts}}{{if eq .name \$curr_context}}{{.context.cluster}}{{end}}{{end}}") && echo $(kubectl config view -o go-template="{{\$cluster_context := \"$CURRENT_CLUSTER\"}}{{range .clusters}}{{if eq .name \$cluster_context}}{{.cluster.server}}{{end}}{{end}}")
{% endraw %}
{% endhighlight %}

`Certificate`
{% highlight shell %}
{% raw %}
echo $(kubectl get secret -o go-template='{{index .data "ca.crt" }}' $(kubectl get sa default -o go-template="{{range .secrets}}{{.name}}{{end}}"))
{% endraw %}
{% endhighlight %}

`Token`
{% highlight shell %}
{% raw %}
echo $(kubectl get secret -o go-template='{{index .data "token" }}' $(kubectl get sa default -o go-template="{{range .secrets}}{{.name}}{{end}}"))
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Note

In the instructions above, we're reffering for a service account named 'default' in regards to the **certificate** and **token**. You can provide any service account configurations you may have on any namespace, the minimal permissions requirement is that it'll be able to get all namespaces in your cluster. The cluster actions you'll be limited to in Codefresh are based on the Kubernetes service account permissions you set in Kubernetes RBAC. 
{{site.data.callout.end}}

Once the cluster been added successfully you can go to the `Kubernetes` tab to start working with the services of your cluster.

{% include image.html
  lightbox="true"
  file="/images/eb2e31b-codefresh_kubernetes_tab.png"
  url="/images/eb2e31b-codefresh_kubernetes_tab.png"
  alt="codefresh_kubernetes_tab.png"
  max-width="40%"
    %}

So, what's next?
- [Manage your Kubernetes cluster in Codefresh]({{ site.baseurl }}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-beta/)
- [Deployment to Kubernetes - Quick start guide]({{ site.baseurl }}/docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/)
- [Example - Deploy demochat to Kubernetes cluster]({{ site.baseurl }}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-demochat-example/)


## Debugging issues with adding cluster

After adding your cluster configurations and in case the test fails, click "Save" to get the error message back.

{% include image.html
  lightbox="true"
  file="/images/42382c7-click-save.png"
  url="/images/42382c7-click-save.png"
  alt="click-save.png"
  max-width="40%"
    %}

{:.text-secondary}
### Namespaces is forbidden

  `Add Cluster Error`
{% highlight shell %}
{% raw %}
Failed to add cluster: namespaces is forbidden: User "system:serviceaccount:default:default" cannot list namespaces at the cluster scope
{% endraw %}
{% endhighlight %}

The service account used for the integration doesn't have the minimal permissions required (get all cluster namespaces). To fix this add a service account that have the required permissions.' +
The following command gives an example on how to create a cluster binding role between the default service account and cluster-admin role:

  `Create cluster binding with admin permissions`
{% highlight shell %}
{% raw %}
kubectl create clusterrolebinding default-admin --clusterrole cluster-admin --serviceaccount=default:default
{% endraw %}
{% endhighlight %}

## Kubernetes cluster - using an external reverse proxy (edge case)

In case you're using an external reverse proxy to manage inbound traffic to your Kubernetes API, please read [this article]({{ site.baseurl }}/docs/deploy-to-kubernetes/verify-cluster-tls-ssl-configuration/) to make sure your certificate setup are managed correctly in order to add your cluster successfully to Codefresh.


