---
title: "How To: Automating Shared Secrets Creation"
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

## Overview

You have numerous secrets to manage across different pipelines and want to make the process more efficient.

## Details

The script reads each line from the provided file and appends it to the codefresh create context secret command. This results in a single command that creates a secret context with all the specified secrets.

The Script:

```bash
#!/bin/bash

CMD="codefresh create context secret <secret_context_name>"

while read LINE; do

CMD="${CMD} -v ${LINE}"

done < "$1"

echo "$CMD"
```

Steps to Use the Script:

1. Prepare Your Secret List: Start by preparing a file containing your secrets. Each line in the file should contain one secret in the format KEY=VALUE.

2. Set Execution Permissions: Make the script executable by running chmod +x script_name.sh.

3. Run the Script: Execute the script with the command ./script_name.sh secret_list.txt, where secret_list.txt is the file containing your secrets.

4. Verify the Creation: After execution, verify that the secret context has been created in Codefresh with the specified secrets.

>**Note** : Ensure you have the necessary permissions in Codefresh to create contexts.

## Related Items

[Secrets in pipelines]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/)
[Configuring access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/)
[Pipeline execution context]({{site.baseurl}}docs/administration/account-user-management/pipeline-execution-context/)
