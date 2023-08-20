---
title: "Creating pipelines"
description: "Define pipelines in Codefresh"
group: pipelines
redirect_from:
  - /docs/configure-ci-cd-pipeline/pipelines/
  - /docs/pipeline
  - /docs/pipeline/
  - /docs/pipelines/introduction/
  - /docs/pipelines/introduction
  - /docs/inline-yaml-editing
  - /docs/inline-yaml-editing/
toc: true
---

Before creating a pipeline, make sure you are familiar with the theory behind [Codefresh pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/).

## Pipeline concepts

The aim of Codefresh pipelines is to have re-usable sequences of steps that can be used for different applications (or micro-services) via the use of Git triggers.

The main concepts are shown below:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/concepts.png" 
url="/images/pipeline/create/concepts.png"
alt="Pipeline concepts" 
caption="Pipeline concepts"
max-width="60%"
%}

* **Projects**: The top-level concept in Codefresh CI/CD. Projects are used to group related CI pipelines. In most cases, a single project will be a single application that itself contains many microservices. You are free to use projects as you see fit. For example, you could create a project for a specific Kubernetes cluster or for a specific team/department.

* **Pipelines**: Each project can have multiple pipelines.  Pipelines that belong to a single project can be managed as a unit. You can also create a new pipeline by copying an existing pipeline. Notice that unlike other CI solutions, a pipeline in Codefresh is **NOT** tied to a specific Git repository. You should try to make your pipelines generic enough so that they can be reused for similar applications even when they exist in different Git repositories (a fairly typical setup for microservices).

* **Pipeline steps**: Each pipeline has a definition that defines the [pipeline steps]({{site.baseurl}}/docs/pipelines/steps/) that are executed each time the pipeline is triggered. The definition of a pipeline is described in a special [codefresh.yml]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/) file. The `codefresh.yml` file can be fetched from the same repository as that of the source code, from a completely different repository, or even defined in-place in the Codefresh pipeline editor. Again, notice you can have a pipeline that checks out its source code from Git repository A, but actually defines its steps in a `codefresh.yml` file that is fetched from Git repository B.

* **Triggers**: A pipeline can have zero, one, or many [triggers]({{site.baseurl}}/docs/pipelines/triggers/). Triggers are the linking medium between a pipeline and a Git repository. Codefresh supports several kinds of triggers such as Git, Cron, and Docker push triggers.  
Triggers that happen with Git webhooks can come from the same Git repository that contains the git code, **OR**, a completely different repository.  You can have a pipeline with multiple triggers to be executed when a code change happens to any of them.

With these basic building blocks, you can define many complex workflows. In particular, it is very easy in Codefresh to create a scenario where:

1. A pipeline is launched because a trigger exists for Git repository A
1. The pipeline reads its `codefresh.yml` file from Git repository B
1. The pipeline clones source code from Git repository C (and starts packaging/compiling it)

Of course, you can also have a simpler scenario where the trigger, the pipeline steps and the source code of the application are all defined for the same Git repository.


## Creating a pipeline

You can create new projects by clicking on *Projects* in the left sidebar and then selecting the *New Project* button on the top right corner. A dialog will appear that will ask you for the project name and optional tags that you can use for [access control]({{site.baseurl}}/docs/administration/account-user-management/access-control/).

Once you are inside the project view you can start editing pipelines with a UI environment that works similar to a traditional IDE.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipeline-manager.png" 
url="/images/pipeline/create/pipeline-manager.png"
alt="Pipeline manager" 
caption="Pipeline manager"
max-width="70%"
%}

1. On the top left you can see your current project. You can also change it by clicking on the drop-down on the top left corner.

1. On the left side of the screen you can see all pipelines that currently belong to this project. Click on each one to edit it.
On the bottom part of this panel the *New pipeline* button allows you to create a new pipeline on the same project either from scratch
or by copying an existing one from the same project or a completely different project.

1. The name of the currently edited pipeline is shown at the top of the window.

1. The main window shows the definition of the current pipeline. The screenshot shows the inline editor but pipelines can also be defined from external files (checked into source control) as explained later.

