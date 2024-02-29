---
title: "Hosted GitOps Runtime installation"
description: "Set up your Hosted GitOps environment"
group: installation
sub_group: gitops
toc: true
---



For GitOps, Codefresh offers the option of installing Hosted and Hybrid GitOps Runtimes. Hosted GitOps Runtimes are fully managed and maintained by Codefresh. For a comparison, see [Hosted vs. Hybrid GitOps]({{site.baseurl}}/docs/installation/gitops/#hosted-vshybrid-gitops). 

This article describes how to install the Hosted GitOps Runtime to leverage GitOps capabilities.<br>
For Hybrid GitOps Runtime installation, see [Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

>**NOTE**  
You can install a _single Hosted GitOps Runtime per Codefresh account_. 



## System requirements for Hosted GitOps Runtimes

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |  
| --------------         | --------------           |  
|Kubernetes cluster      | Server version 1.18 and higher to which to deploy applications|
|Git provider      | {::nomarkdown}<ul><li>GitHub</li><!---<li>GitLab Cloud</li>--><li>Bitbucket Cloud</li><li>Gerrit</li></ul>{:/}|


## Where to start with Hosted GitOps Runtimes
If you have not provisioned a Hosted GitOps Runtime, Codefresh presents you with the setup instructions in the **Home** dashboard.   

  

* In the Codefresh UI, from OPS in the sidebar, select [Home](https://g.codefresh.io/2.0/?time=LAST_7_DAYS){:target="\_blank"}.
  Codefresh guides you through the three-step setup, as described below.

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-gitops-initial-view.png"
url="/images/runtime/hosted-gitops-initial-view.png"
alt="Hosted GitOps Runtime setup"
caption="Hosted GitOps Runtime setup"
max-width="80%"
%}



## Before you begin
* Set up integrations with the Git provider for the Hosted GitOps Runtime
  * GitHub
  * Bitbucket Cloud
  * Gerrit

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
  * In the Codefresh UI, click the **Settings** icon on the toolbar.
  * From Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}, and click **+ Add Runtime**.
  * Select **Hosted Runtime** and click **Add**.
    {{site.data.callout.callout_tip}}
    **TIP**  
    An account can be provisioned with a single Hosted GitOps Runtime. If you have already provisioned a Hosted GitOps Runtime for your account, the Hosted GitOps Runtime option is disabled.
    {{site.data.callout.end}}
  * Continue from _step 3_. 

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

{{site.data.callout.callout_tip}}
**TIP**  
  You can see that there are two steps to complete Hosted GitOps setup.  
  The Git Sources and the Managed Clusters are empty as they will be set up in the next steps.  
{{site.data.callout.end}}

If you navigate to **Runtimes > List View**, you can identify the Hosted GitOps Runtime through the Type column (Hosted), the Cluster/Namespace column (Codefresh), and the Module column (CD Ops).

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-runtimes-list-view.png"
url="/images/runtime/hosted-runtimes-list-view.png"
alt="Hosted GitOps Runtime in List view"
caption="Hosted GitOps Runtime in List view"
max-width="70%"
%}


## Step 2: Connect Git provider
Connect your Hosted GitOps Runtime to a Git provider for Codefresh to create the required Git repos.  

**Authorize access**  
  Based on the Git provider you select, you need to authorize access through OAuth or access token, and then select the Git organizations or accounts in which to create the required Git repos. 

**Git organizations/accounts**  
  Only authorized organizations are displayed in the list. To authorize organizations for the Codefresh application in GitHub, see [Authorize organizations/projects]({{site.baseurl}}/docs/administration/account-user-management/hosted-authorize-orgs/).


{% include
image.html
lightbox="true"
file="/images/runtime/hosted-connect-git.png"
url="/images/runtime/hosted-connect-git.png"
alt="Step 2: Connect to Git provider"
caption="Step 2: Connect to Git provider"
max-width="80%"
%}


Once you authorize access, Codefresh creates two Git repositories, one to store the configuration settings for GitOps Runtimes, and the other to store the Runtime's application settings:
* Shared Configuration Repository  
  The Shared Configuration Repository is a centralized Git repository that stores configuration settings for the Hosted GitOps Runtime. Additional Hybrid runtimes provisioned for the account can point to this repo to retrieve and reuse the configuration.  
  Read about [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).


* Git Source application repo  
  Codefresh creates a Git Source application repo for every Hosted GitOps Runtime.  
  Read about [Git sources]({{site.baseurl}}/docs/installation/gitops/git-sources/).

### Before you begin
Make sure you have the credentials for the Git provider handy


### How to 

1. From the list, select the Git provider.
1. Enter the credentials for the selected Git provider:  
    * **Gerrit**:  
      1. **Username**: The username of your Codefresh user account in Gerrit. 
      1. **Password**: Paste the **HTTP Password** you generated and copied into the field.
      1. **Host URL**: The URL of your website with the Gerrit instance, for example, `https://git.company-name.io`. 
1. Click **Authorize Access**. 
1. Optional. To authorize access for GitHub and Bitbucket through OAuth, click **Connect** and enter your OAuth token.



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
1. Optional. If required for your Git provider, select the **Git Organization for which to create the repos**.
  >**NOTE**  
  If the organization does not appear in the list, you need to authorize access to it. See [Authorize organizations/projects]({{site.baseurl}}/docs/administration/account-user-management/hosted-authorize-orgs/).
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

  
  {% include
image.html
lightbox="true"
file="/images/runtime/hosted-git-shared-repo.png"
url="/images/runtime/hosted-git-shared-repo.png"
alt="Shared Configuration Repository in Git"
caption="Shared Configuration Repository in Git"
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


## Step 3: Connect a Kubernetes cluster

Connect a destination cluster to the Hosted GitOps Runtime and register it as a managed cluster. Deploy applications and configuration to the cluster.
For information on managed clusters and installing Argo Rollouts, see [Add and manage external clusters]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).


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

<!-- If you could not connect a cluster, you may not have the latest version of the CLI:  
[Upgrade the GitOps CLI]({{site.baseurl}}/docs/installation/gitops/upgrade-gitops-cli/).-->

You have completed setting up your Hosted GitOps Runtime. You are ready to create applications, and connect third-party CI tools for image enrichment.

## (Optional) Create application
Optional. Create an application in Codefresh, deploy it to the cluster, and track deployment and performance in the Applications dashboard.  

1. Follow our quick-start to create and deploy the `codefresh-guestbook` application. Start with [Create application resources]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-specs/).  
  OR    
  Create your own application. See [Create an application]({{site.baseurl}}/docs/deployments/gitops/create-application/).   

{:start="2"}
2. In the Codefresh UI, view your application in the [Applications dashboard](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.

## (Optional) Connect CI 
Optional. Integrate Codefresh with the third-party tools you use for CI to enrich image information in deployments.  

See [Image enrichment with integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/) 

## Related articles
[Monitoring & managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)  
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)   
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)

