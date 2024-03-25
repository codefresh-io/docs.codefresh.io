---
title: "Codefresh on-premises platform installation & configuration"
description: "Install and configure the Codefresh platform on-premises"
group: installation
redirect_from:
  - /docs/administration/codefresh-on-prem/
  - /docs/enterprise/codefresh-on-prem/
  - /docs/installation/codefresh-on-prem/
  - /docs/installation/on-premises/codefresh-on-prem/
toc: true
---

To install the on-premises version of the Codefresh platform, review the [ReadMe](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}, available in ArtifactHub.  
To turn on High Availability (HA), see [On-premises High-Availability configuration guidelines](#on-premises-high-availability-guidelines). 

After you install Codefresh on-premises, review the platform configuration options described in ArtifactHub:
* [Helm chart configuration](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#helm-chart-configuration){:target="\_blank"}
* [Additional configuration](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#additional-configuration){:target="\_blank"}

This article describes configuration options available in the Codefresh UI: 
* [Disable user and team management](#disable-user-and-team-management-via-codefresh-ui)
* [Selectively enable SSO provider for account](#selectively-enable-sso-provider-for-account)


## On-premises High-Availability configuration 

Codefresh supports HA (High Availability) for infrastructure services, depending on how they are configured to run:
* As in-cluster K8s (Kubernetes) workloads using Codefresh subcharts
* Externally through a different cloud provider

### HA for in-cluster workloads
In this scenario, the [High Availability section in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#high-availability){:target="\_blank"} provides examples to configure infrastructure services for HA.


##### Examples of HA configurations
* **MongoDB**  
  Configure `bitnami/mongodb` chart in `replicaset` mode instead of standalone.

```yaml
...
mongodb:
  architecture: replicaset
  replicaCount: 3
  externalAccess:
    enabled: true
    service:
      type: ClusterIP
...
```

* **PostgresSQL**  
  Use `bitnami/postgresql-ha` instead of `bitnami/postgresql`.

```yaml
...
postgresql:  
  enabled: false   ## non-HA 

postgresql-ha:
  enabled: true
  volumePermissions:  
    enabled: true  ## HA
...
```

* **RabbitMQ**  
  Scale up the number of replicas  with `bitnami/rabbitmq-ha`.

```yaml
...
rabbitmq:
  enabled: true
  replicaCount: 3
...
```

* **Redis**  
  Use the `redis-ha` chart instead of `bitnami/redis`.

```yaml
...
redis:
  enabled: false

redis-ha:
  enabled: true
...
```
##### Update chart values
When you change charts for HA, you must update the corresponding values in the `global` section of `values.yaml` to match the configurations of the new charts or services you're deploying. 

Here's an example of the `global` settings in `values.yaml`:

```yaml
global:
  postgresService: postgresql-ha-pgpool
  mongodbHost: cf-mongodb-0,cf-mongodb-1,cf-mongodb-2  # Replace `cf` with your Helm Release name
  mongodbOptions: replicaSet=rs0&retryWrites=true
  redisUrl: cf-redis-ha-haproxy
```

### HA with external cloud providers

For infrastructure services running externally with a different cloud provider, refer to provider-specific documentation for HA configuration details.

Here are a few links you may find helpful:
* Mongodb: [Creating a cluster as a replica set](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/){:target="\_blank"}
* PostgresSQL: [Creating an Amazon Aurora DB cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.CreateInstance.html){:target="\_blank"}
* Rabbitmq: [Creating and connecting to a RabbitMQ broker](https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/getting-started-rabbitmq.html){:target="\_blank"}

## Disable user and team management

If you use an external provider, such as Terraform or an IdP (Identity Provider), to provision users and teams, you can disable user/team operations in the Codefresh UI. Blocking user- and team-related operations in the UI means that admins cannot make changes locally that may conflict with or override those via the external provider.

These are the operations blocked in the Codefresh UI:
* Adding/updating/deleting users
* Adding/updating/deleting teams
* Defining/updating roles for users
* Defining/updating SSO provider for users  

**How to**  
* Enable `disableUserManagement` in Feature management.

## Selectively enable SSO provider for account
Codefresh supports out-of-the-box Git logins with your local username and password, your Git provider, or your SSO provider if SSO is configured.

When [SSO sign-in]({{site.baseurl}}/docs/administration/single-sign-on/) is configured, as a Codefresh administrator, you can select the providers you want to enable for SSO in your organization, for both new and existing accounts.  
SSO providers who are disabled are not displayed during sign-up/sign-in.

{{site.data.callout.callout_tip}}
**TIP**  
You can always renable an SSO provider that you disabled when needed.
{{site.data.callout.end}}

1. Sign in as Codefresh admin.
1. From the left pane, select **Providers**.
1. Disable the providers not relevant for the accounts.
These providers are not displayed as options during sign-up/sign-in.
<!--- change screenshot  -->
{% include image.html
  lightbox="true"
  file="/images/administration/sso/enable-disable-providers.png"
  url="/images/administration/sso/enable-disable-providers.png"
  alt="Enable/disable providers for SSO"
  caption="Enable/disable providers for SSO"
  max-width="60%"
%}


## Related articles
[Codefresh on-premises upgrade]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem-upgrade/)   
[Codefresh on-premises account & user setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/)  
[Codefresh on-premises feature management]({{site.baseurl}}/docs/installation/on-premises/on-prem-feature-management/)  



