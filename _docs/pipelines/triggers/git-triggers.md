---
title: "Git triggers"
description: "Learn how to run pipelines from Git events"
group: pipelines
sub_group: triggers
toc: true
---

Git triggers are the most basic of the trigger typesfor performing [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) with Codefresh.

At the trigger level, you can select:

* Which code repository will be used as a trigger
* Which branches will be affected by a pipeline
* If a trigger will apply to a Pull Request (PR) or not

> You can select a repository other than the one the project itself belongs to. It is possible
 to trigger a build on project A even though a commit happened on project B.

You can also use [conditional expressions]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) at the pipeline level to further fine-tune the way specific steps (or other transitive pipelines) are executed.

## Manage GIT triggers with Codefresh UI

To add a new GIT trigger, navigate to the Codefresh Pipeline *Configuration* view and expand the *Triggers* section on the right side. Press the *Add Trigger* button and select a *GIT* trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="60%"
%}

## General trigger Settings

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-git-trigger.png"
url="/images/pipeline/triggers/add-git-trigger.png"
alt="Adding GIT Trigger"
max-width="50%"
%}

The Git trigger is comprised of the following settings:

* *Trigger Name* - a freetext trigger name (required).
* *Description* - a freetext description (optional).
* *Repository* - you can select any repository even something different than the one that is used for the code checkout.
* *Commit Checkbox* - if enabled will trigger this pipeline for any commit.
* *PR Checkboxes* - various checkboxes for filtering the Pull request event.

The commit checkbox (by default it is enabled) means that this pipeline will run for *any* commit as long as its source branch matches the naming scheme. This includes commits on pull requests.

The PR checkboxes mean that this pipeline will run only on the respective events that happen on a Pull Request. You can select multiple checkboxes to further fine-tune the exact event. If you are interested in all events, select the checkbox *Any Pull Request event*.

>The individual Pull request checkboxes are available only for GitHub repositories.

## Configure Filter Settings

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/configure-filter-settings.png"
url="/images/pipeline/triggers/configure-filter-settings.png"
alt="Configure Filter Settings"
max-width="50%"
%}

