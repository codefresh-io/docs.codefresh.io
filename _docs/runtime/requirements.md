---
title: "Requirements"
description: ""
group: runtime
toc: true
---


The requirements listed are the **_minimum_** requirements for CSDP (Codefresh Software Delivery Platform) runtimes.

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

 

#### Provider-specific Ingress NGINX installation
To install on an EKS, cluster, follow the instructions. For other providers, see the list of provider-specific installation links.

##### Install Ingress NGINX on EKS cluster

1. Apply:  
  ```kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/aws/deploy.yaml```

1. Verify you see a valid external IP address:  
  ```kubectl get svc ingress-nginx-controller -n ingress-nginx``` 

##### Provider-specific installation links

* [MiniKube](https://kubernetes.github.io/ingress-nginx/deploy/#minikube)
* [MicroK8s](https://kubernetes.github.io/ingress-nginx/deploy/#microk8s)
* [Docker Desktop](https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop)
* [AWS](https://kubernetes.github.io/ingress-nginx/deploy/#aws)
* [Google Kubernetes Engine (GCP GKE)](https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke)
* [Azure](https://kubernetes.github.io/ingress-nginx/deploy/#azure)
* [Digital Ocean](https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean)
* [Scale Away](https://kubernetes.github.io/ingress-nginx/deploy/#scaleway)
* [Exoscale](https://kubernetes.github.io/ingress-nginx/deploy/#exoscale)
* [Oracle Cloud Infrastructure](https://kubernetes.github.io/ingress-nginx/deploy/#oracle-cloud-infrastructure)
* [Bare Metal Clusters](https://kubernetes.github.io/ingress-nginx/deploy/#bare-metal-clusters)


**Specific requirements for Google Kubernetes Engine (GCP GKE)**  

GKE by default limits outbound requests from nodes. In order for the runtime to communicate with the control-plane in Codefresh a firewall specific rule must be added.

1. Find your cluster's network:   
  `gcloud container clusters describe [CLUSTER_NAME] --format=get"(network)"`
1. Get the Cluster IPV4 CIDR:  
  `gcloud container clusters describe [CLUSTER_NAME] --format=get"(clusterIpv4Cidr)"`  
1. Replace the `[CLUSTER_NAME]`, `[NETWORK]`, and `[CLUSTER_IPV4_CIDR]`, with the relevant values:  
   ```
    gcloud compute firewall-rules create "[CLUSTER_NAME]-to-all-vms-on-network" \
    --network="[NETWORK]" \
    --source-ranges="[CLUSTER_IPV4_CIDR]" \
    --allow=tcp,udp,icmp,esp,ah,sctp
    ```

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
