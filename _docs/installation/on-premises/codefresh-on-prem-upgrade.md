---
title: "Codefresh on-premises upgrade"
description: "Upgrade the Codefresh On-Premises platform"
group: installation
redirect_from:
  - /docs/enterprise/codefresh-on-prem-upgrade/
  - /docs/administration/codefresh-on-prem-upgrade/
  - /docs/installation/codefresh-on-prem-upgrade/
toc: true
---
Upgrade the Codefresh on-premises platform to the latest version:
* Prepare for the upgrade: _Before_ the upgrade, based on the version you are upgrading to, complete the required tasks
* Upgrade the platform
* Complete post-upgrade configuration: If needed, also based on the version you are upgrading to, complete the required tasks



## Upgrade to 1.2.0 and higher
This major release **deprecates** the following Codefresh managed charts:
* Ingress
* Rabbitmq
* Redis

See the instructions below for each of the affected charts.

> Before the upgrade remove any seed jobs left from previous release with:
   `kubectl delete job --namespace ${CF_NAMESPACE} -l release=cf `

> Before the upgrade remove PDBs for Redis and RabbitMQ left from previous release with:
   `kubectl delete pdb cf-rabbitmq --namespace ${CF_NAMESPACE}` <br />
   `kubectl delete pdb cf-redis --namespace ${CF_NAMESPACE}`

### Update configuration for Ingress chart
From version **1.2.0 and higher**, we have deprecated support for `Codefresh-managed-ingress`.
Kubernetes community public `ingress-nginx` chart replaces `Codefresh-managed-ingress` chart. For more information on the `ingress-nginx`, see [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx).

> Parameter locations have changed as the ingress chart name was changed from `ingress` to `ingress-nginx`:
  **NGINX controller** parameters are now defined under `ingress-nginx`
  **Ingress object** parameters are now defined under `ingress`

You must update `config.yaml`, if you are using:
* External ingress controllers, including ALB (Application Load Balancer)
* Codefresh-managed ingress controller with _custom_ values

#### Update configuration for external ingress controllers

For external ingress controllers, including ALB (Application Load Balancer), update the relevant sections in `config.yaml` to align with the new name for the ingress chart:

* Replace `ingress` with `ingress-nginx`

*v1.1.1 or lower*
```yaml
ingress: #disables creation of both Nginx controller deployment and Ingress objects
  enabled: false
```

*v1.2.2 or higher*
```yaml
ingress-nginx: #disables creation of Nginx controller deployment
  enabled: false

ingress: #disables creation of Ingress objects (assuming you've manually created ingress resource before)
  enabled: false
```

* Replace `annotations` that have been deprecated with `ingressClassName`

*v1.1.1 or lower*
```yaml
ingress:
  annotations:
    kubernetes.io/ingress.class: my-non-codefresh-nginx
```

*v1.2.2 or higher*
```yaml
ingress-nginx:
  enabled: false

ingress:
  ingressClassName: my-non-codefresh-nginx
###  `kubernetes.io/ingress.class` annotation is deprecated from kubernetes v1.22+.
#  annotations:
#    kubernetes.io/ingress.class: my-non-codefresh-nginx
```

#### Update configuration for Codefresh-managed ingress with custom values

If you were running `Codefresh-managed ingress` controller with _custom_ values refer to [values.yaml](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml) from the official repo. If needed, update the `ingress-nginx` section in `config.yaml`. The example below shows the default values (already provided in Codefresh chart) for `ingress-nginx`:

```yaml
ingress-nginx:
  enabled: true
  controller:
    ## This section refers to the creation of the IngressClass resource
    ## IngressClass resources are supported since k8s >= 1.18 and required since k8s >= 1.19
    ingressClassResource:
      # -- Is this ingressClass enabled or not
      enabled: true
      # -- Is this the default ingressClass for the cluster
      default: false
      # -- Controller-value of the controller that is processing this ingressClass
      controllerValue: "k8s.io/ingress-nginx-codefresh"
      # -- Name of the ingressClass
      name: nginx-codefresh
    # -- For backwards compatibility with ingress.class annotation.
    # Algorithm is as follows, first ingressClassName is considered, if not present, controller looks for ingress.class annotation
    ingressClass: nginx-codefresh
    # -- Process IngressClass per name (additionally as per spec.controller).
    ingressClassByName: true
    # Limit the scope of the controller to a specific namespace
    scope:
      # -- Enable 'scope' or not
      enabled: true
    admissionWebhooks:
      enabled: false
```
> New `ingress-nginx` subchart creates a new `cf-ingress-nginx-controller` service (`type: LoadBalancer`) instead of old `cf-ingress-controller` service. So make sure to update DNS record for `global.appUrl` to point to a new external load balancer IP.
  You can get external load balancer IP with:
  `kubectl get svc cf-ingress-nginx-controller -o jsonpath={.status.loadBalancer.ingress[0].ip`


