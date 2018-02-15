---
layout: docs
title: "GitLab webhooks don't work as expected"
description: ""
excerpt: "Instructions for troubleshooting Gitlab webhooks."
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/the-webhooks-of-gitlab-doesnt-work-as-expected
  - /docs/the-webhooks-of-gitlab-doesnt-work-as-expected
toc: true
old_url: /docs/the-webhooks-of-gitlab-doesnt-work-as-expected
was_hidden: true
---
If you are admin of the repository and the webhook wasn't added automatically to your GitLab repository you can use the following workaround to add the webhook manually. 

{{site.data.callout.callout_warning}}
[https://docs.gitlab.com/ce/user/project/integrations/webhooks.html](https://docs.gitlab.com/ce/user/project/integrations/webhooks.html){:target="_blank"} 

{:start="1"}
1. The URL should be: https://g.codefresh.io/api/providers/gitlab/hook

{:start="2"}
2. Check the hook for `push_events`

{:start="3"} 
3. Please let us know on which pipeline you want the hook to work.
{{site.data.callout.end}}
