---
title: "Codefresh on-premises platform installation & configuration"
description: "Configure the Codefresh platform after on-premises installation"
group: installation
redirect_from:
  - /docs/administration/codefresh-on-prem/
  - /docs/enterprise/codefresh-on-prem/
  - /docs/installation/codefresh-on-prem/
toc: true
---

To install the on-premises version of the Codefresh platform, look at the [ReadMe](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13){:target="\_blank"}, available in ArtifactHub.

After you install Codefresh on-premises, review platform configuration options:
* [Disable user and team management via Codefresh UI](#disable-user-and-team-management-via-codefresh-ui)
* [Selectively enable SSO provider for account](#selectively-enable-sso-provider-for-account)
<!--- * [Retention policy for Codefresh builds](#retention-policy-for-codefresh-builds)-->

 

## Disable user and team management via Codefresh UI

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

When [SSO sign-in]({{site.baseurl}}/docs/single-sign-on/single-sign-on/) is configured, as a Codefresh administrator, you can select the providers you want to enable for SSO in your organization, for both new and existing accounts.  
SSO providers that are disabled are not displayed during sign-up/sign-in.

>You can always renable an SSO provider that you disabled when needed.


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

<!---

## Retention policy for Codefresh builds
Define a retention policy to manage Codefresh builds. The retention settings are controlled through `cf-api` deployment environment variables, all of which have default settings which you can retain or customize. 

There are two mechanisms to define the retention policy, both of which are implemented as Cron jobs.
1. Legacy retention mechanism: Allows you to delete builds in chunks, and also, optionally, delete offline logs from the database. 
1. New retention mechanism: Allows you delete builds by days, without deleting offline logs.

<br>


### Configure retention policy for builds and logs
With this method, Codefresh by default deletes builds older than six months, including offline logs for these builds.

The retention mechanism, implemented as a Cron Job, removes data from collections such as:
* `workflowproccesses`
* `workflowrequests`
* `workflowrevisions`

{: .table .table-bordered .table-hover}
| Env Variable   | Description             | Default                |
|---------------|--------------------------- |----------------------  |
|`RETENTION_POLICY_IS_ENABLED` | Determines if automatic build deletion through the Cron job is enabled.         | `true`                 |
|`RETENTION_POLICY_BUILDS_TO_DELETE`| The maximum number of builds to delete by a single Cron job. To avoid database issues, especially when there are large numbers of old builds, we recommend deleting them in small chunks. You can gradually increase the number after verifying that performance is not affected.  | `50`                  |
|`RETENTION_POLICY_DAYS`         | The number of days for which to retain builds. Builds older than the defined retention period are deleted.                                  | `180`              |
|`RUNTIME_MONGO_URI`             | Optional. The URI of the Mongo database from which to remove MongoDB logs (in addition to the builds). |              |

<br>

### Configure TTL-based retention policy for builds

The TTL-based retention mechanism is implemented as a Cron job, and deletes data from the `workflowprocesses` collection. Build logs are not deleted.

>**IMPORTANT**:  
  > * For existing environments, for the retention mechanism to work, you must first drop the index in MongoDB. This requires a maintenance window that depends on the number of builds to be deleted, approximately three hours per MongoDB node.
  >* If you have more than one `cf-api`, you must update the configuration for all of them.

{: .table .table-bordered .table-hover}
| Env Variable   | Description             | Default                |
|---------------|--------------------------- |----------------------  |
|`TTL_RETENTION_POLICY_IS_ENABLED` | Determines if automatic build deletion through the Cron job is enabled.         | `false`                 |
|`TTL_RETENTION_POLICY_IN_DAYS`    | The number of days for which to retain builds, and can be between `30` (minimum) and `365` (maximum). Builds older than the defined retention period are deleted.  | `365`              |



1. (Optional) For existing environments: 
    1. In MongoDB, drop the index on `created` field in `workflowprocesses` collection.
1. In `cf-api`, add to `env`:
    1. `TTL_RETENTION_POLICY_IS_ENABLED` set to `true`.
    1. `TTL_RETENTION_POLICY_IN_DAYS`.
1. Verify that the `created` field in the `workflowprocesses` collection has a new index.   
1. Restart `cf-api`.

-->





## Related articles
[Codefresh on-premises upgrade]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem-upgrade/)   
[Codefresh on-premises feature management]({{site.baseurl}}/docs/installation/on-premises/on-prem-feature-management/)  



