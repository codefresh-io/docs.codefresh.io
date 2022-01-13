---
title: "Requirements"
description: ""
group: runtime
toc: true
---


The requirements listed are the **_minimum_** requirements for CSDP (Codefresh Software Developement Platform).

### Kubernetes cluster requirements
This section lists cluster requirements.

#### Cluster version
Kubernetes cluster version 1.20, without Argo Project components
> In the documentation, Kubernetes and K8s are used interchangeably. 

#### Ingress controller
Configure your Kubernetes cluster with an Ingress controller component that is exposed from the cluster. For detailed information, see the [Kubernetes documentation on ingress controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).  

> Tip:   
  Verify that the ingress controller has a valid external IP address:  
 

#### Default `IngressClass` 
The `IngressClass` resource, or any one of them if you have more than one, must be tagged as the default.  

To tag an `IngressClass` resource as the default, add this `ingressclass.kubernetes.io/is-default-class` annotation with the value of `true` to the resource.
  
  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: IngressClass
  metadata:
  annotations:
    ingressclass.kubernetes.io/is-default-class: "true" 
  ```

#### Node requirements
* Memory: 3000 MB
* CPU: 2

#### Runtime namespace permissions for resources

{: .table .table-bordered .table-hover}
|  Resource                   |  Permissions Required|  
| --------------            | --------------           |  
| `ServiceAccount`            | Create, Delete         |                             
| `ConfigMap`                 | Create, Update, Delete |          
| `Service`                   | Create, Update, Delete |       
| `Role`                       | In group `rbac.authorization.k8s.io`: Create, Update, Delete |       
| `RoleBinding`               | In group `rbac.authorization.k8s.io`: Create, Update, Delete  | 
| `persistentvolumeclaims`    | Create, Update, Delete               |   
| `pods`                       | Creat, Update, Delete               | 

### Git repository requirements
This section lists the requirements for Git installation repositories.

#### Git installation repo
If you are using an existing repo, make sure it is empty.

#### Git token
CSDP requires a GitHub Personal Access Token for runtime installation.
To create a Git token, see [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).  

The token must have:
* `base64` encoding
*  Valid expiration: Default is `30 days`  
* Scope: `repo` and `admin-repo.hook`:  
  
  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   url="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   alt="GitHub PAT permissions for CI pipeline" 
   caption="GitHub PAT permissions for CI pipeline"
   max-width="30%" 
   %}  


### What to read next
[Runtime installation]({{site.baseurl}}/docs/runtime/installation/)