1. The right part of the window shows extra settings for this pipeline such as [predefined steps]({{site.baseurl}}/docs/pipelines/steps/), [triggers]({{site.baseurl}}/docs/pipelines/triggers/), and launch variables/parameters.




### Using the Inline pipeline editor

When first creating a pipeline, you will see an inline editor that allows you to define the [pipeline YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/) right there in the Codefresh UI. This is great when you are starting a new project because it offers you really quick feedback. You can edit the yml steps, run a build, edit again, run a build and so on. 


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/inline-editor.png" 
url="/images/pipeline/create/inline-editor.png"
alt="Inline Pipeline editor" 
caption="Inline Pipeline editor"
max-width="60%"
%}

On the top right of the panel you have additional controls:

* The *import* button allows you to bring a `codefresh.yml` from your local workstation into the editor
* The *comment* button allows you to quickly comment/uncomment the currently selected text. The hotkey `Ctrl-/` also performs the same action
* The *formatting* button enriches the editor with special symbols for line breaks, spaces and tabs. This allows you to easily fix common formatting errors
* The *copy* button quickly copies the **whole** pipeline text in your clipboard
* You can use `Ctrl-]` and `Ctrl-[` to change indentation of the current line (use the Command key instead on MacOsX)


Notice that in the editor you can expand/collapse individual yaml blocks using the arrow triangles on the left of each blocks. The initial pipeline presented in the editor is suggested by Codefresh according to the contents of your Git repository.

> You can also see the suggested Codefresh pipeline for any public git repository by using the [analyze option](https://codefresh-io.github.io/cli/analyzer/){:target="\_blank"} of the Codefresh CLI.


## Loading codefresh.yml from Version Control

Working with the inline editor is very convenient in the beginning, but it makes your pipeline definition only exist within the Codefresh UI and therefore goes against the basic principles of [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_Code){:target="\_blank"}.

Once you are happy with how your pipeline works you should commit it to a Git repository, either the same one that has the source code of the application or a completely different one.

* From the **Inline YAML** dropdown, select **Use YAML from URL** or **Use YAML from Repository**.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipeline-git-options.png" 
url="/images/pipeline/create/pipeline-git-options.png"
alt="Pipeline resource options" 
caption="Pipeline resource options"
max-width="60%"
%}

### Using another Git repository

Loading the pipeline from a Git repository is the recommended way to associate a pipeline with a project once you are finished with it. Even though the inline editor is great for quick prototyping and experimentation, ideally all your pipelines should be under source control.

Selecting **Use YAML from Repository**, allows you to select any Git repository already connected to Codefresh along with a preview of the pipeline.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipeline-per-branch.png" 
url="/images/pipeline/create/pipeline-per-branch.png"
alt="Load pipeline from Git" 
caption="Load pipeline from Git"
max-width="60%"
%}

Unlike other CI options, the Git repository that contains the pipeline can be completely different from the Git repository that has the source code of your application.

**Use branch from Git trigger**  

The **Use branch from Git trigger** option is very important, as it defines the branch in the Git repo from which the pipeline is loaded. In most cases, you want to keep this enabled as it loads the pipeline from the same branch that triggered the build.

For example, if you open a new pull request for a branch named `feature-x`, that has changes both in source code and in the pipeline definition itself, ideally you would want the pipeline responsible for the build to be the same one that contains the new changes in the `feature-x` branch.

If you disable this option, then you can select a specific branch from the field directly above the switch. The option is great for organizations that want to lock down their pipelines. 

For example, if you define `master` as the branch to use for this pipeline, then even if a developer creates a custom branch for their source code changes, they will not be able to change the pipeline itself to do something different. Their pipeline changes in their own branch will be ignored as all builds will always load the pipeline from `master`. This can be very useful for security-sensitive pipelines.


### Using any public URL

The **Use YAML from URL** option allows you to load the pipeline definition from any _public_ URL.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipeline-from-internal-repo.png" 
url="/images/pipeline/create/pipeline-from-internal-repo.png"
alt="Pipeline from internal repo" 
caption="Pipeline from internal repo"
max-width="70%"
%}

You can then copy and paste the URL to a raw Codefresh YAML file.  This will allow you to load a Codefresh YAML from any URL. 


