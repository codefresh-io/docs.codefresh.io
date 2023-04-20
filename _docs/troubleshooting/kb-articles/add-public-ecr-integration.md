---
title: "How-to: Add Public ECR registry integration"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Settings]
support-reviewed: 2023-04-18 LG
---

## Overview

You want to add a Public ECR integration in your Codefresh account.

## Details

You can use **Other Registries** option in the Docker integration page to add
a Public ECR integration.

You will need to pass username and password to create the integration. You can
get these values from the AWS console:

  * Navigate to "Amazon ECR/Repositories/Public/<repo>" and click the "View push commands" button at the upper right, in the next window note the first command that will print out the password.

![](/attachments/token/ZgWLZOUmiEUk0ZwienyjQOmAd/?name=Selection_656.png)

In the Codefresh [integration page](https://g.codefresh.io/account-
admin/account-conf/integration/registryNew) select 'Add Registry Provider >
Other Registries', enter any Registry name, put "AWS" in the Username field,
then run the following command

`aws ecr-public get-login-password --region us-east-1`

and put the output in the Password field, fill in the prefix field in advanced
options too.

![](/attachments/token/ffh8A8TMJeEqyo17x5kHD2ZY6/?name=Selection_657.png)

Test the connection if needed and save the changes.

