---
title: "Whats New In Codefresh?"
description: "A changelog of new features"
group: whats-new
redirect_from:
  - /docs/whats-new/
toc: true
---
Recent Codefresh updates:

### January 2020

- New deployment environment dashboard - [documentation]({{site.baseurl}}/docs/codefresh-yaml/deployment-environments)
- Support for Azure Storage in test reports - [documentation]({{site.baseurl}}/docs/testing/test-reports/#connecting-azure-storage)
- Promoting Docker images - [documentation]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#promoting-docker-images)
- Using Dockerhub personal access tokens - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/)
- Updated Azure SSO instructions - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-azure/)


### December 2019

- Output parameters in plugins - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/#example-with-output-parameters)
- Preload a DB with test data before integration tests - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/populate-a-database-with-existing-data/)
- Using templates in custom pipeline steps - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/#example-with-step-templating)

### November 2019

- Digital Ocean cluster integration - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#adding-a-digital-ocean-cluster)
- Build caching guide - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/)
- Versioning for plugins - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/#versioning-of-typed-steps)
- Step example with input parameters - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/#example-with-input-parameters)
- Example with C and make - [documentation]({{site.baseurl}}/docs/learn-by-example/cc/c-make/)
- Example with C++ and cmake - [documentation]({{site.baseurl}}/docs/learn-by-example/cc/cpp-cmake/)
- Example with C# and .NET core - [documentation]({{site.baseurl}}/docs/learn-by-example/dotnet/)

### October 2019

- Debugging pipelines with breakpoints - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/debugging-pipelines/)
- Matrix builds and implicit paralllel steps - [documentation]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/#implicit-parallel-steps)
- New Build view filters - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/monitoring-pipelines/#creating-build-views)
- Deployments with Packer - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/packer-gcloud/)
- Calling child pipelines - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/call-child-pipelines/)


### September 2019

- Unit testing guide - [documentation]({{site.baseurl}}/docs/testing/unit-tests)
- Unit test example - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/run-unit-tests/)
- Integration testing guide - [documentation]({{site.baseurl}}/docs/testing/integration-tests/)
- Integration test example - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/run-integration-tests/)
- Redis Integration test example - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-redis/)
- MongoDB Integration test example - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mongo/)
- MySQL Integration test example - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mysql/)
- PostgreSQL Integration test example - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-postgres/)
- Explicit External Resources - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#external-resources)
- Kubernetes connection issues - [documentation]({{site.baseurl}}/docs/troubleshooting/common-issues/forbidden-cluster-resources/)
- Codefresh F.A.Q. - [documentation]({{site.baseurl}}/docs/getting-started/faq/)

### August 2019

- Sidecar services in pipelines - [documentation]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
- Personal Git providers are deprecated - [documentation]({{site.baseurl}}/docs/troubleshooting/personal-git-deprecation/)
- Migrate from Jenkins to Codefresh - [documentation]({{site.baseurl}}/docs/integrations/jenkins-integration/#migrating-from-jenkins-to-codefresh)
- MacOSX and iOS builds closed Alpha - [documentation]({{site.baseurl}}/docs/incubation/osx-ios-builds/)


### July 2019

- New custom step creation process - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/#creating-your-own-step)
- Approval steps have now timeouts - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/#automatic-approvalsrejections)
- Approval steps have now access control - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/#approval-restrictions)
- Concurrency limits on pipelines - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings)
- Termination setttings on pipelines - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings)
- API keys have now different access scopes - [documentation]({{site.baseurl}}/docs/integrations/codefresh-api/#access-scopes)




### June 2019

- Added `CI=true` environment variable - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#system-provided-variables)
- Buildkit support - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/build/#buildkit-support)
- Security scanning - [documentation]({{site.baseurl}}/docs/testing/security-scanning/)
- Root pipeline anchors - [documentation]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#using-yaml-anchors-to-avoid-repetition)
- Building Android Apps - [documentation]({{site.baseurl}}/docs/learn-by-example/mobile/android/)
- Deployment to Nomad clusters - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/nomad/)
- Editing of annotations - [documentation]({{site.baseurl}}/docs/codefresh-yaml/annotations/#viewingediting-annotations)


### May 2019

- Triggers can now be enabled/disabled - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/#disabling-triggers)
- New GitHub PR variables - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#github-pull-request-variables)
- Inline Dockerfiles in build steps - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/build/#inline-dockerfile)
- LDAP SSO support (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-ldap/)
- SAML SSO support (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-saml2/#setting-up-saml-integration)
- Audit logs (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/audit-logs/)
- Checking out code with Subversion, HG, Perforce etc. - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/non-git-checkout/)
- Migrating to explicit git clone steps - [documentation]({{site.baseurl}}/docs/troubleshooting/git-step-migration/)
- Custom annotations on projects, pipelines, builds - [documentation]({{site.baseurl}}/docs/codefresh-yaml/annotations/)
- Deployments with Pulumi - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/pulumi/)
- Deployments with Terraform - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/terraform/)
- Codefresh Runner installation - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/)
- Multiple Dockerhub integrations - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/#adding-more-dockerhub-integrations)

