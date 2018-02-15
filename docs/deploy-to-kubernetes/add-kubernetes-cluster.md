---
layout: docs
title: "Add Kubernetes cluster"
description: ""
group: deploy-to-kubernetes
permalink: /:path/adding-non-gke-kubernetes-cluster/
redirect_from:
  - /docs/adding-non-gke-kubernetes-cluster
  - /docs/adding-non-gke-kubernetes-cluster/
toc: true
---
In this article, we will show how to add any Kubernetes cluster.

Kuberentes supports a wide range of authentication options, you can read more about Kubernetes authentication [here](https://kubernetes.io/docs/admin/authentication/){:target="_blank"} 

We support atm authentication within cluster pre-configured [service account tokens](https://kubernetes.io/docs/admin/authentication/#service-account-tokens){:target="_blank"}.
A service account is an object that created upon cluster creation, we will ask you to provide the certificate and the token from this service account object.

{{site.data.callout.callout_info}}
##### Note

By default we're asking for service account named 'default', you can provide your service account credentials, note that those credentials might have limited permissions. 
{{site.data.callout.end}}

{{site.data.callout.callout_warning}}
##### Provide your Load Balancer with a valid certificate

Provide your Load Balancer with a valid certificate
Cluster addition will fail if your TLS/SSL configuration is not valid. See the details [here]({{ site.baseurl }}/docs/deploy-to-kubernetes/verify-cluster-tls-ssl-configuration/). 
{{site.data.callout.end}}

{% comment %}
###### TODO: CHECK

## The easiest way
Use Codefresh tool called [Stevedore](https://github.com/codefresh-io/Stevedore){:target="_blank"}
First, get your Codefresh token from [https://g.codefresh.io/api/](https://g.codefresh.io/api/){:target="_blank"}
* Run `CODEFRESH_TOKEN={TOKEN}`
* If you have Golang setup locally: 
  * `go get github.com/codefresh-io/stevedore`
  * `stevedore create --all`
* Run as Docker container

{% highlight shell %}
docker run \
-t \
-e KUBECONFIG=/config \
-e CODEFRESH_TOKEN=$CODEFRESH_TOKEN \
-e GOOGLE_APPLICATION_CREDENTIALS=~/.config/gcloud/application_default_credentials.json \
-v ~/.kube/config:/config \
-v ~/.config/gcloud/:/.config/gcloud \
codefresh/stevedore create --all
{% endhighlight %}
{% endcomment %}

## Get cluster credentials
Copy-paste the commands into you local shell, then save the outputs and paste them into Codefresh.

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

  `CA-Cert`
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

## Adding the Custom Provider in Codefresh

{:start="1"}
1. Go to the `Account Settings` &#8594; `Integration`

{% include image.html 
lightbox="true" 
file="/images/95162bf-codefresh_account_settings.png" 
url="/images/95162bf-codefresh_account_settings.png" 
alt="codefresh_account_settings.png" 
max-width="40%" 
%}

{:start="2"} 
2. Enable your integration with Google cloud.
You will be redirected to google and will be asked to enter your Google account credentials.

{% comment %}
###### TODO: CHECK
{% include image.html 
lightbox="true" 
file="/images/3481f0f-codefresh_k8_configure.png" 
url="/images/3481f0f-codefresh_k8_configure.png" 
alt="codefresh_k8_configure.png" 
max-width="40%" 
%}
{% endcomment %}

{% include image.html 
lightbox="true" 
file="/images/42382c7-click-save.png" 
url="/images/42382c7-click-save.png" 
alt="click-save.png" 
max-width="40%" 
%}

{:start="3"}
3. In the Google cloud integration window, you will be able to add your non GKE K8 clusters for view and deployment. This will be done by clicking the `Add provider` button and selecting `Custom Providers`

{% include image.html 
lightbox="true" 
file="/images/11b5d72-codefresh_add_provider.png" 
url="/images/11b5d72-codefresh_add_provider.png" 
alt="codefresh_add_provider.png" 
max-width="40%" 
%}

{:start="4"}
4. Then press the button `Add Cluster` to be able to enter the cluster credentials that you got [above]({{ site.baseurl }}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/#adding-the-custom-provider-in-codefresh)

{% include image.html 
lightbox="true" 
file="/images/eb1795e-codefresh_add_custom_cluster.png" 
url="/images/eb1795e-codefresh_add_custom_cluster.png" 
alt="codefresh_add_custom_cluster.png" 
max-width="40%" 
%}

{:start="5"} 
5. Enter cluster credentials that you got above. Use test button to check cluster connectivity and click 'Save' to add this cluster.

{% include image.html 
lightbox="true" 
file="/images/6e92733-Screen_Shot_2017-10-16_at_9.40.32_PM.png" 
url="/images/6e92733-Screen_Shot_2017-10-16_at_9.40.32_PM.png" 
alt="Screen Shot 2017-10-16 at 9.40.32 PM.png" 
max-width="40%" 
%}

{:start="6"}
6. So, you have integrated with your non GKE Kubernetes cluster

{% include image.html 
lightbox="true" 
file="/images/eb2e31b-codefresh_kubernetes_tab.png" 
url="/images/eb2e31b-codefresh_kubernetes_tab.png" 
alt="codefresh_kubernetes_tab.png" 
max-width="40%" 
%}

You can go to the tab `Kubernetes` to start working with the services of the cluster.

So, what's next?
- [Getting started with GKE]({{ site.baseurl }}/docs/deploy-to-kubernetes/get-ready-to-deploy/)
- [Deploy to GKE - BETA]({{ site.baseurl }}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-beta/) 
- [Example - Deploy demochat to Kubernetes cluster]({{ site.baseurl }}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-demochat-example/)

{:.text-secondary}
### Automate adding custom Kubernetes cluster

{:.text-secondary}
#### 1. Get Codefresh API token 

Visit [Codefresh API page](https://g.codefresh.io/api/){:target="_blank"} to get your API token.

{% include image.html 
lightbox="true" 
file="/images/2827b13-Screen_Shot_2017-09-24_at_14.05.04.png" 
url="/images/2827b13-Screen_Shot_2017-09-24_at_14.05.04.png" 
alt="Screen Shot 2017-09-24 at 14.05.04.png" 
max-width="40%" 
%}

{:.text-secondary}
#### 2. Import Kubernetes cluster

Download and run a shell script to import cluster from current Kubernetes context into your Codefresh account.

{% highlight shell %}
{% raw %}
API_TOKEN="COPY Codefresh API TOKEN HERE ..."
wget -O import.sh https://raw.githubusercontent.com/codefresh-io/import_cluster/master/import.sh && chmod +x import.sh && ./import.sh $API_TOKEN
{% endraw %}
{% endhighlight %}

{:.text-secondary}
### Debugging

If the test fails, click "Save" to get the error message back.

{% include image.html 
lightbox="true" 
file="/images/42382c7-click-save.png" 
url="/images/42382c7-click-save.png" 
alt="click-save.png" 
max-width="40%" 
%}
 
{:.text-secondary}
#### Namespaces is forbidden

  `Add Cluster Error`
{% highlight shell %}
{% raw %}
Failed to add cluster: namespaces is forbidden: User "system:serviceaccount:default:default" cannot list namespaces at the cluster scope
{% endraw %}
{% endhighlight %}

The current user doesn't have enough permissions to added. To fix this add a service account with the proper permissions using the following command

  `Create service account`
{% highlight shell %}
{% raw %}
kubectl create clusterrolebinding default-admin --clusterrole cluster-admin --serviceaccount=default:default
{% endraw %}
{% endhighlight %}
