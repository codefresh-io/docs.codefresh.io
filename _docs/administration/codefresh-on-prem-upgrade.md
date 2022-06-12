---
title: "Codefresh On-Premises Upgrade"
description: "Use the Kubernetes Codefresh Installer to upgrade the Codefresh On-Premises platform "
group: administration
redirect_from:
  - /docs/enterprise/codefresh-on-prem-upgrade/
toc: true
---
Upgrade the Codefresh on-premises platform to the latest version.  
Prepare for the upgrade by completing the required tasks, upgrade the platform, and then complete post-upgrade configuration if needed.

## Preparation for upgrade
_Before_ the upgrade, do the following:
* Maintain backward compatibility for infrastructure services
* Update `config.yaml` for the following Codefresh managed charts that have been deprecated from version 1.2.0 or higher:
  * Ingress 
  * Rabbitmq 
  * Redis 

###  Maintain backward compatibility for infrastructure services
If you have Codefresh version 1.0.202 or lower installed, and are upgrading to version **1.1.1 or higher**, to retain the existing images for the services listed below, _before upgrade_, update the `config.yaml` for `kcfi`.

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
### Update configuration for ingress chart 
From version 1.2.1 and higher, we have deprecated support for `Codfresh-managed-ingress`.  
Public `ingress-nginx` replaces `Codfresh-managed-ingress`. For more information on the public ingress, see [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx){:target="\_blank"}.  

You must update the configuration of the ingress chart, if you are using:
* Codefresh-managed ingress controller with _custom_ values
* Other ingress controllers, including ALB (AWS Load Balancer Controller)


> Parameter locations have changed as the ingress chart name was changed from `ingress` to `ingress-nginx`:  
  NGINX controller parameters are now defined under `ingress-nginx`  
  Ingress object parameters are now defined under `ingress`
  

#### Update configuration for Codefresh-managed ingress with custom values
Refer to `values.yaml` from the official repo for the values. If needed, update the `ingress-nginx` section in `kcfi  config.yaml`. The example below shows the default values for `ingress-nginx`: 

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


#### Update configuration for other ingress controllers
For other ingress controllers, including AWS Load Balancer Controller, update the relevant sections in`config.yaml` to align with the new name for the ingress chart:
* Replace `ingress` with `ingress-nginx`
* Replace `annotations` that have been deprecated with `ingressClassName`

**Replace `ingress` with `ingress-nginx`**  

{% include image.html
lightbox="true"
file="/images/administration/onpremises/upgrade-ingress-deprecation1.png"
url="/images/administration/onpremises/upgrade-ingress-deprecation1.png"
alt="Ingress controller configuration updates: `ingress` with `ingress-nginx`"
caption="Ingress controller configuration updates: ingress` with `ingress-nginx`"
max-width="80%"
%}



**Replace `annotations` with `ingressClassName`**

