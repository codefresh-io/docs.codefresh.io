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



Cron triggers offer a way to run Codefresh pipelines based on a specific time schedule. Cron triggers are particularly useful for tasks like regular maintenance, periodic checks, or any repetitive workflows.  

Integrate additional settings in the Cron trigger such as simulating a Git event to enrich pipelines with repository details, adding/customizing environment variables, and caching, volume reuse, and notification configurations for the build.

By integrating these additional options, Cron triggers can initiate pipeline executions at the predefined time intervals and at the same time populate the pipeline with repo and branch information from the Git trigger, required environment variables, and specialized behavior, for the build. 

Create and manage Cron triggers for pipelines through [Codefresh UI](#cron-triggers-in-codefresh-ui), as described in this article.  
For the specifications, see [Cron trigger specifications in pipelines]({{site.baseurl}}/docs/integrations/codefresh-api/#cron-triggers).

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

**Migrate legacy trigger**  
* Click the **Edit** icon to view the trigger.
* To migrate, click **Convert**. 

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/cron/legacy-cron-convert.png"
url="/images/pipeline/triggers/cron/legacy-cron-convert.png"
caption="Migrate legacy Cron trigger in Codefresh UI"
alt="Migrate legacy Cron trigger in Codefresh UI"
max-width="60%"
%}
  Codefresh migrates the legacy Cron trigger and displays a Trigger updated successfully message.
* Open the trigger displays the Settings tab with additional options.

  {% include image.html
lightbox="true"
file="/images/pipeline/triggers/cron/legacy-cron-after-convert.png"
url="/images/pipeline/triggers/cron/legacy-cron-after-convert.png"
caption="Cron trigger after migration with Settings tab"
alt="Cron trigger after migration with Settings tab"
max-width="60%"
%}


## Cron triggers in Codefresh UI

Create and manage Cron triggers for pipelines in the Codefresh UI.

There are two parts to creating a Cron trigger in the UI:
1. Defining the schedule for the trigger  
  To learn about supported `cron` expression formats and aliases, see [Cron expression formats](#cron-expression-formats) in this article.
1. (Optional) Selecting additional options:  
  * Git trigger event to simulate when the Cron trigger timer is activated. The pipeline is populated with the information from the Git repo such as the repo URL, branch name, latest commit information, including the date and author of the commit.
  * Variables to populate for the build
  * Caching, volume resuse and notification behavior to override for the build  



## How to: Create a Cron trigger in UI
**Before you begin**  

Review:  
* [Git trigger settings]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#git-trigger-settings) 
* [Working with Git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#working-with-git-triggers)
* [Cron expression formats](#cron-expression-formats)

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
1. Click **Settings**.
1. Define the Git trigger simulation options:
    1. From the **Simulate Trigger From** drop-down list, select the type of Git trigger to simulate.  
      The list displays all the Git triggers defined for the pipeline. 
    1. From the **Select Branch** drop-down list, select the branch of the repository for this build.
1. Expand **Variables**, and add or modify [environment variables]({{site.baseurl}}/docs/pipelines/variables/) for this build.
1. Expand **Advanced Options** and select the overrides for this build. See [Advanced options]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#advanced-settings-for-git-triggers).

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/cron/cron-settings-tab.png"
url="/images/pipeline/triggers/cron/cron-settings-tab.png"
caption="Cron trigger: Additional settings for Git event, variables, and build behavior"
alt="Cron trigger: Cron trigger: Additional settings for Git event, variables, and build behavior"
max-width="60%"
%}

{:start="7"}
1. To confirm click **Done**. 
  * If you defined only the Timer settings, the build is triggered according to the Cron expression.
  * If you defined both the Timer and additional Settings, the build is triggered according to the Cron expression, and depending on the settings, the pipeline is populated with the information from the Git repo, additional variables, and notifications when configured.


>**TIP**:  
To edit a Cron trigger after creating it, click the Edit icon.


## Cron expression formats

A Cron expression represents a set of time fields through six space-separated fields. You can also use predefined schedules or fixed interval scheduling in place of Cron expressions.

### Cron expression fields
The table below describes the fields you can define in a Cron expression.

{: .table .table-bordered .table-hover}
Field    | Mandatory | Allowed values  | Allowed special characters
|----------   | ---------- | --------------  | --------------------------|
Seconds      | No         | 0-59            | * / , -|
Minutes      | Yes        | 0-59            | * / , -|
Hours        | Yes        | 0-23            | * / , -|
Day of month | Yes        | 1-31            | * / , - ?|
Month        | Yes        | 1-12 or JAN-DEC | * / , -|
Day of week  | Yes        | 0-6 or SUN-SAT  | * / , - ?|


### Special characters in Cron expressions
The table below describes the purpose of the special characters in a Cron expression.

{: .table .table-bordered .table-hover}
|Special Character | Description | 
|----------   | ---------- | 
|**Asterisk** (`*`) | Indicates that the Cron expression will match for all values of the field.<br>Using an asterisk in the 5th field (month), would indicate every month.|
|**Slash** (`/`) | Slashes are used to describe increments of ranges. <br>For example `3-59/15` in the 1st field (minutes) would indicate the 3rd minute of the hour and every 15 minutes thereafter. <br>The form `*\/...` is equivalent to the form `first-last/...`, that is, an increment over the largest possible range of the field. <br>The form `N/...` is accepted as meaning `N-MAX/...`, that is, starting at `N`, use the increment until the end of that specific range. It does not wrap around.|
|**Comma** (`,`) | Commas are used to separate items of a list. For example, using `MON,WED,FRI` in the 5th field (day of week) would mean Mondays, Wednesdays and Fridays.|
|**Hyphen** (`-`) | Hyphens are used to define ranges. For example, `9-17` would indicate every hour between 9am and 5pm inclusive.|
|**Question mark** (`?`) | Question marks can be used instead of asterisks (`*`) for leaving either day-of-month or day-of-week blank.|


### Predefined scheduling for Cron jobs

You can use one of several predefined schedules instead of a Cron expression.
The table below describes the predefined schedules supported.

{: .table .table-bordered .table-hover}
|Predefined schedule                  | Description                                | Equivalent to|
|-----                  | -----------                                | -------------|
|@yearly (or @annually) | Run once a year, midnight, Jan. 1st        | 0 0 0 1 1 *|
|@monthly               | Run once a month, midnight, first of month | 0 0 0 1 * *|
|@weekly                | Run once a week, midnight on Sunday        | 0 0 0 * * 0|
|@daily (or @midnight)  | Run once a day, midnight                   | 0 0 0 * * *|
|@hourly                | Run once an hour, beginning of hour        | 0 0 * * * *|


### Fixed interval scheduling for Cron jobs

You can also schedule a job to execute at fixed intervals by adding `@every <interval>`. The <interval> is a string that represents the desired frequency.

For example, `@every 1h30m10s` would indicate a schedule that triggers every 1 hour, 30 minutes, 10 seconds.

>**NOTE:**  
The interval does not take the runtime of the job into account. For example, if a job takes three minutes to run, and it is scheduled to run every five minutes, it will have only two minutes of idle time between each run.

## Cron triggers with Codefresh CLI

>**NOTE**:  
This section is relevant only for legacy Cron triggers and will be deprecated. 

You can also create and manage Cron triggers for pipelines via the [Codefresh CLI](https://cli.codefresh.io/){:target="\_blank"}.



### Create Cron trigger event via CLI

Create a new `cron` trigger by defining a Cron expression and message.  
To learn about supported `cron` expression formats and aliases, see [Cron expression formats](#cron-expression-formats) in this article.  
The text message is passed to linked pipelines, whenever the specified `cron` timer is triggered.



{% highlight yaml %}
{% raw %}
# create recurring event 'once in 20 minutes'
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

## Cron event payload

The following variables are available to any Codefresh pipeline linked to a Cron trigger event:

- `EVENT_MESSAGE`: Free-text message (specified during creation)
- `EVENT_TIMESTAMP`: Event timestamp in RFC 3339 format

## Related articles
[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Cron trigger specifications]({{site.baseurl}}/docs/integrations/codefresh-api/#cron-triggers)  
[Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  

