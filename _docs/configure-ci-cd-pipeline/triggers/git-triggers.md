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
* *PR checkbox* - If enabled will trigger only commits that happen under a Pull Request
* *Branch field* - This is a regular expression and will only trigger for branches that match this naming pattern

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-git-trigger.png"
url="/images/pipeline/triggers/add-git-trigger.png"
alt="Adding GIT Trigger"
max-width="60%"
%}

The commit checkbox (by default it is enabled) means that this pipeline will run for *any* commits as long as their source branch matches the naming scheme. This includes commits on pull requests.

The PR checkbox (by default it is disabled) means that this pipeline will run only on events that happen on a Pull Request. This includes opening the Pull Request itself as well as any commits that happen to the branch while a Pull request is active.

The concept behind these two checkboxes (and in conjunction with the branch text field) is to allow you to define which pipelines run for various workflows in your organization.

As a simple example you can have a *production* pipeline that runs only on *master* branch (and therefore the branch field says master) and a *testing* pipeline that runs user acceptance tests where only the Pull Request checkbox is active. This means that User Acceptance tests will run whenever a PR is created or modified. Once it is merged the p*roduction* pipeline will deploy the changes.

In a more advanced example you could add regular expressions in the branch field with names such as *feature-*, *hotfix-* etc and the PR checkbox active on different pipelines. This ways you could trigger the Pull Requests only when they happen on specific branches. So a developer that creates a temporary feature with a name that doesn't match these naming patterns will not trigger those pipelines.

>Currently Codefresh has a limitation and any pipeline with the Pull request checkbox enabled will trigger even if a Pull request is rejected/closed. 