> GitHub requires a raw URL.  
  As an example:  
  Instead of `https://github.com/codefresh-contrib/example-voting-app/blob/master/codefresh.yml`,  
  use:    
  `https://raw.githubusercontent.com/codefresh-contrib/example-voting-app/master/codefresh.yml`

## Pipeline settings

Once you create your pipeline you can also click on the top tab called *Settings* for some extra parameters.

### General 

- **Pipeline Name**: The name of your pipeline (useful for working with the [Codefresh CLI](https://codefresh-io.github.io/cli/){:target="\_blank"})
- **Pipeline ID**: The ID of your pipeline (useful for working with the Codefresh CLI)
  > When working with the Codefresh CLI, the Pipeline Name and ID are interchangeable.
- **Pipeline Description**: Free text description of the pipeline. 
- **Pipeline Tags**: One or more tags used for [access control]({{site.baseurl}}/docs/administration/account-user-management/access-control/)
- **Public Build Logs**: If enabled, [users without a Codefresh account]({{site.baseurl}}/docs/pipelines/configuration/build-status/#public-build-logs) can view the builds of this pipeline.
- **Template**: Convert this pipeline to a template (see the next section for details on templates).
- **Badges**: Simple images that show you the last [build status]({{site.baseurl}}/docs/pipelines/configuration/build-status/).

### Policies



- **Kubernetes clusters**: Control pipeline access to Kubernetes clusters integrated with Codefresh.  
    * To allow the pipeline access to _all_ the cluster contexts integrated with Codefresh (the default), toggle **Inject all Kubernetes cluster context to pipeline builds** to ON. 
    *  To allow the pipeline access to _only_ specific clusters, start typing in the name of the cluster as defined in its integration settings, and select it from the list displayed by Codefresh.  
    When defined, the initialization step in the pipeline displays the clusters selected for it.  
  See [Select Kubernetes cluster contexts](#select-kubernetes-cluster-contexts).


- **Pipeline Concurrency**: The maximum number of concurrent builds (0-14 or unlimited). Set the concurrency when your pipeline has only one trigger.  
  > **TIP**:  
  A Pipeline Concurrency of **0** freezes execution of the pipeline, switching it to maintenance mode. Use this concurrency setting to modify existing pipelines and freeze execution until you complete the changes. 
- **Trigger Concurrency**: The maximum number of concurrent builds per trigger (1-15 or unlimited). Define the trigger concurrency when your pipeline has multiple triggers.
- **Branch Concurrency**: The maximum number of concurrent builds per branch (1-15 or unlimited). Define this when your pipeline can build different branches.
- **Build Termination**: Options that determine when a build from the pipeline should terminate:
  - Once a build is created terminate previous builds from the same branch
  - Once a build is created terminate previous builds only from a specific branch (name matches a regular expression)
  - Once a build is created, terminate all other running builds
  - Once a build is terminated, terminate all child builds initiated from it
- **Pending approval volume**: Choose what happens with the [pipeline volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) when a pipeline is waiting for [approval]({{site.baseurl}}/docs/pipelines/steps/approval/#keeping-the-shared-volume-after-an-approval)
  - Keep the volume available
  - Discard the volume
  - Honor the option defined globally in your Codefresh account
- **Pending approval concurrency limit effect**: Determines if a build that is pending approval [counts against]({{site.baseurl}}/docs/pipelines/steps/approval/#define-concurrency-limits) the concurrency limits or not
  - Builds in pending approval will **not** be counted when determining the concurrency limit for a pipeline
  - Builds in pending approval will **be** counted when determining the concurrency limit for a pipeline
  - Honor the option defined globally in your Codefresh account  

- **Restart pipeline**  
  **Permit restart pipeline from failed step**: When enabled (the default), allows users to restart the pipeline directly from the failed step. Otherwise, users can only restart the pipeline from the beginning.

  As this option restarts the failed step with the same state, you may find it useful to disable this option based on the usage. For example, restarting a custom Helm promotion step that failed, restarts the step with the same revision and does not promote the newest images as it should.

#### Select Kubernetes cluster contexts
By default, all clusters integrated with Codefresh are automatically available for all pipelines in the account. 
The inject cluster option when enabled for the account allows you to selectively restrict the clusters which can be accessed from pipelines created for the user account. 
> This option is only available for Enterprise customers.

Increase security by restricting access to users from different teams.   
Codefresh authenticates the credentials of each cluster during the build initialization phase. Fewer clusters mean shorter initializations and reduced build durations. 

**Prerequisites** 
* Account-level pipeline setting **Kubernetes cluster context pipeline injection** enabled  
  The option to select clusters for a pipeline is available only when the account-level pipeline setting is enabled. See [Enabling cluster contexts for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#enabling-cluster-contexts-for-pipelines).  

* **Update Cluster** permission for users in the Codefresh UI through [Permissions](https://g.codefresh.io/account-admin/permissions/teams){:target="\_blank"}.  
  For more information, see [Access Control]({{site.baseurl}}/docs/administration/account-user-management/access-control/#access-to-kubernetes-clusters-and-pipelines).

As part of the Pipeline > Policies, you can either allow access to all clusters (the default), or only specific clusters as in the example below. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/inject-cluster-contexts.png" 
url="/images/pipeline/create/inject-cluster-contexts.png"
alt="Inject Kubernetes cluster contexts into pipeline" 
caption="Inject Kubernetes cluster contexts into pipeline"
max-width="60%"
%}

When specific clusters are defined:  
* All users in the account with the Update Cluster permission have access only to the selected clusters.
* The cluster contexts are injected during the build
* The initialization step displays the selected cluster contexts


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/cluster-contexts-in-init-step.png" 
url="/images/pipeline/create/cluster-contexts-in-init-step.png"
alt="Imported cluster contexts in pipeline's init step" 
caption="Imported cluster contexts in pipeline's init step"
max-width="60%"
%}

#### Pipeline concurrency

The **Pipeline and Trigger Concurrency** limits are very important as they allow you to define how many instances of a pipeline can run in parallel when multiple commits or multiple pull requests take place. 

 
**Balancing concurrency and performance**  
While a single Runtime Environment technically supports concurrent build executions in the hundreds, it is essential to be aware of the actual number of concurrent builds that are initiated at the same point in time. To prevent potential slowdowns due to extremely large build-bursts, we recommend capping the number of concurrent builds initiated for a Runtime Environment to a maximum of 500.

> **NOTE**:  
Pipeline and trigger concurrency limits are *unrelated* to [parallelism within a single pipeline]({{site.baseurl}}/docs/pipelines/advanced-workflows/). 

Some common scenarios are:

* a pipeline that uses a shared resource such as a database or queue and you want to limit how many pipelines can access it 
* a pipeline that deploys to a single production environment (in most cases you only want one active pipeline touching production)  

**Concurrency recommendation per Runtime Environment**

Concurrency limits control the number of simultaneous builds for Codefresh pipelines. Concurrency limits are set at both the account and specific pipeline levels. 



#### Build termination
The **Build Termination** settings are useful for pipelines where you commit too fast (i.e. faster then the actual runtime of the pipeline).
All these settings allow you to lesser the build instance for pipelines when too many triggers are launched at the same time.
You will find them very useful in cases where too many developers are performing small commits and builds take a long time to finish (i.e. build takes 10 minutes to finish and developers perform multiple pushes every 2 minutes)

Some common scenarios are:

* You are interested only on the latest commit of a branch. If pipelines from earlier commits are still running you want to terminate them.
* You don't want to wait for children pipelines to finish (i.e. when a pipeline calls another pipeline) or when a new build starts for a parent pipeline.

For the volume behavior during approvals, notice that if [you keep the volume available]({{site.baseurl}}/docs/pipelines/steps/approval/#keeping-the-shared-volume-after-an-approval) on the pipeline while it is waiting for approval it will still count as "running" against your pricing tier limit.

### External resources

In a big organization you might have some reusable scripts or other resources (such as Dockerfiles) that you want to use in multiple pipelines. Instead of fetching them manually in freestyle steps you can simply define them as *external resources*. When a pipeline runs, Codefresh will fetch them automatically and once the pipeline starts the files/folders will already be available in the paths that you define.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/external-resources.png" 
url="/images/pipeline/create/external-resources.png"
alt="Bringing external resources into a pipeline" 
caption="Bringing external resources into a pipeline"
max-width="80%"
%}

Currently Codefresh supports the automatic fetching of files or folders from another Git repository. To create an external resource click the *Add Resource* button and choose:

* The Git repository that contains the files/folder you wish to bring in the pipeline workspace
* The branch from the Git repository that contains the files/folders you wish to bring in the pipeline workspace
* The source folder in the GIT repo (use relative path)
* The target folder in the pipeline workspace where the file folder will be copied to (use absolute path)

Once the pipeline starts, all files will be available to all freestyle steps in the paths mentioned in the target folder field.
You can define multiple external resources in a single pipeline.

### Build Runtime

Build Runtime settings allow you to:  
* Select the runtime environment, runtime OS and resource sizes for the pipeline
* Set the minimum disk space for the pipeline build 
* Set the memory-usage threshold for the pipeline, overriding the account-level threshold

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/build-runtime-settings.png" 
url="/images/pipeline/create/build-runtime-settings.png"
alt="Build Runtime settings for pipeline" 
caption="Build Runtime settings for pipeline"
max-width="60%"
%}

- **Runtime Environment**: The runtime environment for the pipeline. If your account admin has selected a default runtime environment for the account, it is automatically selected. You can override the default runtime environment, and select a different one for the pipeline.    
> You need at least [one runtime environment to run the pipeline](#runtime-environments-for-pipeline).  


- **Runtime OS**: Set to Linux by default
- **Resources Size**: 
  - Small (recommended for 1-2 concurrent steps)
  - Medium (recommended 3-4 steps)
  - Large (recommended 5-6 steps)

#### Runtime environments for pipelines

You need at least one runtime environment configured for your account to run a pipeline.  
Runtime environments are available on installing the Codefresh Runner. 

**User request for runtime environment**<br>
If, as a user, you do not have a runtime environment, send a request to your account admin. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/pipeline-settings/cloud-builds-user-request-admin.png" 
url="/images/pipeline/pipeline-settings/cloud-builds-user-request-admin.png"
alt="Request account admin to configure runtime environment" 
caption="Request account admin to configure runtime environment"
max-width="50%"
%}

**Configure runtime environment**<br>
As an account admin, if the account is not configured with a runtime environment, Codefresh displays the steps to [install the Runner]({{site.baseurl}}/docs/installation/codefresh-runner/).

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/pipeline-settings/cloud-builds-admin-enable-request.png" 
url="/images/pipeline/pipeline-settings/cloud-builds-admin-enable-request.png"
alt="Build Runtime settings for pipeline without runtime environment" 
caption="Build Runtime settings for pipeline without runtime environment"
max-width="60%"
%}

As the account admin, you can also request a Cloud Build (SaaS runtime environment) to be enabled for the pipeline, which is not available by default. Clicking the Enable Cloud Builds button sends an automated email request, with a response timeframe of 24 hours. If approved, you should see the **SaaS runtime** in the list of Runtime Environments. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/pipeline-settings/cloud-builds-saas-re.png" 
url="/images/pipeline/pipeline-settings/cloud-builds-saas-re.png"
alt="SaaS runtime environment for pipeline" 
caption="SaaS runtime environment for pipeline"
max-width="60%"
%}


#### Set minimum disk space for a pipeline build
To speed up builds and improve performance, Codefresh caches different types of data during pipeline execution for reuse across builds. Image-caching is one example of cached data, where Codefresh pulls the required images during the first build and caches them for reuse in future builds. For more info, see [Pipeline caching]({{site.baseurl}}/docs/pipelines/pipeline-caching/).   
Because a portion of the disk space is already utilized by cache, a build can run out of disk space and fail with the 'no space left on device' error.

To prevent out-of-space scenarios that lead to failed builds, you can set the minimum disk space you need for the pipeline's build volume. Defining the minimum disk space ensures that Codefresh assigns either a cached disk with sufficient disk space or a new empty disk at the start of the build.  

The disk space set for the pipeline is inherited by all the builds run for the pipeline.  
You can also configure the disk space for a [specific trigger]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#set-minimum-disk-space-for-build-volume-by-trigger) used by the pipeline or for a specific run, and override what's set for the pipeline.

1. Select the pipeline for which to set the disk space.
1. Select **Settings**, and then **Runtime**.
1. Enable **Set minimum required disk space** and either retain the default displayed or change as needed. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/set-build-disk-space.png" 
url="/images/pipeline/create/set-build-disk-space.png"
alt="Set disk space for pipeline builds" 
caption="Set disk space for pipeline builds"
max-width="60%"
%}

> Track the actual disk usage in Builds > Metrics.

#### Set memory-usage threshold for pipeline build
If needed, select a memory-usage threshold for the pipeline build to override that set at the account level. Codefresh displays a banner when memory usage has exceeded the selected threshold. 

The global memory-usage threshold is set in **Pipeline Settings**, for all pipelines in the account. 
You can override the memory-usage threshold for individual pipelines, depending on the resources needed for pipeline execution. For example, if the account-level memory usage is set at 90%, and the specific pipeline is resource-intensive, you want to be warned when the usage exceeds 70%, instead of 90%.  
Conversely, if the account-level memory usage is set to 70%, and the specific pipeline is likely to use between 80% and 90% for example, you can safely set the memory-usage threshold to 100% to avoid unnecessary usage warnings.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/memory-usage-threshold.png" 
url="/images/pipeline/create/memory-usage-threshold.png"
alt="Memory-usage thresholds for pipeline" 
caption="Memory-usage thresholds for pipeline"
max-width="60%"
%}


## Using Pipeline Templates

Codefresh also supports the creation of pipeline "templates", which are blueprints for creating new pipelines.  
To enable the creation of pipelines from templates, first view global pipeline configuration in the [Codefresh UI](https://g.codefresh.io/account-admin/account-conf/pipeline-settings){:target="\_blank"} and toggle the *Enable Pipeline Templates* button.

The easiest way to create a new template is by clicking the "3 dots menu" on the pipeline name:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/create-template-menu.png" 
url="/images/pipeline/create/create-template-menu.png"
alt="Create template from pipeline" 
caption="Create template from pipeline"
max-width="30%"
%}

From the dialog you can select if you want to copy this pipeline as a brand new template, or simply convert the pipeline itself to a template:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/template-dialog.png" 
url="/images/pipeline/create/template-dialog.png"
alt="Template options" 
caption="Template options"
max-width="80%"
%}

Once the template is created, you can edit it like any other pipeline. Pipeline templates are marked with the `template` tag and also have a special mark in the pipeline menu:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/template-tag.png" 
url="/images/pipeline/create/template-tag.png"
alt="Identify pipelines used as templates" 
caption="Identify pipelines used as templates"
max-width="90%"
%}

