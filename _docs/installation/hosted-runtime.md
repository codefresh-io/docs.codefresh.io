---
title: "Hosted GitOps Runtime setup"
description: "Provision Hosted GitOps environment"
group: installation
toc: true
---



Set up your hosted environment with the Hosted GitOps Runtime to leverage extensive CD capabilities.
<!---Read about [Hosted GitOps]({{site.baseurl}}/docs/incubation/intro-hosted-runtime/). -->

## System requirements for Hosted GitOps Runtimes

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |  
| --------------         | --------------           |  
|Kubernetes cluster      | Server version 1.18 and higher to which to deploy applications|
|Git provider      | {::nomarkdown}<ul><li>GitHub</li><!---<li>GitLab Cloud</li>--><li>Bitbucket Cloud</li></ul>{:/}|


## Where to start with Hosted GitOps Runtimes
If you have not provisioned a Hosted GitOps Runtime, Codefresh presents you with the setup instructions in the **Home** dashboard.   

  

* In the Codefresh UI, go to Codefresh [Home](https://g.codefresh.io/2.0/?time=LAST_7_DAYS){:target="\_blank"}.
  Codefresh guides you through the three-step setup, as described below.

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-initial-view.png"
url="/images/runtime/hosted-initial-view.png"
alt="Hosted GitOps setup"
caption="Hosted GitOps setup"
max-width="80%"
%}

  >You can provision a single Hosted GitOps Runtime per Codefresh account.



## Step 1: Install Hosted GitOps Runtime
Start installing the Hosted GitOps Runtime with a single-click. Codefresh completes the installation without any further intervention on your part. 
The Hosted GitOps Runtime is provisioned on the Codefresh cluster, and completely managed by Codefresh with automatic version and security upgrades.



1. Do one of the following:  
  * To set up Hosted GitOps Runtime later, click **Install later**, and continue from step _2_.
  * To start setup, click **Install**, and continue from step _3_.

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-installing.png"
url="/images/runtime/hosted-installing.png"
alt="Step 1: Installing Hosted GitOps Runtime"
caption="Step 1: Installing Hosted GitOps Runtime"
max-width="80%"
%}

{:start="2"}
1. Do the following:  
  * In the Codefresh UI, go to [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}, and click **+ Add Runtimes**.
  * Select **Hosted GitOps Runtime** and click **Add**.
  >An account can be provisioned with a single Hosted GitOps Runtime. If you have already provisioned a Hosted GitOps Runtime for your account, the Hosted GitOps Runtime option is disabled.
  * Continue from _step 3_. 

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-install-later.png"
url="/images/runtime/hosted-install-later.png"
alt="Install Hosted GitOps Runtime"
caption="Install Hosted GitOps Runtime"
max-width="40%"
%}


{:start="3"}
1. When complete, to view the components for the Hosted GitOps Runtime, click **View Runtime**.
  You are directed to the Runtime Components tab.  

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-runtime-components.png"
url="/images/runtime/hosted-runtime-components.png"
alt="Runtime components for Hosted GitOps Runtime"
caption="Runtime components for Hosted GitOps Runtime"
max-width="70%"
%}

> The Git Sources and the Managed Clusters are empty as they will be set up in the next steps.  

If you navigate to **Runtimes > List View**, you can identify the Hosted GitOps Runtime through the Type column (Hosted), the Cluster/Namespace column (Codefresh), and the Module column (CD Ops).

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-runtimes-list-view.png"
url="/images/runtime/hosted-runtimes-list-view.png"
alt="Hosted runtimes in List view"
caption="Hosted runtimes in List view"
max-width="70%"
%}

### Troubleshoot failed Hosted GitOps Runtime installation
Your Hosted GitOps Runtime may fail to install with an error as in the image below. We are closely moinitoring the Hosted GitOps Runtime installation process and activley working to prevent and iron out all installation errors. Follow the instructions to uninstall and reinstall the Hosted GitOps Runtime.

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-runtime-error.png"
url="/images/runtime/hosted-runtime-error.png"
alt="Hosted runtime installation error"
caption="Hosted runtime installation error"
max-width="70%"
%}


