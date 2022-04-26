---
title: "Runtimes"
description: ""
group: troubleshooting
toc: true
---


#### Pre-installation checks or runtime collision check failed

**Possible cause**  
  You have Argo Project components from other installations in your cluster.   

**Possible actions**  
  1. Uninstall the Codefresh runtime.
  1. Remove the Argo Project components from your cluster.
  1. Reinstall the Codefresh runtime.

#### Pre-installation error: please upgrade to the latest cli version: `v<number>`  

**Possible cause**  
  Codefresh has a new CLI version.   

**Possible actions**  
Run the appropriate command to upgrade to the latest version:

  {: .table .table-bordered .table-hover}
|  Download mode |  OS       | Command |
| -------------- | ----------| ----------|  
| `Curl`         | MacOS-x64 |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-amd64.tar.gz | tar zx && mv ./cf-darwin-amd64 /usr/local/bin/cf && cf version`|
|             | MacOS-m1 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-arm64.tar.gz | tar zx && mv ./cf-darwin-arm64 /usr/local/bin/cf && cf version` |          
|             | Linux - X64 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-amd64.tar.gz | tar zx && mv ./cf-linux-amd64 /usr/local/bin/cf && cf version` |       
|              | Linux - ARM  |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-arm64.tar.gz | tar zx && mv ./cf-linux-arm64 /usr/local/bin/cf && cf version`|     
| `Brew` | N/A| `brew tap codefresh-io/cli && brew install cf2`|

#### Failed to bootstrap repository: authentication required
**Possible cause**  
The Git token provided for runtime installation is not valid.

**Possible actions** 
* Make sure the token:
  * Has a valid expiration date.
  * Scope includes `repo` and `admin-repo.hook` 

#### Failed adding git integration <...> 404 not found

**Possible cause**  
Another process is probably occupying the address you provided as your `ingress-host`.  

**Possible actions** 
* Terminate the process to free up the address.

#### Failed to create default git integration:...failed making a graphql API call...the HTTP request failed  

**Possible cause**  
  The Ingress controller does not have a valid SSL certificate. The certificate must be from a Certificate Authority.

**Possible actions**  
1. Get a valid CA-signed certificate for the Ingress controller.  
1. Run the runtime installation.  

_OR_   

* Continue with the runtime installation in `insecure` mode:  

  `cf intg git add default --api-url https://api.github.com --runtime <runtime_name> --insecure`  
  where:  
  `<runtime_name>` is the name of the runtime installation.

#### Failed to create default git integration:...GraphQL Error (Code: 401): ("response":{"error":"Unauthorized: Invalid token."status":401, "headers":{}}..)
**Possible cause**  
  The ingress host specified does not point to the cluster selected for runtime installation.  

**Possible actions**  
Make sure the ingress host points to the cluster on which the runtime is installed.


#### Timeout error, either for applications or while waiting for the installation to complete
**Possible cause**  
  `Cron-executer` has identified that not all your applications are synced and healthy.   
  Codefresh runtime installation syncs app status at 10-minute intervals. The timeout occurs if after the last status sync, at least one application is either not synced or healthy.   

**Possible actions**  

Without terminating the runtime install, do the following:

1. In the Argo CD UI, check the status of your apps:
  * Port forward your `argo-cd server` pod using default 8080 ports.
  * Access it via `localhost:8080` with the Username `admin`, and Password which is the decoded `argocd-initial-admin-secret` in your cluster.  
    > With `k9s`, in the `secrets` view, press `x`.
1. If all apps are perfectly synced and healthy, check the logs of the `cron-executor` service.
1. If the logs don't show a cause for the error, try freeing up resources:
  * Free up memory with `docker system prune -a --volumes`.
  * Increase the resources allocated to your cluster.