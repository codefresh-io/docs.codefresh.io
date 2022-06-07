---
title: "Codefresh On-Premises Upgrade"
description: "Use the Kubernetes Codefresh Installer to upgrade the Codefresh On-Premises platform "
group: administration
redirect_from:
  - /docs/enterprise/codefresh-on-prem-upgrade/
toc: true
---
Upgrade the Codefresh on-premises platform to the latest version. Prepare for the upgrade by completing the required tasks, upgrade the platform, and then complete post-upgrade configuration if needed.

## Preparation for upgrade
There are several tasks to perform _before_ the upgrade:
* Ensure backward compatibility for infrastructure services
* Update `config.yaml` for the following Codefresh managed charts/services that have been deprecated from version 1.2.0 or higher:
  * Ingress chart
  * Rabbitmq chart
  * Redis chart

###  Backward compatibility for infrastructure services
If you already have Codefresh version 1.0.202 or lower installed, and are upgrading to version **1.1.1 or higher**, _before upgrade, to retain the existing images_ for the services listed below, update the `config.yaml` for `kcfi`.

* `cf-mongodb`
* `cf-redis`
* `cf-rabbitmq`
* `cf-postgresql`
* `cf-nats`
* `cf-consul`

> In the `config.yaml` below, if needed, replace the `bitnami` prefix with that of your private repo.

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
### Codefresh-managed ingress chart deprecation
From version, V1.2.1 and higher, we have deprecated support for `Codfresh-managed-ingress`. Public `ingress-nginx` replaces `Codfresh-managed-ingress`. For more information, see [kubernetes/ingress-nginx](kubernetes/ingress-nginx){:target="\_blank"}.

> The ingress chart name was changed from `ingress` to `ingress-nginx`. Values for NGINX controller are defined under `ingress-nginx` and values for ingress object are defined under `ingress`.

Depending on your ingress-controller, update the configuration:
* Default CF-managed ingress controller with custom values
* Other ingress controllers, including ALB


#### Default CF-managed ingress controller with custom values
Refer to the values.yaml file for 

1. Go to `config.yaml`. 


#### Other ingress controllers, including ALB 
Update the relevant sections to align with the new name for the ingress chart. Annotations have been deprecated. If defined, replace them with `ingressClassName`. 

**V1.1.1 or earlier**  
```yaml
ingress: #disables creation of both Nginx controller deployment and Ingress objects
  enabled: false
  annotations: 
    kubernetes.io/ingress.class: my-non-codefresh-nginx
```

**V1.2.0 or later***

```yaml
ingress-nginx: #disables creation of Nginx controller deployment
  enabled: false

ingress: #disables creation of Ingress objects (assuming you've manually created ingress resource before)
  enabled: false
  ingressClassName: my-non-codefresh-nginx
  ###  `kubernetes.io/ingress.class` annotation is deprecated from kubernetes v1.22+.
#  annotations: 
#    kubernetes.io/ingress.class: my-non-codefresh-nginx  
```
### Codefresh-managed rabbitmq chart deprecation
From version, V1.2.1 and higher, we have deprecated support for `Codefresh-managed rabbitmq`. The official `rabbitmq` chart has replaced the `Codefresh-managed rabbitmq`. For the complete list of values, see the [official values.yaml](https://github.com/bitnami/charts/blob/master/bitnami/rabbitmq/values.yaml){:target="\_blank"}.

> If you are running an external RabbitMQ service, the deprecation is not relevant. 

**Example `config.yaml` for 1.1.1 or earlier**

```yaml
rabbitmq:
  existingPvc: my-rabbitmq-pvc
  nodeSelector:
    foo: bar
  resources:
    limits:
      ...
    requests:
      ...
  tolerations:
  storageClass: my-storage-class
  storageSize: 32Gi
     ...
```

**Example `config.yaml` for 1.2.0 or higher**

```yaml
rabbitmq:
  volumePermissions:
    enabled: true
  persistence:
    existingClaim: my-rabbitmq-pvc
    storageClass: my-storage-class
    size: 32Gi
  nodeSelector:
    foo: bar
  resources:
    ...
  tolerations:
    ...
```

### Codefresh-managed redis chart deprecation
From version, V1.2.1 and higher, we have deprecated support for `Codefresh-managed Redis` chart. The public Bitnami Redis chart has replaced the `Codefresh-managed Redis` chart. For more information, see [Publich bitnami/charts](https://github.com/bitnami/charts/tree/master/bitnami/redis){:target="\_blank"}.

> If you are running an external Redis service, the deprecation is not relevant. 

Because Redis storage contains CRON and Registry type triggers, existing data must be migrated from the old deployment to the new stateful set.

### Verify CRON and Registry triggers




### Migrate previous Redis
Before the upgrade, back up the existing data.

1. Connect to the pod.
1. Start the Redis CLI tool. 
1. Export AOF data from old cf-redis-* pod:
  `NAMESPACE=codefresh`
  `REDIS_PASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-redis -o jsonpath="{.data.redis-password}" | base64 --decode)`
  `REDIS_POD=$(kubectl get pods -l app=cf-redis -o custom-columns=:metadata.name --no-headers=true)`
  `kubectl cp $REDIS_POD:/bitnami/redis/data/appendonly.aof appendonly.aof -c cf-redis`

## Upgrade the Codefresh Platform

> Important: For Codefresh upgrades, use only `kfci`. If you still have a `cf-onprem` script at hand, please contact us for migration instructions.
**Before you begin**
Make sure you have completed all the tasks detailed in _Preparation for upgrade_

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

## Post-upgrade configuration
After the upgrade is successfully completed, if you have Codefresh-managed Redis, you must restore the data you backed up.

1. Copy `appendonly.aof` to the new `cf-redis-master-0 pod`:
  `kubectl cp appendonly.aof cf-redis-master-0:/data/appendonly.aof`
1. Restart the pods, `cf-redis-master-0` and `cf-api`: 
  `kubectl delete pod cf-redis-master-0`  
    
  `kubectl scale deployment cf-cfapi-base --replicas=0 -n codefresh`  
  `kubectl scale deployment cf-cfapi-base --replicas=2 -n codefresh`

For a 

