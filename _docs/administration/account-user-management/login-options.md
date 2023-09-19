---
title: "Set sign-in options for users"
description: "Select Git/SSO providers available for sign-in"
group: administration
toc: true
---

Control the login mechanisms available for the accounts in your organization. If you have set up integrations with multiple Git providers and SSO providers, select which of the providers are displayed in the Sign-In page for Codefresh users. Among the options, you can also display Codefresh for username-password login if so configured for accounts. 

By default, all login mechanisms are enabled, and users will see all the options in the Sign-In page. 

 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/default-sign-in-accnt-user.png"
  url="/images/installation/on-prem-setup/default-sign-in-accnt-user.png"
  alt="Default Sign-In page with all login options"
  caption="Default Sign-In page with all login options"
  max-width="50%"
    %}

## Set sign-in options for organization
Control the login mechanisms available for all Coderfesh accounts in your organization, from among Git providers, IdPs, SSO providers, and Codefresh for username-password sign-in.

**Before you begin**  
* For SSO or LDAP sign-in, make sure you have set up the corresponding [SSO]({{site.baseurl}}/docs/administration/single-sign-on/) and [LDAP]({{site.baseurl}}/docs/administration/single-sign-on/ldap/) integrations
* For Codefresh sign-in, verify that [User/Pass is enabled for the accounts]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/#quick-reference-account-settings)

<br>

**How to**  
1. From the avatar dropdown in the Codefresh toolbar, select **Admin Management**.
1. From the sidebar, select **Login Options**.
1. If needed, disable one or more login options for the account.

 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/login-options.png"
  url="/images/installation/on-prem-setup/login-options.png"
  alt="Login options for account"
  caption="Login options for account"
  max-width="60%"
    %} 

## Related articles
[Account and user management]({{site.baseurl}}/docs/administration/account-user-management/)  
[Codefresh on-premises setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/)  
