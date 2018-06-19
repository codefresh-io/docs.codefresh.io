---
title: "Git Trigger"
description: ""
group: configure-ci-cd-pipeline
sub_group: triggers
toc: true
---

GIT triggers are the most basic types of trigger for performing [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) with Codefresh.

At the trigger level you have the option of selecting

 * Which code repository will be used as a trigger
 * which branches will be affected by a pipeline
 * If a trigger will apply to a Pull Request or not

 Note that you can select another repository other than the one the project itself belongs to. It is possible
 to trigger a build on project A even though a commit happened on project B.

You can also use [Conditional expressions]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) at the pipeline level to further fine-tune the way specific steps (or other transitive pipelines) are executed.


## Manage GIT Triggers with Codefresh UI

To add a new GIT trigger, navigate to the Codefresh Pipeline *Configuration* view and expand the *Triggers* section. Press the *Add Trigger* button and select a *GIT* trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="60%"
%}

You can select the following information:

* *Git Provider* - select that one that is linked with your account
* *Repository* - You can select any repository even something different than the one that is used for the code checkout
* *Commit checkbox* - If enabled will trigger this pipeline for any commit
* *PR checkbox* - If enabled will trigger for any events that belong to a pull request
* *Branch field* - This is a regular expression and will only trigger for branches that match this naming pattern

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-git-trigger.png"
url="/images/pipeline/triggers/add-git-trigger.png"
alt="Adding GIT Trigger"
max-width="60%"
%}

The commit checkbox (by default it is enabled) means that this pipeline will run for *any* commit as long as its source branch matches the naming scheme. This includes commits on pull requests.

The PR checkbox (by default it is disabled) means that this pipeline will run only on events that happen on a Pull Request. This includes opening the Pull Request itself as well as any commits that happen to the branch while a Pull request is active.


In most cases you will have either of these checkboxes active. Enabling both at the same time will result in some duplicate builds (e.g. when commits happen to pull request branches).
The concept behind these two checkboxes (and in conjunction with the branch text field) is to allow you to define which pipelines run for various workflows in your organization.

As a simple example you can have a *production* pipeline that runs only on *master* branch (and therefore the branch field says "master") and a *testing* pipeline that runs user acceptance tests where only the Pull Request checkbox is active. This means that User Acceptance tests will run whenever a PR is created or modified. Once it is merged the p*roduction* pipeline will deploy the changes.

In a more advanced example you could add regular expressions in the branch field with names such as *feature-*, *hotfix-* etc and the PR checkbox active on different pipelines. This way you could trigger the pull requests only when they happen on specific branches. So a developer that creates a temporary feature with a name that doesn't match these naming patterns will not trigger those pipelines.

>If the PR checkbox is enabled Codefresh will also trigger a pipeline if a pull request is rejected/closed. While at first glance this seems counterintuitive, in practice it allows you to tear down test environments when the code from a Pull request is no longer needed. See below for a way to decide exactly what types of webhook events are used for triggers.

## Using YAML and the Codefresh CLI to filter specific Webhook events

The default GUI options exposed by Codefresh are just a starting point for GIT triggers and pull requests. Using [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) and the [Codefresh CLI plugin](https://codefresh-io.github.io) you can further create two-phase pipelines where the first one decides
which webwook events will be honored and the second one contains the actual build.


{% include image.html
lightbox="true"
file="/images/pipeline/triggers/two-phase-pipeline.png"
url="/images/pipeline/triggers/two-phase-pipeline.png"
alt="Two phase pipeline"
max-width="80%"
%}

The generic GIT trigger is placed on Pipeline A. This pipeline then filters the applicable webooks using [conditional expressions]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/). Then it uses the Codefresh CLI plugin (and specifically the [run pipeline capability](https://codefresh-io.github.io/cli/pipelines/run-pipeline/)) to trigger pipeline B that performs build.

Some of the YAML variables that you might find useful (from the [full list]({{ site.baseurl }}/docs/codefresh-yaml/variables/))

* `CF_PULL_REQUEST_ACTION` - open, close, accept etc
* `CF_PULL_REQUEST_TARGET` - target branch of the pull request
* `CF_MODIFIED_FILES` - list of all modified files
* `CF_BRANCH` - the branch that contains the pull request

As an example, here is the `codefresh.yml` file of pipeline A where we want to run pipeline B only when a Pull Requested is opened against a branch named *production*.


`codefresh.yml` of pipeline A
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  triggerstep:
    title: trigger
    image: codefresh/cli
    commands:
      - 'codefresh run <pipeline_B> -b=${{CF_BRANCH}}'
    when:
      condition:
        all:
          validateTargetBranch: '"${{CF_PULL_REQUEST_TARGET}}" == "production"'
          validatePRAction: '''${{CF_PULL_REQUEST_ACTION}}'' == ''opened'''
{% endraw %}
{% endhighlight %}


This is the build definition for the first pipeline that has a GIT trigger (with the Pull request checkbox enabled).
It has only a single step which uses conditionals that check the name of the branch where the pull request is targeted to, as well as the pull request action. Only if *both* of these conditions are true then the build step is executed.

The build step calls the second pipeline. The end result is that pipeline B runs only when the Pull Request is opened the first time. Any further commits on the pull request branch will **not** trigger pipeline B (pipeline A will still run but the conditionals will fail).


