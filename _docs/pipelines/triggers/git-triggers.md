---
title: "Git triggers"
description: "Learn how to run pipelines from Git events"
group: pipelines
sub_group: triggers
redirect_from:
  - /docs/configure-ci-cd-pipeline/triggers/git-triggers/
toc: true
---

Git triggers are the most basic of the trigger types for performing [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration){:target="\_blank"} with Codefresh.

At the trigger level, you can select:

* The code repository to be used as a trigger
* The branches affected by a pipeline
* If a trigger applies to a Pull Request (PR) or not

> You can select a repository other than the one the project itself belongs to. It is possible
 to trigger a build on project A even though a commit happened on project B.

You can also use [conditional expressions]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) at the pipeline level to further fine-tune the way specific steps (or other transitive pipelines) are executed.

## Add Git triggers in Codefresh

**Before you begin**  

Review:  
* [Git trigger settings](#git-trigger-settings) 
* [Working with Git triggers](#working-with-git-triggers)

**How to**  

1. In the Codefresh UI, from the sidebar, select **Pipelines**.
1. Select the pipeline to which to add the trigger, and then click the **Workflow** tab.
1. On the right, click **Triggers**, and then click **Add Trigger**.
1. Click **Git**, click **Next** and then configure the trigger settings.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="60%"
%}

## Git trigger settings

Trigger settings can be grouped into:

* [General settings](#general-settings-for-git-triggers)
* [Filter settings](#filter-settings-for-git-triggers)
* [Advanced settings](#advanced-settings-for-git-triggers)


{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-git-trigger.png"
url="/images/pipeline/triggers/add-git-trigger.png"
alt="Adding GIT Trigger"
max-width="50%"
%}

### General settings for Git triggers

{: .table .table-bordered .table-hover}
| Git Triggers:<br>General Settings       | Description            |  
| --------------        | --------------         |  
| **Trigger Name**      | Required. A freetext name for the Git trigger. |
|**Description**       | Optional. A freetext description. |
|**Repository**        | The repository in the Git provider account to track for the trigger event. You can select any repository, even one different from that used for the code checkout.|
|**Trigger By**        | The event or events for which to trigger the pipeline. Trigger events vary according to the Git provider selected. <br>The Push Commit option, enabled by default, means that this pipeline will run for *any* commit as long as its source branch matches the naming scheme. This includes commits on pull requests.  <br>The PR options mean that this pipeline will run only on the respective events that happen on a Pull Request. You can select multiple options to further fine-tune the exact event. If you are interested in all events, select Any Pull Request event. <br><br>See: <br>[GitHub trigger events](#github-trigger-events)<br>[Azure DevOps trigger events](#azure-devops-trigger-events)<br>[Bitbucket trigger events](#bitbucket-trigger-events)<br>[GitLab trigger events](#gitlab-trigger-events)<br>[Gerrit trigger events](#gerrit-trigger-events) |




#### GitHub trigger events

For a description of the events, see [GitHub documentation](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads){:target="\_blank"}.

* Push commits
* Push tags
* Any Pull Request event
* Pull Request opened
* Pull Request closed
* Pull Request merged
* Pull Request closed (not merged)
* Pull Request reopened
* Pull Request edited
* Pull Request assigned
* Pull Request unassigned
* Pull Request review requested
* Pull Request review request removed
* Pull Request labeled
* Pull Request comment added (restricted)
* Pull Request comment added
* Release


#### Azure DevOps trigger events

For a description of the events, see [Azure DevOps documentation](https://learn.microsoft.com/en-us/azure/devops/pipelines/build/triggers?view=azure-devops/){:target="\_blank"}.

* Push commits
* Any pull request event
* Pull request created
* Pull request merged
* Pull request updated

                        
#### Bitbucket trigger events

For a description of the events, see [Bitbucket documentation](https://support.atlassian.com/jira-cloud-administration/docs/understand-workflow-triggers/){:target="\_blank"} and also [Event payloads](https://support.atlassian.com/bitbucket-cloud/docs/event-payloads/){:target="\_blank"}.

* Push new branch             
* Pull Request approved        
* Pull Request approval removed  
* Pull Request declined       
* Pull Request comment created                         
* Pull Request comment updated                         
* Pull Request comment deleted                           


#### GitLab trigger events

For a description of the events, see [GitLab documentation](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html){:target="\_blank"}.

* Commit
* Any Pull Request event
* Pull Request opened
* Pull Request edited
* Pull Request closed
* Pull Request merged
* Pull Request push commit


#### Gerrit trigger events

A `Ref updated` trigger event in Gerrit is mapped to to `Push commits` or `Push tags` trigger events in Codefresh.


For a description of the events, see [Gerrit documentation](https://gerrit-review.googlesource.com/Documentation/cmd-stream-events.html#events){:target="\_blank"}.

<br>

* Push commits (Ref updated in Gerrit)
* Push tags (Push tags and Ref updated in Gerrit)
* Change abandoned              
* Change deleted              
* Change merged               
* Change restored        
* Comment added        
* Hashtags changed        
* Patchset created        
* Reviewer added      
* Reviewer deleted        
* Topic changed        
* WIP state changed        
* Vote deleted     

### Filter settings for Git triggers

| Git Triggers: <br>Filter Settings           |Description  |
| ----------------------------------------------| -----      |
| **Support pull request events from forks**    | Default is OFF.<br>When ON, creates a trigger for the selected PR event or events based on a fork of the repo selected in Repository. Useful for open source projects. See [Build pull requests from forks](#build-pull-requests-from-forks) in this article. |
| **Branch (Regex Expression)**                 | Optional. Triggers an event only if the branch matches the Regex expression. See [Pull Request Target Branch and Branch](#pull-request-target-branch-and-branch) in this article.  |
| **PR Comment (Regex Expression)**             | Optional. Triggers an event only for the PR comment for the Pull request comment added, restricted or otherwise, if the comment matches the Regex expression. See [Pull Request from comments](#pull-requests-from-comments) in this article. |
| **Pull Request Target Branch (Regex Expression)** | Triggers an event when a PR is created for any branch that matches the Regex expression. See [Pull Request Target Branch and Branch](#pull-request-target-branch-and-branch) in this article. |
| **Modified Files**                            | When empty, triggers the build on commits to any file. <br>Otherwise, triggers the build only if the files modified by the commits match [glob expression](https://en.wikipedia.org/wiki/Glob_(programming)){:target="\_blank"}.  See [Monorepo support (Modified files)](#monorepo-support-modified-files) and [Using the Modified files option to constrain triggers to specific folder/files](#using-the-modified-files-option-to-constrain-triggers-to-specific-folderfiles) in this article.|


### Advanced settings for Git triggers

{: .table .table-bordered .table-hover}
| Git Triggers:<br>Advanced Settings       | Description            |  
| --------------        | --------------         |  
|**Commit Status Title**      | The commit status title pushed to the Git version control system. By default, this is the pipeline name. You can override the name on GIT trigger.|
|**Build variables**       | The variables to use for this build. Either import the variables from a [shared configuration file]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/), or manually add one or more new variables. To encrypt a variable, select Encrypt.  |
|**Override default behavior for current build**        | Select the options to override the global build behavior set for all the pipelines in the account. <br>{::nomarkdown}<ul><li><b>Ignore Docker engine cache for build</b>: When selected, ignores the local Docker engine cache. Selecting this option may slow down your build. See <a href="https://codefresh.io/docs/docs/kb/articles/disabling-codefresh-caching-mechanisms">Docker engine cache</a></li><li><b>Ignore Codefresh cache optimizations for build</b>: When selected, ignores the last build's cache. Selecting this option may slow down your build. See <a href="https://codefresh.io/docs/docs/kb/articles/disabling-codefresh-caching-mechanisms">Last build cache</a>.</li><li><b>Reset pipeline volume</b>:</li>Useful for troubleshooting a build that hangs on the first step.  See <a href="https://codefresh.io/docs/docs/kb/articles/restoring-data-from-pre-existing-image-hangs-on/" target="_blank">Hangs on restoring data from pre-existing image</a>.</li><li><b>Report notification on pipeline execution</b>: When selected, sends <a href="https://codefresh.io/docs/docs/integrations/notifications/slack-integration/" target="_blank">Slack notifications</a>, in addition to status updates to your Git provider</li></ul>{:/}|
|**Runtime Environment**        | {::nomarkdown}<ul><li><b>Use pipeline settings</b>: Use the <a href="https://codefresh.io/docs/docs/pipelines/pipelines/#pipeline-settings">settings</a> defined at the pipeline level.</li><li>Override pipeline settings</b>:Override the settings for this build, and select the Runtime Environment and OS, the CPI and Memory resource allocation, and the Minimum disk space required for the build. See <a href="https://codefresh.io/docs/docs/pipelines/triggers/git-triggers/#set-minimum-disk-space-for-build-volume-by-trigger">Set minimum disk space for build volume by trigger<a/>.</li></ul>{:/} |
|**Service Account**        | Valid only for Amazon ECR. The name of the service account to use for authentication when enabled in Amazon ECR. |


 


## Working with Git triggers

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/configure-filter-settings.png"
url="/images/pipeline/triggers/configure-filter-settings.png"
alt="Configure Filter Settings"
max-width="50%"
%}

### Skip triggering pipeline on commit
The default behavior triggers the pipeline on a commit action.  
Override the default behavior by adding any one of the predefined strings anywhere in the commit message.

>NOTE: Remember to include the opening and closing parentheses when adding the strings. 

* `[skip ci]`
* `[ci skip]`
* `[no ci]`
* `[skip codefresh]`
* `[codefresh skip]`

### Pull Requests from comments 

Pull Requests from comments are supported for all Git providers, for both private and public repositories.  
There are two options:
* Pull request comment added (restricted)  
  This option triggers an event only when the PR comments are made by repository owners or collaborators.  
* Pull request comment added  
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

### Pull Request Target Branch and Branch 

The Pull Request Target Branch option allows you to trigger the pipeline only when the target of a Pull Request (PR), that is, where the PR will be merged to, matches the
branch name in the regular expression. Common examples for branch names would be `master` or `production`.

>NOTE:  
  >The Pull Request Target Branch option is available for all Git providers, except Atlassian Stash.
  >
  >When using Terraform, please use the [Go regex syntax](https://github.com/google/re2/wiki/Syntax){:target="\_blank"} as some Perl regex syntax is not compatible.

This option has meaning when a commit happens in the context of a PR, and in that case:

1. The Branch field looks at the branch that the commit is happening on 
1. The PR Target Branch field will look at the branch the PR is happening against

For example, if you create a commit on a branch named `my-feature`, which is currently part of PR against branch `staging` (i.e. somebody wants to merge `my-feature` TO `staging`) then:

1. The `BRANCH` field value will try to match against `my-feature`
1. the `PULL REQUEST TARGET BRANCH` will try to match against `staging`

Here are some more syntax examples:

* `/^((qa-release)$).*/g`: Only run if `branch` is named `qa-release`.
* `/^((production)$).*/g`: Only run if `branch` is named `production`.
* `/release/g`: Only run if `branch` name contains `release` as substring.
* `/feature-/gi`; Only run if `branch` is `feature-foo`, `feature-bar`, `my-feature-123` etc.
* `/^((?!^feature).)*$/gi`: Only run if `branch` name does not start with `feature`.



The concept behind these checkboxes and branch name fields is to allow you to define which pipelines run for various workflows in your organization.

As a simple example you can have a *production* pipeline that runs only on *master* branch (and therefore the branch field says "master") and a *testing* pipeline that runs user acceptance tests where only the Pull Request Open checkbox is active. This means that User Acceptance tests will run whenever a PR is created. Once it is merged the *production* pipeline will deploy the changes.

In a more advanced example, you could add regular expressions in the branch field with names such as *feature-*, *hotfix-* etc. and the PR checkbox active on different pipelines. This way you could trigger the pull requests only when they happen on specific branches. So, a developer that creates a temporary feature with a name that doesn't match these naming patterns will not trigger those pipelines.

Notice also that you can use Negative Lookahead in your Branch (Regex Expression) filter. An example to exclude tag events: `/^((?!tag)).*/gi` (the pattern here for tags to exclude is that they begin with `tag…`).

This will make all push-events (including tags) that do follow the `tag...` pattern to be excluded.
Therefore, all tags like `tag1`, `tag-X` won't trigger the pipeline.



### Build pull requests from forks

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

Once that is done, Codefresh will launch your pipeline against the Pull Request. If you manage an open source project with Codefresh, remember to enable [public builds]({{site.baseurl}}/docs/pipelines/configuration/build-status/#public-build-logs) as well.

When supporting building of pull requests from forks there are a few "gotchas" to look out for:

* Only comments made by repository owners and [collaborators](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/adding-outside-collaborators-to-repositories-in-your-organization){:target="\_blank"} will result in the pipeline being triggered.
* Only Git pushes by collaborators within the GitHub organization will result in the pipeline being triggered
* If the repository is in a GitHub organization, comments made by private members of the organization will not activate the trigger, even if they are set as an owner or collaborator. Private members means that they need to be explicitly added to the repository. 
Access cannot be "inherited" by the GitHub team. Currently, only comments from Admins, or Collaborators (directly added, not via teams) are allowed, in order to be caught by this filter.
* The *Pull request comment added* checkbox should likely be the only one checked, or your pipeline may trigger on other events that you don't anticipate.



### Monorepo support (Modified files)

The Modified files option is a very powerful Codefresh option that allows you to trigger a build only if the
files affected by a commit are in a specific folder or match a specific naming pattern. This means that
you can have a big Git repository with multiple projects, and build only the parts that actually change.


>Currently, the option is supported only for GitHub, GitLab, Azure DevOps, [Bitbucket Server](https://confluence.atlassian.com/bitbucketserver/manage-webhooks-938025878.html){:target="\_blank"}, Bitbucket (Cloud), and Gerrit. We will support other Git providers as soon as they add the respective feature. 


### Using the Modified files option to constrain triggers to specific folder/files

The Modified files option accepts glob expressions. The paths are relative to the root folder of the project (where the Git repository was checked out). Some possible examples are:

```
/package.json
/Dockerfile*
my-subproject/
my-subproject/sub-subproject/package.json
my-subproject//pom.xml
!config/

```

>You can also use relative paths with dot-slash. Therefore `./package.json` and `package.json` are exactly the same thing. They both refer to the file `package.json` found at the root of the git project that was checked out as part of the build.

You can also define [multiple expressions](http://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm){:target="\_blank"} like this (but notice that there is a limit of 150 characters for the field):

```
{app/,test/}
{/package.json,my-subproject/}
!{deployment/,/version.cfg}
```

Once a commit happens to a code repository, Codefresh will see which files are changed from the Git provider and trigger the build only if the changed files match the glob expression. If there is no match no build will be triggered.

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

And then in the Git trigger for each one we set the modified files field to the following values:

* For the *build-nestjs-only* pipeline *MODIFIED FILES* has `my-nestjs-project/`.
* For the *build-java-only* pipeline *MODIFIED FILES* has `my-java-project/`.
* For the *build-rails-only* pipeline *MODIFIED FILES* has `my-rails-project/`.

This way as multiple developers work on the Git repository only the affected projects will actually build. A change to the NestJS project will *not* build the Rails project as well. Also, if somebody changes *only* the README file and nothing else, no build will be triggered at all (which is a good thing as the source code is exactly the same).

You can also use glob expressions for files. For example:

* An expression such as `my-subproject/sub-subproject/package.json` will trigger a build only if the dependencies of this specific project are changed
* A pipeline with the expression `my-subproject//pom.xml` will trigger only if the Java dependencies for any project that belongs to `my-subproject` actually change
* An expression such as `!config/manifest.yaml` will trigger a build if any file was changed *apart from* `config/manifest.yaml`

Glob expressions have many more options not shown here. Visit the [official documentation](https://en.wikipedia.org/wiki/Glob_(programming)){:target="\_blank"} to learn more. You can also use the [Glob Tester web application](https://www.digitalocean.com/community/tools/glob){:target="\_blank"} to test your glob expressions beforehand so that you are certain they match the files you expect them to match.

### Set minimum disk space for build volume by trigger
Set the disk space you need for the build volume in the context of the selected trigger. Setting the disk space for the trigger overrides that set for the pipeline.  

1. In Workflow > Triggers, expand Advanced Options.
1. From the Runtime Environment list, select Override pipeline settings, and then select the runtime for which to override the pipeline setting. 
1. If required, change the resource size.
1. Enable Set minimum disk space, and then change as required. 



## Manually adding the trigger to GitHub

When creating a Git trigger in codefresh, sometimes the Git Integration does not have the permissions to create a webhook on the designated repository. When this happens, you get the following error: `Failed to add Trigger`.

This error means that Codefresh could not create the webhook and verify that it works. With that, Codefresh will mark the Trigger as Unverified. Two additional fields (Endpoint and Secret) will appear under the "Verify Trigger" button when you get this error.

- Endpoint: This will be the Webhook URL for the created Trigger
- Secret: Token to add to Github for verification.

### Adding a webhook to GitHub

1. When you receive the `Failed to add Trigger`, log into GitHub.
   - Make sure this user can access the repository settings and create Webhooks
1. Go to the repository mentioned in the "REPOSITORY" section from Unverified Trigger.
1. Go to Settings > Webhooks and click the "Add webhook" button.
1. Fill in the form
   - Payload URL: The URL from the Endpoint field from the Trigger
   - Content type: application/json
   - Secret: The token in the Secret field from the Trigger
   - SSL verification: Enable SSL verification
   - Events:
     1. Select let me select individual events
     2. Match the items selected in the Trigger By field from the Trigger
   - Active: Make sure this is selected
1. Click "Add webhook" when done.
1. Click "Done" in the Add Trigger form.
1. Test your webhook by making an event in the repository that will cause the Trigger to start the build.

> **NOTES**:
  * You are responsible for syncing the Trigger By to the Events sent to us for the webhook. You can select "Send me everything" if you do not want to manually match the Trigger By in the Trigger with the Webhook Events in GitHub.
  * The Trigger will remain "Unverified" until the integration has the correct permissions to the repository.

## Accessing webhook content of the trigger directly 

If your Git trigger is coming from GitHub, you can also access the whole payload of the webhook that was responsible for the trigger.
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

Notice however that this file is only available when the pipeline is triggered from a GitHub event. If you manually run the pipeline, the file is not present. 

## Using YAML and the Codefresh CLI to filter specific webhook events

The default GUI options exposed by Codefresh are just a starting point for GIT triggers and pull requests. Using 
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/) and the [Codefresh CLI plugin](https://codefresh-io.github.io/cli/){:target="\_blank"} you can further create two-phase pipelines where the first one decides
which webhook events will be honored and the second one contains the actual build.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/two-phase-pipeline.png"
url="/images/pipeline/triggers/two-phase-pipeline.png"
alt="Two phase pipeline"
max-width="80%"
%}

The generic Git trigger is placed on Pipeline A. This pipeline then filters the applicable webhooks using [conditional expressions]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/). Then it uses the Codefresh CLI plugin and specifically the [run pipeline capability](https://codefresh-io.github.io/cli/pipelines/run-pipeline/){:target="\_blank"} to trigger pipeline B that performs build.

Some of the YAML variables that you might find useful (from the [full list]({{site.baseurl}}/docs/pipelines/variables/)):

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

The build step calls the second pipeline. The end result is that pipeline B runs only when the Pull Request is opened the first time. Any further commits on the pull request branch will not trigger pipeline B (pipeline A will still run but the conditionals will fail).

## Related articles
[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Cron triggers]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Using multi-git triggers]({{site.baseurl}}/docs/kb/articles/multi-git-triggers/)
