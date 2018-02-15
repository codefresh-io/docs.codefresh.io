---
layout: docs
title: "The terminating the workflow by system"
description: ""
group: troubleshooting
sub_group: common-issues
permalink: /:path/the-terminating-the-workflow-by-system/
redirect_from:
  - /docs/the-terminating-the-workflow-by-system
  - /docs/the-terminating-the-workflow-by-system
toc: true
---

{:start="1"}
1. When you have a workflow that takes more than 30 min and you are on shared infrastructure now. On shared infrastructure, your workflow process will be terminated by the system in 30 min.

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
2. The process of workflow was terminated by the system in 15 min. The build will be terminated if in more than 15 minutes we couldn’t see any update in the build process logs.

## Solution
You can choose one of the followings suggestions to resolve it:
- Review your Dockerfile, and steps of your workflow to decrease a time of performing of the workflow
- Move to the dedicated infrastructure
- For #2 case add the additional log to the process
- Contact us to talk about startup pricing

{{site.data.callout.callout_warning}}
If your workflow process has been terminated by the system for the another reason that is not listed here, please let us know.
{{site.data.callout.end}}
