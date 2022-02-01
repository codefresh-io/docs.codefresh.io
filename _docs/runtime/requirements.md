---
title: "Requirements"
description: ""
group: runtime
toc: true
---


The requirements listed are the **_minimum_** requirements for CSDP (Codefresh Software Development Platform) runtimes.

### Kubernetes cluster requirements
This section lists cluster requirements.

#### Cluster version
Kubernetes cluster version 1.20 or higher, without Argo Project components
> In the documentation, Kubernetes and K8s are used interchangeably. 

#### Ingress controller
* Ingress controller in cluster  
  Configure your Kubernetes cluster with an Ingress controller component that is exposed from the cluster. Currently, we support the `NGINX` ingress controller.  
  > Tip:   
    Verify that the ingress controller has a valid external IP address. 
* Valid SSL certificate  
  The ingress controller must have a valid SSL certificate from an authorized CA (Certificate Authority) for secure runtime installation.  

**How to install NGINX on EKS cluster**
1. Apply:  
  ```kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/aws/deploy.yaml```

1. Verify you see a valid external IP address:  
  ```kubectl get svc ingress-nginx-controller -n ingress-nginx```  
  

#### Node requirements
* Memory: 5000 MB
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
CSDP requires a GitHub Personal Access Token (PAT) for runtime installation.
For detailed information on GitHub, see [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).  

The token must have:
* Valid expiration: Default is `30 days`  
* Scope: `repo` and `admin-repo.hook` 
  
  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   url="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   alt="GitHub PAT permissions for runtime" 
   caption="GitHub PAT permissions for runtime"
   max-width="30%" 
   %}  


### What to read next
[Runtime installation]({{site.baseurl}}/docs/runtime/installation/)
