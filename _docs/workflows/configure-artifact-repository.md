---
title: "Configure artifact repository"
description: ""
group: workflows
toc: true
---

To run Argo Workflows that share artifacts between steps in workflows, and view archived logs for completed workflows, configure an artifact repository. Configure any Argo-supported, S3-compatible repository, such as AWS, GCS or MinIO.    

To configure an artifact repository, do the following:  

* Create a `ConfigMap` with the specifications; for more information, see Argo Workflows documentation on [Configuring Your Artifact Repository](https://argoproj.github.io/argo-workflows/configure-artifact-repository/){:target="\_blank"}
* Configure `RBAC` permissions for the workflow controller
* Update the `serviceAccountName` to match the storage bucket 
* Recreate `argo-server` pod or pods to get the permissions 

### Step 1: Create ConfigMap for artifact repository 
Create a `ConfigMap` with the specs to connect to the storage bucket configured as the artifact repository, and enable pipeline logging to the same.  
The settings apply to all workflows by default, unless overridden by a specific `Workflow Template` or `Workflow` resource.


1. Go to your Codefresh runtime installation repository:  
   `<runtime_installation_repo>/apps/workflows/overlays/<runtime-name>/`  
1. Create a new file entitled `artifact-repo.yaml`, and update `bucket`, `endpoint`, and `region` as needed: 

```yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    workflows.argoproj.io/default-artifact-repository: default-v1
  name: artifact-repositories
data:
  default-v1: |
    archiveLogs: true #enable pipeline logging
    s3:
      bucket: csdp-artifacts-us-east-1 #change as needed
      endpoint: s3.amazonaws.com #change as needed
      region: us-east-1 #change as needed
      useSDKCreds: true
```

### Step 2: Define RBAC permissions for artifact repository
Grant the workflow controller sufficient permissions for S3 bucket operations.

1. Go to the same Codefresh runtime installation repository:  
`<runtime_installation_repo>/apps/workflows/overlays/<runtime-name>`  
1. Create the `rbac.yaml` file with the permissions, changing the annotation to match the S3 storage :  

```yaml 
apiVersion: v1
kind: ServiceAccount
metadata:
  name: <service-account-name> # for example, workflow
  annotations: # change below as needed 
    <endpoint>/role-arn: <role-arn> # example s3.amazonaws.com/role-arn = arn:aws:iam::559963890471:role/argo-workflows-s3-artifact-repo
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: workflow-role
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
  - watch
  - patch
- apiGroups:
  - ""
  resources:
  - pods/log
  verbs:
  - get
  - watch
- apiGroups:
  - ""
  resources:
  - pods/exec
  verbs:
  - create
- apiGroups:
  - ""
  resources:
  - configmaps
  verbs:
  - create
  - get
  - update
- apiGroups:
  - argoproj.io
  resources:
  - workflows
  - workflowtemplates
  verbs:
  - create
  - delete
  - list
  - get
  - watch
  - update
  - patch
- apiGroups:
  - argoproj.io
  resources:
  - workflowtasksets
  - workflowtasksets/finalizers
  verbs:
  - list
  - watch
  - get
  - update
  - patch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: workflow-default-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: workflow-role
subjects:
- kind: ServiceAccount
  name: workflow
---
```
  

### Step 3: Update `serviceAccountName` for artifact repository
Define the correct Service Account that with the roles and permissions for workflows to access the artifact repository.  
{:start="1"}
1. Go to the same Codefresh runtime installation repository:  
  `<runtime_installation_repo>/apps/workflows/overlays/<runtime-name>`  
1. Open `kustomization.yaml`.
1. Change the `annotation` and the `serviceAccountName` to be identical to those defined in `rbac.yaml`:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: lognext
patches:
- path: ingress-patch.json
  target:
    group: apps
    kind: Deployment
    name: argo-server
    version: v1
resources:
  - ../../base
  - ingress.yaml       # created after the installation
  - rbac.yaml         # created earlier as part of this process
  - artifact-repo.yaml # created earlier as part of this process
patchesStrategicMerge:
  - |
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: argo-server
      annotations:
        <endpoint>/role-arn: <role-arn>  # must be identical to annotation of the service account in rbac.yaml file
  - |
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: workflow-controller-configmap
    data:
      workflowDefaults: |
        spec:
          serviceAccountName: <service-account-name> # must be identical to the service account name in rbac.yaml       
```

### Step 4: Recreate `argo-server` pods to get the permissions
As the final step in configuring the artifact repository, for the `argo-server` pod or pods to have the permissions needed to access the S3 bucket, manually delete `argo-server` pods to recreate them.

1. Wait for the configuration changes to take effect on the cluster.
1. Check the `argo-server` service account and verify that it is updated with the user-provided `annotation`. 
1. Select the `argo-server-<#>` pod or pods and delete them.

## Related articles
[Creating workflows]({{site.baseurl}}/docs/workflows/create-pipeline)  