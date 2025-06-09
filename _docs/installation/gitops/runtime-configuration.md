---
title: "Configure a GitOps Runtime"
description: "Configure Git credentials, Git Sources, and more for Runtimes"
toc: true
---



## Configure GitOps Runtime 
After installing a Runtime, complete its configuration to enable GitOps operations.  
Configuration includes:
* [Defining Git credentials](#configure-git-credentials-for-runtime)
* [Configuring Runtime as an Argo CD Application](#configure-runtime-as-an-argo-cd-application)


You can configure the Runtime immediately after installation by following the **Configuration and Management** steps in the installation wizard, 
or at any time later through the Codefresh UI. 
If any configuration steps are pending, the Runtime's status in the UI list view indicates it through the Complete installation .



## Configure Git credentials for Runtime
Git credentials for the Runtime include defining:
* **Git Runtime token**  
  Required for every GitOps Runtime.  
  It must be provided during the Runtime installation, and is typically associated with a service/robot account.
* **Git user token**  
  A personal access token unique to every Codefresh user.  
  It is required after installation for every Runtime which the user has access to. 

See [Git Runtime tokens versus Git user tokens]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-tokens-versus-git-user-tokens-in-codefresh).

### Why tokens are required
Git tokens are used both during installation and for ongoing GitOps operations, 
such as Argo CD syncing repositories, deploying templates, and performing Git actions.  

Tokens are always securely stored on your cluster and never in the Codefresh platform.

### Scopes for Git tokens
{% if page.collection != site.gitops_collection %}
Create Git tokens with your Git provider, ensuring they have the required scopes.
See [Git Runtime token scopes]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-token-scopes) and [Git user token scopes]({{site.baseurl}}/docs/security/git-tokens/#git-user-access-token-scopes).
{% endif %}

{% if page.collection == site.gitops_collection %}
Create personal access tokens in GitHub with the required scopes. GitHub supports Classic and Fine-Grained tokens.  
See [Git Runtime token scopes]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-token-scopes) and [Git user token scopes]({{site.baseurl}}/docs/security/git-tokens/#git-user-access-token-scopes).
{% endif %}

### Using the Git Runtime token as the Git user token
To simplify setup, you can use the Git Runtime token as the Git user token if it includes the additional scopes required for user access.


## Configure Runtime as an Argo CD Application
Configure the GitOps Runtime as an Argo CD Application to view Runtime components, monitor health and sync statuses, and ensure that Git is the single source of truth for the Runtime.  

Click **Configure as Argo CD Application** in the installation wizard to complete this step automatically.

Configuring the GitOps Runtime as an Argo CD Application ensures:
* **Git as the single source of truth**  
  The Runtime’s configuration is managed declaratively in Git, ensuring consistency, traceability, and version control over all its configurations.
* **Automated reconciliation**  
  Argo CD continuously monitors the Runtime’s desired state in Git and corrects any drift, ensuring alignment with the cluster.
* **Visibility and monitoring**  
  The Runtime appears in the GitOps Apps dashboard, where you can monitor and manage it as any other Argo CD application.




## Related articles
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/)  




