---
title: "Kubernetes pipeline integration"
description: "How Codefresh supports Kubernetes clusters"
group: integrations
redirect_from:
 - /docs/deploy-to-kubernetes/add-kubernetes-cluster/
 - /docs/deploy-to-kubernetes/deployment-options-to-kubernetes/
 - /v1.0/docs/adding-non-gke-kubernetes-cluster/
 - /v1.0/docs/codefresh-kubernetes-integration-beta/
toc: true
---

Codefresh is one of the few CI/CD solutions that has native support for Kubernetes clusters, not only for deploying applications to Kubernetes, but also for running pipelines on Kubernetes.

Codefresh has native support for Kubernetes in the following areas:

- [Connecting a cluster globally](#connect-a-kubernetes-cluster)
- [Viewing the cluster status]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)
- [Viewing the environment dashboard](/#viewing-the-environment-dashboard)
- [Deploying to a cluster with the GUI](#ad-hoc-deployments-with-the-codefresh-ui)
- [Deploying to a cluster with a pipeline](#automated-deployments-with-codefresh-pipelines)
- [Running pipelines on a cluster]({{site.baseurl}}/docs/installation/codefresh-runner/)




Codefresh offers its own Kubernetes dashboard that allows you to inspect the services and namespaces
in your cluster. To activate this dashboard, you need to connect your cluster to your Codefresh account first.

## Connect a Kubernetes cluster

### Prerequisites

Codefresh SaaS needs network connectivity to connect to your cluster.  
If your cluster is behind a firewall, make sure that you allow access to the [required IPs]({{site.baseurl}}/docs/administration/platform-ip-addresses/).  


For on-premises and [hybrid installations with Runner]({{site.baseurl}}/docs/installation/behind-the-firewall/), there is no need to tweak your firewall.

### Set up Kubernetes integration

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Kubernetes** and then click **Configure**.
1. From the **Add Provider** list, select the Kubernetes provider.   

{% include image.html
  lightbox="true"
  file="/images/integrations/codefresh-integrations.png"
  url="/images/integrations/codefresh-integrations.png"
  alt="Codefresh integrations"
  caption="Codefresh integrations"
  max-width="70%"
    %}



### Adding a GKE Cluster
Adding a cluster in GKE can be done by clicking the **Add cluster** button under **Google Cloud Provider** and selecting the desired project and cluster.

If this is your first time, you'll be prompted to authenticate using your Google credentials, make sure you're doing so with a user that have access to your GKE projects.

For GKE cluster versions >=1.19 basic authentication is deprecated. You can add the GKE cluster manually by [using the custom Kubernetes integration option](#adding-any-other-cluster-type-not-dependent-on-any-provider) instead.



> If you are a new customer of Google Cloud, you are also eligible to receive a Codefresh offer to get up to $500 in Google credits. As soon at the GKE integration is complete within Codefresh, you will get an email with extra details on how to claim your credits.   
  Follow the link in the email to fill in an application for the free credits. Once Google approves the application (usually within 1-2 days) your credits will be available to your account. Make sure to check your spam folder for that email.


### Adding an AKS cluster

To add an Azure cluster, select *Azure AKS* from the drop-down menu instead of *Azure AKS SP*. Click the *Authenticate button* and enter your Azure credentials. You will see a description of all permissions that Codefresh needs
in order to access your cluster. Accept them and Codefresh will connect to Azure to get the cluster information.

>If you experience difficulties at this point try logging into Azure first in your browser *before* clicking
the authenticate button. Also make sure that you are using an organizational/company Azure account and not a personal one. We are currently working with Microsoft to improve this integration.

If everything is ready you will see a dialog that allows you to select your Azure subscription and the 
cluster name that you wish to use.

{% include image.html
lightbox="true"
file="/images/integrations/kubernetes/add-cluster/select-aks-cluster.png"
url="/images/integrations/kubernetes/add-cluster/select-aks-cluster.png"
alt="Selecting the Azure cluster"
caption="Selecting the Azure cluster"
max-width="60%"
  %}

Codefresh will query the cluster and show its nodes. You are now ready to [deploy to Azure kubernetes]({{site.baseurl}}/docs/quick-start/ci-quick-start/deploy-to-kubernetes/).

>If you wish for any reason to revoke the granted access from the Azure side, visit [https://account.activedirectory.windowsazure.com/r#/applications](https://account.activedirectory.windowsazure.com/r#/applications){:target="\_blank"} and remove "Codefresh" from the list.

#### Adding an AKS cluster with a service principal

An alternative method of adding an Azure cluster is by using a service principal (*Azure AKS SP*). 


**Before you begin**
* Follow the [instructions for creating a service principal in the Azure portal](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal){:target="\_blank"}.

**How to**

1. From the **Add Provider** list, select the **Azure AKS SP**.  
1. Click the arrow on the right, and then click **Add Cluster**.
1. Enter the following:
  * `Client ID`
  * `Tenant`
  * `Client secret`

1. Click **Authenticate**. 

{% include image.html
lightbox="true"
file="/images/integrations/kubernetes/add-cluster/connect-azure-spn.png"
url="/images/integrations/kubernetes/add-cluster/connect-azure-spn.png"
alt="Azure Service principal details"
caption="Azure Service principal details"
max-width="60%"
  %}



Codefresh will query the cluster and show its nodes. You are now ready to deploy to Azure kubernetes.



### Adding EKS Cluster

To add an Amazon EKS cluster, you must first obtain `kubectl` access to it. Follow the instructions for using the
[AWS CLI](https://aws.amazon.com/premiumsupport/knowledge-center/eks-cluster-connection/){:target="\_blank"} in order to obtain your kubeconfig locally.

```
aws eks --region region update-kubeconfig --name cluster_name
```

Once you have access via `kubectl`, then follow the [instructions](#get-cluster-configuration-manually) to obtain all the cluster details.
To add the Amazon cluster, select *Amazon AWS* from the *ADD PROVIDER* drop-down menu and enter all details in the respective field in the Codefresh UI.

### Adding a DigitalOcean cluster

DigitalOcean also offers a hosted solution for Kubernetes. 

To add a DO cluster select *DigitalOcean* from the *Add provider* menu in your [integration settings](https://g.codefresh.io/account-admin/account-conf/integration/kubernetes){:target="\_blank"}. Click the authenticate button and enter your DO account credentials:

{% include image.html
lightbox="true"
file="/images/integrations/kubernetes/add-cluster/authorize-do.png"
url="/images/integrations/kubernetes/add-cluster/authorize-do.png"
alt="Authorizing DigitalOcean Integration"
caption="Authorizing DigitalOcean Integration"
max-width="35%"
  %}

Click on the checkbox next to your account name and select the *Authorize application* button. Codefresh has now access to your DigitalOcean cluster. You need to authenticate only once.

{% include image.html
lightbox="true"
file="/images/integrations/kubernetes/add-cluster/do-authorized.png"
url="/images/integrations/kubernetes/add-cluster/do-authorized.png"
alt="DigitalOcean is now authorized"
caption="DigitalOcean is now authorized"
max-width="70%"
  %}

Next, expand the DigitalOcean row from the triangle icon on the right and click on the *Add cluster* button. The drop-down menu should contain all your DigitalOcean Kubernetes clusters. Select the one that you want to connect into Codefresh and click the *Add* button.

{% include image.html
lightbox="true"
file="/images/integrations/kubernetes/add-cluster/add-do-cluster.png"
url="/images/integrations/kubernetes/add-cluster/add-do-cluster.png"
alt="Selecing the DigitalOcean cluster"
caption="Selecing the DigitalOcean cluster"
max-width="40%"
  %}

Your cluster is now connected. You should be able to see it your [Kubernetes dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/), and start [deploying]({{site.baseurl}}/docs/quick-start/ci-quick-start/deploy-to-kubernetes/) to it. 

Note that you can also add a DigitalOcean cluster as a generic  cluster as well (explained below).


### Adding any other cluster type (not dependent on any provider)
 

 
1. To add any other type of cluster, outside of GKE, from the **Add Provider** list, select the **Custom Providers**.  



{% include image.html
lightbox="true"
file="/images/integrations/kubernetes/add-cluster/add-cluster-button.png"
url="/images/integrations/kubernetes/add-cluster/add-cluster-button.png"
alt="Adding a custom K8s cluster in Codefresh"
caption="Adding a custom K8s cluster in Codefresh"
max-width="60%"
  %}
  
The integration between Codefresh and your Kubernetes cluster is API based, and relies on a Kubernetes service account of your choosing that will be used to manage the integration.

The configurations you'll be required to add are:


1. Name: Any name of your choosing, that will represent your cluster context in Codefresh. Do not use spaces, dots or other strange characters in the name. 
1. Host: The full URL of the Kubernetes API endpoints including protocol and port.
1. Certificate: The Kubernetes service account certificate used for the integration with Codefresh (base64 encoded).
1. Token: The Kubernetes service account token used for the integration with Codefresh (base64 encoded)
1. (Optional) Namespace: Restrict Codefresh [access to a specific namespace](#restrict-codefresh-access-to-a-specific-namespace)


{% include image.html
  lightbox="true"
  file="/images/integrations/kubernetes/add-cluster/add-cluster-fields.png"
  url="/images/integrations/kubernetes/add-cluster/add-cluster-fields.png"
  alt="Adding a custom cluster in Codefresh"
  caption="Adding a custom cluster in Codefresh"
  max-width="80%"
    %}

There is also a toggle for [private clusters behind a firewall]({{site.baseurl}}/docs/installation/behind-the-firewall/).
    
 In the section below, we'll provide you with easy instructions how to get all your cluster configurations in order to add it to Codefresh.   

### Get cluster configuration manually

Codefresh accesses any custom cluster using a [service account](https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/){:target="\_blank"}. You can define the privileges Codefresh has on your cluster
using the standard authorization methods (i.e. [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/){:target="\_blank"}) supported by your Kubernetes infrastructure. 

You need a terminal with `kubectl` access on your cluster. You can even use the "cloud shell" of your
cloud provider for this purpose.

#### The easy and insecure way

If you are evaluating Codefresh and want to connect your cluster as fast as possible with no issues
follow these steps:

>Note that this method is only suggested for non-production clusters, and quick demos. See the next section for the proper way to use Codefresh in production environments.

First make sure that you are giving commands to the appropriate cluster if you have more than one:

`Choose cluster`
{% highlight shell %}
{% raw %}
kubectl config use-context <my-cluster-name>
{% endraw %}
{% endhighlight %}

Then give full admin privileges to the default account.

`Make default account cluster administrator`
{% highlight shell %}
{% raw %}
kubectl create clusterrolebinding default-admin --clusterrole cluster-admin --serviceaccount=default:default -n default
{% endraw %}
{% endhighlight %}

Finally run the following commands and copy-paste the result to each Codefresh field in the UI:

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

Once the cluster been added successfully you can go to the `Kubernetes` tab to start working with the services of your cluster.

#### The proper/secure way

For production environments you should create a service account and/or role for Codefresh access.
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

Note that these permissions will only allow Codefresh to read the cluster resources and populate the respective dashboards. You need to give more privileges for actual deployments. For more information see the [Kubernetes RBAC documentation page](https://kubernetes.io/docs/reference/access-authn-authz/rbac/){:target="\_blank"}.

Here is an example with role + service account + binding.

`codefresh-role-sa-bind.yml`
{% highlight yaml %}
{% raw %}
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: codefresh-role
rules:
  - apiGroups: [ "*"]
    resources: ["*"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: codefresh-user
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: codefresh-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: codefresh-role
subjects:
- kind: ServiceAccount
  name: codefresh-user
  namespace: kube-system
{% endraw %}
{% endhighlight %}

Select the appropriate cluster if you have more than one:

`Choose cluster`
{% highlight shell %}
{% raw %}
kubectl config use-context <my-cluster-name>
{% endraw %}
{% endhighlight %}

Create the Codefresh user/role:

`Apply Codefresh access rules`
{% highlight shell %}
{% raw %}
kubectl apply -f codefresh-role-sa-bind.yml
{% endraw %}
{% endhighlight %}

Finally run the following commands and copy-paste the result to each Codefresh field in the UI:

`Host IP`
{% highlight shell %}
{% raw %}
export CURRENT_CONTEXT=$(kubectl config current-context) && export CURRENT_CLUSTER=$(kubectl config view -o go-template="{{\$curr_context := \"$CURRENT_CONTEXT\" }}{{range .contexts}}{{if eq .name \$curr_context}}{{.context.cluster}}{{end}}{{end}}") && echo $(kubectl config view -o go-template="{{\$cluster_context := \"$CURRENT_CLUSTER\"}}{{range .clusters}}{{if eq .name \$cluster_context}}{{.cluster.server}}{{end}}{{end}}")
{% endraw %}
{% endhighlight %}

`Certificate`
{% highlight shell %}
{% raw %}
echo $(kubectl get secret -n kube-system -o go-template='{{index .data "ca.crt" }}' $(kubectl get sa codefresh-user -n kube-system -o go-template="{{range .secrets}}{{.name}}{{end}}"))
{% endraw %}
{% endhighlight %}

`Token`
{% highlight shell %}
{% raw %}
echo $(kubectl get secret -n kube-system -o go-template='{{index .data "token" }}' $(kubectl get sa codefresh-user -n kube-system -o go-template="{{range .secrets}}{{.name}}{{end}}"))
{% endraw %}
{% endhighlight %}

#### The proper/secure way for Kubernetes Cluster 1.24+

For production environments, create a service account and/or role for Codefresh access.  

Codefresh needs these minimum permissions to work with the cluster:

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

Note that these permissions will only allow Codefresh to read the cluster resources and populate the respective dashboards. You need to give more privileges for actual deployments. For more information see the [Kubernetes RBAC documentation page](https://kubernetes.io/docs/reference/access-authn-authz/rbac/){:target="\_blank"}.

Here is an example with role + service account + binding.

`codefresh-role-sa-bind.yml`
{% highlight yaml %}
{% raw %}
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: codefresh-role
rules:
  - apiGroups: [ "*"]
    resources: ["*"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: codefresh-user
  namespace: kube-system
--- 
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: codefresh-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: codefresh-role
subjects:
- kind: ServiceAccount
  name: codefresh-user
  namespace: kube-system
---
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: codefresh-user-token
  namespace: kube-system
  annotations:
    kubernetes.io/service-account.name: "codefresh-user"
{% endraw %}
{% endhighlight %}

<br />

1. Select the appropriate cluster if you have more than one:
`Choose cluster`
{% highlight shell %}
{% raw %}
kubectl config use-context <my-cluster-name>
{% endraw %}
{% endhighlight %}

{:start="2"}
1. Create the Codefresh user/role:  
`Apply Codefresh access rules`
{% highlight shell %}
{% raw %}
kubectl apply -f codefresh-role-sa-bind.yml
{% endraw %}
{% endhighlight %}

{:start="3"}
1. Finally run the following commands, and copy-paste the results to the respective Codefresh field in the UI:  
`Host IP`
{% highlight shell %}
{% raw %}
export CURRENT_CONTEXT=$(kubectl config current-context) && export CURRENT_CLUSTER=$(kubectl config view -o go-template="{{\$curr_context := \"$CURRENT_CONTEXT\" }}{{range .contexts}}{{if eq .name \$curr_context}}{{.context.cluster}}{{end}}{{end}}") && echo $(kubectl config view -o go-template="{{\$cluster_context := \"$CURRENT_CLUSTER\"}}{{range .clusters}}{{if eq .name \$cluster_context}}{{.cluster.server}}{{end}}{{end}}")
{% endraw %}
{% endhighlight %}

`Certificate`
{% highlight shell %}
{% raw %}
echo $(kubectl get secret -n kube-system -o go-template='{{index .data "ca.crt" }}' codefresh-user-token)
{% endraw %}
{% endhighlight %}

`Token`
{% highlight shell %}
{% raw %}
echo $(kubectl get secret -n kube-system -o go-template='{{index .data "token" }}' codefresh-user-token)
{% endraw %}
{% endhighlight %}

#### Restrict Codefresh access to a specific namespace

In most cases, you want to allow Codefresh to access all namespaces inside the cluster. This is the most convenient option as it will make
the [services dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/) (and other GUI dashboards) the central way to manage your clusters.

You can also restrict Codefresh only to an specific namespace of your choosing. To achieve this, use the details of service account in the previous section that has access only to that specific namespace, and also fill the *namespace* field in the cluster details form.

{% include image.html
  lightbox="true"
  file="/images/integrations/kubernetes/add-cluster/restrict-namespace.png"
  url="/images/integrations/kubernetes/add-cluster/restrict-namespace.png"
  alt="Allows Codefresh access to a single namespace only"
  caption="Allows Codefresh access to a single namespace only"
  max-width="80%"
    %}

Notice that if you follow this approach several built-in Codefresh capabilities will be disabled (e.g. creating new namespaces from the GUI).



### Adding a Rancher cluster

Rancher clusters are currently supported as generic clusters. Rancher clusters have a specific authentication configuration, as described for [Rancher 1.x](https://rancher.com/kubernetes-authentication-in-rancher-and-rbac){:target="\_blank"}, and [Rancher 2.x](https://rancher.com/blog/2018/2018-05-04-authentication-authorization-rancher2/){:target="\_blank"}. 

Authentication using a token of a Kubernetes Service Account, which is usually used by Codefresh, doesn't work with Rancher clusters. Also, Rancher doesn't do proper TLS termination out-of-the-box for Kubernetes clusters hosted on it, so one needs to configure a load balancer for that purpose.

In summary, the following conditions should be met in order to add the cluster, hosted on Rancher to Codefresh:

#### For Rancher version 1.x

1. The token should be taken from the kubeconfig provided by Rancher and it has to be encoded with base64 before putting it into Codefresh. Be careful with the '\n' characters when encoding. The command for Linux is: `echo <rancher_token> | tr -d '\n' | base64 | tr -d '\n'`.
1. The CA certificate should be the CA of the Load Balancer standing in front of Rancher. 
1. The hostname and port should be corresponding to your Load Balancer.

{% include image.html
  lightbox="true"
  file="/images/integrations/kubernetes/add-cluster/rancher-token.png"
  url="/images/integrations/kubernetes/add-cluster/rancher-token.png"
  alt="Getting the Rancher token"
  caption="Getting the Rancher token"
  max-width="40%"
    %}

#### For Rancher version 2.x

1. Kubernetes HOST is in the kubeconfig provided by Rancher for the Kubernetes cluster based on the domain name of Rancher + the Kubernetes cluster endpoint exposed through Rancher in cluster -> server. Example: `https://rancher.localhost/k8s/clusters/c-npft4`.
1. The token should be taken from the kubeconfig provided by Rancher under user -> token section of YAML and it has to be encoded with base64 before putting it into Codefresh. Be careful with the '\n' characters when encoding, do not wrap token in quotes when running echo command. The command for Linux is: `echo <rancher_token> | tr -d '\n' | base64 | tr -d '\n'` Example: `kubeconfig-user-xtnt4:cppxv6db…`.
1. The CA certificate should be the CA of the Load Balancer standing in front of Rancher base64 encoded `openssl base64 -in cert -out b64`.  And then run this command on the file to remove any white space.  `cat b64 | tr -d '\040\011\012\015' > b64_cert` then copy and paste this base64 encoded value into Codefresh UI Cert field.
1. The hostname and port should be corresponding to your Load Balancer.

{% include image.html
  lightbox="true"
  file="/images/integrations/kubernetes/add-cluster/rancher-2.png"
  url="/images/integrations/kubernetes/add-cluster/rancher-2.png"
  alt="Rancher 2.x cluster details"
  caption="Rancher 2.x cluster details"
  max-width="40%"
    %}


Once you have all the information follow the instructions for adding a generic Kubernetes cluster in Codefresh as described in the previous section.


### Troubleshooting cluster addition

After adding your cluster configurations and in case the test fails, click "Save" to get the error message back.

{% include image.html
  lightbox="true"
  file="/images/integrations/kubernetes/add-cluster/click-save-error-message.png"
  url="/images/integrations/kubernetes/add-cluster/click-save-error-message.png"
  alt="Get error message for troubleshooting"
  caption="Get error message for troubleshooting"
  max-width="40%"
    %}


#### Error: Cannot list namespaces

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

### Kubernetes cluster - using an external reverse proxy (edge case)

If you are using an external reverse proxy to manage inbound traffic to your Kubernetes API, for correct certificate setup, see [this article]({{site.baseurl}}/docs/kb/articles/verify-cluster-tls-ssl-configuration/).

### Multiple CAs in certificate chain

Ideally your Kubernetes cluster will have a single certificate which is used directly on the API endpoint. Some organizations
place clusters behind a load balancer or other proxy mechanism that uses a chain or certificates.

When that happens and you have more than one [CA](https://en.wikipedia.org/wiki/Certificate_authority){:target="\_blank"} in your certification chain, you need to provide Codefresh with a [Certificate bundle](https://en.wikipedia.org/wiki/Chain_of_trust){:target="\_blank"} (a file that contains the intermediate CAs as well).

You will know when this is the case as this error will appear when you try to connect your cluster:

```
{"status":400,"code":"1004","name":"BAD_REQUEST_ERROR","message":"Failed to add cluster: unable to get local issuer certificate","context":{}}
```

To get the whole certificate open the URL of your Kubernetes in Chrome or Firefox and export all individual certificates as files

{% include image.html
  lightbox="true"
  file="/images/integrations/kubernetes/add-cluster/cert-hierarchy.png"
  url="/images/integrations/kubernetes/add-cluster/cert-hierarchy.png"
  alt="A Certificate chain"
  caption="A Certificate chain"
  max-width="60%"
    %}

The steps needed are:

1. Connect all certificates (apart from the API/endpoint one) to a bundle:
`cat rootCA.crt intermediateCA.crt > ca_bundle_cert`.
1. Run the following to check the validity of the certificate:
`openssl verify -verbose -CAfile ca_bundle_cert k8_server_cert`.
1.  If the check above passes fine, go on and run the following on your CA bundle file:
`base64 ca_bundle_cert | tr -d '\n'`.
1. Copy the output string (be careful when copying) and check whether you have copied it correctly:
`openssl x509 -text -in <(echo <copied_string> | base64 -d)` - you should see the contents of your CA bundle file.
1. Put the copied string into the Codefresh Kubernetes integration form and test the connection.

Please make sure the certs are in order Root -> Intermediate -> Server.







<!--- ## Connecting a Kubernetes cluster to Codefresh

Like all other Codefresh integrations, Kubernetes clusters are [connected once]({{site.baseurl}}) on an Account level. You can add a cluster from a specific cloud provider
or a "generic" cluster for any compliant cluster:

{% 
  include image.html 
  lightbox="true" 
file="/images/integrations/kubernetes/kubernetes-integration.png" 
url="/images/integrations/kubernetes/kubernetes-integration.png" 
alt="Global Kubernetes integrations" 
caption="Global Kubernetes integrations" 
max-width="100%" 
%}-->

Once you connect a cluster it gets a unique name inside your account that is important when it comes to using this cluster inside a pipeline. From the same screen you can also connect [internal clusters that are behind your firewall]({{site.baseurl}}/docs/installation/behind-the-firewall/#deploying-to-an-internal-kubernetes-cluster/).
.

## Viewing the Codefresh cluster dashboard

After you connect a cluster, several graphical dashboards are automatically populated. The first one is the [Codefresh Kubernetes dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#accessing-the-kubernetes-dashboard).

{% 
  include image.html 
  lightbox="true" 
file="/images/integrations/kubernetes/kubernetes-dashboard.png" 
url="/images/integrations/kubernetes/kubernetes-dashboard.png" 
alt="Integrated Kubernetes Dashboard" 
caption="Integrated Kubernetes Dashboard" 
max-width="100%" 
%}

You can use this Dashboard to get basic information for your cluster such as services, pods, deployments etc.

{% 
  include image.html 
  lightbox="true" 
file="/images/integrations/kubernetes/change-kubernetes-manifest.png" 
url="/images/integrations/kubernetes/change-kubernetes-manifest.png" 
alt="Changing a Kubernetes Manifest" 
caption="Changing a Kubernetes Manifest" 
max-width="100%" 
%}

From the same dashboard you can also add/change configmaps and even edit directly the manifest of a resource.



## Viewing the environment dashboard

The second dashboard that is enabled after you connect a cluster (but not automatically populated), is the [environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/).

{% include
image.html
lightbox="true"
file="/images/integrations/kubernetes/environments.png"
url="/images/integrations/kubernetes/environments.png"
alt="Codefresh Environment Dashboard"
caption="Codefresh Environment Dashboard"
max-width="100%"
%}

This dashboard shows a live view of a Kubernetes application along with the status of the latest builds that affected this environment. You can define such environments either directly from the GUI or [programmatically in a pipeline]({{site.baseurl}}/docs/pipelines/deployment-environments/).

## Ad-hoc deployments with the Codefresh UI

One of the [easiest ways to deploy to Kubernetes]({{site.baseurl}}/docs/deployments/kubernetes/) is to use the Codefresh UI and [manually deploy a docker image]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#deploying-a-new-service):

{% include image.html 
lightbox="true" 
file="/images/integrations/kubernetes/deploy-with-ui.png" 
url="/images/integrations/kubernetes/deploy-with-ui.png" 
alt="Deploying with the quick UI dialog"
caption="Deploying with the quick UI dialog"
max-width="80%" 
%}

You can also [create a pull Secret]({{site.baseurl}}/docs/ci-cd-guides/access-docker-registry-from-kubernetes/) from the GUI.


## Automated deployments with Codefresh pipelines

You can also deploy to a cluster in a pipeline. Codefresh offers [several ways for Kubernetes deployments]({{site.baseurl}}/docs/deployments/kubernetes/). The important point here is that all connected clusters are automatically available to all pipelines with their unique name as a `kubectl` context.

 {% include 
image.html 
lightbox="true" 
file="/images/quick-start/quick-start-k8s/deployment-build.png" 
url="/images/quick-start/quick-start-k8s/deployment-build.png" 
alt="Kubernetes deployment in a pipeline" 
caption="Kubernetes deployment in a pipeline" 
max-width="100%" 
%}


You can use the [integrated Codefresh deployment methods]({{site.baseurl}}/docs/pipelines/steps/deploy/) or even run [custom kubectl commands directly on your cluster]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/).

Codefresh also offers a simple solution for [templating]({{site.baseurl}}/docs/ci-cd-guides/kubernetes-templating/) but you can use another templating methods such as [kustomize]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-with-kustomize/).



## Using a cluster for running CI/CD pipelines

Finally you can also use the [Codefresh Runner]({{site.baseurl}}/docs/installation/codefresh-runner/) to run pipelines in your cluster.



## Related articles
[Manage your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Cloning Git repositories]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/)  

