---
title: "Add and manage external clusters"
description: ""
group: runtime
toc: true
---

Manage external clusters in Codefresh by registering them to provisioned runtimes. Instead of having a single cluster for a runtime, manage multiple clusters through a single runtime.  

When you add an external cluster to a provisioned runtime, the cluster is registered as a managed cluster. A managed cluster is treated as any other managed K8s resource, meaning that you can monitor its health and sync status, deploy applications on the cluster and view information in the Applications dashboard, and remove the cluster from the runtime's managed list.  

Add managed clusters through:
* Codefresh CLI
* Kustomize

Adding a managed cluster via Codefresh ensures that Codefresh applies the required RBAC resources (`ServiceAccount`, `ClusterRole` and `ClusterRoleBinding`) to the target cluster, creates a `Job` that updates the selected runtime with the information, registers the cluster in Argo CD as a managed cluster, and updates the platform with the new cluster information.

### How to add a managed cluster with Codefresh CLI
Add the external cluster to a provisioned runtime through the Codefresh CLI.  
Optionally, to first generate the YAML manifests, and then manually apply them, use the `dry-run` flag in the CLI. 

**Before you begin**  

* Make sure your Git personal access token is valid and has the correct permissions

**How to**  

1. In the Codefresh UI, go to the [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page.
1. From either the **Topology** or **List** views, select the runtime to which to add the cluster. 
1. Topology View: Select ![](/images/icons/add-cluster.png?display=inline-block).  
  List View: Select the **Managed Clusters** tab, and then select **+ Add Cluster**.  
1. In the Add Managed Cluster panel:
  * **Cluster Name**: Enter the context name for your cluster (as it appears in your kubeconfig file). 
  * Define the parameters and then run the command:  
    `cf cluster add <runtime-name> --context <context_name> [--dry-run]`  
    where:  
      `<runtime-name>` is the runtime to which to register the cluster. The name of the selected runtime is automatically added.  
      `<context_name>` is the kube context with the credentials to communicate with the managed cluster. If not supplied, the CLI displays the list of available clusters as defined in `kubeconfig`.  
      `--dry-run` is optional, and required if you want to generate a list of YAML manifests that you can redirect and apply manually with `kubectl`.
  
   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/managed-cluster-add-panel.png" 
	url="/images/runtime/managed-cluster-add-panel.png" 
	alt="Add Managed Cluster panel" 
	caption="Add Managed Cluster panel"
  max-width="30%" 
%}

{:start="5"}
1. If you used `dry-run`, apply the generated manifests to the same target cluster on which you ran the command.  
  Here is an example of the YAML manifest generated with the `--dry-run` flag. Note that there are placeholders in the example, which are replaced with the actual values with `--dry-run`.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: argocd-manager
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: argocd-manager-role
rules:
- apiGroups:
  - '*'
  resources:
  - '*'
  verbs:
  - '*'
- nonResourceURLs:
  - '*'
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: argocd-manager-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: argocd-manager-role
subjects:
- kind: ServiceAccount
  name: argocd-manager
  namespace: kube-system
---
apiVersion: v1
data:
  contextName: <contextName>
  ingressUrl: <ingressUrl>
  server: <server>
kind: ConfigMap
metadata:
  name: csdp-add-cluster-cm
  namespace: kube-system
---
apiVersion: v1
data:
  csdpToken: <csdpToken>
kind: Secret
metadata:
  name: csdp-add-cluster-secret
  namespace: kube-system
type: Opaque
---
apiVersion: batch/v1
kind: Job
metadata:
  name: csdp-add-cluster-job
  namespace: kube-system
