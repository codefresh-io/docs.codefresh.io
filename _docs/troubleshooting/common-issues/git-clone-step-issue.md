---
title: "Clone step failed: Command [git checkout $REVISION] exited with code [1]"
description: ""
group: troubleshooting
sub_group: common-issues
permalink: /:collection/troubleshooting/common-issues/git-clone-step-issue/
redirect_from:
  - /docs/build-step-no-such-file-or-directory/
toc: true
---
  
The GIT clone step may fail in case you have CRLF (**Windows**) end of line characters instead of LF (**Unix**).

  `Text`
{% highlight text %}
Aborting
Command [git checkout $REVISION] exited with code [1]
  [SYSTEM] Error: Failed to run git-clone step: Cloning main repository...; caused by NonZeroExitCodeError
  : Container for step title: Cloning main repository..., step type: git-clone, operation: Cloning reposit
ory failed with exit code: 1
{% endhighlight %}

## Solution

Create a .gitattributes file in your repository (for all branches) that will enforce git to commit files with LF.
  
