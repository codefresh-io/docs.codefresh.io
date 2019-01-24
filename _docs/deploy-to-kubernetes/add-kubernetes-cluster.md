---
title: "Add Kubernetes Cluster"
description: "How to connect your Kubernetes cluster to the Codefresh dashboard"
group: deploy-to-kubernetes
redirect_from:
  - /docs/adding-non-gke-kubernetes-cluster
  - /docs/adding-non-gke-kubernetes-cluster/
  - /docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/
toc: true
---

Codefresh offers its own Kubernetes dashboard that allows you to inspect the services and namespaces
in your cluster. To active this dashboard you need to connect your cluster to your Codefresh account first.


Start by going into your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *Kubernetes*.

{% include image.html
  lightbox="true"
  file="/images/integrations/codefresh-integrations.png"
  url="/images/integrations/codefresh-integrations.png"
  alt="Codefresh integrations"
  caption="Codefresh integrations"
  max-width="70%"
    %}

In the Kubernetes integration window, you will be able to add a cluster from known providers such as Google, Azure, Amazon etc. You can also add any generic kubernetes cluster by manually entering your cluster settings.

{:.text-secondary}
## Adding GKE Cluster
Adding a cluster in GKE can be done by clicking the **Add cluster** button under **Google Cloud Provider** and selecting the desired project and cluster.

If this is your first time you'll be prompted to authenticate using your google credentials, make sure you're doing so with a user that have access to your GKE projects.

Make sure that your cluster has basic authentication enabled. You can change this setting after cluster creation
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

If you are a new customer of Google Cloud, you are also eligible to receive a Codefresh offer to get up to $500 in Google credits. As soon at the GKE integration is complete within Codefresh, you will get an email with extra details on how to claim your credits. 

Follow the link in the email to fill in an application for the free credits. Once Google approves the application (usually within 1-2 days) your credits will be available to your account. Make sure to check your spam folder for that email.

{{site.data.callout.end}}

{:.text-secondary}

## Adding AKS cluster

To add an Azure cluster, select *Azure AKS* from the drop-down menu. Click the *Authenticate button* and enter your Azure credentials. You will see a description of all permissions that Codefresh needs
in order to access your cluster. Accept them and Codefresh will connect to Azure to get the cluster information.

>If you experience difficulties at this point try logging into Azure first in your browser *before* clicking
the authenticate button. Also make sure that you are using an organizational/company Azure account and not a personal one. We are currently working with Microsoft to improve this integration.

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

Codefresh will query the cluster and show its nodes. You are now ready to [deploy to Azure kubernetes]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/).

