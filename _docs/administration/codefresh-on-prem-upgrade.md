---
title: "Codefresh On-Premises Upgrade"
description: "Use the Kubernetes Codefresh Installer to upgrade the Codefresh On-Premises platform "
group: administration
redirect_from:
  - /docs/enterprise/codefresh-on-prem-upgrade/
toc: true
---
Upgrade the Codefresh on-premises platform to the latest version:
* Prepare for the upgrade: _Before_ the upgrade, based on the version you are upgrading to, complete the required tasks
* Upgrade the platform
* Complete post-upgrade configuration: If needed, also based on the version you are upgrading to, complete the required tasks


###  Upgrade to 1.1.1
Prepare for the upgrade to v1.1.1 by performing the tasks listed below.

#### Maintain backward compatibility for infrastructure services
If you have Codefresh version 1.0.202 or lower installed, and are upgrading to v1.1.1, to retain the existing images for the services listed below, update the `config.yaml` for `kcfi`.

* `cf-mongodb`
* `cf-redis`
* `cf-rabbitmq`
* `cf-postgresql`
* `cf-nats`
* `cf-consul`

> In the `config.yaml`, as in the example below, if needed, replace the `bitnami` prefix with that of your private repo.

```yaml
...

global:
  ### Codefresh App domain name. appUrl is manadatory parameter
  appUrl: onprem.mydomain.com
  appProtocol: https

  mongodbImage: bitnami/mongodb:3.6.13-r0 # (default `mongodbImage: bitnami/mongodb:4.2`)

mongodb:
  image: bitnami/mongodb:3.6.13-r0 # (default `image: bitnami/mongodb:4.2`)
  podSecurityContext:
    enabled: true
    runAsUser: 0
    fsGroup: 0
  containerSecurityContext:
    enabled: false    

redis:
  image: bitnami/redis:3.2.9-r2 # (default `image: bitnami/redis:6.0.16`)
  podSecurityContext:
    enabled: false
  containerSecurityContext:
    enabled: false  

postgresql:
  imageTag: 9.6.2 # (default `imageTag:13`)

nats:
  imageTag: 0.9.4  # (default `imageTag:2.7`)

consul:
  ImageTag: 1.0.0 # (default `imageTag:1.11`)
...
```
### Upgrade to 1.2.0 and higher
This major release **deprecates** the following Codefresh managed charts:
* Ingress
* Rabbitmq
* Redis

See the instructions below for each of the affected charts.

#### Update configuration for Ingress chart 
From version **1.2.0 and higher**, we have deprecated support for `Codefresh-managed-ingress`.  
Kubernetes community public `ingress-nginx` chart replaces `Codefresh-managed-ingress` chart. For more information on the `ingress-nginx`, see [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx){:target="\_blank"}.  

> Parameter locations have changed as the ingress chart name was changed from `ingress` to `ingress-nginx`:  
  **NGINX controller** parameters are now defined under `ingress-nginx`  
  **Ingress object** parameters are now defined under `ingress`

You must update `config.yaml`, if you are using:
* External ingress controllers, including ALB (Application Load Balancer)
* Codefresh-managed ingress controller with _custom_ values

##### Update configuration for external ingress controllers

For external ingress controllers, including ALB (Application Load Balancer), update the relevant sections in `config.yaml` to align with the new name for the ingress chart:

* Replace `ingress` with `ingress-nginx`

*v1.1.1 or lower*
```yaml
ingress: #disables creation of both Nginx controller deployment and Ingress objects
  enabled: false
```

*v1.2.0 or higher*
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

*v1.2.0 or higher*
```yaml
ingress-nginx:
  enabled: false

ingress:
  ingressClassName: my-non-codefresh-nginx
###  `kubernetes.io/ingress.class` annotation is deprecated from kubernetes v1.22+.
#  annotations: 
#    kubernetes.io/ingress.class: my-non-codefresh-nginx  
```

##### Update configuration for Codefresh-managed ingress with custom values

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

