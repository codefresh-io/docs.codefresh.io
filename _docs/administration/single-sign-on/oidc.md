---
title: "Setting up OIDC Federated SSO"
description: "OpenID Connect (OIDC) Single Sign-On (SSO) setup"
redirect_from:
  - /docs/single-sign-on/oidc/
toc: true
---

Codefresh natively supports login with GitHub, Bitbucket and GitLab, using the OpenID Connect (OIDC) protocol. 
  

## Prerequisites

To successfully add an identity provider (IdP) in Codefresh, you need to do some preparatory work with both Codefresh and the provider:

1. Inform your IdP that it will provide SSO services to Codefresh
1. Set up Codefresh and point it to your IdP.

The first procedure differs according to your IdP, but the second one is common to all providers.

<!---
>**NOTE**  
  SSO is only available to Enterprise customers. Please [contact sales](https://codefresh.io/contact-sales/){:target="\_blank"} in order to enable it for your Codefresh account.
-->
## OIDC SSO configuration in Codefresh 

Here's what you need to do to configure SSO via OIDC in Codefresh:

1. Configure SSO settings for the IdP:  
  This generally includes defining settings both in Codefresh and in the IdP.  
  Codefresh supports OIDC SSO for the following:
  * [Auth0]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-auth0/)
  * [Azure]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-azure/)
  * [Google]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-google/)
  * [Keycloak]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-keycloak/)
  * [Okta]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-okta/)
  * [OneLogin]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-onelogin/)

1. Test integration with the IdP: 
    
    {{site.data.callout.callout_tip}}
    **TIP**  
      Before enabling SSO for users, you **MUST** make sure that it is working for the test user.  
      When SSO is enabled for a user, Codefresh allows login only through the SSO and blocks logins through other IdPs. If the selected SSO method does not work for some reason, the user is locked out of the platform.
    {{site.data.callout.end}}

    1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
    1. From the sidebar, select **Users & Teams**.   
    1. Add an active user to be used for testing. We recommend you use your own user.
    1. From the **SSO** dropdown, select the provider you want to test.
    1. Keep the current browser session open, and log in via Corporate SSO in an incognito tab or from another browser.

    {% include image.html
    lightbox="true"
    file="/images/administration/sso/sign-with-sso.png"
    url="/images/administration/sso/sign-with-sso.png"
    alt="Sign-in with SSO"
    caption="Sign-in with SSO"
    max-width="50%"
    %}

{:start="3"}
1. (Optional) [Set a default SSO provider for account]({{site.baseurl}}/docs/administration/single-sign-on/team-sync/#set-a-default-sso-provider-for-account)   
  You can select an IdP as the default SSO provider for a Codefresh account. This means that all the new users added to that account will automatically use the selected IdP for signin.
1. (Optional) [Select SSO method for individual users]({{site.baseurl}}/docs/administration/single-sign-on/team-sync/#select-sso-method-for-individual-users)   
  You can also select if needed, a different SSO provider for specific users.

{{site.data.callout.callout_tip}}
**TIP**  
Codefresh has an internal cache for SSO configuration, and it can take up to five minutes for your changes to take effect.
{{site.data.callout.end}}

## Related articles
[About Federated Single Sign-On (SSO)]({{site.baseurl}}/docs/administration/single-sign-on/)   
[Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/)  

