---
title: "Service account for Promotion Workflows"
description: "Understand the service account and role requirements for Promotion Workflows"
group: promotions
toc: true
---



## Service accounts & service account roles for Promotion Workflows
Service accounts are essential for all types of Promotion Workflows in GitOps Cloud. These accounts provide the necessary permissions for workflows to interact with clusters and other resources during the promotion process, including when hooks are used. 

When a GitOps Runtime is installed, GitOps Cloud automatically creates the required service account, service account role, and binding to support Promotion Workflows. 


## Default service account and service role 

* **Service account**  
  `cf-default-promotion-workflows-sa` with the required role and role binding.  
    * Workflow template manifests reference this service account. 
    * When you create a Promotion Workflow from the UI, the service account is added automatically to the YAML. 
    * If you're creating the Promotion Workflow in Git, you must add the service account manually.

* **Service account role**  
  `cf-default-promotion-workflows-role`, the default role for promotion hooks, automatically bound to the service account `cf-default-promotion-workflows-sa`.  

* **RBAC permissions for service account role**   
  The following Role-Based Access Control (RBAC) permissions are required to allow hooks to retrieve and update release and promotion details securely:    
    * `GET`  
    * `WATCH`  
    * `PATCH`  


## Custom options for service account and role

If you need a role with additional permissions or a new service account, do one of the following:

* **Use a custom role**  
  Create a new service role with the required permissions, and bind it to the default service account, `cf-default-promotion-workflows-sa`.

* **Use a custom service account**  
  Use your own service account, and bind it to the default service role, `cf-default-promotion-workflows-role`.

## Example of a service account and role

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: hook
  annotations:
    argo-hub/version: '0.0.2'
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: hook
  annotations:
    argo-hub/version: '0.0.2'
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
    - argoproj.io
    resources:
    - workflowtaskresults
    verbs:
    - create
    - get
    - list
    - patch
    - watch   
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: hook
  annotations:
    argo-hub/version: '0.0.2'
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: hook
subjects:
  - kind: ServiceAccount
    name: hook
```

## Related articles
[Configure Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/)  
[Configure hooks in Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-hooks/)  
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