spec:
  template:
    metadata:
      name: csdp-add-cluster-pod
    spec:
      containers:
      - args:
        - ./add-cluster.sh
        command:
        - bash
        env:
        - name: SERVICE_ACCOUNT_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.serviceAccountName
        - name: INGRESS_URL
          valueFrom:
            configMapKeyRef:
              key: ingressUrl
              name: csdp-add-cluster-cm
        - name: CSDP_TOKEN
          valueFrom:
            secretKeyRef:
              key: csdpToken
              name: csdp-add-cluster-secret
        - name: CONTEXT_NAME
          valueFrom:
            configMapKeyRef:
              key: contextName
              name: csdp-add-cluster-cm
        - name: SERVER
          valueFrom:
            configMapKeyRef:
              key: server
              name: csdp-add-cluster-cm
        image: quay.io/codefresh/csdp-add-cluster:0.1.0
        imagePullPolicy: Always
        name: main
        resources:
          limits:
            cpu: "1"
            memory: 512Mi
          requests:
            cpu: "0.2"
            memory: 256Mi
      restartPolicy: Never
      serviceAccount: argocd-manager
  ttlSecondsAfterFinished: 600
```

The new cluster is registered to the runtime as a managed cluster.  

### Adding a managed cluster with Kustomize
Create a `kustomization.yaml` file with the information shown in the example below, and run `kustomize build` on it.  

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kube-system

configMapGenerator:
  - name: csdp-add-cluster-cm
    namespace: kube-system
    behavior: merge
    literals:
        # contextName is the name of the kube context (in the local kubeconfig file) that connects to the target cluster
      - "contextName=<contextName>"
        # ingressUrl is the url used to access the Codefresh runtime
        # example https://some.domain.name
      - "ingressUrl=<ingressUrl>"
        # server is the k8s cluster API endpoint url
        # can be obtained by
        #   CONTEXT_NAME=<TARGET_CONTEXT_NAME>
        #   CLUSTER_NAME=$(kubectl config view --raw --flatten -o jsonpath='{.contexts[?(@.name == "'"${CONTEXT_NAME}"'")].context.cluster}')
        #   kubectl config view --raw --flatten -o jsonpath='{.clusters[?(@.name == "'"${CLUSTER_NAME}"'")].cluster.server}'
      - "server=<server>"
secretGenerator:
  - name: csdp-add-cluster-secret
    namespace: kube-system
    behavior: merge
    literals:
        # csdpToken is the user's Personal Access Token
      - "csdpToken=<csdpToken>"

resources:
  - https://github.com/codefresh-io/cli-v2/manifests/add-cluster/kustomize?ref=v<runtimeVersion>
```


### Work with managed clusters 
Use the Topology or List runtime views to work with managed clusters. For information on runtime views, see [Runtime views]({{site.baseurl}}/docs/runtime/runtime-views).  

**Monitor cluster**     
  View connection status for the managed cluster, and health and sync errors. Health and sync errors are flagged by the error notification in the toolbar, and visually flagged in the List and Topology views.  
  
**Install/uninstall cluster components** 

  Install components on one or more managed clusters, and monitor deployed application status and data in the Applications dashboard. 
  Uninstalling a component from one or more managed clusters do not affect the runtime, but removes the data from those components Applications dashboard.  

**Automatic upgrade**   
  As the components are managed as part of the runtime, updates to the runtime automatically updates the components on all the managed clusters that include it.  

**Remove cluster**  
  Remove a cluster registered with a runtime from the runtime's list of managed clusters.  
  >Removing a managed cluster from a runtime also removes all the applications deployed to the cluster, and removes their data from the Applications dashboard.

**How to**
1. In the Codefresh UI, go to the [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page.
1. Select either the **Topology View** or the **List View** tabs.
1. Do one of the following:
    * In the Topology View, select the cluster node from the runtime it is registered to. 
    * In the List View, select the runtime, and then select the **Managed Clusters** tab.
1. To uninstall a cluster component from the list, select the three dots next to the component, and then select **Uninstall**.
1. To remove the cluster from the list managed by the runtime, select the three dots next to the cluster name, and then select **Uninstall**.

### What to read next
[Manage runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)  
[Manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/)
