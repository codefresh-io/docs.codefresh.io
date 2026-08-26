---
title: "Troubleshooting GitOps Runtime installation"
description: "Review how to resolve issues during Runtime installation"
toc: true
redirect_from:
  - /gitops/gitops-runtimes/runtime-troubleshooting/
  - /gitops/gitops-runtimes/troubleshooting-runtimes/
---

## Troubleshooting Runtime installation
This article describes potential issues you may encounter when installing the GitOps Runtime, whether you're using an existing Argo CD instance or setting up a new one.

## Error: Job has reached the specified backoff limit
This error appears when you copy and run the Install Runtime command in the Runtime Installation wizard.
Before starting the installation, GitOps Cloud automatically validates the `values.yaml` file to ensure the supplied values are correct.

### Possible cause
Validation errors in your `values.yaml` file.  


### Resolution
1. Get more detailed information on the reason for the validation failure by running:  
   `kubectl logs jobs/validate-values -n ${NAMESPACE}`  
   where:  
   `{NAMESPACE}` is the namespace of the Hybrid GitOps Runtime. 
1. Fix the errors. The table below describes the settings that are validated in the `values` file.


| Setting              | Validation                                                                                                 |
|----------------------|------------------------------------------------------------------------------------------------------------|
| `userToken`            | If explicitly defined, or defined as a `secretKeyRef` which exists in the current k8s context and the defined namespace. |
| **Account permissions**  | If the user has admin permissions for the account in which they are installing the runtime.                 |
| **Runtime name**         | If defined, and is unique to the account.                                                                   |
| **Access mode**          | {::nomarkdown}<ul><li>For tunnel-based, the default, if `accountId` is defined, and matches the account of the `userToken` defined in the file.</li><li>For ingress-based, if the `hosts` array contains at least one entry that is a valid URL (successful HTTP GET).</li><li>If both tunnel-based and ingress-based access modes are disabled, if `runtime.ingressUrl` is defined.</li></ul>{:/} |
| `gitCredentials`       | When defined, includes a Git password either explicitly, or as a `secretKeyRef`, similar to `userToken`. The password or token has the required permissions in the Git provider. |


## Error: failed converting helm release <runtime-name> to GitOops;...ISC repo not initialized
This error appears when you try to Configure the Runtime as Argo CD Application in the Runtime Installation wizard. 

### Possible cause
The Shared Configuration Repository (`ISC`) has been created but is not yet initialized. 

### Resolution
Wait a few seconds, and try again.


## Runtime timeout errors
One of these errors appear in the UI indicating a timeout after completing Runtime installation and configuration in the Runtime Installation wizard:
* `Error: "unable to initialize Codefresh Client", "error": "secrets \"codefresh-token\" not found"` 
* For tunnel-based access mode, the `codefresh-tunnel-client` pod fails after installation.
* Pods failed error

### Possible cause
The Runtime installed successfully, but the Application Proxy (`cap-app-proxy`) pod is not running.  
This status persists for the duration that the resources necessary for App Proxy are being created and initialized.

### Resolution

##### Check Application Proxy (`cap-app-proxy`) pod status
1. Verify the status of the `cap-app-proxy` pod:
   `kubectl get pods` 
1. If the pod is still **Pending**, check for resource constraints.
1. Scale up your cluster if needed. 

#### Add/update --wait flag in Install Runtime command
The `--wait` flag in Install Runtime command controls how long the installation process waits for pods to become ready before timing out. 

* Do one of the following:
  * If already defined, increase the timeout beyond the default **5 minutes**.
  * If not defined, add the `--wait` flag to allow time for the pods to initialize.  
    Example: `--wait 10m`


## Invalid Git token error
This error appears in the UI after Runtime installation when all Runtime components including the Application Proxy (app-proxy) are up and running. 

