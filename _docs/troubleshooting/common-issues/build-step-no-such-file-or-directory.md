---
title: "Build step: No such file or directory"
description: ""
group: troubleshooting
sub_group: common-issues
permalink: /:collection/troubleshooting/common-issues/build-step-no-such-file-or-directory/
redirect_from:
  - /docs/troubleshooting/common-issues/build-step-no-such-file-or-directory/
  - /docs/build-step-no-such-file-or-directory/
toc: true
---

## Issue

Following error in the logs of the build step:

  `Text`
{% highlight text %}
Step 3/6 : COPY /output /app
lstat output: no such file or directory
{% endhighlight %}

## Possible cause
This issue generally occurs if you use an incorrect path to the Dockerfile or to the Build context.

## Solution
Recheck, and use the correct path to Dockerfile and Build context

{:start="1"}
1. The path to Dockerfile.

{:start="2"}
2. The path to Build context. 
**Build context** is where we can find your Dockerfile as well as running commands. Your Dockerfile must be relative to this directory.

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/no_such_file_directory.png" 
url="/images/troubleshooting/no_such_file_directory.png"
alt="codefresh_no_such_file_directory.png" 
max-width="40%"
%}

{{site.data.callout.callout_info}}
In case with codefresh.yml, to specify the path to build context you need to use `working_directory`
{{site.data.callout.end}}

  `build step`
{% highlight yaml %}
step_name:
  type: build
  title: Step Title
  description: Free text description
  working_directory: path/to/buildcontext
  dockerfile: path/to/Dockerfile
  image_name: owner/new-image-name
  tag: develop
{% endhighlight %}

## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)