---
title: "Configure a GitOps Runtime"
description: "Configure Git credentials, Git Sources, and more for Runtimes"
toc: true
---



## Configure GitOps Runtime 
After installing a Runtime, you must complete its configuration to ensure successful GitOps operations.  
Configuration includes:
* [Defining Git credentials](#configure-git-credentials-for-runtime)
* [Configuring Runtime as an Argo Application](#configure-runtime-as-argo-application)
* [Adding a Git source](#add-git-source-to-runtime)

You can configure the Runtime immediately after installation by following the Configuration and Management steps in the Runtime Installation Wizard, 
or at any time later through the Codefresh UI. 
If any configuration steps are pending, the Runtime's status in the UI list view indicates it through the Complete installation .

## Configure Runtime via UI


## Configure Git credentials for Runtime
Git credentials for the Runtime include defining Git tokens: the Git Runtime token and the Git user token.
* The Git Runtime token is mandatory for every GitOps Runtime.  
  It must be provided during the Runtime installation, and is typically associated with a service/robot account.
* The Git user token is an access token that is unique to every user in the Codefresh platform.  
  It is required after installation for every Runtime which the user has access to. 

See [Git Runtime tokens versus Git user tokens]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-tokens-versus-git-user-tokens-in-codefresh).

### Why tokens are required
Git tokens are needed both during installation and for ongoing GitOps operations, 
such as Argo CD syncing repositories, deploying templates, and performing Git actions.  

Tokens are always securely stored on your cluster, and never in our platform.

### Scopes for Git tokens
{% if page.collection != site.gitops_collection %}
Create Git tokens with your Git provider, ensuring they have the required scopes.
See [Git Runtime token scopes]({{site.baseurl}}//docs/security/git-tokens/#git-runtime-token-scopes) and [Git user token scopes]({{site.baseurl}}//docs/security/git-tokens/#git-user-access-token-scopes).
{% endif %}

{% if page.collection == site.gitops_collection %}
Create personal access tokens in GitHub with the required scopes. GitHub supports Classic and Fine-Grained tokens.  
See [Git Runtime token scopes]({{site.baseurl}}//docs/security/git-tokens/#git-runtime-token-scopes) and [Git user token scopes]({{site.baseurl}}//docs/security/git-tokens/#git-user-access-token-scopes).
{% endif %}

### Using the Git Runtime token as the Git user token
To simplify setup, you can use the Git Runtime token as the Git user token, provided it includes the additional scopes required for user access.





## Configure Runtime as Argo application
Configure the GitOps Runtime as an Argo Application to view Runtime components, monitor health and sync statuses, and ensure that Git is the single source of truth for the Runtime.  
When you click **Configure as Argo Application**, Codefresh takes care of the configuration without any action required from you.

Configuring the GitOps Runtime as an Argo application ensures:
* **Git as the single source of truth**  
  The Runtime’s state is declaratively managed in Git, ensuring consistency, traceability, and version control over all its configurations.
* **Automated reconciliation**  
  Argo CD continuously monitors the Runtime’s desired state (as defined in Git), and automatically corrects any drift, ensuring alignment between the cluster and the Git repository.
* **Visibility & monitoring**  
  The Runtime is displayed in the GitOps Apps dashboard where you can view, check health and sync statuses, and manage it as any other Argo application.



## Add Git Source to Runtime

A **Git Source** is a critical component in GitOps Runtimes, serving as a connection between a Git repository and the cluster. serving as an easy way to manage the deployment and configuration of Argo CD applications on clusters.  
The Git repository referenced by the Git Source stores application manifests and other resources which are always synced to the cluster. Codefresh manages the Git Source itself as an Argo CD application.

#### Git Source settings  

| Setting                  | Description |
|--------------------------|-------------|
| **Git Source Name**      | A unique name for the Git Source within the cluster. Must follow Kubernetes naming conventions. |
| **Git Source Type**      | Select **Standard Git Source** to create the Git Source as an Argo CD application in the Runtime's namespace. It belongs to the default or user-defined Application Project, without deployment or repo restrictions. |
| **Git Repository Source** | The Git repository which stores the application manifests, including the Git Source application manifest. Choose one of the following: <br> **Use an existing repository**: <br> - **Repository (Required):** The URL of the Git repository. <br> - **Branch (Optional):** The branch in which to create the Git Source application manifest. <br> - **Path (Optional):** The directory within the repo where the manifest will be stored. <br> **Create a new repository**: <br> - **Organization Name:** Select the organization for which to create the repository. <br> - **Repository Name:** The name of the new repository. |
| **Included and Excluded Files** | Define patterns to specify which files should be included or excluded when syncing the repository to the cluster. Use **GLOB patterns** to define paths: <br> - `workflows/**/*.yaml` → Includes all YAML files in `workflows` and its subdirectories. <br> - `**/images/**/*` → Excludes all directories named `images`. <br> For GLOB guidelines, see this [guide](https://deepsource.io/blog/glob-file-patterns/). |