* *Support pull request events from forks* - toggle that is useful for open source projects.
* *Branch Field* - this is a regular expression and will only trigger for branches that match this naming pattern.
* *PR Comment (restricted) and PR Comment Fields* - useful for open source projects.
* *Pull Request Target* branch - this is a regular expression and will trigger only when a Pull request is created against any branch that matches it.
* *Modified Files* - allows you to constrain the build and trigger it only if the modified files from the commit match this [glob expression](https://en.wikipedia.org/wiki/Glob_(programming)).

### Pull Request Target Branch and Branch 

The Pull Request Target Branch field allows you to trigger this pipeline only when the target of a Pull Request (i.e. where the pr is going to be merged at) matches the
branch name regular expression. Common examples for branch names would be `master` or `production`.

This field has only meaning when a commit happens in the context of a pull request and in that case:

1. The Branch field will look at the branch that the commit is happening on 
1. The PR Target Branch field will look at the branch the PR is happening against

For example, if you create a commit on a branch that is named `my-feature` which is currently part of PR against branch `staging` (i.e. somebody wants to merge `my-feature` **TO** `staging`) then:

1. The `BRANCH` field value will try to match against `my-feature`
1. the `PULL REQUEST TARGET BRANCH` will try to match against `staging`

Here are some more syntax examples:

* `/^((qa-release)$).*/g` - only run if branch is named `qa-release`.
* `/^((production)$).*/g` - only run if branch is named `production`.
* `/release/g` - only run if branch name contains `release` as substring.
* `/feature-/gi` - only run if branch is `feature-foo`, `feature-bar`, `my-feature-123` etc.
* `/^((?!^feature).)*$/gi` - only run if branch name does **not** start with `feature`.

>The field *Pull Request Target* is available for all Git providers apart from Atlassian stash.
>
>When using the Terraform Provider, please use the [Go regex syntax](https://github.com/google/re2/wiki/Syntax) as some perl regex syntax is not compatible.

The concept behind these checkboxes and branch name fields is to allow you to define which pipelines run for various workflows in your organization.

As a simple example you can have a *production* pipeline that runs only on *master* branch (and therefore the branch field says "master") and a *testing* pipeline that runs user acceptance tests where only the Pull Request Open checkbox is active. This means that User Acceptance tests will run whenever a PR is created. Once it is merged the *production* pipeline will deploy the changes.

In a more advanced example, you could add regular expressions in the branch field with names such as *feature-*, *hotfix-* etc. and the PR checkbox active on different pipelines. This way you could trigger the pull requests only when they happen on specific branches. So, a developer that creates a temporary feature with a name that doesn't match these naming patterns will not trigger those pipelines.

Notice also that you can use Negative Lookahead in your Branch (Regex Expression) filter. An example to exclude tag events: `/^((?!tag)).*/gi` (the pattern here for tags to exclude is that they begin with `tag…`).

This will make all push-events (including tags) that do follow the `tag...` pattern to be excluded.
Therefore, all tags like `tag1`, `tag-X` **won't** trigger the pipeline.

### Pull Requests from comments 

Pull Requests from comments are supported for all Git providers, for both private and public repositories.  
There are two options:
* **Pull request comment added (restricted)**  
  This option triggers an event only when the PR comments are made by repository owners or collaborators.  
* **Pull request comment added**  
  This option triggers an event when PR comments are made by any user, regardless of their permissions.  
  Because it is not restricted to owners and collaborators, this option is useful in GitHub, to enable triggers for PR comments made by users in GitHub teams.

  > We strongly recommend selecting this option only for _private repositories_.  


{% include image.html
lightbox="true"
file="/images/pipeline/triggers/pr-comment-trigger-options.png"
url="/images/pipeline/triggers/pr-comment-trigger-options.png"
alt="Trigger options for PR comments"
caption="Trigger options for PR comments"
max-width="50%"
%}


### Support for building pull requests from forks

By default, the Git trigger works for events coming from your personal repository. You can also use triggers from events that are coming from forks. This is a very useful feature for open source projects, as it allows you to run your own unit tests and other checks against a new feature *before* actually merging it in your repo.

To enable this behavior:

* Toggle the *support pull request events from forks* switch
* Select *Pull request comment added (restricted)* 
* In the *pr comment* field enter a custom string (accepts regex)

Then once a contributor creates a fork of your repository and submits a pull request, you can review the code and then add a comment on your own that matches the PR comment expression.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/pr-from-fork.png"
url="/images/pipeline/triggers/pr-from-fork.png"
alt="Triggering a public build from a comment"
caption="Triggering a public build from a comment"
max-width="50%"
%}

Once that is done, Codefresh will launch your pipeline against the Pull Request. If you manage an open source project with Codefresh, remember to enable [public builds]({{site.baseurl}}/docs/configure-ci-cd-pipeline/build-status/#public-build-logs) as well.

When supporting building of pull requests from forks there are a few "gotchas" to look out for:

* Only comments made by repository owners and [collaborators](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/adding-outside-collaborators-to-repositories-in-your-organization) will result in the pipeline being triggered.
* Only Git pushes by collaborators within the GitHub organization will result in the pipeline being triggered
* If the repository is in a GitHub organization, comments made by private members of the organization will not activate the trigger, even if they are set as an owner or collaborator. Private members means that they need to be explicitly added to the repository. 
Access cannot be "inherited" by the GitHub team. Currently, only comments from Admins, or Collaborators (directly added, not via teams) are allowed, in order to be caught by this filter.
* The *Pull request comment added* checkbox should likely be the only one checked, or your pipeline may trigger on other events that you don't anticipate.



### Monorepo support (Modified files)

The *modified files* field is a very powerful Codefresh feature that allows you to trigger a build only if the
files affected by a commit are in a specific folder (or match a specific naming pattern). This means that
you can have a big GIT repository with multiple projects and build only the parts that actually change.

>Currently the field *modified files* is available only for GitHub, GitLab, Azure DevOps and [Bitbucket Server and Data Center](https://confluence.atlassian.com/bitbucketserver/add-a-post-service-webhook-776640367.html) repositories, since they are the only GIT providers
that send this information in the webhook. We will support other GIT providers as soon as they add the respective feature. 

### Using the Modified files field to constrain triggers to specific folder/files

The *modified files* field accepts glob expressions. The paths are relative to the root folder of the project (where the git repository was checked out). Some possible examples are:

```
**/package.json
**/Dockerfile*
my-subproject/**
my-subproject/sub-subproject/package.json
my-subproject/**/pom.xml
!config/**

```

>You can also use relative paths with dot-slash. Therefore `./package.json` and `package.json` are exactly the same thing. They both refer to the file `package.json` found at the root of the git project that was checked out as part of the build.

You can also define [multiple expressions](http://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm) like this (but notice that there is a limit of 150 characters for the field):

```
{app/**,test/**}
{**/package.json,my-subproject/**}
!{deployment/**,**/version.cfg}
```

Once a commit happens to a code repository, Codefresh will see which files are changed from the git provider and trigger the build **only** if the changed files match the glob expression. If there is no match no build will be triggered.

> Notice that the `{}` characters are only needed if you have more than one expression. Do not use them if you have a single glob expression in the field.

This is a very useful feature for organizations who have chosen to have multiple projects on the same GIT repository (monorepos). Let's assume for example that a single system has a Java backend, a NestJS frontend and a Ruby-on-Rails internal dashboard.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/monorepo.png"
url="/images/pipeline/triggers/monorepo.png"
alt="GIT monorepo"
max-width="60%"
%}

Now we can define 3 different pipelines in Codefresh where each one builds the respective project

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/monorepo-pipelines.png"
url="/images/pipeline/triggers/monorepo-pipelines.png"
alt="GIT monorepo pipelines"
max-width="70%"
%}

And then in the GIT trigger for each one we set the modified files field to the following values:

* For the *build-nestjs-only* pipeline *MODIFIED FILES* has `my-nestjs-project/**`.
* For the *build-java-only* pipeline *MODIFIED FILES* has `my-java-project/**`.
* For the *build-rails-only* pipeline *MODIFIED FILES* has `my-rails-project/**`.

This way as multiple developers work on the git repository only the affected projects will actually build. A change to the NestJS project will *not* build the Rails project as well. Also, if somebody changes *only* the README file and nothing else, no build will be triggered at all (which is a good thing as the source code is exactly the same).

You can also use Glob expressions for files. For example:

* An expression such as `my-subproject/sub-subproject/package.json` will trigger a build **only** if the dependencies of this specific project are changed
* A pipeline with the expression `my-subproject/**/pom.xml` will trigger only if the Java dependencies for any project that belongs to `my-subproject` actually change
* An expression such as `!config/manifest.yaml` will trigger a build if any file was changed *apart from* `config/manifest.yaml`

Glob expressions have many more options not shown here. Visit the [official documentation](https://en.wikipedia.org/wiki/Glob_(programming)) to learn more. You can also use the [Glob Tester web application](https://www.digitalocean.com/community/tools/glob) to test your glob expressions beforehand so that you are certain they match the files you expect them to match.

## Advanced Options

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/advanced-options.png"
url="/images/pipeline/triggers/advanced-options.png"
alt="Advanced Options"
max-width="60%"
%}

* *Commit Status Title* - the commit status title pushed to the GIT version control system.  By default, is the pipeline name, but you can override the name on GIT trigger.
* *Build Variables* - import a [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) or manually add variables
* *More Options* 
  * *Ignore Docker engine cache for build* - selecting this option may slow down your build.  See #1 [here]({{site.baseurl}}/docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/)
  * *Ignore Codefresh cache optimizations for build* - selecting this option may slow down your build.  See #2 [here]({{site.baseurl}}/docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/)
  * *Reset pipeline volume* - useful for troubleshooting a build that hangs on the first step.  See [here]({{site.baseurl}}/docs/troubleshooting/common-issues/restoring-data-from-pre-existing-image-hangs-on/)
  * *Report notification on pipeline execution* - Decide if [Slack notifications]({{site.baseurl}}/docs/integrations/notifications/slack-integration/) will be sent (as well as status updates back to your Git provider)
* *Runtime Environment* - choose to use pipeline [settings]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings) or override them

### Set minimum disk space for build volume by trigger
Set the disk space you need for the build volume in the context of the selected trigger. Setting the disk space for the trigger overrides that set for the pipeline.  

1. In **Workflow > Triggers**, expand **Advanced Options**.
1. From the Runtime Environment list, select **Override pipeline settings**, and then select the runtime for which to override the pipeline setting. 
1. If required, change the resource size.
1. Enable **Set minimum disk space**, and then change as required. 

## Manually adding the trigger to GitHub

When creating a Git trigger in codefresh, sometimes the Git Integration does not have the permissions to create a webhook on the designated repository. When this happens, you get the following error: `Failed to add Trigger`.

This error means that Codefresh could not create the webhook and verify that it works. With that, Codefresh will mark the Trigger as Unverified. Two additional fields (Endpoint and Secret) will appear under the "Verify Trigger" button when you get this error.

- **Endpoint**: This will be the Webhook URL for the created Trigger
- **Secret**: Token to add to Github for verification.

### Adding Webhook to Github

1. When you receive the `Failed to add Trigger`, log into GitHub.
   - Make sure this user can access the repository settings and create Webhooks
1. Go to the repository mentioned in the "REPOSITORY" section from Unverified Trigger.
1. Go to Settings > Webhooks and click the "Add webhook" button.
1. Fill in the form
   - **Payload URL**: The URL from the Endpoint field from the Trigger
   - **Content type**: application/json
   - **Secret**: The token in the Secret field from the Trigger
   - **SSL verification**: Enable SSL verification
   - **Events**:
     1. Select let me select individual events
     2. Match the items selected in the Trigger By field from the Trigger
   - **Active**: Make sure this is selected
1. Click "Add webhook" when done.
1. Click "Done" in the Add Trigger form.
1. Test your webhook by making an event in the repository that will cause the Trigger to start the build.

> **Note**:
  * You will be responsible for syncing the Trigger By to the Events sent to us for the webhook. You can select "Send me everything" if you do not want to manually match the Trigger By in the Trigger with the Webhook Events in GitHub.
  * The Trigger will remain "Unverified" until the integration has the correct permissions to the repository.

## Accessing webhook content of the trigger directly 

If your Git trigger is coming from Github, you can also access the whole payload of the webhook that was responsible for the trigger.
The webhook content is available at `/codefresh/volume/event.json`. You can read this file in any pipeline step and process it like any other json file (e.g. with the jq utility).

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  read_trigger_webook:
    title: "Reading Github webhook content"
    type: "freestyle" 
    image: "alpine:3.9" 
    commands:
      - 'cat /codefresh/volume/event.json'
{% endraw %}
{% endhighlight %}

Notice however that this file is only available when the pipeline was triggered from a GitHub event. If you manually run the pipeline, the file is not present. 

## Using YAML and the Codefresh CLI to filter specific Webhook events

The default GUI options exposed by Codefresh are just a starting point for GIT triggers and pull requests. Using [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) and the [Codefresh CLI plugin](https://codefresh-io.github.io/cli/) you can further create two-phase pipelines where the first one decides
which webhook events will be honored and the second one contains the actual build.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/two-phase-pipeline.png"
url="/images/pipeline/triggers/two-phase-pipeline.png"
alt="Two phase pipeline"
max-width="80%"
%}

The generic GIT trigger is placed on Pipeline A. This pipeline then filters the applicable webhooks using [conditional expressions]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/). Then it uses the Codefresh CLI plugin (and specifically the [run pipeline capability](https://codefresh-io.github.io/cli/pipelines/run-pipeline/)) to trigger pipeline B that performs build.

Some of the YAML variables that you might find useful (from the [full list]({{site.baseurl}}/docs/codefresh-yaml/variables/)):

* `CF_PULL_REQUEST_ACTION` - open, close, synchronize, assign etc.
* `CF_PULL_REQUEST_TARGET` - target branch of the pull request.
* `CF_BRANCH` - the branch that contains the pull request.

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
      - 'codefresh run <pipeline_B> -b=${{CF_BRANCH}}' -t <pipeline-b-trigger-name>
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

## Related articles
[Triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Cron triggers]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Multi-git trigger]({{site.baseurl}}/docs/troubleshooting/common-issues/multi-git-triggers/)
