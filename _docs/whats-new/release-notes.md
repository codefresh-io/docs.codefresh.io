



## Features & Enhancements

### Usabiliy enhancements
Have a look at our enhancements where a little bit goes a long way.

* Prompt to automatically switch accounts  
  Avoiding confusion and, Users logged into more than Codefresh account are now prompted to either switch to the account currently in focus or return to the previous one. 
  Goes a lon way to avoid confusion
  Opening a second tab for Codefresh with a different account displays a message prompting you to either switch to the new account or return to the previous one.
We have implemented a similar mechanism  when running a build from a different account. A message prompts you to switch accounts to view the build. 


* User-configurable memory limit for warning 
  Remember the banner that alerted you whenever the memory usage for a pipeline build exceeded 90%? 
  You are now empowered with deciding when to display this banner: either when exceeded 90% as before, or when the usage reaches  the actual limit of 100%. 

* Case insensitive search om Pipelines and Pipeline List view
  Yet another tiny update with 
  Search queries are now case insensitive 

### Cloud Builds for pipeline creation
The pipeline creation or more precisely the pipeline run requirements 
To run a pipeline you need at least one runtime environment from a hybedi Runner installation.
Cloud Builds for pipelines are no longer available by default as a COdfresh account admin, you can request one for your accounbt and we will anser you in up to 24 hours.

Non-admin users can send a request for the admin.


### Ability to restrict  cluster access  for  pipelines
We have a new option that allows you to define  specific  Kubernetes clusters for a pipeline.
 By default, all pipelines in an account can  access all Kubernetes clusters integrated with Codefresh.  Now you can selectively inject clusters  into individual pipelines in the account.
Selective cluster-injection increases security by restricting access to users from different teams. For an account with a large number of clusters, cluster-injection also shortens the initialization phase of the build, reducing the overall build duration.
When cluster-injection is enabled for the account, you can explicitly select the clusters that the pipeline can access. The initialization step in the pipeline displays the clusters selected for it.
For details, see Enabling cluster contexts for pipelines and Pipeline Policies. 
### Volume reuse across pipelines by project
The reuseVolumeSelector in the runtime environment specifications has a new option. The option both reduces the build duration for pipelines,  and allows greater flexibility to optimize  caching across multiple pipelines in the same project.
In addition to reusing PVs  (Persistent Volumes)  by either all pipelines or a single pipeline, you can now reuse PVs  across multiple pipelines by projects . 
Configuring the  project_id shares PVs  with all the pipelines  in the account assigned to the same project .
For details, see Volume reuse policy.
### Slack integration notification for builds terminated by system
Notification on failed builds are of course more important than successful ones. Slack integrations in Codefresh include a new option to notify you whenever builds are terminated by the system.

### Multiple Helm contexts for pipelines
With support for multiple Helm registry contexts in the same pipeline, dependencies in any of the imported Helm registry contexts in the Helm chart are automatically authenticated and added.
For the Helm `install` and `push` actions, you can select the primary Helm registry context for the command.
For details, see Import Helm configurations into your pipeline definition and Action modes.


### GitOps: Terminate Sync now in Application Header
We moved the Terminate Sync button from the Sync details drawer to the Application header, as in, right next to the Current Sync details.
Instead of having to go to the Sync details to This enhancement improves the visibility and makes this option easy to access and act upon.



### GitOps: Upgrade to Argo CD 2.6
We have upgraded the Argo CD version in Codefresh to v2.6. 

### cache-from 

Our build step includes a new argument, `cache-from`, that allows you to specify additional cache sources and speed up the build process.
Multiple cache sources are useful when your primary cache source is unavailable or slow.

Supported cache sources for cache-from in version 2.0 include:

Docker registries (e.g. Docker Hub, Google Container Registry)
HTTP/HTTPS URLs (e.g. a caching proxy server)
To use cache-from, simply include the --cache-from option in your build command and specify the cache source(s) you want to use.

Note that cache-from is currently only supported for Docker-based builds.


### [Epic OnPrem] FR: Add search to Chart Version drop box of Install Helm Chart modal window
#### Use helm-diff plugin in cfstep-helm image

### Provide CF_STEP_NAME variable to that step's conditional CR-10390

## Bug fixes

- (On-premises only) Tooltip on hover over build/project names in the Builds page, shows _topbar.title_ instead of the build/project name.
- Clicking native Argo Workflows link displays empty screen. 
- Regression: Unable to edit email invitation for user who does not have an actiuve account
Security: CVEs in codefresh/agent and codefresh/venona
- Codefresh pipelinesAfter terminating build and killing engine, `dind` pods remain alive for 30+ before SIGTERM.
- Internal: Codefresh pipelines: Argocd-server unable to send events when golang channel is flooded
- Internal: failed to render logs
- Codefresh pipelines: Large number of logs affect Build performance - Roi CR-17088
- " : Codefresh Runner engine unable to communicate with dind container. CR-14602
- ": `CF_HELM_SET` variable  printed as [object Object]: CR-4232
- " Doumentation on time zones removed from [CRON Expression Format](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md/){:target="\_blank"}
- Onpremises pipelines: Liveness probe failures on cf-api pods
- " Variables not rendered for build annotations added via pipeline hooks.
- ": Build does not fail on error for `when` condition (CR-16925)
- ": Click badge in Pipeline > General Settings results in error.
- ": Copy YAML from drop-down does not display all pipelines in in project with more than 100 pipelines when cloning piplines
- " Lack of Codefresh context prevents Classic CLI to set a new one (CR-15884)
-': Running pipeline locally results in " checkAvailabilityWithRetry error: ..., connect EACCES /var/run/docker.sock .. error " (CR-13455)
- ": Tooltips not displayed on Hover over Useage Report columns (CR-17181)
- ": Codefresh run --local leaves behind engine containers after each run (CR-16913)


- GitOps:  "invalid memory address or nil pointer dereference" error when user is trying to recover runtime
- ": rollout rollback not working in 2.5 if rollout located in ns that is different from app ns (CR-17317)