1. Download the CLI
  * If you have installed the Codefresh CLI already, make sure you have the latest version:  
     `cf version`  
     To compare with the latest version from Codefresh, [click here](https://github.com/codefresh-io/cli-v2/releases){:target="\_blank"}.  
  * [Download the CLI]({{site.baseurl}}/docs/clients/csdp-cli/).

1. Uninstall the failed Hosted GitOps Runtime:  
  `cf runtime uninstall codefresh-hosted --force`  
  where:  
  `hosted-codefresh` is the name of your Hosted GitOps Runtime, automatically assigned by Codefresh.
1. In the Codefresh UI, return to Codefresh [Home](https://g.codefresh.io/2.0/?time=LAST_7_DAYS){:target="\_blank"}.
1. Refresh the page and start with _1. Provision hosted runtime_ above.


### Step 2: Connect Git provider
Connect your Hosted GitOps Runtime to a Git provider for Codefresh to create the required Git repos.  First authorize access to your Git provider through an OAuth token, and then select the Git organizations or accounts in which to create the required Git repos.  

>Only authorized organizations are displayed in the list. To authorize organizations for the Codefresh application in GitHub, see [Authorize organizations/projects]({{site.baseurl}}/docs/administration/hosted-authorize-orgs/).


{% include
image.html
lightbox="true"
file="/images/runtime/hosted-connect-git.png"
url="/images/runtime/hosted-connect-git.png"
alt="Step 2: Connect to Git provider"
caption="Step 2: Connect to Git provider"
max-width="80%"
%}


Once you authorize access, Codefresh creates two Git repositories, one to store the runtime configuration settings, and the other to store the runtime's application settings:
* Shared runtime configuration repo  

  The shared runtime configuration repo is a centralized Git repository that stores configuration settings for the Hosted GitOps Runtime. Additional runtimes provisioned for the account can point to this repo to retrieve and reuse the configuration.  
  Read about [Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/).

* Git Source application repo  

  Codefresh creates a Git Source application repo for every Hosted GitOps Runtime.  
  Read about [Git sources]({{site.baseurl}}/docs/runtime/git-sources/).


>Hosted runtimes support only OAuth authentication. 

1. Click **Connect**.
1. Click **Authorize Access**, and enter your OAuth token.
  If you don't have an OAuth token, see the instructions on how to generate one in [How to update a Git token]({{site.baseurl}}/docs/administration/user-settings/#how-to-update-a-git-personal-token). 

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-authorize-access.png"
url="/images/runtime/hosted-authorize-access.png"
alt="Authorize access to Git"
caption="Authorize access to Git"
max-width="40%"
%}

{:start="3"}
1. Select the **Git Organization for which to create the repos**.
  >If the organization does not appear in the list, you need to authorize access to it. See [Authorize organizations/projects]({{site.baseurl}}/docs/administration/hosted-authorize-orgs/).
1. Click **Create**.
  Codefresh creates the two Git repositories in the paths shown.

 {% include
image.html
lightbox="true"
file="/images/runtime/hosted-select-git-repo.png"
url="/images/runtime/hosted-select-git-repo.png"
alt="Git configuration repos for Git Organization"
caption="Git configuration repos for Git Organization"
max-width="50%"
%}

{:start="5"}
1. Verify that both repositories have been created in your Git account.  

  Shared runtime configuration repo
  
  {% include
image.html
lightbox="true"
file="/images/runtime/hosted-git-shared-repo.png"
url="/images/runtime/hosted-git-shared-repo.png"
alt="Shared configuration repo in Git"
caption="Shared configuration repo in Git"
max-width="70%"
%}

  Runtime Git Source repo

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-git-shared-repo.png"
url="/images/runtime/hosted-git-shared-repo.png"
alt="Shared configuration repo in Git"
caption="Shared configuration repo in Git"
max-width="70%"
%}

{:start="6"}  
1. Optional. To see your tokens, click **View Tokens**. 

