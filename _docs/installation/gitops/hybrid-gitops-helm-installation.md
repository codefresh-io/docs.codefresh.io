---
title: "Hybrid GitOps Helm Runtime installation"
description: "Provision Hybrid GitOps Runtimes through Helm"
group: installation
redirect_from:
  - /docs/installation/gitops/hybrid-gitops/
toc: true
---

Install the Hybrid Runtime for GitOps through a Helm chart.

If you already have a Codefresh acccount, go for the [quick install](#quick-helm-install-for-hybrid-gitops-runtime). For step-by-step installation from the Codefresh UI, see [Step-by-step Hybrid GitOps Runtime installation walkthrough](#step-by-step-hybrid-gitops-runtime-installation-walkthrough). 

>Hybrid GitOps installation with Helm is currently in Beta.

## Quick Helm install for Hybrid GitOps Runtime

Install the Hybrid GitOps Runtime via Helm with the default tunnel-based access mode. 

The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}.

> **NOTE**:  
  Quick Helm install assumes:  
  * You have set up a Git provider and the Shared Configuration Repository for your account. If these are not defined, you can define them after installation from the Codefresh UI, when prompted to do so.
  * Your cluster does not have [Argo project CRDs](#argo-project-crds).



* Run:  
  `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime --set --devel --wait`  
  
  where:  
  * `<helm-release-name>` is the name of the Helm release.  
  * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
  * `<codefresh-account-id>` is your Codefresh account ID.
  * `<codefresh-api-key>` is the generated API key.
  * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
  * `gitops-runtime` is the chart name defined by Codefresh.
  * `--wait` waits until all the pods are up and running for the deployment.  

**Automated validation**  
Codefresh automatically validates the `values` file before initiating the installation. If there is a validation failure, Codefresh terminates the installation.  
To get more details on the reasons for the failure, run:  
  `kubectl logs jobs/validate-values -n ${NAMESPACE}`  
  where:  
  * `{NAMESPACE}` must be replaced with the namespace of the Hybrid GitOps Runtime. 

To disable automated validation, add `--set installer.skipValidation=true` to the install command.

For more details, see [Step 1: (Optional) Validate Helm values file](#step-1-optional-validate-helm-values-file) in this article. 

## Argo project CRDs
Hybrid GitOps installation requires a cluster without Argo project CRDs.    
You can handle Argo project CRDs outside the chart, or as recommended, adopt the CRDs to be managed by the GitOps Runtime Helm release. 

If you already have Argo project CRDs on your cluster, do one of the following:
* Handle Argo projects CRDs outside of the chart (see [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}) 
  Disable CRD installation under the relevant section for each of the Argo projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the argo project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

* Adopt the CRDs<br>
  Adopting the CRDs allows them to be managed by the `gitops-runtime helm release`. Doing so ensures when you upgrade the Hybrid GitOps Runtime, the CRDs are also automatically upgraded.

  Run this script _before_ installation:

```
#!/bin/sh
RELEASE=<helm-release-name>
NAMESPACE=<target-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```

## Image overrides for private registries
If you use private registries, you need to override specific image values for the different subcharts and container images.
We have a utility to help override image values for GitOps Runtimes. The utility creates values files that match the structure of the subcharts, allowing you to easily replace image registries. During chart installation, you can provide these values files to override the images, as needed.
For more details, see [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-gitops-runtime/gitops-runtime#using-with-private-registries---helper-utility){:target="\_blank"}.

## Step-by-step Hybrid GitOps Runtime installation walkthrough
Install the Hybrid GitOps Runtime via Helm from the Codefresh UI.

The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/tree/main/charts/gitops-runtime){:target="\_blank"}.

### Before you begin
* Make sure you meet the [minimum requirements](#minimum-system-requirements) for installation
* Git provider requirements:
    * [Runtime token with the required scopes]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes). You need to supply as part of the Helm install command.
    * [Personal Access Token (PAT)]({{site.baseurl}}/docs/reference/git-tokens/#git-personal-tokens) with the required scopes for Git-based actions. 
    * Server URLs for on-premises Git providers
* Verify there are no Argo project CRDs in the target namespace or that you have adopted the CRDs (see [Argo project CRDs](#argo-project-crds))
* For ingress-based runtimes only, verify that these ingress controllers are configured correctly:
  * [Ambassador ingress configuration](#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration](#aws-alb-ingress-configuration)
  * [Istio ingress configuration](#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration](#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration](#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration](#traefik-ingress-configuration)
<br><br>




### Step 1: (Optional) Validate Helm values file
Codefresh automatically validates the `values.yaml` file before initiating the installation to verify that the supplied values are correct.  
You also have the option to manually run the validation if desired.

**Validation failure**  
If there is a validation failure, Codefresh will terminate the Helm installation and display the error message: `Job has reached the specified backoff limit`.  

To get more detailed and meaningful information on the reason for the validation failure, run:  
`kubectl logs jobs/validate-values -n ${NAMESPACE}`  
  where:  
  * `{NAMESPACE}` must be replaced with the namespace of the Hybrid GitOps Runtime. 

**Disable automated validation**  
You may want to disable automated validation for specific scenarios, such as to address false-negatives.  
You can do so by either adding the flag to the Helm install command or adding the relevant section to the `values` file.

* In install command:  
  `--set installer.skipValidation=true`

* In `values` file:

{% highlight yaml %}
{% raw %}
...

installer:
  skipValidation: true

...
{% endraw %}
{% endhighlight %}

**Validated settings** 

The table below lists the settings validated in the `values` file.  

{: .table .table-bordered .table-hover}
| Setting                   |  Validation            |  
| --------------            | --------------           |  
|**`userToken`**            | If explicitly defined, or defined as a `secretKeyRef` which exists in the current k8s context and the defined namespace.|
|**Account permissions**    | If the user has admin permissions for the account in which they are installing the runtime.|
|**Runtime name**           | If defined, and is unique to the account.|
|**Access mode**            | {::nomarkdown}<ul><li>For tunnel-based, the default, if <code class="highlighter-rouge">accountId</code> is defined, and matches the account of the <code class="highlighter-rouge">userToken</code> defined in the file.</li><li>For ingress-based, if the <code class="highlighter-rouge">hosts</code> array contains at least one entry that is a valid URL (successful HTTP GET).</li><li>If both tunnel-based and ingress-based access modes are disabled, if <code class="highlighter-rouge">runtime.ingressUrl</code> is defined.</li></ul>{:/} |
|**`gitCredentials`**      | {::nomarkdown}<ul><li>When defined, includes a Git password either explicitly, or as a <code class="highlighter-rouge">secretKeyRef</code>, similar to <code class="highlighter-rouge">userToken</code>.</li><li>The password or token has the required permissions in the Git provider.</li></ul>{:/} |    



**How to: Manually validate values file**

1. To manually validate the `values` file, run:  
  `cf helm validate --values <values_file> --namespace <namespace> --version <version>`  
    where:  
      * `<values_file>` is the name of the values.yaml used by the Helm installation.  
      * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either the default `codefresh`, or the custom name you intend to use for the installation. The Namespace must conform to the naming conventions for Kubernetes objects. 
      * `<version>` is the version of the runtime to install.
1. If there is a validation failure, to see more details on the reasons for the failure, run:  
  `kubectl logs jobs/validate-values -n ${NAMESPACE}`  
  where:  
  * `{NAMESPACE}` must be replaced with the namespace of the Hybrid GitOps Runtime. -->
1. Continue with [Step 2: Select Hybrid Runtime install option](#step-2-select-hybrid-runtime-install-option).

### Step 2: Select Hybrid Runtime install option

1. Do one of the following:  
  * If this is your first Hybrid GitOps installation, in the Welcome page, select **+ Install Runtime**.
  * If you have already provisioned a Hybrid GitOps Runtime, to provision additional runtimes:  
        1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
        1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Continue with [Step 3: Set up GitOps Git provider](#step-3-set-up-gitops-git-provider).

### Step 3: Set up GitOps Git provider
Select the Git provider, define the provider's API URL, and the Shared Configuration Repository for your account.
The [Shared Configuration Repository]({{site.baseurl}}/docs/reference/shared-configuration/) is a Git repository with configuration manifests shared between all the Hybrid GitOps Runtimes within the same account.

>**NOTE**:
 This is a one-time action, required once per account. 

1. Select the **Git provider** from the list.
1. Define the **API URL** for the Git provider you selected, as one of the following:
  * GitHub Cloud: `https://api.github.com` 
  * GitHub Enterprise: `https://<server-url>/api/v3`
  * GitLab Cloud: `https://gitlab.com/api/v4`
  * GitLab Server: `<server-url>/api/v4`
  * Bitbucket Cloud: `https://api.bitbucket.org/2.0`
  * Bitbucket Server: `<server-url>/rest/api/1.0`
1. Define the URL of the **Shared Configuration Repository**.
   >NOTE:   
     >Because the Shared Configuration repo is defined at the account-level, the Git provider you select for the first Runtime in your account is used for all the other Runtimes in the same account. 
     >To change the Shared repo or Git credentials after installation, see [Update Git credentials for GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#update-git-credentials-for-gitops-runtimes).
1. Click **Next**.
1. Continue with [Step 4: Install Hybrid Runtime](#step-4-install-hybrid-gitops-runtime).

### Step 4: Install Hybrid GitOps Runtime

Install the Hybrid GitOps Runtime through the Helm chart. The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/tree/main/charts/gitops-runtime){:target="\_blank"}. 


**Runtime Name**  
If you define a custom name for the Hybrid GitOps Runtime, it must start with a lower-case character, and can include up to 62 lower-case characters and numbers.

**Namespace**  
The Namespace must conform to the naming conventions for Kubernetes objects.

1. To generate your Codefresh API key, click **Generate**. 
1. If needed, select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   The default names are `codefresh` for both.
1. Copy and run the command to the add the repository for the Helm chart:  
   `helm repo add <helm-repo-name> https://chartmuseum.codefresh.io/gitops-runtime` <br>
   `helm repo update`<br>
   where: <br> 
   `<helm-repo-name>` is the name of the repository to which to add the Hybrid GitOps Runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:  
  The commands differ depending on the access mode. An ingress-based Hybrid GitOps Runtime requires additional flags.<br>

    **Tunnel-based install chart command:**<br>
    `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime --devel --wait`  


    **Ingress-based install chart command:**  
      `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime  --set global.runtime.ingress.enabled=true --set "global.runtime.ingress.hosts[0]"=<ingress-host> --set global.runtime.ingress.className=<ingress-class> --devel --wait`  
    
    >Unless otherwise indicated, values are automatically populated by Codefresh.

    where:  
    * `<helm-release-name>` is the name of the Helm release.  
    * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
    * `<codefresh-account-id>` is your Codefresh account ID.
    * `<codefresh-api-key>` is the generated API key.
    * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
    * `gitops-runtime` is the chart name defined by Codefresh.
    * `global.runtime.ingress.enabled=true` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and indicates that the runtime is ingress-based.
    * `<ingress-host>` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and is the IP address or host name of the ingress controller component. 
    * `<ingress-class>` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and is the ingress class of the ingress controller. For example, `nginx` for the NGINX ingress controller.
    * `--wait` waits until all the pods are up and running for the deployment. 
1. Wait for a few minutes, and then click **Close**.
   You are taken to the List View for GitOps Runtimes where you can see the Hybrid GitOps Runtime you added prefixed with a red dot.
1. Continue with [Step 5: Configure Git credentials for runtime](#step-5-configure-git-credentials-for-hybrid-gitops-runtime).



### Step 5: Configure Git credentials for Hybrid GitOps Runtime
Configure Git credentials to authorize access to and ensure proper functioning of the GitOps Runtime.  

Git credentials include authorizing access to Git through OAuth2 or a personal access token, and optionally configuring SSH access to Git.

**Git authorization** 
* OAuth2 authorization is possible if your admin has registered an OAuth Application for Codefresh. See [OAuth2 setup for Codefresh]({{site.baseurl}}/docs/administration/account-user-management/oauth-setup/).
* Git access token authentication requires you to generate a personal access token in your Git provider account for the GitOps Runtime, with the correct scopes. See [GitOps Runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes).

**SSH access to Git**  
By default, Git repositories use the HTTPS protocol. You can also use SSH to connect Git repositories by entering the SSH private key.

>When SSH is configured for a GitOps runtime, on creating/editing Git-Source applications, you can select HTTPS OR SSH as the protocol to connect to the Git repository. See [Repository URL in Application Source definitions]({{site.baseurl}}/docs/deployments/gitops/create-application/#source).

For more information on generating SSH private keys, see the official documentation:
* [GitHub](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent){:target="\_blank"}
* [GitLab](https://docs.gitlab.com/ee/ssh/#generating-a-new-ssh-key-pair){:target="\_blank"}
* [Bitbucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html){:target="\_blank"}
* [Azure](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops&tabs=current-page){:target="\_blank"}



**Before you begin**  
* To authenticate through a Git access token, make sure your token is valid and has the required scopes for GitOps Runtimes 
* To use SSH, copy the SSH private key for your Git provider 

**How to**

1. Do one of the following: 
  * If your admin has set up OAuth access, click **Authorize Access to Git Provider**. Go to _step 2_.
  * Alternatively, authenticate with an access token from your Git provider. Go to _step 3_.
1. For OAuth2 authorization:
  > If the application is not registered, you get an error. Contact your admin for help.  
      * Enter your credentials, and select **Sign In**.
      * If required, as for example with two-factor authentication, complete the verification. 
    
    {% include 
      image.html 
      lightbox="true" 
      file="/images/administration/user-settings/oauth-user-authentication.png" 
      url="/images/administration/user-settings/oauth-user-authentication.png" 
      alt="Authorizing access with OAuth2" 
      caption="Authorizing access with OAuth2"
      max-width="30%" 
   %}

{:start="3"} 
1. For Git token authentication, in the **Git Runtime Token** field, paste the Git runtime token you generated.
1. Optional. To configure SSH access to Git, expand **Connect Repo using SSH**, and then paste the raw SSH private key into the field. 

<!---SCREENSHOT-->

{:start="5"}
1. Click **Configure**.
1. Continue with [Step 6: (Optional) Configure Hybrid GitOps Runtime as Argo Application](#step-6-optional-configure-hybrid-gitops-runtime-as-argo-application).


### Step 6: (Optional) Configure Hybrid GitOps Runtime as Argo Application

Configure the Hybrid GitOps Runtime as an Argo Application as the final step in the installation process.  
By doing so, you can view the Runtime components, easily monitor health and sync statuses, and ensure that GitOps is the single source of truth for the Runtime.   

1. Click **Configure as Argo Application**. Codefresh takes care of the configuration for you.
1. Continue with [Step 7: (Optional) Create a Git Source](#step-7-optional-create-a-git-source).


>If you don't configure it as an Argo Application, the Sync Status column will show "N/A" and remind you to configure it.


### Step 7: (Optional) Create a Git Source
Create a [Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) for the Runtime. 

1. Optional. Create a Git Source.
1. Continue with [Step 8: (Optional) Configure ingress-controllers](#step-8-optional-configure-ingress-controllers).

### Step 8: (Optional) Configure ingress-controllers
Required only for ALB AWS, Istio, or NGINX Enterprise ingress-controllers.<br>

* Complete configuring these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer](#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service](#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret](#patch-certificate-secret)  

That's it! You have successfully completed installing a Hybrid GitOps Runtime with Helm. See the Runtime in the [Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#gitops-runtime-views) page.

You can now add [external clusters to the Runtime]({{site.baseurl}}/docs/installation/gitops/managed-cluster/), and [create and deploy GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).

<!-- * Image overrides for private registries
  If you use private registries, you need to override specific image values for the different subcharts and container images.  
  We have a utility to help override image values for GitOps Runtimes. The utility creates `values` files that match the structure of the subcharts, allowing you to easily replace image registries. During chart installation, you can provide these `values` files to override the images, as needed.  
  For more details, see the [README](https://github.com/codefresh-io/gitops-runtime-helm/blob/airgapped-scripts-and-rootless/charts/gitops-runtime/README/){:target="\_blank"}.  -->




## Minimum system requirements

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |  
| --------------         | --------------           |  
|Kubernetes cluster      | Server version 1.18 and higher, without Argo Project components. {::nomarkdown}<br><b>Tip</b>:  To check the server version, run:<br> <code class="highlighter-rouge">kubectl version --short</code>.{:/}|
|Node requirements| {::nomarkdown}<ul><li>Memory: 5000 MB</li><li>CPU: 2</li></ul>{:/}|
|Cluster permissions | Cluster admin permissions |
|Git providers    |{::nomarkdown}<ul><li>GitHub</li><li>GitHub Enterprise</li><li>GitLab Cloud</li><li>GitLab Server</li><li>Bitbucket Cloud</li><li>Bitbucket Server</li></ul>{:/}|
|Git access tokens    | {::nomarkdown}Git runtime token:<ul><li>Valid expiration date</li><li>Scopes:<ul><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes">GitHub and GitHub Enterprise</a></li><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes">GitLab Cloud and GitLab Server</a></li><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes">Bitbucket Cloud and Server</a> </li></ul></ul>{:/}|
| |Git personal token:{::nomarkdown}<ul><li>Valid expiration date</li><li>Scopes: <ul><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#github-and-github-enterprise-personal-user-token-scopes">GitHub and GitHub Enterprise</a></li><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-personal-user-token-scopes">GitLab Cloud and GitLab Server</a></li><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#bitbucket-cloud-and-server-personal-user-token-scopes">Bitbucket Cloud and Server</a> </li></ul>{:/}|

## Ingress controller configuration
  
Codefresh supports both tunnel-based and ingress-based access modes. <br>
Ingress-based access mode requires you to configure an ingress controller before the installation, and pass additional flags such as the ingress host and class in the Helm install command. 
See also [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).


### Ambassador ingress configuration
For detailed configuration information, see the [Ambassador ingress controller documentation](https://www.getambassador.io/docs/edge-stack/latest/topics/running/ingress-controller){:target="\_blank"}.  

This section lists the specific configuration requirements for Codefresh to be completed  _before_ installing the Hybrid GitOps Runtime.  
* Valid external IP address    
* Valid TLS certificate 
* TCP support

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  
  {::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.  

{::nomarkdown}
</br></br>
{:/}

### AWS ALB ingress configuration

For detailed configuration information, see the [ALB AWS ingress controller documentation](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4){:target="\_blank"}.  

This table lists the specific configuration requirements for Codefresh.  

{: .table .table-bordered .table-hover}
| What to configure    |   When to configure |   
| --------------       | --------------                    | 
|Valid external IP address |   _Before_ installing Hybrid GitOps Runtime  |     
|Valid TLS certificate | |
|TCP support|  |  
|Controller  configuration] |  | 
|Alias DNS record in route53 to load balancer | _After_ installing Hybrid GitOps Runtime| 
|(Optional) Git integration registration | | 

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.  

{::nomarkdown}
</br>
{:/}

#### Controller configuration
In the ingress resource file, verify that `spec.controller` is configured as `ingress.k8s.aws/alb`. 

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: alb
spec:
  controller: ingress.k8s.aws/alb
```

{::nomarkdown}
</br>
{:/}

#### Create an alias to load balancer in route53

>  The alias  must be configured _after_ installing the Hybrid GitOps Runtime.

1. Make sure a DNS record is available in the correct hosted zone. 
1. _After_ Hybrid GitOps Runtime installation, in Amazon Route 53, create an alias to route traffic to the load balancer that is automatically created during the installation:  
  * **Record name**: Enter the same record name used in the installation.
  * Toggle **Alias** to **ON**.
  * From the **Route traffic to** list, select **Alias to Application and Classic Load Balancer**.
  * From the list of Regions, select the region. For example, **US East**.
  * From the list of load balancers, select the load balancer that was created during installation.  

For more information, see [Creating records by using the Amazon Route 53 console](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html){:target="\_blank"}.

{% include image.html
  lightbox="true"
  file="/images/runtime/post-install-alb-ingress.png"
  url="/images/runtime/post-install-alb-ingress.png"
  alt="Route 53 record settings for AWS ALB"
  caption="Route 53 record settings for AWS ALB"
  max-width="60%"
%}

{::nomarkdown}
</br>
{:/}

#### (Optional) Git integration registration
If the installation failed, as can happen if the DNS record was not created within the timeframe, manually create and register Git integrations using these commands:  
  `cf integration git add default --runtime <RUNTIME-NAME> --api-url <API-URL>`  
  `cf integration git register default --runtime <RUNTIME-NAME> --token <RUNTIME-AUTHENTICATION-TOKEN>`  
 
{::nomarkdown}
</br></br>
{:/}

### Istio ingress configuration
For detailed configuration information, see [Istio ingress controller documentation](https://istio.io/latest/docs/tasks/traffic-management/ingress/kubernetes-ingress){:target="\_blank}.  

The table below lists the specific configuration requirements for Codefresh.

{: .table .table-bordered .table-hover}
| What to configure    |   When to configure |   
| --------------       | --------------   | 
|Valid external IP address |_Before_ installing Hybrid GitOps Runtime  |     
|Valid TLS certificate| |
|TCP support |  | 
|Cluster routing service | _After_ installing Hybrid GitOps Runtime | 

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.  

{::nomarkdown}
</br>
{:/}



#### Cluster routing service
>  The cluster routing service must be configured _after_ installing the Hybrid GitOps Runtime.

Based on the Hybrid GitOps Runtime version, you need to configure single or multiple `VirtualService` resources for the `app-proxy`, `webhook`, and `workflow` services.

##### Runtime version 0.0.543 or higher
Configure a single `VirtualService` resource to route traffic to the `app-proxy`, `webhook`, and `workflow` services, as in the example below.  

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  namespace: pov-codefresh-istio-runtime # replace with your Hybrid GitOps runtime name
  name: internal-router
spec:
  hosts:
    -  pov-codefresh-istio-runtime.sales-dev.codefresh.io   # replace with your host name
  gateways:
    - istio-system/internal-router  # replace with your gateway name
  http:
    - match:
      - uri:
          prefix: /webhooks
      route:
      - destination:
          host: internal-router
          port:
            number: 80
    - match:
      - uri:
          prefix: /app-proxy
      route:
      - destination:
          host: internal-router
          port:
            number: 80
    - match:
      - uri:
          prefix: /workflows
      route:
      - destination:
          host: internal-router
          port:
            number: 80
```

##### Runtime version 0.0.542 or lower

Configure two different `VirtualService` resources, one to route traffic to the `app-proxy`, and the second to route traffic to the `webhook` services, as in the examples below.  

{::nomarkdown}
</br>
{:/}

**`VirtualService` example for `app-proxy`:**

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  namespace: test-runtime3 # replace with your Hybrid GitOps runtime name
  name: cap-app-proxy 
spec:
  hosts:
    - my.support.cf-cd.com # replace with your host name
  gateways:
    - my-gateway # replace with your host name
  http:
    - match:
      - uri:
          prefix: /app-proxy 
      route:
      - destination:
          host: cap-app-proxy 
          port:
            number: 3017
```

**`VirtualService` example for `webhook`:**  

> Configure a `uri.prefix` and `destination.host` for each event-source if you have more than one.

```yaml  
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  namespace: test-runtime3 # replace with your Hybrid GitOps runtime name
  name: csdp-default-git-source
spec:
  hosts:
    - my.support.cf-cd.com # replace with your host name
  gateways:
    - my-gateway # replace with your gateway name
  http:
    - match:
      - uri:
          prefix: /webhooks/test-runtime3/push-github # replace `test-runtime3` with your Hybrid GitOps runtime name, and `push-github` with the name of your event source
      route:
      - destination:
          host: push-github-eventsource-svc # replace `push-github' with the name of your event source
          port:
            number: 80
    - match:
      - uri:
          prefix: /webhooks/test-runtime3/cypress-docker-images-push # replace `test-runtime3` with your Hybrid GitOps runtime name, and `cypress-docker-images-push` with the name of your event source
      route:
      - destination:
          host: cypress-docker-images-push-eventsource-svc # replace `cypress-docker-images-push` with the name of your event source
          port:
            number: 80
```

{::nomarkdown}
</br></br>
{:/}

### NGINX Enterprise ingress configuration

For detailed configuration information, see [NGINX ingress controller documentation](https://docs.nginx.com/nginx-ingress-controller){:target="\_blank}.  

The table below lists the specific configuration requirements for Codefresh.

{: .table .table-bordered .table-hover}
| What to configure    |   When to configure |   
| --------------       | --------------                    | 
|Verify valid external IP address |_Before_ installing Hybrid GitOps Runtime  |     
|Valid TLS certificate | |
|TCP support|  | 
|NGINX Ingress: Enable report status to cluster |  | 
|NGINX Ingress Operator: Enable report status to cluster| |
|Patch certificate secret |_After_ installing Hybrid GitOps Runtime|

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.   

{::nomarkdown}
</br>
{:/}

#### NGINX Ingress: Enable report status to cluster

If the ingress controller is not configured to report its status to the cluster, Argo’s health check reports the health status as “progressing” resulting in a timeout error during installation.  

* Pass `--report-ingress-status` to `deployment`.

```yaml
spec:                                                                                                                                                                 
  containers: 
    - args:                                                                                                                                              
      - --report-ingress-status
```

{::nomarkdown}
</br>
{:/}

#### NGINX Ingress Operator: Enable report status to cluster

If the ingress controller is not configured to report its status to the cluster, Argo’s health check reports the health status as “progressing” resulting in a timeout error during installation.  

1. Add this to the `Nginxingresscontrollers` resource file:

   ```yaml
   ...
   spec:
     reportIngressStatus:
       enable: true
   ...
  ```

1. Make sure you have a certificate secret in the same namespace as the Hybrid GitOps Runtime. Copy an existing secret if you don't have one.  
You will need to add this to the `ingress-master` when you have completed runtime installation.

{::nomarkdown}
</br>
{:/}

#### Patch certificate secret
>  The certificate secret must be configured _after_ installing the Hybrid GitOps Runtime.

Patch the certificate secret in `spec.tls` of the `ingress-master` resource.  
The secret must be in the same namespace as the Hybrid GitOps Runtime.

1. Go to the Hybrid GitOps Runtime namespace with the NGINX ingress controller.
1. In `ingress-master`, add to `spec.tls`:  

    ```yaml
    tls:                                                                                                                                                                    
     - hosts:                                                                                                                                                                
     - <host_name>                                                                                             
     secretName: <secret_name>
   ```

{::nomarkdown}
</br></br>
{:/}

### NGINX Community version ingress configuration

Codefresh has been tested with and supports implementations of the major providers. For your convenience, we have provided configuration instructions, both for supported and untested providers in [Provider-specific configuration](#provider-specific-configuration).  


This section lists the specific configuration requirements for Codefresh to be completed  _before_ installing the Hybrid GitOps Runtime.  
* Verify valid external IP address 
* Valid TLS certificate 
* TCP support 

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services, and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.   

Here's an example of TCP configuration for NGINX Community on AWS.  
Verify that the `ingress-nginx-controller` service manifest has either of the following annotations:  

`service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "tcp"`  
OR  
`service.beta.kubernetes.io/aws-load-balancer-type: nlb` 

{::nomarkdown}
</br>
{:/}

#### Provider-specific configuration

> The instructions are valid for `k8s.io/ingress-nginx`, the community version of NGINX.

<details>
<summary><b>AWS</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/aws/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#aws">ingress-nginx documentation for AWS</a>.
</details>
<details>
<summary><b>Azure (AKS)</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://docs.microsoft.com/en-us/azure/aks/ingress-internal-ip?tabs=azure-cli#create-an-ingress-controller">ingress-nginx documentation for AKS</a>.

</details>

<details>
<summary><b>Bare Metal Clusters</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/baremetal/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
Bare-metal clusters often have additional considerations. See <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/baremetal/">Bare-metal ingress-nginx considerations</a>.

</details>

<details>
<summary><b>Digital Ocean</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/do/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean">ingress-nginx documentation for Digital Ocean</a>.

</details>

<details>
<summary><b>Docker Desktop</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop">ingress-nginx documentation for Docker Desktop</a>.<br>
<b>Note:</b> By default, Docker Desktop services will provision with localhost as their external address. Triggers in delivery pipelines cannot reach this instance unless they originate from the same machine where Docker Desktop is being used.

</details>

<details>
<summary><b>Exoscale</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/exoscale/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://github.com/exoscale/exoscale-cloud-controller-manager/blob/master/docs/service-loadbalancer.md">ingress-nginx documentation for Exoscale</a>.

</details>


<details>
<summary><b>Google (GKE)</b></summary>
<br>
<b>Add firewall rules</b>
<br>
GKE by default limits outbound requests from nodes. For the Hybrid GitOps Runtime to communicate with the control-plane in Codefresh, add a firewall-specific rule.

<ol>
<li>Find your cluster's network:<br>
    <code class="highlighter-rouge">gcloud container clusters describe [CLUSTER_NAME] --format=get"(network)"</code>
</li>
<li>Get the Cluster IPV4 CIDR:<br>
    <code class="highlighter-rouge">gcloud container clusters describe [CLUSTER_NAME] --format=get"(clusterIpv4Cidr)"</code>
</li>
<li>Replace the `[CLUSTER_NAME]`, `[NETWORK]`, and `[CLUSTER_IPV4_CIDR]`, with the relevant values: <br>
    <code class="highlighter-rouge">gcloud compute firewall-rules create "[CLUSTER_NAME]-to-all-vms-on-network" </code><br>
    <code class="highlighter-rouge">  
    --network="[NETWORK]" \
    </code><br>
   <code class="highlighter-rouge">  
    --source-ranges="[CLUSTER_IPV4_CIDR]" \
    </code><br>
   <code class="highlighter-rouge">  
   --allow=tcp,udp,icmp,esp,ah,sctp
    </code><br>
</li> 
</ol>
<br>
<b>Use ingress-nginx</b><br>
<ol>
  <li>Create a `cluster-admin` role binding:<br>
      <code class="highlighter-rouge">  
        kubectl create clusterrolebinding cluster-admin-binding \
      </code><br>
      <code class="highlighter-rouge">  
        --clusterrole cluster-admin \
      </code><br>
      <code class="highlighter-rouge">  
        --user $(gcloud config get-value account)
      </code><br>
  </li>
  <li>Apply:<br>
      <code class="highlighter-rouge">  
        kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
      </code>
  </li>
  <li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
  </li>

</ol>
We recommend reviewing the <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke">provider-specific documentation for GKE</a>.

</details>


<details>
<summary><b>MicroK8s</b></summary>
<ol>
<li>Install using Microk8s addon system:<br>
    <code class="highlighter-rouge">microk8s enable ingress</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
MicroK8s has not been tested with Codefresh, and may require additional configuration. For details, see <a target="_blank" href="https://microk8s.io/docs/addon-ingress">Ingress addon documentation</a>.

</details>


<details>
<summary><b>MiniKube</b></summary>
<ol>
<li>Install using MiniKube addon system:<br>
    <code class="highlighter-rouge">minikube addons enable ingress</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
MiniKube has not been tested with Codefresh, and may require additional configuration. For details, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#minikube">Ingress addon documentation</a>.

</details>



<details>
<summary><b>Oracle Cloud Infrastructure</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#oracle-cloud-infrastructure">ingress-nginx documentation for Oracle Cloud</a>.

</details>

<details>
<summary><b>Scaleway</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/scw/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#scaleway">ingress-nginx documentation for Scaleway</a>.

</details> 

{::nomarkdown}
</br></br>
{:/}

### Traefik ingress configuration
For detailed configuration information, see [Traefik ingress controller documentation](https://doc.traefik.io/traefik/providers/kubernetes-ingress){:target="\_blank}.  

The table below lists the specific configuration requirements for Codefresh.

{: .table .table-bordered .table-hover}

| What to configure    |   When to configure |   
| --------------       | --------------  | 
|Valid external IP address | _Before_ installing Hybrid GitOps Runtime  |     
|Valid SSL certificate | |
|TCP support |  | 
|Enable report status to cluster|  | 

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}
 
#### TCP support  
Configure the ingress controller to handle TCP requests.   

{::nomarkdown}
</br>
{:/}
 
#### Enable report status to cluster 
By default, the Traefik ingress controller is not configured to report its status to the cluster.  If not configured,  Argo’s health check reports the health status as “progressing”, resulting in a timeout error during installation.  

To enable reporting its status, add `publishedService` to `providers.kubernetesIngress.ingressEndpoint`.  
  
The value must be in the format `"<namespace>/<service-name>"`, where:  
  `<service-name>` is the Traefik service from which to copy the status

```yaml
...
providers:
  kubernetesIngress:
    ingressEndpoint:
      publishedService: "<namespace>/<traefik-service>" # Example, "codefresh/traefik-default" 
...
```


## Related articles
[Managing and monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)  
[GitOps architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-architecture)  

