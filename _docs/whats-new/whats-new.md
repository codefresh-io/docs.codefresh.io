---
title: "Whats New In Codefresh?"
description: "A changelog of new features"
group: whats-new
redirect_from:
  - /docs/whats-new/
toc: true
---

### February 2019

- Access Control (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/access-control/)
- Accessing the shared volume in compositions - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/composition-1/#accesing-your-project-folder-from-a-composition)
- Reuse Git integration in custom clone step - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/#reuse-a-git-token-from-codefresh-integrations)
- Run custom kubectl commands - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/)
- Reading Image metadata - [documentation]({{site.baseurl}}/docs/docker-registries/metadata-annotations/#using-custom-metadata-in-codefresh-pipelines)
- Codefresh build agent - [documentation]({{site.baseurl}}/docs/enterprise/behind-the-firewall/)

### January 2019

- Manual approval step - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/)
- Shared configuration - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/)
- Running pipelines locally - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/running-pipelines-locally/)
- Installation options (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/installation-security)
- Custom volumes for freestyle steps - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/#custom-volumes)
- Helm Environment Promotion boards (Enterprise) - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion)
- Pipeline resource metrics - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/monitoring-pipelines/#viewing-pipeline-metrics)


### December 2018

- Restart pipeline from failed steps - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/monitoring-pipelines/#restarting-the-pipeline)
- New variable for labels of a pull request - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#system-provided-variables)
- YAML validation without the GUI - [documentation]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#yaml-validation)
- Run builds from external forks - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#support-for-building-pull-requests-from-forks)
- Added OneLogin SSO support - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-onelogin/)
- Multiple test reports from a single pipeline - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/test-reports/#creating-multiple-reports)
- Historical data in Allure test reports are now available
- Inline YAML editor can now expand/collapse code blocks - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#writing-codefresh-yml-in-the-gui)


### November 2018

- Integrated test reports - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/test-reports/)
- Retry individual pipeline steps - [documentation]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step)
- Trigger integration with Azure Events - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/azure-triggers/)

### October 2018

- Parallel steps and advanced pipeline workflows - [documentation]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)
- New integration for Azure Helm repositories - [documentation]({{site.baseurl}}/docs/new-helm/add-helm-repository/#private-repository---azure)
- Trigger integration with Quay Events - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/quay-triggers/)
- Trigger integration with Artifactory Events - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/jfrog-triggers/)
- Public build logs for open source projects - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/build-status/#public-build-logs)

### September 2018

- New ability to group steps into pipeline steps - [documentation]({{site.baseurl}}/docs/codefresh-yaml/stages/)
- New dedicated *Pipelines* view for pipelines not linked to GIT repositories - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-creation-modes)
- New redesigned Logs view with persistent header and icons for steps
- ARM build support (alpha) - [documentation]({{site.baseurl}}/docs/incubation/arm-support/)
- New pipeline variables for Github releases - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#github-release-variables)

### August 2018

- Native Integration with Azure Kubernetes Service - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#adding-aks-cluster)
- Ability to configure SSO both in the customer and the account level (Enterprise)
- Azure SSO integration (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-oauth2/)
- OKTA SSO integration (Enterprise)
- Added Azure and Google as login/sign-up options
- You can now invite a collaborator who had signed up with a different GIT provider than yours
- Codefresh will now automatically merge accounts with the same email address
- Favorite Repositories are now persistent across sessions

### July 2018

- Can use any GIT provider (github, gitlab, bitbucket, stash) with the same Codefresh account
- Completely redesigned left sidebar with categories build/deploy/artifacts/configuration
- Build status for Pull requests are now per pipeline giving better feedback
- Added new variable `CF_BUILD_INITIATOR` for the person that started a build
- Improved retrying of push/pull actions after failures with timeouts and general connectivity issues.


### June 2018

- Ability to trigger builds only if a specific folder/file on a repository changes
- Ability to use the GUI for filtering specific Pull request events for triggers
- Ability to select if a manual trigger of a pipeline will change the git status of a pull request or not
- Ability to define a trigger based on the target branch of a pull request
- Ability to filter builds by the person that was the respective committer 

### May 2018

- Integrated Helm repositories for each Codefresh account
- Ability to specify custom triggers for each pipeline
- Ability to specify cron-like triggers
- Advanced Docker caching for faster builds
- Support for Enterprise Single Sign On
- Enterprise account management support
- Added Social Onboarding widget


### March 2018
- Ability to specify `entry_point` in freestyle steps
- Ability to specify `CMD` commands to work with images with entrypoints
- Ability to skip git clone step in pipelines
- Ability to specify Docker build option `target` for multi-stage builds
- Support for building containers for ARM processors (contact us)
- Pipeline initialization optimizations



### February 2018

- Chart install:
  - can now see default values for the chart, and override them
  - can now specify tiller namespace
- Can now connect to private authenticated chart repositories hosted in S3 or GCS bucket
- Helm release badge
- We can now integrate with Kubernetes clusters behind firewalls
- Can now provide context (shared configuration) to pipelines from the CLI

### January 2018
- Chart install: 
  - can now specify release name (useful for installing same chart multiple times)
  - can now add values file that is reusable for next installs
  - can now override individual values
- You can now add your own Helm repositories to the Helm Charts page
- Release details:
  - can now delete a release, with advanced options
  - can now test a release
  - can rollback to previous release
  - can visually see differences between releases
- Misc:
  - UI and bug fixes
  - reorganized Helm docs, including samples on how package charts and push to registry: [Create Helm artifacts using Codefresh pipeline]({{ site.baseurl }}/docs/new-helm/create-helm-artifacts-using-codefresh-pipeline/)
  - Pre-release of our brand new CLI at [https://github.com/codefresh-io/cli](https://github.com/codefresh-io/cli) 
  - Using our new cli, you can now execute many pipelines in parallel with different configurations for each

### December 2017
 - Manage your configurations in a centralized place, and inject them into pipelines as needed. supports secrets as well
 - Real time dashboard of the Helm releases in your connected Kubernetes cluster. Supports rollback to a previous release
 - Connect to helm charts repositories, and install them on your connected Kubernetes cluster


### October 2017
 - Apply changes to your pipeline and test it without committing to the source code for each change.
 -  Share your Codefresh YAML across pipelines. If you are using the same YAML file for multiple pipelines, use this option to update it in single place when needed to be applied for all pipelines.
 - Enrich your images with custom metadata which perfectly fits your flow and image management process.
 - Easily manage your cluster configuration using Codefresh by creating, importing and sharing Config maps between your Kubernetes namespaces and clusters.
 - If you want to trigger Codefresh pipelines from other tool, use our pipeline hook to build, test and deploy from any command line / script / 3rd party.
 - Test your cluster Credentials and connectivity in one click.
 - We added integration with main self hosted GIT providers to our PRO plan. You can now use Codefresh with your repos from:
   - Github enterprise
   - Bitbucket Enterprise
   - Gitlab enterprise.















