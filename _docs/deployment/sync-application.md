---
title: "Sync applications"
description: ""
group: deployment
toc: true
---

Sync applications directly from the Codefresh UI

The Synchonuze option si


The set of options for application synchronization identical to that of Argo CD. In Codefresh, they are grouped into sets: Revision and Additional Options.


### Synchronize application


Codefresh groups Synchronization options By 

### Revision settings for application sync
revision - The branch  to be checked out when a deployment happens

Prune: When selected, removes legacy resources that do not exist currently in Git. If pruning is not enforced and Argo CD identifies resources that require pruning, it displays them in the  
Read more in [No Prune Resources](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#no-prune-resources){:target="\_blank"}.

Apply only: When selected, applies Kubernetes sever-side apply with field-management controls for patches and updates. Modifications to fields foChanges to a field of which you are not the manager results  by If a new field is created, the new ownCompared to the last-applied annotation managed by kubectl, Server Side Apply uses a more declarative approach, which tracks a user's field management, rather than a user's last applied state. This means that as a side effect of using Server Side Apply, information about which field manager manages each field in an object also becomes available.

For a user to manage a field, in the Server Side Apply sense, means that the user relies on and expects the value of the field not to change. The user who last made an assertion about the value of a field will be recorded as the current field manager. This can be done either by changing the value with POST, PUT, or non-apply PATCH, or by including the field in a config sent to the Server Side Apply endpoint. When using Server-Side Apply, trying to change a field which is managed by someone else will result in a rejected request (if not forced, see Conflicts).
Read more in      instead of the client-side apply. when syncinng the application. We have a use case I don't see discussed much. We leverage mutating webhooks to provide lots of valuable default configuration for our Kubernetes users. An issue with this is that when running kubectl apply, the mutation will not take place if there is no difference between the desired and live states (I believe kubectl doesn't try to apply the patch in this case). However, when running kubectl apply --server-side, the mutations are always applied.

SSA controls modification right by clarifying field ownership, which can effectively prevent wrong modification. Understanding SSA merge policy and under what circumstances users can modify fields is necessary.

Whether it is an update or a patch, there will be three circumstances.

The current manager is the manager of all fields. Then the operation can proceed normally.
The current manager is not the manager of some fields. The current operation can continue if those fields are not modified, and the current manager will be added to the fieldManager of the field as co-manager(sharedmanager).
Modify non-manager fields, and conflicts occur. You can override value by becoming a shared manager or force the modification using--force-conflict.

Our users primarily interact with Kubernetes through ArgoCD. Without Argo CD supporting server-side apply, there is no way apply these mutations unless the resource actually has some new desired state.

Dry run: When selected, skips dry run for resources that are not known to the cluster. This option is useful when CRDs for custom resources are not created as part of the sync mechanism, but creatd by other mechanisms. In such cases, Argo CD's default behavior is to automatically fail the sync with the server could not find requested resource error.
Read more in [Skip Dry Run for new custom resource types](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#skip-dry-run-for-new-custom-resources-types){:target="\_blank"}.

Force
When selected, orphans (deletes??) the dependents of a deleted resource during the sync operation. This option is useful to prevent 

### Additional Options for application sync

Sync options are described in ????
Respect ignore differences 
When selected, ignore differences between all resources in the applicaion that could not be synced or resolved. 
Read more in [Argo CD Diffing Customization](https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/){:target="\_blank"}.

#### Prune propagation policy
{::nomarkdown}Defines how resources are pruned, applying Kubernetes cascading deletion prune policies. 
Read more at <a href="https://kubernetes.io/docs/concepts/architecture/garbage-collection/#cascading-deletion" target="_blank">Kubernetes - Cascading deletion</a>.</br><ul><li><b>Foreground</b>: The default prune propagation policy used by Argo CD. With this policy, Kubernetes changes the state of the owner resource to `deletion in progress`, until the controller deletes the dependent resources and finally the owner resource itself. </li><li><b>Background</b>: When selected, Kubernetes deletes the owner resource immediately, and then deletes the dependent resources in the background.</li><li><b>Orphan</b>: When selected, Kubernetes deletes the dependent resources that remain orphaned after the owner resource is deleted.</li></ul> </br>{:/}
All Prune propagation policies can be used with:  
  

**Replace**: When selected, Argo CD executes `kubectl replace` or `kubectl create`, instead of the default `kubectl apply` to enforce the changes in Git. This action will potentially recreate resources and should be used with care. See [Replace Resource Instead Of Applying Change](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#replace-resource-instead-of-applying-changes){:target="_blank"}.   
  

**Retry**: When selected, retries a failed sync operation, based on the retry settings configured:   
* Maximum number of sync retries (**Limit**)  
* Duration of each retry attempt in seconds, minutes, or hours (**Duration**)  
* Maximum duration permitted for each retry (**Max Duration**)  
* Factor by which to multiply the Duration in the event of a failed retry (**Factor**). A factor of 2 for example, attempts the second retry in 2 X 2 seconds, where 2 seconds is the Duration.