#### Update configuration for RabbitMQ chart
From version **1.2.0 and higher**, we have deprecated support for the `Codefresh-managed Rabbitmq` chart. Bitnami public `bitnami/rabbitmq` chart has replaced the `Codefresh-managed rabbitmq`. For more information, see [bitnami/rabbitmq](https://github.com/bitnami/charts/tree/master/bitnami/rabbitmq).
For the complete list of values, see the [values.yaml](https://github.com/bitnami/charts/blob/master/bitnami/rabbitmq/values.yaml){:target="\_blank"}.

> Configuration updates are not required if you are running an external RabbitMQ service.  

> RabbitMQ chart was replaced so as a consequence values structure might be different for some parameters.

**`existingPvc` replaced with `volumePermissions` and `persistence`**

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

*v1.2.0 or higher*
```yaml
rabbitmq:
  volumePermissions:
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

*v1.2.0 or higher*
```yaml
rabbitmq:
  persistence:
    storageClass: my-storage-class
    size: 32Gi
```

#### Update configuration for Redis chart
From version **1.2.0 and higher**, we have deprecated support for the `Codefresh-managed Redis` chart. Bitnami public `bitnami/redis` chart has replaced the `Codefresh-managed Redis` chart. For more information, see [bitnami/redis](https://github.com/bitnami/charts/tree/master/bitnami/redis){:target="\_blank"}.  

Redis storage contains **CRON and Registry** typed triggers so you must migrate existing data from the old deployment to the new stateful set.
This is done by backing up the existing data before upgrade, and then restoring the backed up data after upgrade.

> Configuration updates are not required:  
  * When running an external Redis service.  
  * If CRON and Registy triggers have not been configured.

##### Verify existing Redis data for CRON and Registry triggers
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

##### Back up existing Redis data
Back up the existing data before the upgrade:

* Connect to the pod, run `redis-cli`, export AOF data from old cf-redis-* pod:
  
```shell
NAMESPACE=codefresh
REDIS_PASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
REDIS_POD=$(kubectl get pods -l app=cf-redis -o custom-columns=:metadata.name --no-headers=true)
kubectl cp $REDIS_POD:/bitnami/redis/data/appendonly.aof appendonly.aof -c cf-redis
```

##### Restore backed-up Redis data
Restore the data athe the upgrade:

1. Copy `appendonly.aof` to the new `cf-redis-master-0` pod:  
  
  ```shell
  kubectl cp appendonly.aof cf-redis-master-0:/data/appendonly.aof
  ````
2. Restart `cf-redis-master-0` and `cf-api` pods:  

  ```shell
  kubectl delete pod cf-redis-master-0  
    
  kubectl scale deployment cf-cfapi-base --replicas=0 -n codefresh  
  kubectl scale deployment cf-cfapi-base --replicas=2 -n codefresh 
  ```

> Redis chart was replaced so as a consequence values structure might be different for some parameters.
  For the complete list of values, see [values.yaml charts/values.yaml at master·bitnami/charts](https://github.com/bitnami/charts/blob/master/bitnami/redis/values.yaml){:target="\_blank"}.

**`existingPvc` replaced with `volumePermissions` and `persistence`**

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

*v1.2.0 or higher*
```yaml
rabbitmq:
  volumePermissions:
    enabled: true
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

**`storageClass` and `size` defined under `persistence`**


*v1.1.1 or lower*
```yaml
redis:
  storageClass: my-storage-class
  storageSize: 32Gi
```

*v1.2.0 or higher*
```yaml
redis:
  persistence:
    storageClass: my-storage-class
    size: 32Gi
```

### Upgrade the Codefresh Platform

**Before you begin**  

Based on the version you are upgrading to, make sure you have completed all the tasks detailed in _Preparation for upgrade_  


**How to**  

1. Locate the `config.yml` file you used in the initial installation, and change the release number inside it.
1. Perform a dry run and verify that there are no errors:  
  `kcfi upgrade --dry-run --atomic -c codefresh/config.yaml`
1. Run the actual upgrade:  
  `kcfi upgrade --atomic -c codefresh/config.yaml`
1. Verify that all the pods are are in `running` state:
  `watch kubectl -ncodefresh get pods`  
1. Log in to the Codefresh UI, and check the new version.
1. If needed, enable/disable new feature flags.

>When upgrading to v1.2.2, and Redis data is backed up, you must restore the data after completing the upgrade. 



