---
title: "Conditional Execution of Steps"
description: "Skip specific pipeline steps according to one or more conditions"
group: codefresh-yaml
redirect_from:
  - /docs/conditional-execution-of-steps/
toc: true
---
For each step in a `codefresh.yml` file, you can define a set of conditions which need to be satisfied in order to execute the step. (An introduction to the `codefresh.yml` file can be found [here]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).)

There are currently two main methods to define conditions: branch conditions and expression conditions.
 
## Branch Conditions

Usually, you'll want to define a branch condition, be it of the type ```ignore``` for blacklisting a set of branches or of the type ```only``` for whitelisting a set of branches. Each branch specification can either be an exact branch name, e.g. ```master```, or a regular expression, e.g. ```/hotfix$/```. Case insensitive regexps (```/^FB-/i```) are also supported.

Here are some examples:

Only execute for the ```master``` branch:
  
  `only-master-branch.yml`
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

  `only-feature-branches.yml`
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

  `ignore-master-and-develop-branch.yml`
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


>We use [JavaScript regular expressions](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions) for the syntax in branch conditions.


## Condition expressions

Alternatively, you can use more advanced condition expressions.

This follows the standard [condition expression  syntax]({{site.baseurl}}/docs/codefresh-yaml/condition-expression-syntax/). In this case, you can choose to execute if ```all``` expression conditions evaluate to ```true```, or to execute if ```any``` expression conditions evaluate to ```true```.

Here are some examples. Execute if the string ```[skip ci]``` is not part of the main repository commit message AND if the branch is ```master```

  `all-conditions.yml`
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

  `any-condition.yml`
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

## Execute steps according to the presence of a variable

If a variable does not exist in a Codefresh pipeline, then it will simply stay as a string inside the definition. When the `{% raw %}${{MY_VAR}}{% endraw %}` variable is not available, the engine will literally print `{% raw %}${{MY_VAR}}{% endraw %}`, because that variable doesn't exist.  

You can use this mechanism to decide which steps will be executed if a [variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) exists or not.



`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  step1:
    title: "Running if variable exists"
    type: "freestyle" 
    image: "alpine:3.9" 
    commands:
      - echo "Step 1 is running"
    when:
      condition:
        all:
          whenVarExists: 'includes("${{MY_VAR}}", "{{MY_VAR}}") == false'
  step2:
    title: "Running if variable does not exist"
    type: "freestyle" 
    image: "alpine:3.9" 
    commands:
      - echo "Step 2 is running"
    when:
      condition:
        all:
          whenVarIsMissing: 'includes("${{MY_VAR}}", "{{MY_VAR}}") == true'
{% endraw %}
{% endhighlight %}

Try running the pipeline above and see how it behaves when a variable called `MY_VAR` exists (or doesn't exist).

>Notice that if you use this pattern a lot it means that you are trying to create a complex pipeline that is very smart. We suggest you create instead multiple [simple pipelines for the same project]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/#trunk-based-development).

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Variables]({{site.baseurl}}/docs/codefresh-yaml/variables/)
* [Condition syntax]({{site.baseurl}}/docs/codefresh-yaml/condition-expression-syntax/)
* [Pull Requests and Branches]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/)
* [Pipeline/Step hooks]({{site.baseurl}}/docs/codefresh-yaml/hooks/)