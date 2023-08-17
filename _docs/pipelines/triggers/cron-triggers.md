---
title: "Cron (timer) triggers"
description: "Run pipelines on a time schedule"
group: pipelines
sub_group: triggers
redirect_from:
  - /docs/configure-ci-cd-pipeline/triggers/cron-triggers/
  - /docs/configure-cron-trigger/
  - /docs/pipeline-triggers/configure-cron-trigger/
toc: true
---

Cron triggers allow you to run Codefresh pipelines on a specific time schedule, optionally simulating a Git trigger event on a specific repo and branch.  

Cron triggers are useful for cleanup jobs, periodic checks, or any other workflow that needs to run repetitively at fixed intervals. By replicating or simulating the behavior of a Git trigger, Cron triggers can initiate pipeline executions at the predefined time intervals and at the same auto-populate the Codefresh environment variables for Git with values from the repo and branch. 




You can create and manage Cron triggers for pipelines through the Codefresh UI or CLI.

>**NOTE**:  
Cron triggers are created in the UTC timezone.


##  Legacy Cron triggers in Codefresh
If you see Cron triggers for your pipeline tagged with {::nomarkdown}<img src="../../../../images/icons/icon-warning.png" display=inline-block">{:/} tag, it indicates that you are using the legacy version.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/cron/legacy-cron-trigger-tag.png"
url="/images/pipeline/triggers/cron/legacy-cron-trigger-tag.png"
caption="Legacy Cron trigger in Codefresh UI"
alt="Legacy Cron trigger in Codefresh UI"
max-width="60%"
%}



## Cron triggers in Codefresh UI

Create and manage Cron triggers for pipelines in the Codefresh UI.

There are two parts to creating a Cron trigger in the UI:
1. Defining the schedule for the trigger
  To learn about supported `cron` expression formats and aliases, visit [this page](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md){:target="\_blank"}.
1. (Optional) selecting the Git trigger event to simulate when the Cron trigger timer is activated.
  Simulating a Git trigger has the same impact 



### Create a Cron trigger in UI
**Before you begin**  

Review:  
* [Git trigger settings](#git-trigger-settings) 
* [Working with Git triggers](#working-with-git-triggers)

**How to**  

1. In the Codefresh UI, from the sidebar, select **Pipelines**.
1. Select the pipeline to which to add the trigger, and then click the **Workflow** tab.
1. On the right, click **Triggers**, and then click **Add Trigger**.
1. Click **Cron**, click **Next**.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
caption="Select trigger type to add"
alt="Select trigger type to add"
max-width="60%"
%}

{:start="5"}
1. In the **Cron Interval** tab, configure the schedule for the Cron trigger:
    1. Select the time interval and the frequency at which to run the pipeline.
    1. Use the info in the Expression Breakdown table to create a valid Cron **Expression**, or write a custom expression.
    1. Add a free-text message to be sent as an additional event payload every time the Cron is executed.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/cron/cron-timer-tab.png"
url="/images/pipeline/triggers/cron/cron-timer-tab.png"
caption="Cron trigger: Cron Interval settings"
alt="Cron trigger: Cron Interval settings"
max-width="60%"
%}

{:start="6"}
1. Click **Settings**, and define the Git trigger simulation options:
    1. From the **Simulate Trigger From** drop-down list, select the type of Git trigger to simulate.  
      The list displays all the Git triggers defined for the pipeline. 
    1. From the **Select Branch** drop-down list, select the branch of the repository for this build.
    1. Expand **Variables**, and add or modify [environment variables]({{site.baseurl}}/docs/pipelines/variables/) for this build.
    1. Expand **Advanced Options** and select the overrides for this build. See [Advanced options]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#advanced-settings-for-git-triggers).

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/cron/cron-timer-tab.png"
url="/images/pipeline/triggers/cron/cron-timer-tab.png"
caption="Cron trigger: Git trigger settings"
alt="Cron trigger: Git trigger settings"
max-width="60%"
%}

{:start="7"}
1. To confirm click **Done**.




### Trigger Codefresh pipeline with Cron timer

Now you can Recurring pipeline executions are triggered according to the defined settings.

* If you defined only the Timer settings, the build is triggered according to the Cron expression.
* If you defined both the Timer and Git Settings, the build is triggered according to the Cron expression and populated with the information from the Git repo such as the Git repo URL, branch name, latest commit information, including the date and author of the commit.

### Edit a Cron trigger in Codefresh UI

???

## Manage Cron triggers with Codefresh CLI

You can also create and manage Cron triggers for pipelines via the [Codefresh CLI](https://cli.codefresh.io/){:target="\_blank"}.

You first create the Cron trigger and then set up a 


### Create Cron trigger event via CLI

Create a new `cron` trigger by defining a Cron expression and message.  
To learn about supported `cron` expression formats and aliases, visit [this page](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md){:target="\_blank"}.  
The text message is passed to linked pipelines, whenever the specified `cron` timer is triggered.



{% highlight yaml %}
{% raw %}
# create DockerHub recurring event 'once in 20 minutes'
codefresh create trigger-event --type cron --kind codefresh --value expression="0 */20 * * * *" --value message="hello-once-in-20-min"

# on success trigger-event UID will be printed out
Trigger event: "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" was successfully created.
{% endraw %}
{% endhighlight %}



### Set up pipeline trigger

Now, lets create a new pipeline trigger, linking previously defined `cron` `trigger-event` to one or more Codefresh pipelines.


{% highlight yaml %}
{% raw %}
# create trigger, linking trigger-event UID to the pipeline UID
codefresh create trigger "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" 7a5622e4b1ad5ba0018a3c9c   

# create another trigger, linking the same trigger-event to another pipeline
codefresh create trigger "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" 4a5634e4b2cd6baf021a3c0a
{% endraw %}
{% endhighlight %}

From now on, Codefresh will trigger a pipeline execution for two pipelines linked to the previously specified `cron` `trigger-event`, every 20 minutes (`once in 20 minutes`).

### Cron event payload

The following variables are available to any Codefresh pipeline linked to a Cron trigger-event:

- `EVENT_MESSAGE`: Free-text message (specified during creation)
- `EVENT_TIMESTAMP`: Event timestamp in RFC 3339 format

## Related articles
[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  

