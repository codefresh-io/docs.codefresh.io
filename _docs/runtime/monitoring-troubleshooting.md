---
title: "Moinitor provisioned runtimes"
description: ""
group: runtime
toc: true
---

Monitor provisioned runtimes for security, health, and sync errors:

* (Hybrid and hosted) View/download logs for runtimes and for runtime components
* (Hybrid) Restore provisioned runtimes
* (Hybrid) Configure browsers to allow access to insecure runtimes
* (Hybrid) Monitor notifications in the Activity Log


### View/download logs to troubleshoot runtimes
Logs are available for completed runtimes, both for the runtime and for individual runtime components. Download runtime log files for offline viewing and analysis, or view online logs for a runtime component, and download if needed for offline analysis. Online logs support free-text search, search-result navigation, and line-warp for enhanced readability.  

Log files include events from the date of the application launch, with the newest events listed first. 

{::nomarkdown}
<br><br>
{:/}

#### Download logs for runtimes
Download the log file for a runtime. The runtime log is downloaded as a `.tar.gz` file, which contains the individual log files for each runtime component. 

1. In the Codefresh UI, go to [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}. 
1. If needed, switch to **List View**, and then select the runtime for which to download logs.
1.  From the list of **Additional Actions**, select **Download All Logs**.  
  The log file is downloaded to the Downloads folder or the folder designated for downloads, with the filename, `<runtime-name>.tar.gz`. For example, `codefreshv2-production2.tar.gz`.


  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-download-all.png" 
	url="/images/runtime/runtime-logs-download-all.png" 
	alt="Download logs for selected runtime" 
	caption="Download logs for selected runtime"
    max-width="40%" 
%}


{:start="4"}
1. To view the log files of the individual components, unzip the file.  
  Here is an example of the folder with the individual logs.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-folder-view.png" 
	url="/images/runtime/runtime-logs-folder-view.png" 
	alt="Individual log files in folder" 
	caption="Individual log files in folder"
    max-width="50%" 
%}

{:start="5"}
1. Open a log file with the text editor of your choice.

{::nomarkdown}
<br><br>
{:/}

#### View/download logs for runtime components
View online logs for any runtime component, and if needed, download the log file for offline viewing and analysis.  

Online logs show up to 1000 of the most recent events (lines), updated in real time. Downloaded logs include all the events from the application launch to the date and time of download. 

1. In the Codefresh UI, go to [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}. 
1. If needed, switch to **List View**, and then select the runtime.
1. Select the runtime component and then select **View Logs**. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-view-component.png" 
	url="/images/runtime/runtime-logs-view-component.png" 
	alt="View log option for individual runtime component" 
	caption="View log option for individual runtime component"
    max-width="40%" 
%}


{:start="4"}
1. Do the following:
  * Search by free-text for any string, and click the next and previous buttons to navigate between the search results.
  * To switch on line-wrap for readability, click **Wrap**.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-screen-view.png" 
	url="/images/runtime/runtime-logs-screen-view.png" 
	alt="Runtime component log example" 
	caption="Runtime component log example"
    max-width="50%" 
%}

{:start="5"}
1. To download the log, click **Download**.  
  The file is downloaded as `<component-name>.log`.

### (Hybrid) Restore provisioned runtimes

In case of cluster failure, restore the provisioned hybrid runtime from the existing runtime installation repository. For partial or complete cluster failures, you can restore the runtime to either the failed cluster or to a different cluster. Restoring the provisioned runtime reinstalls the runtime leveraging the resources in the existing runtime repo.

Restoring the runtime:
* Applies `argo-cd` from the installation manifests in your repo to your cluster
* Associates `argo-cd` with the existing installation repo
* Applies the runtime and `argo-cd` secrets to the cluster
* Updates the runtime config map (`<runtime-name>.yaml` in the `bootstrap` directory) with the new cluster configuration for these fields:  
  `cluster`  
  `ingressClassName`  
  `ingressController`  
  `ingressHost` 

{::nomarkdown}
<br><br>
{:/}

#### How to restore a hybrid runtime
Reinstall the hybrid runtime from the existing installation repository to restore it to the same or a different cluster.  

**Before you begin**

* Have the following information handy: 
  > All values must be the identical to the runtime to be restored. 
  * Runtime name
  * Repository URL
  * Codefresh context
  * Kube context: Required if you are restoring to the same cluster

**How to**

1. Run:  
  `cf runtime install --from-repo`
