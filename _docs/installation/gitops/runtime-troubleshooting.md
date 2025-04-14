---
title: "Troubleshooting GitOps Runtime installation"
description: "Review how to resolve issues during Runtime installation"
toc: true
---



## Error: Job has reached the specified backoff limit
Before initiating the installation, Codefresh automatically validates the `values.yaml` file to verify that the supplied values are correct.

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
This error  displayed when you try to Configure the Runtime as Argo CD Application. 

### Possible cause
The Shared Configuration Repository (`ISC`)  has been created but is not yet initialized. 

### Resolution
Wait a few seconds, and try again.


## Runtime timeout errors
One of these errors indicating a timeout:
* `Error: "unable to initialise Codefresh Client", "error": "secrets \"codefresh-token\" not found"` 
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

### Possible cause
Your token is invalid because of missing scopes  
OR  
You are using a fine-grained token or one with custom scopes

### Resolution

##### Check token scopes

**GitHub Git Runtime token**
{: .table .table-bordered .table-hover}
| Type    | Required scopes    | 
| -------- | ----------------- | 
| **Classic** |{::nomarkdown}<ul><li><code class="highlighter-rouge">repo</code></li><li><code class="highlighter-rouge">admin:repo_hook</code></li></ul>{:/}|
|**Fine-grained** (personal or group-based) |{::nomarkdown}<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code> including all repos that Argo CD syncs from</li><li>Repository permissions:<ul><li>Administration: <code class="highlighter-rouge">Read and write</code></li><li>Commit statuses: <code class="highlighter-rouge">Read and write</code></li><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li><li>Pull requests: <code class="highlighter-rouge">Read and write</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li></ul></li></ul>{:/}


**GitHub Git user token**
{: .table .table-bordered .table-hover}
| Type        | Required scopes | 
| ------------ |  ----------------- | 
| **Classic** |{::nomarkdown}<ul><li><code class="highlighter-rouge">repo</code></li></ul>{:/} |
|**Fine-grained** |{::nomarkdown}<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code></li><li>Repository permissions:<ul><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li></ul></li></ul>{:/}|

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


## Add  Git Source failure
TBD