If you return to the Runtimes page and select the Git Source tab, you will now see the Git Source that Codefresh created.  
The Sync State may be Unknown for a few moments until it is synced to the Codefresh cluster. 

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-git-source-in-ui.png"
url="/images/runtime/hosted-git-source-in-ui.png"
alt="Git Source tab for Hosted GitOps Runtime"
caption="Git Source tab for Hosted GitOps Runtime"
max-width="80%"
%}


### 3. Connect a Kubernetes cluster

Connect a destination cluster to the Hosted GitOps Runtime and register it as a managed cluster. Deploy applications and configuration to the cluster.
For managed cluster information and installing Argo Rollouts, see [Add and manage external clusters]({{site.baseurl}}/docs/runtime/managed-cluster/).


 {% include 
image.html 
lightbox="true" 
file="/images/runtime/hosted-connect-cluster-step.png" 
url="/images/runtime/hosted-connect-cluster-step.png" 
alt="Step 3: Connect a K8s cluster for Hosted GitOps Runtime" 
caption="Step 3: Connect a K8s cluster for Hosted GitOps Runtime"
max-width="70%" 
%}

**Before you begin**  
* Make sure your cluster has internet access  

**How to**  
1. Click **Connect**.
1. In the Add Managed Cluster panel, copy the command `cf cluster add`, and run it in the terminal.  
1. When prompted to select the `kube-context`, select from the list of available clusters as defined in `kubeconfig`.  
  
   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/hosted-add-cluster.png" 
	url="/images/runtime/hosted-add-cluster.png" 
	alt="Add Managed Cluster panel" 
	caption="Add Managed Cluster panel"
  max-width="50%" 
  %}

{:start="4"}
1. Return to the **Runtimes** page, and then select **Topology View**.  
  You can see the new K8s cluster you connected. 

   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/hosted-new-cluster-topology.png" 
	url="/images/runtime/hosted-new-cluster-topology.png" 
	alt="New K8s cluster in Hosted GitOps Runtime" 
	caption="New K8s cluster in Hosted GitOps Runtime"
  max-width="80%" 
  %}

{:start="5"} 
1. Configure access to the IP addresses required. See [Codefresh IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/). 

If you could not connect a cluster, you may not have the latest version of the CLI:  
* If you have installed the Codefresh CLI already, make sure you have the latest version:  
  `cf version`  
  To compare with the latest version from Codefresh, [click here](https://github.com/codefresh-io/cli-v2/releases){:target="\_blank"}.  
* [Download the CLI]({{site.baseurl}}/docs/clients/csdp-cli/).

You have completed setting up your Hosted GitOps Runtime. You are ready to create applications, and connect third-party CI tools for image enrichment.

### (Optional) Create application
Optional. Create an application in Codefresh, deploy it to the cluster, and track deployment and performance in the Applications dashboard.  

1. Follow our quick-start to create and deploy the `codefresh-guestbook` application. Start with [Create application resources]({{site.baseurl}}/docs/getting-started/quick-start/create-app-specs/).  
  OR    
  Create your own application. See [Create an application]({{site.baseurl}}/docs/deployment/create-application/)   

{:start="2"}
2. In the Codefresh UI, view your application in the [Applications dashboard](https://g.codefresh.io/2.0/applications-dashboard){:target="\_blank"}.

### (Optional) Connect CI 
Optional. Integrate Codefresh with the third-party tools you use for CI to enrich image information in deployments.  

[Image enrichment with integrations]({{site.baseurl}}/docs/integrations/image-enrichment-overview/) 

### Related articles
[Monitoring & managing GitOps Runtimes]({{site.baseurl}}/docs/installation/monitor-manage-runtimes/)  
[Add Git Sources to runtimes]({{site.baseurl}}/docs/installation/git-sources/)  
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration)  
[Home dashboard]({{site.baseurl}}/docs/reporting/home-dashboard/)   
[DORA metrics]({{site.baseurl}}/docs/reporting/dora-metrics/)