1. Provide the relevant values when prompted.
1. If you are performing the runtime recovery in a different cluster, verify the ingress resource configuration for `app-proxy`, `workflows`, and `default-git-source`.  
  If the health status remains as `Progressing`, do the following:
  
    * In the runtime installation repo, check if the `ingress.yaml` files for the `app-proxy` and `workflows` are configured with the correct `host` and `ingressClassName`:  

      `apps/app-proxy/overlays/<runtime-name>/ingress.yaml`  
      `apps/workflows/overlays/<runtime-name>/ingress.yaml`  

    * In the Git Source repository, check the `host` and `ingressClassName` in `cdp-default-git-source.ingress.yaml`: 

       `resources_<runtime-name>/cdp-default-git-source.ingress.yaml`  
    
    See the [example](#ingress-example) below. 

{:start="4"}
1. If you have managed clusters registered to the hybrid runtime you are restoring, reconnect them.  
  Run the command and follow the instructions in the wizard:  
  `cf cluster add`

1. Verify that you have a registered Git integration:  
  `cf integration git list --runtime <runtime-name>`  

1. If needed, create a new Git integration:  
  `cf integration git add default --runtime <runtime-name> --provider github --api-url https://api.github.com` 

{::nomarkdown}
<br><br>
{:/}

#### Ingress example
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


### (Hybrid) Configure browser to allow insecure hybrid runtimes

If at least one of your hybrid runtimes was installed in insecure mode (without an SSL certificate for the ingress controller from a CA), the UI alerts you that _At least one runtime was installed in insecure mode_.
{% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-insecure-alert.png"
 url="/images/runtime/runtime-insecure-alert.png"
 alt="Insecure runtime installation alert"
 caption="Insecure runtime installation alert"
  max-width="100%"
%}

All you need to do is to configure the browser to trust the URL and receive content.

1. Select **View Runtimes** to the right of the alert.  
  You are taken to the Runtimes page, where you can see insecure runtimes tagged as **Allow Insecure**.
  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-insecure-steps.png"
 url="/images/runtime/runtime-insecure-steps.png"
 alt="Insecure runtimes in Runtime page"
 caption="Insecure runtimes in Runtime page"
  max-width="40%"
%}
{:start="2"}
1. For _every_ insecure runtime, select **Allow Insecure**, and when the browser prompts you to allow access, do as relevant:

* Chrome: Click **Advanced** and then **Proceed to site**.
* Firefox: Click **Advanced** and then **Accept the risk and continue**.
* Safari: Click **Show Certificate**, and then select **Always allow content from site**.
* Edge: Click **Advanced**, and then select **Continue to site(unsafe)**.

### (Hybrid) View notifications for hybrid runtimes in Activity Log

The Activity Log is a quick way to monitor notifications for runtime events such as upgrades. A pull-down panel in the Codefresh toolbar, the Activity Log shows ongoing, success, and error notifications, sorted by date, starting with today's date.

1. In the Codefresh UI, on the top-right of the toolbar, select ![](/images/pipeline/monitoring/pipeline-activity-log-toolbar.png?display=inline-block) **Activity Log**.
1. To see notifications for provisioned runtimes, filter by **Runtime**.

  {% include image.html
  lightbox="true"
  file="/images/runtime/runtime-activity-log.png"
  url="/images/runtime/runtime-activity-log.png"
  alt="Activity Log filtered by Runtime events"
  caption="Activity Log filtered by Runtime events"
  max-width="30%"
  %}

{:start="3"}

1. To see more information on an error, select the **+** sign.

### (Hybrid) Troubleshoot health and sync errors for runtimes

The ![](/images/icons/error.png?display=inline-block) icon with the runtime in red indicates either health or sync errors.

**Health errors**  
Health errors are generated by Argo CD and by Codefresh for runtime components.

**Sync errors**  
Runtimes with sync errors display an **Out of sync** status in Sync Status column. They are related to discrepancies between the desired and actual state of a runtime component or one of the Git sources associated with the runtime.  

**View errors**  
For both views, select the runtime, and then select **Errors Detected**.  
Here is an example of health errors for a runtime.

    {% include image.html 
  lightbox="true"
  file="/images/runtime/runtime-health-sync-errors.png"
  url="/images/runtime/runtime-health-sync-errors.png"
  alt="Health errors for runtime example"
  caption="Health errors for runtime example"
  max-width="30%"
  %}

### Related articles
[Managing provisioned runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)  
[Adding Git Sources to runtimes]({{site.baseurl}}/docs/runtime/git-sources/)  
[Adding external clusters to runtimes]({{site.baseurl}}/docs/runtime/managed-cluster/)  