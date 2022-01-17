---
title: "Runtimes"
description: ""
group: troubleshooting
toc: true
---

 ### Runtime installation

#### Pre-installation checks or runtime collision check failed

**Possible cause**  
  You have Argo Project components from other installations in your cluster.   

**Possible actions**  
  1. Uninstall the CSDP runtime.
  1. Remove the Argo Project components from your cluster.
  1. Reinstall the CSDP runtime.

#### Pre installation error: please upgrade to the latest cli version: v<number>  

**Possible cause**  
  CSDP has a new CLI version.   

**Possible actions**  
  1. Run the command to upgrade to the latest version:
    * For Curl: `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-amd64.tar.gz | tar zx && mv ./cf-darwin-amd64 /usr/local/bin/cf && cf version`  
    * For Brew: `brew tap codefresh-io/cli && brew install cf2`

#### Failed to bootstrap repository: authentication required

#### Failed adding git integration <...> 404 not found

**Possible cause**  
Another process is probably occupying the address you provided as your `ingress-host`.  

**Possible actions** 
* Terminate the process to free up the address.

#### Failed to create default git integration: failed to add git integration: failed making a graphql API call while adding git integration: the HTTP request failed  

**Possible cause**  
  The Ingress controller does not have a valid SSL certificate. The certificate must be from an Certificate Authority.

**Possible actions** 
Get a valid CA-signed certificate for the Ingress controller.  
Run the runtime installation.
OR  
Continue wit the runtime installation in `insecure` mode:  

  `cf intg git add default --api-url https://api.github.com --runtime <runtime_name> --insecure`  
  where:  
  `<runtime_name>` is the name of the runtime installation.


#### Timeout error, either for applications or while waiting for the installation to complete
**Possible cause**  
  Cron-executer has identified that not all your applications are synced and healthy.   
  CSDP runtime installation syncs app status at 10-minute intervals. The timeout occurs if after the last status sync, at least one application is either not synced or healthy.   

**Possible actions** 
Without terminating the runtime install, do the following:

1. In the Argo CD UI, check the status of your apps:
  * Port forward your argo-cd server pod (use default 8080 ports).
  * Access it via `localhost:8080` with the Username `admin`, and Password which is the decoded `argocd-initial-admin-secret` in your cluster.  
    With `k9s`, in the `secrets` view, press `x`.
1. If all apps are perfectly synced and healthy, check the logs of the cron-executor service.
1. If the logs don't show a cause for the error, try freeing up resources:
  * Free up memory with ` docker system prune -a --volumes`.
  * Increase the resources allocated to your cluster.