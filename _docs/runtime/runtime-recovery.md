---
title: "Restore runtimes"
description: ""
group: runtime
toc: true
---

In case of cluster failure, restore the runtime from the existing runtime installation repository. For partial or complete cluster failures, you can restore the runtime to either the failed cluster or to a different cluster. Restoring the runtime reinstalls the runtime leveraging the resources in the existing runtime repo.

Restoring the runtime:
* Applies `argo-cd` from the installation manifests in your repo to your cluster
* Associates `argo-cd` with the existing installation repo
* Applies the runtime and `argo-cd` secrets to the cluster
* Updates the runtime config map (`<runtime-name>.yaml` in the `bootstrap` directory) with the new cluster configuration for these fields:  
  `cluster`  
  `ingressClassName`  
  `ingressController`  
  `ingressHost` 

### Before you begin

* Have the following information handy: 
  > All values must be the identical to the runtime to restore. 
  * Runtime name
  * Repository URL
  * Codefresh context
  * Kube context: Required if you are restoring to the same cluster

* Make sure you have a registered Git integration  


### How to restore a runtime
Reinstall the runtime from the existing installation repository to restore it to the same or a different cluster.  

1. Run:  
  `cf runtime install --from-repo`
1. Provide the relevant values when prompted.
1. If you are performing runtime recovery in a different cluster, verify the ingress resource configuration for `app-proxy`, `workflows`, and `default-git-source`.  
  If the health status remains as `Progressing`, do the following:
  
    * In the runtime installation repo, check if the `ingress.yaml` files for the `app-proxy` and `workflows` are configured with the correct `host` and `ingressClassName`:  

      `apps/app-proxy/overlays/<runtime-name>/ingress.yaml`  
      `apps/workflows/overlays/<runtime-name>/ingress.yaml`  

    * In the Git Source repository, check the `host` and `ingressClassName` in `cdp-default-git-source.ingress.yaml`: 

       `resources_<runtime-name>/cdp-default-git-source.ingress.yaml`  
    
    See the [example](#ingress-example) below. 

{:start="4"}
1. If you have managed clusters registered to the runtime you are restoring, reconnect them.  
  Run the command and follow the instructions in the wizard:  
  `cf cluster add`

1. Verify that you have a registered Git integration:  
  `cf integration git list --runtime <runtime-name>`  

1. If needed, create a new Git integration:  
  `cf integration git add default --runtime <runtime-name> --provider github --api-url https://api.github.com` 

    

### Ingress example
This is an example of the `ingress.yaml` for `workflows`.

 ```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    ingress.kubernetes.io/protocol: https
    ingress.kubernetes.io/rewrite-target: /$2
    nginx.ingress.kubernetes.io/backend-protocol: https
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  creationTimestamp: null
  name: runtime-name-workflows-ingress
  namespace: runtime-name
spec:
  ingressClassName: nginx
  rules:
  - host: your-ingress-host.com
    http:
      paths:
      - backend:
          service:
            name: argo-server
            port:
              number: 2746
        path: /workflows(/|$)(.*)
        pathType: ImplementationSpecific
status:
  loadBalancer: {}
```

### What to read next
[Manage runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)  
[Manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/)  
[Managed clusters]({{site.baseurl}}/docs/runtime/managed-cluster/)