>If you wish for any reason to revoke the granted access from the Azure side, visit [https://account.activedirectory.windowsazure.com/r#/applications](https://account.activedirectory.windowsazure.com/r#/applications) and remove "Codefresh" from the list.

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
 
Go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *Kubernetes*.
 
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
2. Host - The full URL of the Kubernetes API endpoints including protocol and port

{:start="3"} 
3. Certificate - The Kubernetes service account certificate used for the integration with Codefresh (base64 encoded)

{:start="4"}
4. Token - The Kubernetes service account token used for the integration with Codefresh (base64 encoded)

{% include image.html
  lightbox="true"
  file="/images/kubernetes/add-cluster/add-cluster-details.png"
  url="/images/kubernetes/add-cluster/add-cluster-details.png"
  alt="Adding a custom cluster in Codefresh - details"
  caption="Adding a custom cluster in Codefresh - details"
  max-width="60%"
    %}
    
 In the section below we'll provide you with easy instructions how to get all your cluster configurations in order to add it to Codefresh.   

### Get cluster configuration manually

Copy and paste the following commands into your local shell, then save the outputs and paste them into the Codefresh fields. The commands rely on `kubectl` so make sure it is configured correctly against your cluster.

{{site.data.callout.callout_info}}
##### More than one cluster in kubeconfig?

  Before starting, make sure that your local context is the one you would like to add to Codefresh.<br>
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

In the instructions above, we're referring for a service account named 'default' in regards to the **certificate** and **token**. You can provide any service account configurations you may have on any namespace, as long as it has the correct permissions. The cluster actions you'll be limited to in Codefresh are based on the Kubernetes service account permissions you set in Kubernetes RBAC. 
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

## Adding a Rancher cluster

Rancher clusters are currently supported as generic clusters. Rancher clusters have a specific authentication configuration (the details are here: [https://rancher.com/kubernetes-authentication-in-rancher-and-rbac](https://rancher.com/kubernetes-authentication-in-rancher-and-rbac) for Rancher 1.x and at [https://rancher.com/blog/2018/2018-05-04-authentication-authorization-rancher2/](https://rancher.com/blog/2018/2018-05-04-authentication-authorization-rancher2/) for Rancher 2.x). 

Authentication using a token of a Kubernetes Service Account, which is usually used by Codefresh, doesn't work with Rancher clusters. Also, Rancher doesn't do proper TLS termination out-of-the-box for Kubernetes clusters hosted on it, so one needs to configure a load balancer for that purpose.

In summary, the following conditions should be met in order to add the cluster, hosted on Rancher to Codefresh:

### For Rancher version 1.x

1. The token should be taken from the kubeconfig provided by Rancher and it has to be encoded with base64 before putting it into Codefresh. Be careful with the '\n' characters when encoding. The command for Linux is: `echo <rancher_token> | tr -d '\n' | base64 | tr -d '\n'`
1. The CA certificate should be the CA of the Load Balancer standing in front of Rancher 
1. The hostname and port should be corresponding to your Load Balancer

{% include image.html
  lightbox="true"
  file="/images/kubernetes/add-cluster/rancher-token.png"
  url="/images/kubernetes/add-cluster/rancher-token.png"
  alt="Getting the Rancher token"
  caption="Getting the Rancher token"
  max-width="40%"
    %}

### For Rancher version 2.x

1. Kubernetes HOST is in the kubeconfig provided by Rancher for the Kubernetes cluster based on the domain name of Rancher + the Kubernetes cluster endpoint exposed through Rancher in cluster -> server. Example: `https://rancher.localhost/k8s/clusters/c-npft4`
1. The token should be taken from the kubeconfig provided by Rancher under user -> token section of YAML and it has to be encoded with base64 before putting it into Codefresh. Be careful with the '\n' characters when encoding, do not wrap token in quotes when running echo command. The command for Linux is: `echo <rancher_token> | tr -d '\n' | base64 | tr -d '\n'` Example: `kubeconfig-user-xtnt4:cppxv6db…`
1. The CA certificate should be the CA of the Load Balancer standing in front of Rancher base64 encoded `openssl base64 -in cert -out b64`
1. The hostname and port should be corresponding to your Load Balancer

{% include image.html
  lightbox="true"
  file="/images/kubernetes/add-cluster/rancher-2.png"
  url="/images/kubernetes/add-cluster/rancher-2.png"
  alt="Rancher 2.x cluster details"
  caption="Rancher 2.x cluster details"
  max-width="40%"
    %}


Once you have all the information follow the instructions for adding a generic Kubernetes cluster in Codefresh as described in the previous section.


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

In case you're using an external reverse proxy to manage inbound traffic to your Kubernetes API, please read [this article]({{site.baseurl}}/docs/deploy-to-kubernetes/verify-cluster-tls-ssl-configuration/) to make sure your certificate setup are managed correctly in order to add your cluster successfully to Codefresh.

## Multiple CAs in certificate chain

If you have more than one [CA](https://en.wikipedia.org/wiki/Certificate_authority) in your certification chain, you need to provide Codefresh with a [Certificate bundle](https://en.wikipedia.org/wiki/Chain_of_trust) (a file that containers the intermediate CAs as well)

The steps needed are:

1. Get your CA bundle file and the Kubernetes API server certificate file and run the following to check the validity of the certificate:
`openssl verify -verbose -CAfile ca_bundle.pem k8_server_cert`
1.  If the check above passes fine, go on and run the following on your CA bundle file:
`base64 ca_budle.pem | tr -d '\n'`
1. Copy the output string (be careful when copying) and check whether you have copied it correctly:
`openssl x509 -text -in <(echo <copied_string> | base64 -d)` - you should see the contents of your CA budle file
1. Put the copied string into the Codefresh Kubernetes integration form and test the connection.

Please make sure the certs are in order Root -> Intermediate -> Server.

## What to read next

- [Deploy to Kubernetes - quick start]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)
- [Deploying to Kubernetes with Helm]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/)
- [Manage your Kubernetes cluster in Codefresh]({{site.baseurl}}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-beta/)
- [Example - Deploy demochat to Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-demochat-example/)

