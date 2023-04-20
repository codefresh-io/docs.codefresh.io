---
title: "GitOps runtime issues"
description: "Troubleshoot installation/communication issues"
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Runtimes]
support-reviewed: 2023-04-18 LG
---


## Pre-installation checks or runtime collision check failed

### Possible cause
  You have Argo Project components from other installations in your cluster.   

### Possible actions 
  1. Uninstall the Codefresh runtime.
  1. Remove the Argo Project components from your cluster.
  1. Reinstall the Codefresh runtime.

## Pre-installation error: please upgrade to the latest cli version: `v<number>`  

### Possible cause  
  Codefresh has a new CLI version.   

### Possible actions  
Run the appropriate command to upgrade to the latest version:

  {: .table .table-bordered .table-hover}
|  Download mode |  OS       | Command |
| -------------- | ----------| ----------|  
| `Curl`         | MacOS-x64 |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-amd64.tar.gz | tar zx && mv ./cf-darwin-amd64 /usr/local/bin/cf && cf version`|
|             | MacOS-m1 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-arm64.tar.gz | tar zx && mv ./cf-darwin-arm64 /usr/local/bin/cf && cf version` |          
|             | Linux - X64 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-amd64.tar.gz | tar zx && mv ./cf-linux-amd64 /usr/local/bin/cf && cf version` |       
|              | Linux - ARM  |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-arm64.tar.gz | tar zx && mv ./cf-linux-arm64 /usr/local/bin/cf && cf version`|     
| `Brew` | N/A| `brew tap codefresh-io/cli && brew install cf2`|

## Failed to bootstrap repository: authentication required

### Possible cause  
The Git token provided for runtime installation is not valid.

### Possible actions  
* Make sure the token:
  * Has a valid expiration date.
  * Scope includes `repo` and `admin-repo.hook` 

## Failed adding git integration <...> 404 not found

### Possible cause  
Another process is probably occupying the address you provided as your `ingress-host`.  

### Possible actions  
* Terminate the process to free up the address.

## Failed to create default git integration:...failed making a graphql API call...the HTTP request failed  

### Possible cause  
  The Ingress controller does not have a valid SSL certificate. The certificate must be from a Certificate Authority.

### Possible actions  
1. Get a valid CA-signed certificate for the Ingress controller.  
1. Run the runtime installation.  

_OR_   

* Continue with the runtime installation in `insecure` mode:  

  `cf intg git add default --api-url https://api.github.com --runtime <runtime_name> --insecure`  
  where:  
  `<runtime_name>` is the name of the runtime installation.

## Failed to create default git integration:...GraphQL Error (Code: 401): ("response":{"error":"Unauthorized: Invalid token."status":401, "headers":{}}..)

### Possible cause 
  The ingress host specified does not point to the cluster selected for runtime installation.  

### Possible actions 
Make sure the ingress host points to the cluster on which the runtime is installed.


## Timeout error, either for applications or while waiting for the installation to complete

### Possible cause 
  `Cron-executer` has identified that not all your applications are synced and healthy.   
  Codefresh runtime installation syncs app status at 10-minute intervals. The timeout occurs if after the last status sync, at least one application is either not synced or healthy.   

### Possible actions   

Without terminating the runtime install, do the following:

1. In the Argo CD UI, check the status of your apps:
  * Port forward your `argo-cd server` pod using default 8080 ports.
  * Access it via `localhost:8080` with the Username `admin`, and Password which is the decoded `argocd-initial-admin-secret` in your cluster.  
    > With `k9s`, in the `secrets` view, press `x`.
1. If all apps are perfectly synced and healthy, check the logs of the `cron-executor` service.
1. If the logs don't show a cause for the error, try freeing up resources:
  * Free up memory with `docker system prune -a --volumes`.
  * Increase the resources allocated to your cluster.

## Unable to communicate with `<runtime-name>` or two or more runtimes


### Possible cause
This error points to an issue with your browser or with your runtime configuration, and can be due to any of the following:

>TIP:  
Verify that your internet connection is stable.


1. [Browser issues](#browser-issues)  
   Can occur because of Cross-Origin Request blocked errors. 
1. [Missing SSL certificate](#missing-ssl-certificate)  
   Can occur if your runtime is ingress-based, and without an SSL certificate for the ingress controller.
1. [Insecure protocol prefix](#insecure-protocol-prefix)  
   Can occur if your runtime is ingress-based, and using HTTP for the `ingress-host` value instead of HTTPS.



### Possible actions

Follow the steps for the actions listed below in the order in which they are listed.

<br>

#### Browser issues
Try to identify the issue that is preventing communication by accessing your browser's Developer Tools and viewing the Console or Network tabs.  

For help on identifying the specific error and the corrective action to take for it, read [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors){:target="\_blank"}. 

<br>

#### Missing SSL certificate 

If you need an SSL certificate, copy and install the root CA certificate to the trusted root certificate store on your machine.<br><br>
OR
<br><br>
Configure the browser to trust the runtime's URL and receive content:

1. If you are not in the **GitOps Runtimes** page, from the toolbar, click the **Settings** icon. 
1. From Configuration in the sidebar, select **GitOps Runtimes**.
1. Select the runtime, and based on your browser, do as required:
  * Chrome: Click **Advanced** and then **Proceed to site**.
  * Firefox: Click **Advanced** and then **Accept the risk and continue**.
  * Safari: Click **Show Certificate**, and then select **Always allow content from site**.
  * Edge: Click **Advanced**, and then select **Continue to site(unsafe)**.

<br>

#### Insecure protocol prefix

To continue using the HTTP protocol for your `ingress-host` instead of HTTPS, configure your browser to allow _mixed content_ for `g.codefresh.io`.  
The exact steps differ based on your browser.

>**WARNING**:  
 HTTP connections are unencrypted and less secure.  
 Be aware that you are using this at your own risk.



**Chrome**
1. To the left of the URL, click the Lock icon, and then select **Site settings**.
1. On the right, scroll down to **Insecure content** and then select **Allow** as the default for `g.codefresh.io`. 
1. Click **Save**.
1. Reload the page.

<br>

**Firefox**  
1. To the left of the URL, click the Lock icon.
1. Expand **Connection Secure**, and then click **More Information**.
1. In the Page Info window that appears, click the **Security** tab.
1. Under Connection, do one of the following:
  * If available, select **Enable HTTP2**. 
  * If not available, select **Disable Protection on This Site**, and then click **OK**.
1. Reload the page.

<br>

**Safari**
1. Go to **Preferences > Advanced**.
1. Select **Show Develop menu in menu bar**, and close the Preferences window.
1. From the menu bar, select **Develop**, and then select **Disable Cross-Origin Restrictions**.
1. Reload the page.

<br>

**Edge**
1. To the left of the URL, click the Lock icon, and then select **Permissions for this site**.
1. Scroll down to **Location**, and then select **Allow** as the default for `g.codefresh.io`.
1. Click **Save**.
1. Reload the page.