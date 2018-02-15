---
layout: docs
title: "Conditional Execution of Steps"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/conditional-execution-of-steps
toc: true
---
For each step in a ```codefresh.yml``` file, you can define a set of conditions which need to be satisfied in order to execute the step. (An introduction to the ```codefresh.yml``` file can be found [here]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).)

There are currently two main methods to define conditions: branch conditions and expression conditions.
 
## Branch Conditions
Usually, you'll want to define a branch condition, be it of the type ```ignore``` for blacklisting a set of branches or of the type ```only``` for whitelisting a set of branches. Each branch specification can either be an exact branch name, e.g. ```master```, or a regular expression, e.g. ```/hotfix$/```. Case insensitive regexps (```/^FB-/i```) are also supported.

Here are some examples:

Only execute for the ```master``` branch:
  `only-master-branch`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    branch:
      only:
        - master
{% endhighlight %}

Only execute for branches whose name begins with ```FB-``` prefix (feature branches):

  `only-feature-branches`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    branch:
      only:
        - /^FB-.*/i
{% endhighlight %}

Ignore the develop branch and master branch:

  `ignore-master-and-develop-branch`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    branch:
      ignore:
        - master
        - develop
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Regular Expressions Flavour
The [JavaScript regular expressions](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions) flavour is the one used in branch conditions.
{{site.data.callout.end}}

## Expression Conditions
Alternatively, you can use more advanced expression conditions.

This follows the standard [expression condition syntax]({{ site.baseurl }}/docs/codefresh-yaml/expression-condition-syntax/). In this case, you can choose to execute if ```all``` expression conditions evaluate to ```true```, or to execute if ```any``` expression conditions evaluate to ```true```.

Here are some examples. Execute if the string ```[skip ci]``` is not part of the main repository commit message AND if the branch is ```master```

  `all-conditions`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    condition:
      all:
        noSkipCiInCommitMessage: 'includes(lower({% raw %}"${{CF_COMMIT_MESSAGE}}"{% endraw %}), "skip ci") == false'
        masterBranch: '{% raw %}"${{CF_BRANCH}}{% endraw %}" == "master"'
{% endhighlight %}

Execute if the string ```[skip ci]``` is not part of the main repository commit message, OR if the branch is not a feature branch (i.e. name starts with FB-)

  `any-condition`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    condition:
      any:
        noSkipCiInCommitMessage: 'includes(lower({% raw %}"${{CF_COMMIT_MESSAGE}}"{% endraw %}), "skip ci") == false'
        notFeatureBranch: 'match({% raw %}"${{CF_BRANCH}}"{% endraw %}, "^FB-", true) == false'
{% endhighlight %}
