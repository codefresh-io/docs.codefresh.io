---
title: "Google SSO via OIDC"
description: "Set up Google SSO for OIDC"
group: single-sign-on
sub_group: oidc
redirect_from:
  - /docs/single-sign-on/oidc/oidc-google/
  - /docs/enterprise/sso-google/
  - /docs/enterprise/single-sign-on/sso-google/
  - /docs/administration/single-sign-on/sso-google/

toc: true
---

Set up SSO for Google using OIDC.
For a general overview on OIDC, see [Setting up OIDC Federated SSO]({{site.baseurl}}/docs/single-sign-on/oidc).

Set up OIDC SSO for Google in Codefresh by:
1. Creating the client secret in Google
1. Configuring team synchronization settings in Google
1. Configuring SSO settings for Google in Codefresh
1. Setting up the redirect URI in Google


## Step 1: Create Client Secret in Google

1. Log in to [https://console.developers.google.com/](https://console.developers.google.com/){:target="\_blank"}.
1. From the sidebar, select **Credentials**.
1. Select **Create Credentials**, and from the drop-down, select **OAuth client ID**.
1. Do the following:
    * From the **Application type** drop-down, select **Web application**. 
    * Enter a **Name** for your integration (user-defined).  
    * For **Authorized JavaScript origins**, **URIs**, enter, `https://g.codefresh.io`.   
    
    {% include image.html 
       lightbox="true" 
       file="/images/sso/google/googleSSO.png" 
       url="/images/sso/google/googleSSO.png"
       alt="Creating an OAuth client"
       caption="Creating an OAuth client"
       max-width="70%"
       %}
    
    * Select **Create**. 
    * From the OAUth client created dialog, note down **Your Client ID** and **Your Client Secret**. 

   {% include image.html 
       lightbox="true" 
       file="/images/sso/google/googleSSO2.png" 
       url="/images/sso/google/googleSSO2.png"
       alt="Getting the Client ID and secret"
       caption="Getting the Client ID and secret"
       max-width="70%"
       %}

  You will need the Client ID and secret to configure SSO for Google in Codefresh.

{:start="5"}
1. Continue with [Step 2: Configure team synchronization settings in Google](#step-2-configure-team-synchronization-settings-in-google).

## Step 2: Configure team synchronization settings in Google
When you configure SSO settings for Google OIDC in Codefresh, you can sync teams through a:  
* Service account
OR  
* Custom schema  
For both sync methods, you must configure settings in Google.

### Create service account in Google Console to synchronize teams

To synchronize users and teams through a service account, create a service account in Google, and [delegate user and group permissions](https://developers.google.com/admin-sdk/directory/v1/guides/delegation){:target="\_blank"} for it.



1. Create a service account in Google Console:

 {% include image.html 
  lightbox="true" 
  file="/images/sso/google/serviceAccount2.png" 
  url="/images/sso/google/serviceAccount2.png"
  alt="Creating a service account in Google"
  caption="Creating a service account in Google"
  max-width="30%"
  %}

{:start=2"}
1. Delegate from the Google admin console the following permissions:
  * `https://www.googleapis.com/auth/admin.directory.user.readonly`
  * `https://www.googleapis.com/auth/admin.directory.group.readonly`

{:start="3"}
1. For that service account, create a private key in JSON format.
    
  {% include image.html 
     lightbox="true" 
     file="/images/sso/google/serviceAccount3.png" 
     url="/images/sso/google/serviceAccount3.png"
     alt="Creating a JSON key"
     caption="Creating a JSON key"
    max-width="30%"
  %}

{:start="4"}
1. Save the JSON file locally. You will need the JSON key file when you configure SSO settings for Google OIDC in Codefresh. 
1. Continue with [Step 3: Configure SSO settings for Google in Codefresh](#step-3-configure-sso-settings-for-google-in-codefresh).

### Create custom schema 

Use this method to sync only those users who have been assigned the user role with the custom schema.

1. Navigate to the [Google Directory API](https://developers.google.com/admin-sdk/directory/v1/reference/schemas/insert?authuser=1).
1. Add the following schema:

    ```json
    {  
      "schemaName": "SSO",  
      "displayName": "SSO",  
      "fields": [  
        {  
          "fieldType": "STRING",  
          "fieldName": "UserRole",  
          "displayName": "UserRole",  
          "multiValued": true,  
          "readAccessType": "ADMINS_AND_SELF"  
        }  
     ]
    }
    ```

{:start="3"}
1. In the GSuite Admin panel, go to **Apps > SAML**.

    {% include image.html
    lightbox="true"
    file="/images/sso/google/google-gsuite-admin.png"
    url="/images/sso/google/google-gsuite-admin.png"
    alt="SAML apps in GSuite Admin panel"
    caption="SAML apps in GSuite Admin panel"
    max-width="60%"
    %}

{:start="4"}
1. Expand the Attribute Mapping settings, and add a Role attribute with the above schema for `SSO` and `UserRole`.

  {% include image.html
lightbox="true"
file="/images/sso/google/map-attributes.png"
url="/images/sso/google/map-attributes.png"
alt="Attribute Mappings screen in GSuite"
caption="Attribute Mappings screen in GSuite"
max-width="40%"
%}

{:start="5"}
1. For every user to be synced, in the User Information screen, scroll to `SSO > UserRole`, and assign the user role.

  {% include image.html
lightbox="true"
file="/images/sso/google/google-gusite-user-info.png"
url="/images/sso/google/google-gusite-user-info.png"
alt="User Information screen in GSuite"
caption="User Information screen in GSuite"
max-width="40%"
%}

{:start="6"}
1. Continue with [Step 3: Configure SSO settings for Google in Codefresh](#step-3-configure-sso-settings-for-google-in-codefresh).

## Step 3: Configure SSO settings for Google in Codefresh




**Before you begin**  
* Make sure you have:
  * The **Client ID** and **Client Secret** from Google in Step 1
  * Created the service account or the custom schema in Google for user synchronization

**How to**  

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. In the sidebar, from Access & Collaboration, select [Single Sign-On](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.
1. Select **+ Add Single Sign-On**, **Google**, and then **Next**.


 {% include image.html 
 lightbox="true" 
 file="/images/sso/google/sso-codefresh-settings.png" 
  url="/images/sso/google/sso-codefresh-settings.png"
  alt="SSO settings for Google in Codefresh"
  caption="SSO settings for Google in Codefresh"
  max-width="30%"
  %}

{:start="4"}
1. Enter the following: 
  * **Client Name**: For auto-generation, leave empty. Codefresh generates the client name once you save the settings.  
  * **Display Name**: Meaningful name that identifies the SSO provider.
  * **Client ID**: The Client ID generated by Google.  
  * **Client Secret**: The Client Secret also generated by Google. 
  * **JSON Keyfile**: Relevant for service-account synchronization only. Paste the content of the JSON file you saved locally.
  * **Admin email**: Relevant for service-account synchronization only. Enter the email of the user `admin.google.com`.
  * **Sync field**: Relevant for custom schema-based synchronization only. Enter the value set for `schemaName`.

{:start="5"}
1. Select **Save**. Codefresh generates the Client Name. 

  {% include image.html 
  lightbox="true" 
  file="/images/sso/google/autogenerated-name.png" 
  url="/images/sso/google/autogenerated-name.png"
  alt="Getting the auto-generated Client Name"
  caption="Getting the auto-generated Client Name"
  max-width="90%"
  %}

{:start="5"}
1. Note down the Client Name, as you need it to set the redirect URI in Google.
1. Continue with [Step 4: Set up Redirect URI in Google](#step-4-set-up-redirect-uri-in-google).

### Step 4: Set up Redirect URI in Google
1. Go back to the Google Console Developer dashboard, and click the edit button on the OAuth 2.0 Client IDs that you created before.
1. For **Authorized Redirect URIs**, in the **URIs** field, enter the Client Name you noted down to generate the **Authorized Redirect URIs**:
  * Example Client Name: `t0nlUJoqQlDv`
  * Example Redirect URI: `https://g.codefresh.io/api/auth/t0nlUJoqQlDv/callback`
  
   {% include image.html 
  lightbox="true" 
  file="/images/sso/google/googleSSO3.png" 
  url="/images/sso/google/googleSSO3.png"
  alt="Redirect URI"
  caption="Redirect URI"
  max-width="30%"
  %}

You have now completed SSO setup for Google via OIDC.



## Test SSO Connection

Now test the SSO with a test user in a different browser or private/incognito browser to make sure the integration works as it should.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From the sidebar, below Access & Collaboration, select [**Users & Teams**](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.   
1. Locate a test user, and from the SSO list, select the integration name to enable SSO for that user.
1. In a different browser or private/incognito browser window use the Corporate option to log in.

## Related articles
[Federated Single Sign-On (SSO) overview]({{site.baseurl}}/docs/single-sign-on/)  
[Setting up OIDC Federated SSO]({{site.baseurl}}/docs/single-sign-on/oidc)  
[Common configuration for SSO providers]({{site.baseurl}}/docs/single-sign-on/team-sync)  