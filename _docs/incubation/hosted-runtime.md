---
title: "Set up a hosted runtime"
description: ""
group: runtime
toc: true
---


If you have Codefresh's Hosted GitOps solution, complete the simple setup to provision your hosted runtime, and you are all ready to leverage extensive CD Ops capabilities.
Read about [Codefresh Hosted GitOps]({{site.baseurl}}/docs/incubation/intro-hosted-runtime/). 

### Where to start with Hosted GitOps
If you have not provisioned a hosted runtime, Codefresh presents you with the setup instructions in the Home dashboard.   


* In the Codefresh UI, go to Codefresh [Home](https://g.codefresh.io/2.0/?time=LAST_7_DAYS){:target="\_blank"}.
  Codefresh guides you through the three-step setup, as described below.

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-initial-view.png"
url="/images/runtime/hosted-initial-view.png"
alt="Provision hosted runtime"
caption="Provision hosted runtime"
max-width="80%"
%}

#### 1. Provision hosted runtime
Start installing the hosted runtime with a single-click. Codefresh completes the installation without any further intervention on your part. 
The hosted runtime is provisioned on the Codefresh cluster, and completely managed by Codefresh with automatic version and security upgrades.

1. Click **Install**.

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-installing.png"
url="/images/runtime/hosted-installing.png"
alt="Step 1: Installing hosted runtime"
caption="Step 1: Installing hosted runtime"
max-width="80%"
%}

{:start="2"}
1. When complete, to view the components for the hosted runtime, click **View Runtime**.
  You are directed to the Runtime Components tab.  

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-runtime-components.png"
url="/images/runtime/hosted-runtime-components.png"
alt="Runtime components for hosted runtime"
caption="Runtime components for hosted runtime"
max-width="70%"
%}

> The Git Sources and the Managed Clusters are empty as they will be set up in the next steps.  

If you navigate to **Runtimes > List View**, the Cluster/Namespace column displays Codefresh, and the Module column displays CD Ops, indicating a hosted runtime.

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-runtimes-list-view.png"
url="/images/runtime/hosted-runtimes-list-view.png"
alt="Hosted runtimes in List view"
caption="Hosted runtimes in List view"
max-width="70%"
%}



#### 2. Connect Git provider
Connect your hosted runtime to a Git provider for Codefresh to creates the required Git repos.  First authorize access to your Git provider through an OAuth token, and then select the Git organization or account in which to create the required Git repos.  

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

  The shared runtime configuration repo is a centralized Git repository that stores configuration settings for the hosted runtime. Additional runtimes provisioned for the account can point to this repo to retrieve and reuse the configuration.  
  Read about [Shared runtime configuration]({{site.baseurl}}/docs/runtime/shared-runtime/).

* Git Source application repo  

  Codefresh creates a Git Source application repo for every hosted runtime.  
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
alt="Git Source tab for hosted runtime"
caption="Git Source tab for hosted runtime"
max-width="80%"
%}


#### 3. Connect a Kubernetes cluster
Connect a destination cluster to the hosted runtime and register it as a managed cluster. Deploy applications and configuration to the cluster.
For managed cluster information, see [Add and manage external clusters]({{site.baseurl}}/docs/runtime/managed-cluster/).

 {% include 
image.html 
lightbox="true" 
file="/images/runtime/hosted-connect-cluster-step.png" 
url="/images/runtime/hosted-connect-cluster-step.png" 
alt="Step 3: Connect a K8s cluster for hosted runtime" 
caption="Step 3: Connect a K8s cluster for hosted runtime"
max-width="70%" 
%}


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
	alt="New K8s cluster in hosted runtime" 
	caption="New K8s cluster in hosted runtime"
  max-width="80%" 
  %}

{:start="5"} 
1. Configure access to the IP addresses required. See [Codefresh IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/).  

You have completed setting up your hosted runtime. You are ready to create applications, and connect third-party CI tools for image enrichment.

#### (Optional) Create application
Optional. Create an application in Codefresh, deploy it to the cluster, and track deployment and performance in the Applications dashboard.  

1. Follow our quick-start to create and deploy the `codefresh-guestbook` application. Start with [Create application resources]({{site.baseurl}}/docs/getting-started/quick-start/create-app-specs/).  
  OR    
  Create your own application. See [Create an application]({{site.baseurl}}/docs/deployment/create-application/)   

{:start="2"}
2. In the Codefresh UI, view your application in the [Applications dashboard](https://g.codefresh.io/2.0/applications-dashboard){:target="\_blank"}.

#### (Optional) Connect CI 
Optional. Integrate Codefresh with the third-party tools you use for CI to enrich image information in deployments.  

[Image enrichment with integrations]({{site.baseurl}}/docs/integration/image-enrichment-overview/) 

### What to read next
[Applications dashboard]({{site.baseurl}}/docs/deployment/applications-dashboard/)