### Update configuration for RabbitMQ chart
From version **1.2.2 and higher**, we have deprecated support for the `Codefresh-managed Rabbitmq` chart. Bitnami public `bitnami/rabbitmq` chart has replaced the `Codefresh-managed rabbitmq`. For more information, see [bitnami/rabbitmq](https://github.com/bitnami/charts/tree/master/bitnami/rabbitmq).

> Configuration updates are not required if you are running an **external** RabbitMQ service.

> RabbitMQ chart was replaced so as a consequence values structure might be different for some parameters.
  For the complete list of values, see [values.yaml](https://github.com/bitnami/charts/blob/master/bitnami/rabbitmq/values.yaml)

**`existingPvc` changed to `existingClaim` and defined under `persistence`**

*v1.1.1 or lower*
```yaml
rabbitmq:
  existingPvc: my-rabbitmq-pvc
  nodeSelector:
    foo: bar
  resources:
    limits:
      cpu: 2000m
      memory: 2Gi
    requests:
      cpu: 500m
      memory: 1Gi
  tolerations:
  - effect: NoSchedule
    key: <key>
    operator: Equal
    value: <value>
```

*v1.2.2 or higher*
```yaml
rabbitmq:
  volumePermissions: ## Enable init container that changes the owner and group of the persistent volume from existing claim
    enabled: true
  persistence:
    existingClaim: my-rabbitmq-pvc
  nodeSelector:
    foo: bar
  resources:
    limits:
      cpu: 2000m
      memory: 2Gi
    requests:
      cpu: 500m
      memory: 1Gi
  tolerations:
  - effect: NoSchedule
    key: <key>
    operator: Equal
    value: <value>
```

**`storageClass` and `size` defined under `persistence`**

*v1.1.1 or lower*
```yaml
rabbitmq:
  storageClass: my-storage-class
  storageSize: 32Gi
```

*v1.2.2 or higher*
```yaml
rabbitmq:
  persistence:
    storageClass: my-storage-class
    size: 32Gi
```

### Update configuration for Redis chart
From version **1.2.2 and higher**, we have deprecated support for the `Codefresh-managed Redis` chart. Bitnami public `bitnami/redis` chart has replaced the `Codefresh-managed Redis` chart. For more information, see [bitnami/redis](https://github.com/bitnami/charts/tree/master/bitnami/redis).

Redis storage contains **CRON and Registry** typed triggers so you must migrate existing data from the old deployment to the new stateful set.
This is done by backing up the existing data before upgrade, and then restoring the backed up data after upgrade.

> Configuration updates are not required:
  * When running an **external** Redis service.
  * If CRON and Registy triggers have not been configured.

#### Verify existing Redis data for CRON and Registry triggers
Check if you have CRON and Registry triggers configured in Redis.

* Run `codefresh get triggers`
  OR
  Directly from the K8s cluster where Codefresh is installed.

```shell
NAMESPACE=codefresh
REDIS_PASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-redis -o jsonpath="{.data.redis-password}" | base64 --decode)

kubectl exec -it deploy/cf-redis -- env REDIS_PASSWORD=$REDIS_PASSWORD bash
#once inside cf-redis pod
REDISCLI_AUTH="$REDIS_PASSWORD" redis-cli
info keyspace # list db
select 15 # select db 15
keys * #show keys
```

* If there are results, continue with _Back up existing Redis data_.

#### Back up existing Redis data
Back up the existing data before the upgrade:

* Connect to the pod, run `redis-cli`, export AOF data from old `cf-redis-*` pod:

```shell
NAMESPACE=codefresh
REDIS_PASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
REDIS_POD=$(kubectl get pods -l app=cf-redis -o custom-columns=:metadata.name --no-headers=true)
kubectl cp $REDIS_POD:/bitnami/redis/data/appendonly.aof appendonly.aof -c cf-redis
```

#### Restore backed-up Redis data
Restore the data after the upgrade:

* Copy `appendonly.aof` to the new `cf-redis-master-0` pod:

  ```shell
  kubectl cp appendonly.aof cf-redis-master-0:/data/appendonly.aof
  ````
* Restart `cf-redis-master-0` and `cf-api` pods:

  ```shell
  kubectl delete pod cf-redis-master-0

  kubectl scale deployment cf-cfapi-base --replicas=0 -n codefresh
  kubectl scale deployment cf-cfapi-base --replicas=2 -n codefresh
  ```

> Redis chart was replaced so as a consequence values structure might be different for some parameters.
  For the complete list of values, see [values.yaml](https://github.com/bitnami/charts/blob/master/bitnami/redis/values.yaml).

**`existingPvc` changed to `existingClaim` and defined under `master.persistence`**

*v1.1.1 or lower*
```yaml
redis:
  existingPvc: my-redis-pvc
  nodeSelector:
    foo: bar
  resources:
    limits:
      cpu: 1000m
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 500Mi
  tolerations:
  - effect: NoSchedule
    key: <key>
    operator: Equal
    value: <value>
```

*v1.2.2 or higher*
```yaml
redis:
  volumePermissions: ## Enable init container that changes the owner and group of the persistent volume from existing claim
    enabled: true
  master:
    persistence:
      existingClaim: my-redis-pvc
    nodeSelector:
      foo: bar
    resources:
      limits:
        cpu: 1000m
        memory: 1Gi
      requests:
        cpu: 500m
        memory: 500Mi
    tolerations:
    - effect: NoSchedule
      key: <key>
      operator: Equal
      value: <value>
```

**`storageClass` and `size` defined under `master.persistence`**


*v1.1.1 or lower*
```yaml
redis:
  storageClass: my-storage-class
  storageSize: 32Gi
```

*v1.2.2 or higher*
```yaml
redis:
  master:
    persistence:
      storageClass: my-storage-class
      size: 32Gi
```

> If you run the upgrade without redis backup and restore procedure, **Helm Releases Dashboard** page might be empty for a few minutes after the upgrade.

## Upgrade to 1.3.0 and higher
This major release **deprecates** the following Codefresh managed charts:
* Consul
* Nats

### Update configuration for Consul
From version **1.3.0 and higher**, we have deprecated the Codefresh-managed `consul` chart,  in favor of Bitnami public `bitnami/consul` chart. For more information, see [bitnami/consul](https://github.com/bitnami/charts/tree/master/bitnami/consul).

Consul storage contains data about **Windows** worker nodes, so if you had any Windows nodes connected to your OnPrem installation, see the following instruction:

> Use `https://<your_onprem_domain>/admin/nodes` to check for any existing Windows nodes.

#### Back up existing consul data
_Before starting the upgrade_, back up existing data.

> Because `cf-consul` is a StatefulSet and has some immutable fields in its spec with both old and new charts having the same names, you cannot perform a direct upgrade.
  Direct upgrade will most likely fail with:
  `helm.go:84: [debug] cannot patch "cf-consul" with kind StatefulSet: StatefulSet.apps "cf-consul" is invalid: spec: Forbidden: updates to statefulset spec for fields other than 'replicas', 'template', 'updateStrategy' and 'minReadySeconds' are forbidden`
  After backing up existing data, you must delete the old StatefulSet.


1. Exec into the consul pod and create a snapshot:
```shell
kubectl exec -it cf-consul-0 -n codefresh -- consul snapshot save backup.snap
```
1. Copy snapshot locally:
```shell
kubectl cp -n codefresh cf-consul-0:backup.snap backup.snap
```
1. **Delete the old** `cf-consul` stateful set:

```shell
kubectl delete statefulset cf-consul -n codefresh
```

#### Restore backed up data

After completing the upgrade to the current version, restore the `consul` data that you backed up.

1. Copy the snapshot back to the new pod:

```shell
kubectl cp -n codefresh backup.snap cf-consul-0:/tmp/backup.snap
```
1. Restore the data:
```
kubectl exec -it cf-consul-0 -n codefresh -- consul snapshot restore /tmp/backup.snap
```
> Consul chart was replaced, and values structure might be different for some parameters.
  For the complete list of values, see [values.yaml](https://github.com/bitnami/charts/blob/master/bitnami/consul/values.yaml)


### Update Nats configuration
From version **1.3.0 and higher**, we have deprecated Codefresh-managed `nats` chart in favor of Bitnami public `bitnami/nats` chart. For more information, see [bitnami/nats](https://github.com/bitnami/charts/tree/master/bitnami/consul).

> Because `cf-nats` is a StatefulSet and  has some immutable fields in its spec, both the old and new charts have the same names, preventing a direct upgrade.
  Direct upgrade will most likely fail with:
  `helm.go:84: [debug] cannot patch "cf-nats" with kind StatefulSet: StatefulSet.apps "cf-nats" is invalid: spec: Forbidden: updates to statefulset spec for fields other than 'replicas', 'template', 'updateStrategy' and 'minReadySeconds' are forbidden`

* **Delete the old** `cf-nats` stateful set.

```shell
kubectl delete statefulset cf-nats -n codefresh
```

> Nats chart was replaced, and values structure might be different for some parameters.
  For the complete list of values, see [values.yaml](https://github.com/bitnami/charts/blob/master/bitnami/nats/values.yaml).

### Upgrade to 1.3.1 and higher

Chart **v1.3.1** fixes duplicated env vars `CLUSTER_PROVIDERS_URI` and `CLUSTER_PROVIDERS_PORT` in `cf-api` deployment.
```yaml
W1010 03:03:55.553842     280 warnings.go:70] spec.template.spec.containers[0].env[94].name: duplicate name "CLUSTER_PROVIDERS_URI"
W1010 03:03:55.553858     280 warnings.go:70] spec.template.spec.containers[0].env[95].name: duplicate name "CLUSTER_PROVIDERS_PORT"
```


> Due to Helm issue [Removal of duplicate array entry removes completely from Kubernetes](https://github.com/helm/helm/issues/10741), you shoud run `kcfi deploy` or `helm upgrade` two times consecutively.


With chart **v1.3.1** [insecure registy](https://docs.docker.com/registry/insecure/) property has been moved under `builder` section:

```yaml
builder:
  insecureRegistries:
  - "myregistrydomain.com:5000"
```

## Upgrade to 1.4.0 and higher

Affected values:
- `HorizontalPodAutoscaler` is renamed to `hpa`

> Update `kcfi` tool to the latest [0.5.18](https://github.com/codefresh-io/kcfi/releases/tag/0.5.18){:target="\_blank"} version

This major release **deprecates** the following Codefresh managed charts and replaces them with Bitnami charts:
* [Postgresql](#update-configuration-for-postgresql-chart)
* [Mongodb](#update-configuration-for-mongodb-chart)

>Read instructions _before_ the upgrade.

> **Important!**  
There is a known issue with releases **1.4.0-1.4.6**, where ABAC feature for git contexts doesn't work as expected and has to be disabled.
Two options to mitigate the issue is to install patch release **1.4.7** or higher, where the issue is fixed or to apply a manual workaround:  
To do that, sign in with a platform admin user and proceed to  
`https://<YOUR_ONPREM_URL>/admin/features-management?filter=search:abacGitContext` page  
On the page enable **System Features** switch (confirm in the pop up window)  
After that, **abacGitContext** feature appears on the screen, toggle it's switch **ON** and then back to **OFF** state.

### Update configuration for Postgresql chart
From version **1.4.0 and higher**, we have deprecated support for the `Codefresh-managed Postgresql` chart. It has been replaced with Bitnami public chart `bitnami/postgresql`.  
For more information, see [bitnami/postgresql](https://github.com/bitnami/charts/tree/master/bitnami/postgresql){:target="\_blank"}.

> If in `config.yaml`, `postgresql.enabled=false` indicating that you are running and [**external** Postgresql service]({{site.baseurl}}/docs/installation/codefresh-on-prem/#configuring-an-external-postgres-database), you can ignore the configuration instructions.

> **Important!** Run the upgrade with `global.seedJobs=true` flag:

```yaml
global:
  seedJobs: true
```

#### Manual backup and restore


**Before the upgrade:**

1. Obtain the PostgresSQL administrator password:
```shell
NAMESPACE=codefresh
export PGPASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-postgresql -o jsonpath="{.data.postgres-password}" | base64 --decode)
```
1. Forward the PostgreSQL service port and place the process in the background:
```shell
kubectl port-forward --namespace $NAMESPACE svc/cf-postgresql 5432:5432 &
```
1. Create a directory for the backup files and make it the current working directory:
```shell
mkdir psqlbackup
chmod o+w psqlbackup
cd psqlbackup
```
1. Back up the contents of audit database to the current directory using the *pg_dump* tool.  
  If this tool is not installed on your system, use [Bitnami's PostgreSQL Docker image](https://github.com/bitnami/containers/tree/main/bitnami/postgresql){:target="\_blank"} to perform the backup, as shown below:
```shell
docker run --rm --name postgresql-backup -e PGPASSWORD=$PGPASSWORD -v $(pwd):/app --net="host" bitnami/postgresql:13 pg_dump -Fc --dbname audit -h host.docker.internal -p 5432 -f /app/audit.dump
```

> The above command is true for Windows and macOS, for Linux users `host.docker.internal` has to be replaced with `127.0.0.1`

Here:  
* The *--net* parameter lets the Docker container use the host's network stack and thereby gain access to the forwarded port.
* The *pg_dump* command connects to the PostgreSQL service and creates backup files in the */app* directory, which is mapped to the current directory (*psqlbackup/*) on the Docker host with the *-v* parameter.
* The *--rm* parameter deletes the container after the *pg_dump* command completes execution.

**After the upgrade:**

Create an environment variable with the password for the new stateful set:
```shell
export PGPASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-postgresql -o jsonpath="{.data.postgres-password}" | base64 --decode)
```

Forward the PostgreSQL service port for the new stateful set and place the process in the background:
```shell
kubectl port-forward --namespace $NAMESPACE svc/cf-postgresql 5432:5432
```

Restore the contents of the backup into the new release using the *pg_restore* tool. If this tool is not available on your system, mount the directory containing the backup files as a volume in Bitnami's PostgreSQL Docker container and use the *pg_restore* client tool in the container image to import the backup into the new cluster, as shown below:
```shell
cd psqlbackup
docker run --rm --name postgresql-backup -e PGPASSWORD=$PGPASSWORD -v $(pwd):/app --net="host" bitnami/postgresql:13 pg_restore -Fc --create --dbname postgres -h host.docker.internal -p 5432 /app/audit.dump
```

> The above command is true for Windows and macOS, for Linux users `host.docker.internal` has to be replaced with `127.0.0.1`

#### Backup and restore via Helm hooks

You can also run Postgresql database migration with `pre-upgrade` and `post-upgrade` helm hooks.
> It's strongly recommended to create a **MANUAL** backup prior to the upgrade!


**To enable backup and restore via Helm hooks:**  
* Set `postgresql.migration.enabled=true` (specify additional parameters if necessary).
  It will create a k8s Job with PVC, and run `pg_dump` and `pg_restore` during the upgrade.

```yaml
postgresql:
  migration:
    ## enable the migration Job (pre-upgrade and post-upgrade hooks)
    enabled: true
    ## specify Storage Class for PVC which will store the backup (by default will use the default SC on your k8s cluster)
    # storageClass: standard
    ## specify PVC size (default size is 8Gi, make sure to adjust the size to the current config `postgresql.persistence.size` value)
    # pvcSize: 8Gi
    ## set Job to use an existing PVC
    existingClaim: ""
    ## set nodeSelector/tolerations/resources for the Job
    nodeSelector: {}
    tolerations: []
    resources: {}
```


### Update configuration for MongoDB chart

From version **1.4.0 and higher**, we have deprecated support for the `Codefresh-managed MongoDB` chart. It has been replaced with Bitnami public chart `bitnami/mongodb`.  
For more information, see [bitnami/mongodb](https://github.com/bitnami/charts/tree/master/bitnami/mongodb){:target="\_blank"}.

> If in `config.yaml`, `mongo.enabled=false`, indicating that you are running an [**external** MongoDB service]({{site.baseurl}}/docs/installation/codefresh-on-prem/#configuring-an-external-mongodb), you can ignore the configuration updates.

> **Important!** Run the upgrade with `global.seedJobs=true` flag:

```yaml
global:
  seedJobs: true
```

#### Manual backup and restore

**Before the upgrade:**  

1. Obtain the MongoDB administrator password:
```shell
NAMESPACE=codefresh
export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)
```
1. Forward the MongoDB service port and place the process in the background:
```shell
kubectl port-forward --namespace $NAMESPACE svc/mongodb 27017:27017 &
```
1. Create a directory for the backup files and make it the current working directory:
```shell
mkdir mongobackup
chmod o+w mongobackup
cd mongobackup
```
1. Back up the contents of all the databases to the current directory using the `monogodump` tool.  
  If this tool is not installed on your system, use [Bitnami's MongoDB Docker image](https://github.com/bitnami/containers/tree/main/bitnami/mongodb){:target="\_blank"} to perform the backup, as shown below:
```shell
docker run --rm --name mongodb-backup -v $(pwd):/app --net="host" bitnami/mongodb:4.2 mongodump --host="host.docker.internal:27017" -u root -p $MONGODB_ROOT_PASSWORD -o /app
```

> The above command is true for Windows and macOS, for Linux users `host.docker.internal` has to be replaced with `127.0.0.1`

Here:  
* The *--net* parameter lets the Docker container use the host's network stack and thereby gain access to the forwarded port.
* The *mongodump* command connects to the MongoDB service and creates backup files in the */app* directory, which is mapped to the current directory (*mongobackup/*) on the Docker host with the *-v* parameter.
* The *--rm* parameter deletes the container after the *mongodump* command completes execution.

**After the upgrade:**

1. Create an environment variable with the password for the new stateful set:
```shell
export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)
```
1. Forward the MongoDB service port for the new stateful set and place the process in the background:
(**Note!** Default service address was changed)
```shell
kubectl port-forward --namespace $NAMESPACE svc/cf-mongodb 27017:27017 &
```
1. Restore the contents of the backup into the new release using the `mongorestore` tool.  
  If this tool is not available on your system, mount the directory containing the backup files as a volume in Bitnami's MongoDB Docker container and use the `mongorestore` client tool in the container image to import the backup into the new cluster, as shown below:
```shell
cd mondgobackup
docker run --rm --name mongodb-backup -v $(pwd):/app --net="host" bitnami/mongodb:4.2 mongorestore --host="host.docker.internal:27017" -u root -p $MONGODB_ROOT_PASSWORD /app
```

> The above command is true for Windows and macOS, for Linux users `host.docker.internal` has to be replaced with `127.0.0.1`

1. Stop the service port forwarding by terminating the background process.
1. Connect to the new stateful set and confirm that your data has been successfully restored:
```shell
kubectl run --namespace $NAMESPACE mongodb-new-client --rm --tty -i --restart='Never' --image docker.io/bitnami/mongodb:4.2 --command -- mongo codefresh --host cf-mongodb --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD --eval "db.accounts.find()"
```

#### Backup and restore via Helm hooks

You can also run MongoDB database migration with `pre-upgrade` and `post-upgrade` helm hooks.

> It's strongly recommended to create a **MANUAL** backup prior to the upgrade!


**To enable backup and restore via Helm hooks:**  
* Set `mongodb.migration.enabled=true` (specify additional parameters if necessary).  
  It will create a k8s Job with PVC and run `mongodump` and `mongorestore` during the upgrade.

```yaml
mongodb:
  migration:
    ## enable the migration Job (pre-upgrade and post-upgrade hooks)
    enabled: true
    ## specify Storage Class for PVC which will store the backup (by default will use the default SC on your k8s cluster)
    # storageClass: standard
    ## specify PVC size (default size is 8Gi, make sure to adjust the size to the current config `mongodb.persistence.size` value)
    # pvcSize: 8Gi
    ## set Job to use an existing PVC
    existingClaim: ""
    ## set nodeSelector/tolerations/resources for the Job
    nodeSelector: {}
    tolerations: []
    resources: {}
```

## Upgrade to 2.0.0
Version 2.0.0 incorporates a major version and chart change, including breaking changes that need you to take actions manually for compatibility.

>**WARNING**:
> The `kcfi`installer has been deprecated from Version 2.0.0 and higher.  
>Helm is the recommended way to install Codefresh On-Premises. The `kcfi config.yaml` is NOT compatible with Helm-based installation. To reuse the same `config.yaml` for the Helm chart, you need to remove deprecated sections, and update configuration for other sections. 

Follow the instructions in [Upgrading to 2.0.0](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#upgrading){:target="\_blank"}.




