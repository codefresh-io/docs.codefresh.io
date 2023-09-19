---
title: "Codefresh on-premises platform installation & configuration"
description: "Install and configure the Codefresh platform on-premises"
group: installation
redirect_from:
  - /docs/administration/codefresh-on-prem/
  - /docs/enterprise/codefresh-on-prem/
  - /docs/installation/codefresh-on-prem/
toc: true
---

To install the on-premises version of the Codefresh platform, look at the [ReadMe](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}, available in ArtifactHub.

After you install Codefresh on-premises, review the platform configuration options described in ArtifactHub:
* [Helm chart configuration](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#helm-chart-configuration){:target="\_blank"}
* [Additional configuration](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#additional-configuration){:target="\_blank"}

This article describes configuration options available in the Codefresh UI: 
* [Disable user and team management](#disable-user-and-team-management-via-codefresh-ui)
* [Selectively enable SSO provider for account](#selectively-enable-sso-provider-for-account)

 
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


## Related articles
[Codefresh on-premises upgrade]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem-upgrade/)   
[Codefresh on-premises setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/)  
[On-premises feature management]({{site.baseurl}}/docs/installation/on-premises/on-prem-feature-management/)  