### April 2019

- New project/pipeline view - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
- Git clone steps are now required - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- Simple Kubernetes templates - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/)

### March 2019

- Helm best practices - [documentation]({{site.baseurl}}/docs/new-helm/helm-best-practices/)
- Pushing images in parallel with multiple tags - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/push/#examples)
- Integration with Azure DevOps Repositories - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#azure-devops)
- OAuth2 Connections for supported git providers - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#adding-more-git-providers-to-your-codefresh-account)
- Pipeline ABAC (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/access-control/#marking-pipelines-with-policy-attributes)


### February 2019

- Access Control (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/access-control/)
- Accessing the shared volume in compositions - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/composition/#accesing-your-project-folder-from-a-composition)
- Reuse Git integration in custom clone step - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/#reuse-a-git-token-from-codefresh-integrations)
- Run custom Kubectl commands - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/)
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
- Google Marketplace Integration - [documentation]({{site.baseurl}}/docs/integrations/google-marketplace/)
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
- New pipeline variables for GitHub releases - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#github-release-variables)

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
- Ability to specify `CMD` commands to work with images with entry points
- Ability to skip git clone step in pipelines
- Ability to specify Docker build option `target` for multi-stage builds
- Support for building containers for ARM processors (contact us)
- Pipeline initialization optimizations



### February 2018

- Chart install:
  - Can now see default values for the chart, and override them
  - Can now specify tiller namespace
- Can now connect to private authenticated chart repositories hosted in S3 or GCS bucket.
- Helm release badge.
- We can now integrate with Kubernetes clusters behind firewalls.
- Can now provide context (shared configuration) to pipelines from the CLI.

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
  - UI and bug fixes.
  - reorganized Helm docs, including samples on how package charts and push to registry: [Create Helm artifacts using Codefresh pipeline]({{ site.baseurl }}/docs/new-helm/create-helm-artifacts-using-codefresh-pipeline/)
  - Pre-release of our brand new CLI at [https://github.com/codefresh-io/cli](https://github.com/codefresh-io/cli)
  - Using our new cli, you can now execute many pipelines in parallel with different configurations for each.

### December 2017
 - Manage your configurations in a centralized place and inject them into pipelines as needed. supports secrets as well.
 - Real time dashboard of the Helm releases in your connected Kubernetes cluster. Supports rollback to a previous release.
 - Connect to helm charts repositories, and install them on your connected Kubernetes cluster.


### October 2017
 - Apply changes to your pipeline and test it without committing to the source code for each change.
 -  Share your Codefresh YAML across pipelines. If you are using the same YAML file for multiple pipelines, use this option to update it in single place when needed to be applied for all pipelines.
 - Enrich your images with custom metadata which perfectly fits your flow and image management process.
 - Easily manage your cluster configuration using Codefresh by creating, importing and sharing Config maps between your Kubernetes namespaces and clusters.
 - If you want to trigger Codefresh pipelines from other tool, use our pipeline hook to build, test and deploy from any command line / script / 3rd party.
 - Test your cluster Credentials and connectivity in one click.
 - We added integration with main self-hosted GIT providers to our PRO plan. You can now use Codefresh with your repos from:
   - GitHub enterprise
   - Bitbucket Enterprise
   - Gitlab enterprise















