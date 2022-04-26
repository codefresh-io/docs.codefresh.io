---
title: "Access control"
description: ""
group: administration
toc: true

---
Access control defines the access policy for resources within an enterprise.   
In Codefresh, access control to an entity is derived from the entity type, which can be categorized into one of the following:

* **GitOps-controlled entities**  
  Entities whose entire lifecyle - creation, update, and deletion, are fully GitOps-controlled.  
  Examples of such entities in Codefresh include:
  * Runtimes
  * Git Sources
  * Pipelines comprising Argo Workflow/Events resources such as the Workflow Template, Sensor, Event Sources
  * Applications comprising Argo CD/Rollouts resources project, Application Set, applications, rollout

* **Non-GitOps-controlled entities**  

  Entities reported to Codefresh as built artifacts, not GitOps-controlled.
    
  Examples of such entities in Codefresh include:
  * Images

* **Account-configuration entities (currently non-GitOps-controlled)**  

  Entities whose state is not currently stored in a Git repository.  
  Examples of such entities in Codefresh include:

  * Account configuration collaborators
  * Account configuration security
  * Account configuration Single Sign-On (SSO)
  * Billing


### GitOps-controlled entities
Codefresh stores the state of your account entities according to GitOps principles and policies. 

#### Write permissions
Users with write permissions can access and manage files directly in the Git repository. Any action on the file such as create, update, or delete, is immediately reflected in the user account.  

Any user action via a Codefresh client (UI or CLI), on a GitOps-controlled resource, is impersonated with the user's Git permissions. If the user does not have permissions for an action in Git, then the user is automatically denied access to the same action in a Codefresh client.  

For Codefresh to impersonate the user, the user must provide Git credentials for every runtime. The credentials are securely stored by the Codefresh application proxy.  
The Codefresh application proxy uses these credentials:
* For Git-provider operations
* To update Codefresh with the read/write permissions to all existing repositories linked to the Git Source defined for a runtime. The Codefresh client can perform client-side validations.

To add your Git personal token, in the Codefresh UI, go to your avatar and then select [user settings](https://g.codefresh.io/2.0/user-settings).

{% include
image.html
lightbox="true"
file="/images/administration/access-control/pat.png"
url="/images/administration/access-control/pat.png"
alt="Add personal access token"
caption="Add personal access token"
max-width="30%"
%}

#### Read permissions
Codefresh enforces read permissions by checking if the user has Git permissions to view the Kubernetes manifest in the repository.  
Read permissions to entities created dynamically from changes in resource state, are inherited from the parent entity's permissions.

From the user's perspective, this means that:

* If the user does not have read permissions from the Git provider for the Sensor's Kubernetes manifest, the user does not have visibility into pipelines.  
  Workflow entities that are dynamically created, derive their read permissions from pipeline permissions. 

* Notifications are displayed only for resources with read permissions.


> Currently, we do not enforce Analytics views according to read permissions for pipelines. 

#### Write operations on dynamically-created entities
These are operations users can perform on dynamically-created entities, such as workflows for example. Typically, the permissions for such entities are derived from those of the parent entity.  

Currently, all users with view permissions, can also terminate and retry workflows. 


### Non-GitOps-controlled entities
For now, users can view all `image` entity types. These are resources reported to Codefresh as built artifacts, but not stored using the GitOps approach.

### Account-configuration for non-GitOps-controlled entities
All account-configuration entities you have access to are listed in your account settings, and are exposed only to account admins.  

When adding a user account, you can assign the `admin` role to the user. The `admin` role automatically enables all account-configurations.

### Runtime account-configuration 
Runtime configuration is also exposed in the account settings dedicated area and only exposed to admins but is fully controlled via the GitOps approach after installation. <br>

Users with write permissions to the runtime installation repository in Git can make changes to the runtime, and create, update, or delete Git Sources defined for that runtime.
We are at present exposing the runtime configuration under the account settings only to account admins.   
Be aware though that these can also be changed directly through Git by users who are not admin users in Codefresh. <br>

For now, Codefresh admin users can see all runtimes and Git Sources even if they don't have read permissions to the underlying Git repository.


### Upcoming enhancements to access control
We are working to enhance our access control model by adding another layer to provide the ability to define:
* Permissions on write operations for entities that are non-GitOps controlled, such as account configuration and workflow operations
* Read permissions for entities that are completely non-GitOps controlled
* A more granular permission model for entities that are GitOps-controlled, but without sufficient access control policies in place
* A more granular permission model for dynamic resources that are non-GitOps controlled, but created from a GitOps-controlled entity, for example, workflows

### What to read next
[Codefresh architecture](({{site.baseurl}}/docs/getting-started/architecture/))
