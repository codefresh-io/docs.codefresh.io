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

There are two possible reasons when this scenario might happen:

{:start="1"}
1. When you have a workflow that takes more than 30 min and you are on shared infrastructure. On shared infrastructure, your workflow process will be terminated by the system in 30 min.

{% include 
image.html 
lightbox="true" 
file="/images/22b4fa9-codefresh_terminating_build.png" 
url="/images/22b4fa9-codefresh_terminating_build.png"
alt="codefresh_terminating_build.png" 
max-width="40%"
caption="Process terminated"
%}

{:start="2"}
2. The workflow process was terminated by the system in 15 min because of inactivity. The build will be terminated if in more than 15 minutes we couldn’t see any update in the build process logs.

## Solution

You can choose one of the followings suggestions to resolve it:

- Review your Dockerfile, and steps of your workflow to decrease a time of performing of the workflow
- Move to the dedicated infrastructure
- For #2 case add the additional log to the process (see below for an example)
- Contact us to talk about startup pricing

{{site.data.callout.callout_warning}}
If your workflow process has been terminated by the system for the another reason that is not listed here, please let us know.
{{site.data.callout.end}}

As an example if you have a long running process that takes more than 15 minutes you can try adding
a command that echoes something every 10 minutes to STDOUT before your command, like this:



```
SlowFreeStyleStep:
  title: Performing a slow process
  image: my-docker-image:1.0
  commands:
    - /bin/bash -c "while true; do echo "Keep alive..." && sleep 600; done &"
    - ./my-really-slow-script.sh
```