{% include image.html
lightbox="true"
file="/images/administration/onpremises/upgrade-ingress-deprecation2.png"
url="/images/administration/onpremises/upgrade-ingress-deprecation2.png"
alt="Ingress controller configuration updates: `annotations` with `ingressClassName`"
caption="Ingress controller configuration updates: `annotations` with `ingressClassName`"
max-width="80%"
%}

 
### Update configuration for Codefresh-managed rabbitmq chart
From version, V1.2.1 and higher, we have deprecated support for the `Codefresh-managed rabbitmq` chart. The official `rabbitmq` chart has replaced the `Codefresh-managed rabbitmq`. For the complete list of values, see the [official values.yaml](https://github.com/bitnami/charts/blob/master/bitnami/rabbitmq/values.yaml){:target="\_blank"}.

> If you are running an external RabbitMQ service, no configuration update is required, and you can proceed directly with the upgrade. 

**`existingPvc` replaced with `volumePermissions` and `persistence`**

{% include image.html
lightbox="true"
file="/images/administration/onpremises/upgrade-rabbit-deprecation1.png"
url="/images/administration/onpremises/upgrade-rabbit-deprecation1.png"
alt="Rabbitmq configuration updates: `existingPvc` replaced with `volumePermissions` and `persistence`"
caption="Rabbitmq configuration updates: `existingPvc` replaced with `volumePermissions` and `persistence`"
max-width="80%"
%}

**`storageClass` and `size` defined under `persistence`**

{% include image.html
lightbox="true"
file="/images/administration/onpremises/upgrade-rabbit-deprecation2.png"
url="/images/administration/onpremises/upgrade-rabbit-deprecation2.png"
alt="Rabbitmq configuration updates: `storageClass` and `size` defined under `persistence`"
caption="Rabbitmq configuration updates: `storageClass` and `size` defined under `persistence`"
max-width="80%"
%}


### Update configuration for Codefresh-managed redis chart
From version, V1.2.1 and higher, we have deprecated support for the `Codefresh-managed Redis` chart. The public Bitnami Redis chart has replaced the `Codefresh-managed Redis` chart. For more information, see [Publich bitnami/charts](https://github.com/bitnami/charts/tree/master/bitnami/redis){:target="\_blank"}.  

If you have CRON and Registry triggers as part of your Redis data, to retain these triggers, you must migrate existing data from the old deployment to the new stateful set.
This is done by backing up the existing data before upgrade, and then restoring the backed up data after upgrade.

> If you are running an external Redis service, no configuration update is required. 



#### Verify existing Redis data for CRON and Registry triggers
Check if you have CRON and Registry triggers in your Redis data.

1. Run `codefresh get triggers`  
  OR   
  Access the K8s cluster where Codefresh is installed.  
  Results indicate that you have CRON and Registry triggers installed.
1. Continue with _Back up existing Redis data_.

```
NAMESPACE=codefresh
REDIS_PASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
  
kubectl exec -it deploy/cf-redis -- env REDIS_PASSWORD=$REDIS_PASSWORD bash
#once inside cf-redis pod
REDISCLI_AUTH="$REDIS_PASSWORD" redis-cli
info keyspace # list db 
select 15 # select db 15
keys * #show keys
```


#### Back up existing Redis data
Before the upgrade, back up the existing data.

1. Connect to the pod.
1. Start the Redis CLI tool. 
1. Export AOF data from old cf-redis-* pod:
  
```
NAMESPACE=codefresh
REDIS_PASSWORD=$(kubectl get secret --namespace $NAMESPACE cf-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
REDIS_POD=$(kubectl get pods -l app=cf-redis -o custom-columns=:metadata.name --no-headers=true)
kubectl cp $REDIS_POD:/bitnami/redis/data/appendonly.aof appendonly.aof -c cf-redis
```


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

> Locations of parameters may have changed because of the structure of the new Redis chart.  
  For the complete list of values, see [values.yaml charts/values.yaml at master·bitnami/charts](https://github.com/bitnami/charts/blob/master/bitnami/redis/values.yaml){:target="\_blank"}.

**`existingPvc` replaced with `volumePermissions` and `persistence`**

{% include image.html
lightbox="true"
file="/images/administration/onpremises/upgrade-rabbit-deprecation1.png"
url="/images/administration/onpremises/upgrade-rabbit-deprecation1.png"
alt="Redis configuration updates: Replace `existingPvc` with `volumePermissions` and `persistence`"
caption="Redis configuration updates: Replace `existingPvc` with `volumePermissions` and `persistence`"
max-width="80%"
%}

**`storageClass` and `size` defined under `persistence`**

{% include image.html
lightbox="true"
file="/images/administration/onpremises/upgrade-redis-deprecation2.png"
url="/images/administration/onpremises/upgrade-redis-deprecation2.png"
alt="Redis configuration updates: `storageClass` and `size` under `persistence`"
caption="Rabbitmq configuration updates: `storageClass` and `size` under `persistence`"
max-width="80%"
%}

