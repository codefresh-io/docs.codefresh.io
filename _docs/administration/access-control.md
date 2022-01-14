---
title: "Access control"
description: "How to restrict resources in a company environment"
group: administration
toc: true

---
According to CSDP [entity model]({{site.baseurl}}/docs/getting-started/entity-model/) you can in high level split them into 3 categories
* entities that creating/updating/deleting them are fully controlled by the GitOps approach.
  * runtimes
  * git sources
  * pipelines (argo workflow/events resources workflowTemplate, sensor, eventsource etc...)
  * applications (argo cd/rollouts resources project, applicationSet, application, rollout)
* Non GitOps controlled entities
  * Images
* account configuration entities that are not controlled by the GitOps approach (will be supported in future releases).
  * account configuration collaborators
  * account configuration security
  * account configuration single sign-on
  * billing

## Full GitOps controlled entities
CSDP is heavily based on the GitOps approach for storing the state of your account entities.

### Write permissions
Due to this fact, this means that a user can go directly to the git repositories where the CSDP state is stored and update/create/delete files that will take direct effect on the state of the account.

Every operation that a user will perform via CSDP clients (ui, cli) that is affecting a resource that is controlled by GitOps approach will be impersonated with the user git permissions.

This means that a user will not be able to perform an operation from the CSDP clients if he was not able to do that him self directly via Git.

In oreder to provide CSDP the ability to impersonate as the user, each user is required to provide his git credentials for every runtime.

CSDP application proxy will securely store the git credentials and user them to perform operations against the git provider when needed and will also update CSDP platform with the read/write permissions to all existing defined repositories of the defined git sources in the runtime in order for the client to also make client side validation on operations

In order to add your git personal token navigate to your [user settings](https://g.codefresh.io/2.0/user-settings)

{% include
image.html
lightbox="true"
file="/images/administration/access-control/pat.png"
url="/images/administration/access-control/pat.png"
alt="Add personal access token"
caption="Add personal access token"
max-width="100%"
%}

### Read view permissions
CSDP stores the permissions that each user has to the underlying repositories of the git sources and will enforce read permissions via a simple logic of checking if the user has git permission to view the kubernetes manifest in the repository.

This means that a user will not see a pipeline of he doesn't have ability to view the kubernets sensor manifest in his git provider.

For entities that are dynamically created due to changes in resources that are controlled by GitOps approach, like workflows, the read permission will be derived from having permission to view the pipeline.

Analytics information for the time being is not yet enforced according to pipeline read permissions but will be in the upcoming releases.

Notification panel will also show notifications only on resources that the user has read permission on.

### Write operations on dynamic created entities derived from GitOps controlled entities
There are operations that users can perform on dynamic created entities like a workflow, like terminate and retry.

These operations for the time being will be allowed for all users that has view permission to the workflow.

## Non GitOps controlled entities
For entities like images (for now only images) which is a resource that is being reported to CSDP on built artifacts and not stored in a GitOps approach for the time being users will be able to view all images.

## Account configuration non GitOps based entities
All account configuration entities are exposed under the account settings dedicated area in your account and are exposed only to account admins.

CSDP provides a way to configure a user in the account as admin through the collaboration users screen. Marking a user as admin will provide him the ability to maintain all the above stated configurations.

## Account runtime configuration 
The runtime configuration is also exposed in the account settings dedicated area and only exposed to admins but is fully controlled via the GitOps approach after installation. <br>
This means that user with git write permission to the runtime installation repository can make changes to the runtime and create/delete/update git sources for that runtime.
It was decided to still expose the runtime configuration under the account settings only to account admins because it makes sense but take into account that it can also be changed directly through git by non defined admin users in CSDP <br>
CSDP admin users can see all runtimes and git sources for the time being even if they don't have read permission to the underlying git repository (a gap we will be looking to close)

## Upcoming future of access control
We are continuing to improve our access control model by adding another layer that will provide 
* ability to define permissions on write operations on entities that are not stored in a GitOps approach (like account configuration and workflow operations)
* ability to define read permissions for entities that are not stored in GitOps approach at all
* ability to define a more fine grained permission model for entities that are stored in a GitOps approach way but which is not sufficient
* ability to define a more fine grained permission model for dynamic non GitOps controlled resources that were created from a GitOps controlled entity (like workflow)
