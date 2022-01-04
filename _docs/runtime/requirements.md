---
title: "System requirements"
description: ""
group: runtime
toc: true
---


The requirements listed are the **_minimum_** requirements for CSDP (Codefresh Software Developement Platform).

### Kubernetes cluster
Kubernetes cluster version 1.20, without Argo Project components
> In the documentation, Kubernetes and K8s are used interchangeably. 

### Ingress controller
Configure your Kubernetes cluster with an Ingress controller component that is exposed from the cluster. For detailed information, see the [Kubernetes documentation on ingress controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).  

Here are quick tips to configure ingress controllers in common cluster deployments:  

**Eks**: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/aws/deploy.yaml`  

Non-production:
**K3d**: A K3d cluster comes with a built-in Traefik ingress controller.  
**Docker desktop**: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml`  

> Tip:   
  Verify that the ingress controller has a valid external IP address:  

**Eks**: Should show a valid external IP when running`kubectl get svc ingress-nginx-controller -n ingress-nginx`. Note this down as you will need this when you install the runtime.    
**K3d**: Should show a valid external IP when running `kubectl get svc traefik -n kube-system`   
**Docker desktop**: Should show `localhost` as the external IP when running `kubectl get svc ingress-nginx-controller -n ingress-nginx`     

### Default `IngressClass` 
The `IngressClass` resource, or any one of them if you have more than one, must be tagged as the default.  

To tag an `IngressClass` resource as the default, add this `ingressclass.kubernetes.io/is-default-class` annotation with the value of `true` to the resource.
  
  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: IngressClass
  metadata:
  annotations:
    ingressclass.kubernetes.io/is-default-class: "true" 
  ```

### Node requirements
* Memory: 3000 MB
* CPU: 2

### Runtime namespace permissions for resources

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


### What to read next
[Runtime installation]({{site.baseurl}}/docs/runtime/requirements/)