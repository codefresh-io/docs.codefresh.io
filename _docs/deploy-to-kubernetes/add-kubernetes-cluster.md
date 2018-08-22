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
First click *Integrations* from the left sidebar and select the *integration* tab.
Then choose **Kubernetes**.

{% include image.html
  lightbox="true"
  file="/images/integrations/codefresh-integrations.png"
  url="/images/integrations/codefresh-integrations.png"
  alt="Codefresh integrations"
  max-width="80%"
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

## Adding AKS cluster

To add an Azure cluster, select *Microsoft AKS* from the drop-down menu. Click the *Authenticate button* and enter your Azure credentials. You will see a description of all permissions that Codefresh needs
in order to access your cluster. Accept them and Codefresh will connect to Azure to get the cluster information.

>If you experience difficulties at this point try logging into Azure first in your browser *before* clicking
the authenticate button. Also make sure that you are using an organizational/company Azure account and not a personal one.

If everything is ready you will see a dialog that allows you to select your Azure subscription and the 
cluster name that you wish to use.

{% include image.html
lightbox="true"
file="/images/kubernetes/add-cluster/select-aks-cluster.png"
url="/images/kubernetes/add-cluster/select-aks-cluster.png"
alt="Selecting the Azure cluster"
caption="Selecting the Azure cluster"
max-width="60%"
  %}

Codefresh will query the cluster and show its nodes. You are now ready to [deploy to Azure kubernetes]({{ site.baseurl }}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/).

## Adding EKS Cluster
To add an Amazon EKS cluster, you must first create a service account and obtain a token used to manage the integration.

The official Amazon-provided guide on EKS can be found [here](https://docs.aws.amazon.com/eks/latest/userguide/).

In order to use your cluster locally with `kubectl`, you must first install the [heptio-authenticator-aws](https://github.com/heptio/authenticator) binary. Your version of kubectl must also be 1.10+ for this to work.

Next, create a kubeconfig file, such as `~/.kube/eks`, replacing `<endpoint-url>`, `<base64-encoded-ca-cert>`, and `<cluster-name>` with information on your EKS cluster obtained in the AWS console:

{% highlight yaml %}
{% raw %}
apiVersion: v1
clusters:
- cluster:
    server: <endpoint-url>
    certificate-authority-data: <base64-encoded-ca-cert>
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: aws
  name: aws
current-context: aws
kind: Config
preferences: {}
users:
- name: aws
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1alpha1
      command: heptio-authenticator-aws
      args:
        - "token"
        - "-i"
        - "<cluster-name>"
{% endraw %}
{% endhighlight %}

Then, in an environment that has access to your AWS account, run the following command to create an admin user service account and necessary role binding:

{% highlight shell %}
{% raw %}
cat <<EOF | kubectl --kubeconfig="$HOME/.kube/eks" apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kube-system
EOF
{% endraw %}
{% endhighlight %}

Finally, use the following command to obtain the service account token:

{% highlight shell %}
{% raw %}
kubectl --kubeconfig="$HOME/.kube/eks" -n="kube-system" get secret \
  $(kubectl --kubeconfig="$HOME/.kube/eks" -n="kube-system" get secret | \
    grep admin-user | awk '{print $1}') -o jsonpath="{.data.token}"
{% endraw %}
{% endhighlight %}

Once you have this token, follow the steps in the section below, using this token for item #4.

{:.text-secondary}
## Adding any other cluster type (not dependent on any provider)
 
On your Configuration settings (left-menu), go to the **Integration** tab and choose **Kubernetes**  
In order to add any other type of cluster, outside of GKE, use **Custom Providers**


{% include image.html
lightbox="true"
file="/images/kubernetes/add-cluster/add-cluster-button.png"
url="/images/kubernetes/add-cluster/add-cluster-button.png"
alt="Adding a custom cluster in Codefresh"
caption="Adding a custom K8s cluster in Codefresh"
max-width="60%"
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
  file="/images/kubernetes/add-cluster/add-cluster-details.png"
  url="/images/kubernetes/add-cluster/add-cluster-details.png"
  alt="Adding a custom cluster in Codefresh - details"
  max-width="60%"
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

In the instructions above, we're reffering for a service account named 'default' in regards to the **certificate** and **token**. You can provide any service account configurations you may have on any namespace, as long as it has the correct permissions. The cluster actions you'll be limited to in Codefresh are based on the Kubernetes service account permissions you set in Kubernetes RBAC. 
{{site.data.callout.end}}

The minimum permissions Codefresh needs to work with the cluster are the following:

`codefresh-role.yml`
{% highlight yaml %}
{% raw %}
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: codefresh-role
rules:
  - apiGroups: [""]
    resources: ["*"]
    verbs: ["list", "watch", "get"] 
{% endraw %}
{% endhighlight %}

Once the cluster been added successfully you can go to the `Kubernetes` tab to start working with the services of your cluster.

So, what's next?
- [Deploy to Kubernetes - quick start]({{ site.baseurl }}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)
- [Deploying to Kubernetes with Helm]({{ site.baseurl }}/docs/getting-started/helm-quick-start-guide/)
- [Manage your Kubernetes cluster in Codefresh]({{ site.baseurl }}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-beta/)
- [Example - Deploy demochat to Kubernetes cluster]({{ site.baseurl }}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-demochat-example/)


## Troubleshooting cluster addition

After adding your cluster configurations and in case the test fails, click "Save" to get the error message back.

{% include image.html
  lightbox="true"
  file="/images/42382c7-click-save.png"
  url="/images/42382c7-click-save.png"
  alt="click-save.png"
  max-width="40%"
    %}

{:.text-secondary}
### Error: Cannot list namespaces

  `Add Cluster Error`
{% highlight shell %}
{% raw %}
Failed to add cluster: namespaces is forbidden: User "system:serviceaccount:default:default" cannot list namespaces at the cluster scope
{% endraw %}
{% endhighlight %}

The service account used for the integration doesn't have the minimal permissions required. To fix this add a service account that have the required permissions.

The easiest way to do this is to create a cluster binding role between the default service account and cluster-admin role:

  `Create cluster binding with admin permissions`
{% highlight shell %}
{% raw %}
kubectl create clusterrolebinding default-admin --clusterrole cluster-admin --serviceaccount=default:default
{% endraw %}
{% endhighlight %}

## Kubernetes cluster - using an external reverse proxy (edge case)

In case you're using an external reverse proxy to manage inbound traffic to your Kubernetes API, please read [this article]({{ site.baseurl }}/docs/deploy-to-kubernetes/verify-cluster-tls-ssl-configuration/) to make sure your certificate setup are managed correctly in order to add your cluster successfully to Codefresh.


