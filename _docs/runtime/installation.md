---
title: "Install hybrid runtimes"
description: ""
group: runtime
toc: true
---

If you have a hybrid environment, you can provision one or more hybrid runtimes in your Codefresh account. 

> If you have Hosted GitOps, to provision a hosted runtime, see [Provision a hosted runtime]({{site.baseurl}}/docs/runtime/hosted-runtime/#1-provision-hosted-runtime) in [Set up a hosted (Hosted GitOps) environment]({{site.baseurl}}/docs/runtime/hosted-runtime/).

**Git providers and runtimes**  
Your Codefresh account is always linked to a specific Git provider. This is the Git provider you select on installing the first runtime, either hybrid or hosted, in your Codefresh account. All the hybrid runtimes you install in the same account use the same Git provider.  
If Bitbucker Server is your Git provider, you must also select the specific server instance to associate with the runtime. 

>To change the Git provider for your Codefresh account after installation, contact Codefresh support.


**Hybrid runtime**  
 The hybrid runtime comprises Argo CD components and Codefresh-specific components. The Argo CD components are derived from a fork of the Argo ecosystem, and do not correspond to the open-source versions available.  

There are two parts to installing a hybrid runtime:

1. Installing the Codefresh CLI
2. Installing the hybrid runtime from the CLI, either through the CLI wizard or via silent installation through the installation flags.  
  The hybrid runtime is installed in a specific namespace on your cluster. You can install more runtimes on different clusters in your deployment.  
  Every hybrid runtime installation makes commits to three Git repos:
  * Runtime install repo: The installation repo that manages the hybrid runtime itself with Argo CD. If the repo URL does not exist, it is automatically created during runtime installation.
  * Git Source repo: Created automatically during runtime installation. The repo where you store manifests for pipelines and applications. See [Git Sources]({{site.baseurl}}/docs/runtime/git-sources).
  * Shared configuration repo: Created for the first runtime in a user account. The repo stores configuration manifests for account-level resources and is shared with other runtimes in the same account. See [Shared configuration repository]({{site.baseurl}}/docs/reference/shared-configuration).


See also [Codefresh architecture]({{site.baseurl}}/docs/getting-started/architecture).

{::nomarkdown}
</br>
{:/}

### Hybrid runtime installation flags
This section describes the required and optional flags to install a hybrid runtime.
For documentation purposes, the flags are grouped into:
* Runtime flags, relating to runtime, cluster, and namespace requirements
* Ingress controller flags, relating to ingress controller requirements
* Git provider flags
* Codefresh resource flags

{::nomarkdown}
</br>
{:/}

####  Runtime flags

**Runtime name**  
Required.  
The runtime name must start with a lower-case character, and can include up to 62 lower-case characters and numbers.  
* CLI wizard: Add when prompted. 
* Silent install: Specify the runtime name with the `--runtime` flag.

**Namespace resource labels**  
Optional.  
The label of the namespace resource to which you are installing the hybrid runtime. Labels are required to identify the networks that need access during installation, as is the case when using services meshes such as Istio for example.  

* CLI wizard and Silent install: Add the `--namespace-labels` flag, and define the labels in `key=value` format. Separate multiple labels with `commas`.

**Kube context**  
Required.  
The cluster defined as the default for `kubectl`. If you have more than one Kube context, the current context is selected by default.  

* CLI wizard: Select the Kube context from the list displayed.
* Silent install: Explicitly specify the Kube context with the `--context` flag.

**Shared configuration repository**  
The Git repository per runtime account with shared configuration manifests.  
* CLI wizard and Silent install: Add the `--shared-config-repo` flag and define the path to the shared repo.  

{::nomarkdown}
</br>
{:/}

<!---#### Ingress-less flags
These flags are required to install the runtime without an ingress controller. 

**Access mode**
Required for ingress-less runtime installation.  

The access mode for ingress-less runtimes, the tunnel mode. 
 

* CLI wizard and Silent install: Add the flag, `--access-mode`, and define `tunnel` as the value. 


**IP allowlist**

Optional.  

The allowed list of IPs from which to forward requests to the internal customer cluster for ingress-less runtime installations. The allowlist can include IPv4 and IPv6 addresses, with/without subnet and subnet masks. Multiple IPs must be separated by commas.  

When omitted, all incoming requests are authenticated regardless of the IPs from which they originated. 

* CLI wizard and Silent install: Add the `--ips-allow-list` flag, followed by the list of comma-separated IPs to define more than one. For example, `--ips-allow-list 77.126.94.70/16,192.168.0.0` --->


#### Ingress controller flags


**Skip ingress**  
Required, if you are using an unsupported ingress controller.  
For unsupported ingress controllers, bypass installing ingress resources with the `--skip-ingress` flag.  
In this case, after completing the installation, manually configure the cluster's routing service, and create and register Git integrations. See the last step in [Install the hybrid runtime](#install-the-hybrid-runtime).

**Ingress class**  
Required.  

* CLI wizard: Select the ingress class for runtime installation from the list displayed.
* Silent install: Explicitly specify the ingress class through the `--ingress-class` flag. Otherwise, runtime installation fails.  

**Ingress host**  
Required.  
The IP address or host name of the ingress controller component.  

* CLI wizard: Automatically selects and displays the host, either from the cluster or the ingress controller associated with the **Ingress class**.  
* Silent install: Add the `--ingress-host` flag. If a value is not provided, takes the host from the ingress controller associated with the **Ingress class**.
  > Important: For AWS ALB, the ingress host is created post-installation. However, when prompted, add the domain name you will create in `Route 53` as the ingress host.  

**Insecure ingress hosts**  
TLS certificates for the ingress host:  
If the ingress host does not have a valid TLS certificate, you can continue with the installation in insecure mode, which disables certificate validation.  

* CLI wizard: Automatically detects and prompts you to confirm continuing the installation in insecure mode.  
* Silent install: To continue with the installation in insecure mode, add the `--insecure-ingress-host` flag.  

**Internal ingress host**  
Optional.  
Enforce separation between internal (app-proxy) and external (webhook) communication by adding an internal ingress host for the app-proxy service in the internal network.  
For both CLI wizard and Silent install:  

* For new runtime installations, add the `--internal-ingress-host` flag pointing to the ingress host for `app-proxy`.
* For existing installations, commit changes to the installation repository by modifying the `app-proxy ingress` and `<runtime-name>.yaml`  
  See [(Optional) Internal ingress host configuration for existing hybrid runtimes](#optional-internal-ingress-host-configuration-for-existing-hybrid-runtimes).

{::nomarkdown}
</br>
{:/}



#### Git provider and repo flags
The Git provider defined for the runtime. 

>Because Codefresh creates a [shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration) for the runtimes in your account, the Git provider defined for the first runtime you install in your account is used for all the other runtimes in the same account.  

You can define any of the following Git providers:
* GitHub:
  * [GitHub](#github) (the default Git provider)
  * [GitHub Enterprise](#github-enterprise)
* GitLab:
  * [GitLab Cloud](#gitlab-cloud)
  * [GitLab Server](#gitlab-server)
* Bitbucket:
  * [Bitbucket Cloud](#bitbucket-cloud)
  * [Bitbucket Server](#bitbucket-server)

{::nomarkdown}
</br>
{:/}



##### GitHub
GitHub is the default Git provider for hybrid runtimes. Being the default provider, for both the CLI wizard and Silent install, you need to provide only the repository URL and the Git runtime token.

> For the required scopes, see [GitHub and GitHub Enterprise runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes).

`--repo <repo_url> --git-token <git-runtime-token>`  

where:
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the runtime installation, including the `.git` suffix. Copy the clone URL from your GitHub website (see [Cloning with HTTPS URLs](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls){:target="\_blank"}).   
  If the repo doesn't exist, copy an existing clone URL and change the name of the repo. Codefresh creates the repository during runtime installation.  

  Repo URL format:  
  `https://github.com/<owner>/reponame>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner>/<reponame>` is your username or organization name, followed by the name of the repo, identical to the HTTPS clone URL.  For example, `https://github.com/nr-codefresh/codefresh.io.git`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the runtime is installed in the default branch. For example, `codefresh-prod`.  

  Example:  
  `https://github.com/nr-codefresh/codefresh.io.git/runtimes/defs?ref=codefresh-prod`  
* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the runtime installation repository (see [GitHub runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes)).

{::nomarkdown}
</br>
{:/}

##### GitHub Enterprise 

> For the required scopes, see [GitHub and GitHub Enterprise runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes).


`--enable-git-providers --provider github --repo <repo_url> --git-token <git-runtime-token>`  

where:  
* `--enable-git-providers` (required), indicates that you are not using the default Git provider for the runtime.
* `--provider github` (required), defines GitHub Enterprise as the Git provider for the runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the runtime installation, including the `.git` suffix. Copy the clone URL for HTTPS from your GitHub Enterprise website (see [Cloning with HTTPS URLs](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls){:target="\_blank"}).  
  If the repo doesn't exist, copy an existing clone URL and change the name of the repo. Codefresh creates the repository during runtime installation. 
  Repo URL format:  

  `https://ghe-trial.devops.cf-cd.com/<owner>/<https-repo-url>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner>/<reponame>` is your username or organization name, followed by the name of the repo. For example, `codefresh-io/codefresh.io.git`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the runtime is installed in the default branch. For example, `codefresh-prod`.  

  Example:  
  `https://ghe-trial.devops.cf-cd.com/codefresh-io/codefresh.io.git/runtimes/defs?ref=codefresh-prod`
* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the runtime installation repository (see [GitHub runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes)).  


{::nomarkdown}
</br>
{:/}

##### GitLab Cloud
> For the required scopes, see [GitLab Cloud and GitLab Server runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes).


`--enable-git-providers --provider gitlab --repo <https_project_url> --git-token <git_runtime_token>`  

where:  
* `--enable-git-providers`(required), indicates that you are not using the default Git provider for the runtime.
* `--provider gitlab` (required), defines GitLab Cloud as the Git provider for the runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git project for the runtime installation, including the `.git` suffix. Copy the clone URL for HTTPS from your GitLab website.   
  If the repo doesn't exist, copy an existing clone URL and change the name of the repo. Codefresh creates the repository during runtime installation. 

  > Important: You must create the group with access to the project prior to the installation.

  Repo URL format:  

  `https://gitlab.com/<owner>/<project_name>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner>` is either your username, or if your project is within a group, the front-slash separated path to the project. For example, `nr-codefresh` (owner), or `parent-group/child-group` (group hierarchy)
  * `<projectname>` is the name of the project.  For example, `codefresh`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the runtime is installed in the default branch. For example, `codefresh-prod`.  

  Examples:  
  `https://gitlab.com/nr-codefresh/codefresh.git/runtimes/defs?ref=codefresh-prod` (owner)  

  `https://gitlab.com/parent-group/child-group/codefresh.git/runtimes/defs?ref=codefresh-prod` (group hierarchy)

* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the runtime installation repository (see [GitLab runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes)).  


{::nomarkdown}
</br>
{:/}



##### GitLab Server

> For the required scopes, see [GitLab Cloud and GitLab Server runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes).

`--enable-git-providers --provider gitlab --repo <https_project_url> --git-token <git_runtime_token>`  

where:  
* `--enable-git-providers` (required), indicates that you are not using the default Git provider for the runtime.
* `--provider gitlab` (required), defines GitLab Server as the Git provider for the runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the runtime installation, including the `.git` suffix.  
  If the project doesn't exist, copy an existing clone URL and change the name of the project. Codefresh creates the project during runtime installation.  
  
  > Important: You must create the group with access to the project prior to the installation.

  Repo URL format:  
  `https://gitlab-onprem.devops.cf-cd.com/<owner>/<project_name>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner>` is your username, or if the project is within a group or groups, the name of the group. For example, `nr-codefresh` (owner), or `parent-group/child-group` (group hierarchy)
  * `<projectname>` is the name of the project.  For example, `codefresh`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the runtime is installed in the default branch. For example, `codefresh-prod`.  

  Examples:  
  `https://gitlab-onprem.devops.cf-cd.com/nr-codefresh/codefresh.git/runtimes/defs?ref=codefresh-prod` (owner)  
  
  `https://gitlab-onprem.devops.cf-cd.com/parent-group/child-group/codefresh.git/runtimes/defs?ref=codefresh-prod` (group hierarchy)

* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the runtime installation repository (see [GitLab runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes)).


{::nomarkdown}
</br>
{:/}

##### Bitbucket Cloud
> For the required scopes, see [Bitbucket runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes).


`--enable-git-providers --provider bitbucket --repo <https_repo_url> --git-user <git_username> --git-token <git_runtime_token>`    

where:  
* `--enable-git-providers` (required), indicates that you are not using the default Git provider for the runtime.  
* `--provider gitlab` (required), defines Bitbucket Cloud as the Git provider for the runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the runtime installation, including the `.git` suffix.  
  If the project doesn't exist, copy an existing clone URL and change the name of the project. Codefresh creates the project during runtime installation.  
  >Important: Remove the username, including @ from the copied URL. 
  
  Repo URL format:  

  `https://bitbucket.org<workspace_id><https-repo-url>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<workspace_id>` is your workspace ID. For example, `nr-codefresh`.
  * `<repo_name>` is the name of the repository. For example, `codefresh`.
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the runtime is installed in the default branch. For example, `codefresh-prod`.  

  Example:  
  `https://bitbucket.org/nr-codefresh/codefresh.git/runtimes/defs?ref=codefresh-prod`    
* `--git-user <git_username>` (required), is your username for the Bitbucket Cloud account. 
* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the runtime installation repository (see [Bitbucket runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes)).


{::nomarkdown}
</br>
{:/}

##### Bitbucket Server

> For the required scopes, see [Bitbucket runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes).


`--enable-git-providers --provider bitbucket-server --repo <repo_url> --git-user <git_username> --git-token <git_runtime_token>`  

where:  
* `--enable-git-providers` (required), indicates that you are not using the default Git provider for the runtime.
* `--provider gitlab` (required), defines Bitbucket Cloud as the Git provider for the runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the runtime installation, including the `.git` suffix.  
  If the project doesn't exist, copy an existing clone URL and change the name of the project. Codefresh then creates the project during runtime installation.  
  >Important: Remove the username, including @ from the copied URL.  

  Repo URL format:  

  `https://bitbucket-server-8.2.devops.cf-cd.com:7990/scm/<owner_org_name>/<repo_name>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner_org_name>` is your username or organization name.  For example, `codefresh-io.`. 
  * `<repo_name>` is the name of the repo.  For example, `codefresh`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the runtime is installed in the default branch. For example, `codefresh-prod`.  

  Example:  
  `https://bitbucket-server-8.2.devops.cf-cd.com:7990/scm/codefresh-io/codefresh.git/runtimes/defs?ref=codefresh-prod` 
* `--git-user <git_username>` (required), is your username for the Bitbucket Server account. 
* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the runtime installation repository (see [Bitbucket runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes)).

{::nomarkdown}
</br></br>
{:/}

#### Codefresh resource flags
**Codefresh demo resources**  
Optional.  
Install demo pipelines to use as a starting point to create your own pipelines. We recommend installing the demo resources as these are used in our quick start tutorials.  

* Silent install: Add the `--demo-resources` flag, and define its value as `true` (default), or `false`. For example, `--demo-resources=true`

**Insecure flag**  
For _on-premises installations_, if the Ingress controller does not have a valid SSL certificate, to continue with the installation, add the `--insecure` flag to the installation command.  

{::nomarkdown}
</br></br>
{:/}


### Install the Codefresh CLI

Install the Codefresh CLI using the option that best suits you: `curl`, `brew`, or standard download.  
If you are not sure which OS to select for `curl`, simply select one, and Codefresh automatically identifies and selects the right OS for CLI installation.

{::nomarkdown}
</br></br>
{:/}

### Install the hybrid runtime  

**Before you begin**
* Make sure you meet the [minimum requirements]({{site.baseurl}}/docs/runtime/requirements/#minimum-requirements) for runtime installation
* Make sure you have [runtime token with the required scopes from your Git provdier]({{site.baseurl}}/docs/reference/git-tokens)
* [Download or upgrade to the latest version of the CLI]({{site.baseurl}}/docs/clients/csdp-cli/#upgrade-codefresh-cli)
* Review [Hybrid runtime installation flags](#hybrid-runtime-installation-flags)
* Make sure your ingress controller is configured correctly:
  * [Ambasador ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#alb-aws-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#traefik-ingress-configuration)


{::nomarkdown}
</br>
{:/}
 
**How to** 

1. Do one of the following:  
  * If this is your first hybrid runtime installation, in the Welcome page, select **+ Install Runtime**.
  * If you have provisioned a hybrid runtime, to provision additional runtimes, in the Codefresh UI, go to [**Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Do one of the following:  
  * CLI wizard: Run `cf runtime install`, and follow the prompts to enter the required values.  
  * Silent install: Pass the required flags in the install command:  
    `cf runtime install <runtime-name> --repo <git-repo> --git-token <git-token> --silent`  
  For the list of flags, see [Hybrid runtime installation flags](#hybrid-runtime-installation-flags).
1. If relevant, complete the configuration for these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/runtime/requirements/#alias-dns-record-in-route53-to-load-balancer)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/runtime/requirements/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/runtime/requirements/#patch-certificate-secret)  
1. If you bypassed installing ingress resources with the `--skip-ingress` flag for ingress controllers not in the supported list, create and register Git integrations using these commands:  
  `cf integration git add default --runtime <RUNTIME-NAME> --api-url <API-URL>`  
  `cf integration git register default --runtime <RUNTIME-NAME> --token <RUNTIME-AUTHENTICATION-TOKEN>`  


{::nomarkdown}
</br>
{:/}

### Hybrid runtime components

**Git repositories**  
* Runtime install repository: The installation repo contains three folders: apps, bootstrap and projects, to manage the runtime itself with Argo CD.  
* Git source repository: Created with the name `[repo_name]_git-source`. This repo stores manifests for pipelines with sources, events, workflow templates. See [Add Git Sources to runtimes]({{site.baseurl}}/docs/runtime/git-sources/).

* Shared configuration repository: Stores configuration and resource manifests that can be shared across runtimes, such as integration resources. See [Shared configuration repository]({{site.baseurl}}/docs/reference/shared-configuration/)

**Argo CD components**  
* Project, comprising an Argo CD AppProject and an ApplicationSet
* Installations of the following applications in the project:
  * Argo CD
  * Argo Workflows
  * Argo Events
  * Argo Rollouts
  
**Codefresh-specific components**  
* Codefresh Applications in the Argo CD AppProject:  
  * App-proxy facilitating behind-firewall access to Git
  * Git Source entity that references the`[repo_name]_git-source`  

Once the hybrid runtime is successfully installed, it is provisioned on the Kubernetes cluster, and displayed in the **Runtimes** page.

{::nomarkdown}
</br>
{:/}


### (Optional) Internal ingress host configuration for existing hybrid runtimes
If you already have provisioned hybrid runtimes, to use an internal ingress host for app-proxy communication and an external ingress host to handle webhooks, change the specs for the `Ingress` and `Runtime` resources in the runtime installation repository. Use the examples as guidelines.  

`<runtime-install-repo>/apps/app-proxy/overlays/<runtime-name>/ingress.yaml`: change `host`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: codefresh-cap-app-proxy
  namespace: codefresh #replace with your runtime name
spec:
  ingressClassName: nginx
  rules:
  - host: my-internal-ingress-host # replace with the internal ingress host for app-proxy
    http:
      paths:
      - backend:
          service:
            name: cap-app-proxy 
            port:
              number: 3017
        path: /app-proxy/
        pathType: Prefix
```

`../<runtime-install-repo>/bootstrap/<runtime-name>.yaml`: add `internalIngressHost`

```yaml
apiVersion: v1
data:
  base-url: https://g.codefresh.io
  runtime: |
    apiVersion: codefresh.io/v1alpha1
    kind: Runtime
    metadata:
      creationTimestamp: null
      name: codefresh #replace with your runtime name
      namespace: codefresh #replace with your runtime name
    spec:
      bootstrapSpecifier: github.com/codefresh-io/cli-v2/manifests/argo-cd
      cluster: https://7DD8390300DCEFDAF87DC5C587EC388C.gr7.us-east-1.eks.amazonaws.com
      components:
      - isInternal: false
        name: events
        type: kustomize
        url: github.com/codefresh-io/cli-v2/manifests/argo-events
        wait: true
      - isInternal: false
        name: rollouts
        type: kustomize
        url: github.com/codefresh-io/cli-v2/manifests/argo-rollouts
        wait: false
      - isInternal: false
        name: workflows
        type: kustomize
        url: github.com/codefresh-io/cli-v2/manifests/argo-workflows
        wait: false
      - isInternal: false
        name: app-proxy
        type: kustomize
        url: github.com/codefresh-io/cli-v2/manifests/app-proxy
        wait: false
      defVersion: 1.0.1
      ingressClassName: nginx
      ingressController: k8s.io/ingress-nginx
      ingressHost: https://support.cf.com/
      internalIngressHost: https://my-internal-ingress-host # add this line and replace my-internal-ingress-host with your internal ingress host
      repo: https://github.com/NimRegev/my-codefresh.git
      version: 99.99.99
```
  

### Related articles
[Add external clusters to runtimes]({{site.baseurl}}/docs/runtime/managed-cluster/)  
[Manage provisioned runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)  
[Monitor provisioned hybrid runtimes]({{site.baseurl}}/docs/runtime/monitoring-troubleshooting/)  
[Troubleshoot hybrid runtime installation]({{site.baseurl}}/docs/troubleshooting/runtime-issues/)