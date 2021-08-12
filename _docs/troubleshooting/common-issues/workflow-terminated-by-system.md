---
title: "Workflow process terminated by the system"
description: ""
group: troubleshooting
sub_group: common-issues
permalink: /:collection/troubleshooting/common-issues/workflow-terminated-by-system/
redirect_from:
  - /docs/workflow-terminated-by-system/
toc: true
---

If you have a long workflow that takes more than several minutes to finish, you might discover that it is automatically
terminated by the system.

By default, the system will terminate a build step that seems "inactive" after 45 minutes. If your
step does not print anything in the log for 45 minutes, it will be considered inactive.

Therefore, the build will be terminated if in more than 45 minutes there isn't any update in the build process logs.

## Solution

You can choose one of the following suggestions to resolve it:

- Review your Dockerfile and steps of your workflow to decrease a time of performing of the workflow.
- Move to the dedicated infrastructure (Codefresh on-premises version).
- Add an additional log to the process (see below for an example).
- Contact us to talk about startup pricing.

{{site.data.callout.callout_warning}}
If your workflow process has been terminated by the system for another reason that is not listed here, please let us know.
{{site.data.callout.end}}

As an example, if you have a long running process that takes more than 45 minutes you can try adding
a command that echoes something every 10 minutes to STDOUT before your command, like this:



```
SlowFreeStyleStep:
  title: Performing a slow process
  image: my-docker-image:1.0
  commands:
    - /bin/bash -c "while true; do echo Keep alive... && sleep 600; done &"
    - ./my-really-slow-script.sh
```