Now when you create a new pipeline, you can also select which pipeline template will be used as an initial pipeline definition:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/use-template.png" 
url="/images/pipeline/create/use-template.png"
alt="Using a template" 
caption="Using a template"
max-width="70%"
%}

>Notice that templates only take effect during pipeline creation. Changing a template afterwards, has no effect on pipelines that are already created from it.

You can also quickly convert a pipeline to a template, by visiting the pipeline settings and clicking the *template* button under the *General* tab.

  
## Pipelines that do not belong to any project

Although we recommend adding all your pipelines to a project, this is not a hard requirement. You can create pipelines that do not belong to a project from the *Pipelines* section on the left sidebar.
If you have a Codefresh account created before May 2019 you might already have several pipelines that are like this.

If you change your mind, you can also add detached pipelines (i.e. pipelines that are not part of a project) manually from the 3-dot menu that is found on the right of each pipeline. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/add-pipeline-to-project.png" 
url="/images/pipeline/create/add-pipeline-to-project.png"
alt="Changing the project of a pipeline" 
caption="Changing the project of a pipeline"
max-width="90%"
%}

Pipelines that belong to a project will mention it below their name so it is very easy to understand which pipelines belong to a project and which do not.


## Related articles
[Global pipeline settings]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/)
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Docker registry integrations]({{site.baseurl}}/docs/integrations/docker-registries/)  
[Example catalog]({{site.baseurl}}/docs/example-catalog/examples/)





