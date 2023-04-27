---
title: "How-to: Trigger Codefresh pipeline from Datadog webhook"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [API, Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

You want to trigger the Codefresh pipeline from a Datadog alert.

## Details

1. Open the [Webhook integration management](https://app.datadoghq.com/account/settings#integrations/webhooks) page in Datadog:

    ![datadog]({{site.baseurl}}/images/troubleshooting/datadog.png)

    From here you will first need to add a variable with your Codefresh user API key ( you can generate one here: [User settings](https://g.codefresh.io/user/settings))
2. Next, click the 'New' button in the Webhook section and fill in the required fields:
   * **Name** - The Webhook name
   * **URL** - The Run Pipeline API endpoint, example:
      `https://g.codefresh.io/api/pipelines/run/<Project_Name>%2F<Pipeline_name>`
      > **Note** : the '/' symbol in the pipeline name should be URL-encoded as '%2F'
   * **Payload** - The parameters and options, for example:

      ```json
      {  
      "branch": "main",  
      "variables": {"foo": "bar"},  
      "options": {  
        "noCache": true,  
        "noCfCache": true,  
        "resetVolume": true,  
        "enableNotifications": true  
        }  
      }
      ```

      > The complete API call description is here: [Codefresh-run](https://g.codefresh.io/api/#operation/pipelines-run-yaml)

   * **Custom headers** - this will be used for Authentication. The headers in Datadog are accepted in JSON format only, for example:

      ```json
      {"Authorization": "$APIKEY"}
      ```

      The APIKEY is a variable name containing the Codefresh API key you createdcearlier.

3. Click **Save** to create a Webhook.

Now you can refer to this Webhook by its name (@webhook-<WEBHOOK_NAME>) on Monitor\Alert creation page in **Notify your Team** section, for example here: <https://app.datadoghq.com/monitors/create/metric>

## Related Items

* [Datadog Webhook Documentation](https://docs.datadoghq.com/integrations/webhooks/)