### Possible cause
Your token is [invalid because of missing scopes](#check-token-scopes)  
OR  
You are using a [fine-grained token or one with custom scopes](#skip-validation-for-fine-grained-github-tokens)

### Resolution

##### Check token scopes
1. Check the scopes for the Runtime token you provided during installation. 
  If you provided the same token as both the Runtime and user token, make sure the token has the additional scopes required.
1. If needed, generate a new PAT (Personal Access Token) with the correct scopes.

**GitHub Git Runtime token**

{: .table .table-bordered .table-hover}
| Type    | Required scopes    | 
| -------- | ----------------- | 
| **Classic** | {::nomarkdown}<ul><li><code class="highlighter-rouge">repo</code></li><li><code class="highlighter-rouge">admin:repo_hook</code></li></ul>{:/} |
| **Fine-grained** (personal or group-based) | {::nomarkdown}<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code> including all repos that Argo CD syncs from</li><li>Repository permissions: <ul><li>Administration: <code class="highlighter-rouge">Read and write</code></li><li>Commit statuses: <code class="highlighter-rouge">Read and write</code></li><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li><li>Pull requests: <code class="highlighter-rouge">Read and write</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li></ul></li></ul>{:/} |


<br>

**GitHub Git user token**

{: .table .table-bordered .table-hover}
| Type     | Required scopes   | 
| -------- | ----------------- | 
| **Classic** | {::nomarkdown}<ul><li><code class="highlighter-rouge">repo</code></li><li><code class="highlighter-rouge">admin:repo_hook</code></li></ul>{:/} |
| **Fine-grained** (personal or group-based) | {::nomarkdown}<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code> including all repos that Argo CD syncs from</li><li>Repository permissions: <ul><li>Administration: <code class="highlighter-rouge">Read and write</code></li><li>Commit statuses: <code class="highlighter-rouge">Read and write</code></li><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li><li>Pull requests: <code class="highlighter-rouge">Read and write</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li></ul></li></ul>{:/} |




<!--- ##### Ensure token formatting
Make sure the token is pasted without leading or trailing spaces. -->

##### Skip validation for fine-grained GitHub tokens
If using a custom-scope or fine-grained token and your _Runtime version is v0.18.0 or lower_, you must disable token validation to prevent failures.  

1. Check Runtime version:
  * In the Codefresh UI, on the toolbar, click the **Settings** icon.
  * From the sidebar, select **GitOps Runtimes**.
  * In the **Versionw** column, if the chart version is v0.18.0 or lower, continue with _step 2_.

1. Add the `skipGitPermissionValidation` flag to your `values.yaml` file: 

```yaml
app-proxy:
  config:
    skipGitPermissionValidation: "true"
```

## Could not connect to Argo CD error (Existing Argo only)
When you try to Configure the Runtime as an Argo CD Application, the Runtime tries to connect to the Argo CD instance. 

### Possible cause
The Runtime cannot connect to the Argo CD instance due to one of these reasons:
* The Runtime is not installed in the same namespace as Argo CD
* The Runtime cannot reach required services: `argocd-server`, `argocd-repo-server`, `argocd-redis`.
* Your Argo CD instance uses a non-default root path behind a reverse proxy.

### Resolution

Follow the steps in the order in which they are listed.

##### 1. Check Runtime namespace
Check the namespace where the Runtime is installed. It must match the Argo CD namespace.

##### 2. Check service labels if using auto-detection
1. If you have configured auto-detect for Argo CD services, check if the labels are correctly defined:
    * `argocd-server`: `app.kubernetes.io/component=server,app.kubernetes.io/part-of=argocd`
    * `argocd-repo-server`: `app.kubernetes.io/component=repo-server,app.kubernetes.io/part-of=argocd`
    * `argocd-redis`: `app.kubernetes.io/component=redis,app.kubernetes.io/part-of=argocd`


<!--- Run this script to verify if the labels are correctly assigned: add the script -->

##### 3. Manually configure service names and ports in values.yaml
* If labels are not correctly defined, or if you are not using auto-detect, define service names and ports in the `values.yaml` file: 

```yaml
global:
  external-argo-cd:
    server:
      svc: argocd
      port: 80
    redis:
      svc: argocd-redis
      port: 6379
    repoServer:
      svc: argocd-repo-server
      port: 8081
...
```

##### 4. Verify Argo CD root path configuration 
* If your Argo CD instance is behind a reverse proxy and uses a non-default root path, configure the path in `values.yaml`:

```yaml
global:
  external-argo-cd:
    server:
      svc: argocd
      port: 80
      rootpath: '/argocd' # example value if ArgoCD is behind a reverse proxy such as https://example.com/argocd/
...
```

## Pre-installation checks or runtime collision check failed

### Possible cause
You have Argo Project components from other installations in your cluster.

### Resolution
You can either:
* Install Codefresh GitOps Runtime alongside Community Argo CD

_OR_

1. Uninstall the Codefresh GitOps Runtime.
1. Remove the Argo Project components from your cluster.
1. Reinstall the Codefresh GitOps Runtime.

## Pre-installation error: please upgrade to the latest cli version: `v<number>`

### Possible cause
Codefresh has a new CLI version.

### Resolution
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
The Git Runtime token provided for installation is not valid.

### Resolution
* Make sure the token:
  * Has a valid expiration date.
  * Scope includes `repo` and `admin-repo.hook`

## Failed adding git integration <...> 404 not found

### Possible cause
Another process is probably occupying the address you provided as your `ingress-host`.

### Resolution
* Terminate the process to free up the address.

## Failed to create default git integration:...failed making a graphql API call...the HTTP request failed

### Possible cause
The Ingress controller does not have a valid SSL certificate. The certificate must be from a Certificate Authority.

### Resolution
1. Get a valid CA-signed certificate for the Ingress controller.
1. Run the Runtime installation.

_OR_

* Continue with the runtime installation in `insecure` mode:

  `cf intg git add default --api-url https://api.github.com --runtime <runtime_name> --insecure`  
  where:  
  `<runtime_name>` is the name of the runtime installation.

## Failed to create default git integration:...GraphQL Error (Code: 401): ("response":{"error":"Unauthorized: Invalid token."status":401, "headers":{}}..)

### Possible cause
The ingress host specified does not point to the cluster selected for runtime installation.

### Resolution
Make sure the ingress host points to the cluster on which the runtime is installed.

## Timeout error: applications not synced or healthy

### Possible cause
`Cron-executer` has identified that not all your applications are synced and healthy. Runtime installation syncs app status at 10-minute intervals. The timeout occurs if after the last status sync, at least one application is either not synced or healthy.

### Resolution
Without terminating the runtime install, do the following:

1. In the Argo CD UI, check the status of your apps:
   * Port forward your `argo-cd server` pod using default 8080 ports.
   * Access it via `localhost:8080` with the Username `admin`, and Password which is the decoded `argocd-initial-admin-secret` in your cluster.  
    > With `k9s`, in the `secrets` view, press `x`.
1. If all apps are perfectly synced and healthy, check the logs of the `cron-executor` service.
1. If the logs don't show a cause for the error, try freeing up resources:
   * Free up memory with `docker system prune -a --volumes`.
   * Increase the resources allocated to your cluster.

## Unable to communicate with `<runtime-name>` or two or more Runtimes

### Possible cause
This error points to an issue with your browser or with your Runtime configuration, and can be due to any of the following:

{{site.data.callout.callout_tip}}
**TIP**   
Verify that your internet connection is stable.
{{site.data.callout.end}}

1. [Browser issues](#browser-issues)  
   Can occur because of Cross-Origin Request blocked errors.
1. [Missing SSL certificate](#missing-ssl-certificate)  
   Can occur if your Runtime is ingress-based, and without an SSL certificate for the ingress controller.
1. [Insecure protocol prefix](#insecure-protocol-prefix)  
   Can occur if your Runtime is ingress-based, and using HTTP for the `ingress-host` value instead of HTTPS.

### Resolution
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

{{site.data.callout.callout_warning}}
**WARNING**   
HTTP connections are unencrypted and less secure.  
 Be aware that you are using this at your own risk.
{{site.data.callout.end}} 

##### Chrome

1. To the left of the URL, click the Lock icon, and then select **Site settings**.
1. On the right, scroll down to **Insecure content** and then select **Allow** as the default for `g.codefresh.io`.
1. Click **Save**.
1. Reload the page.

<br>

##### Firefox

1. To the left of the URL, click the Lock icon.
1. Expand **Connection Secure**, and then click **More Information**.
1. In the Page Info window that appears, click the **Security** tab.
1. Under Connection, do one of the following:
   * If available, select **Enable HTTP2**.
   * If not available, select **Disable Protection on This Site**, and then click **OK**.
1. Reload the page.

<br>

##### Safari

1. Go to **Preferences > Advanced**.
1. Select **Show Develop menu in menu bar**, and close the Preferences window.
1. From the menu bar, select **Develop**, and then select **Disable Cross-Origin Restrictions**.
1. Reload the page.

<br>

##### Edge

1. To the left of the URL, click the Lock icon, and then select **Permissions for this site**.
1. Scroll down to **Location**, and then select **Allow** as the default for `g.codefresh.io`.
1. Click **Save**.
1. Reload the page.

## Related articles
[Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)  
[Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-new-argo-cd/)