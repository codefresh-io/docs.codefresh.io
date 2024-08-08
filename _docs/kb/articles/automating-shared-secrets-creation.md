---
title: "How To: Automate creation of Shared Secrets for pipelines"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines, CLI]
support-reviewed: 2024-01-17 MB
---

This articles describes how to manage secrets across different pipelines in an efficient manner.

## Script for create secret context

The script reads each line from the provided file and appends it to the Codefresh `create context secret` command.  
This results in a single command that creates a secret context with all the specified secrets.

>**NOTE**  
Ensure you have the necessary permissions to create contexts in Codefresh.

##### Script

```shell
#!/bin/bash

CMD="codefresh create context secret <secret_context_name>"

while read LINE; do

CMD="${CMD} -v ${LINE}"

done < "$1"

echo "$CMD"
```

## How to use the script

1. Prepare the list of your secrets.  
  Start by preparing a file containing your secrets.  
  Each line in the file should contain one secret in the format KEY=VALUE.

2. Set execution permissions.  
  Make the script executable by running:  
  `chmod +x script_name.sh`

3. Run the script with the command:  
  `./script_name.sh secret_list.txt`  
  where:
  `secret_list.txt` is the file containing your secrets

4. Verify creation.  
  After executing the script, verify that the secret context has been created in Codefresh with the specified secrets.

## Related articles

[Secrets in pipelines]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/)  
[Configuring access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/)  
[Pipeline execution context]({{site.baseurl}}/docs/administration/account-user-management/pipeline-execution-context/)  
