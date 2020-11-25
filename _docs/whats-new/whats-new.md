---
title: "Whats New In Codefresh?"
description: "A changelog of new features"
group: whats-new
redirect_from:
  - /docs/whats-new/
toc: true
---

Recent Codefresh updates:

### November 2020

- Codecov coverage reports - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/codecov-testing)
- SonarQube Plugin - [documentation]({{site.baseurl}}/docs/testing/sonarqube-integration/)
- GitOps deployments - [documentation]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
- Global volume mounts in the Codefresh runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#custom-volume-mounts)
- Global environment variables in the Codefresh runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#custom-global-environment-variables)
- The Codefresh UI was upgraded to Angular 10. Check the details for supported browsers at our [FAQ]({{site.baseurl}}/docs/getting-started/faq/#user-interface) section.

### October 2020

- Using Google for SSO - [documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-google/)
- Setting-up Helm Triggers in your Codefresh pipeline with the Codefresh UI - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/helm-triggers/)
- Using the GitHub Container registry as Docker registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/github-container-registry/)
- Simplified Git operations with the App Proxy for the Codefresh runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy)
- Upgrade Codefresh on-prem - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#upgrade-the-codefresh-platform)

### September 2020

- Security timeout - [documentation]({{site.baseurl}}/docs/administration/access-control/#security-timeout)
- Preserve pipeline volume after approval - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/#keeping-the-shared-volume-after-an-approval)
- DockerHub rate limit issue - [documentation]({{site.baseurl}}/docs/troubleshooting/common-issues/dockerhub-rate-limit/)

### August 2020

- Pipeline/step hooks - [documentation]({{site.baseurl}}/docs/codefresh-yaml/hooks)
- Pipeline templates - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#using-pipeline-templates)
- Pipeline definition restrictions - [documentation]({{site.baseurl}}/docs/administration/access-control/#pipeline-definition-restrictions)
- Concurrency limits per branch - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#policies)
- Custom pipeline variables for Helm promotion - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/#promoting-helm-releases-with-the-gui)


### July 2020

- Building apps guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/packaging-compilation/)
- Creating Docker images guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/)
- Pull requests guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/)
- Microservice guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/microservices/)
- Using GitHub packages as Docker registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/github-packages/)
- Check if a variable exists - [documentation]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/#execute-steps-according-to-the-presence-of-a-variable)

### June 2020

- New Codefresh Runner installation - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/)
- Using multiple Registry integrations with the same domain - [documentation]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain)
- Multiple Dockerhub integrations - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/#adding-more-dockerhub-integrations)
- Global Docker registry prefix/repository - [documentation]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#pushing-images-with-an-optional-prefix)
- Integration with the GitHub App mechanism - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#github-app)
- Caching Registry selection - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/#the-caching-registry)
- Example with Rust/Cargo - [documentation]({{site.baseurl}}/docs/learn-by-example/rust/)

### May 2020

- Masking encrypted variables in logs - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#masking-variables-in-logs)
- Restrict Codefresh to specific namespace - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#restrict-codefresh-access-to-a-specific-namespace)
- Deploy with Kustomize - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/deploy-with-kustomize)
- Installing the Codefresh Runner on a multi AZ GKE cluster - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/#using-multiple-availability-zones)
- Masking encrypted variables in logs - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#masking-variables-in-logs)

### April 2020

- Helm release text message - [documentation]({{site.baseurl}}/docs/new-helm/helm-releases-management/#showing-an-upgrade-message)
- Integration with Google Cloud Build - [documentation]({{site.baseurl}}/docs/integrations/gcloud-builder/)
- Deploy to Heroku - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/deploy-to-heroku/)
- Scala: Hello World (updated) - [documentation]({{site.baseurl}}/docs/learn-by-example/scala/scala-hello-world/)
- New variable `CF_BRANCH_TAG_NORMALIZED_LOWER_CASE` - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#system-provided-variables)
- Trigger a Kubernetes Deployment from a Dockerhub Push Event - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/trigger-a-k8s-deployment-from-docker-registry/)
- Uploading or Downloading from a Google Storage Bucket - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/uploading-or-downloading-from-gs/)
- Use GitHub Actions no longer requires a registry - [documentation]({{site.baseurl}}/docs/integrations/github-actions/#how-it-works)
- Alternative debugging console - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/debugging-pipelines/#using-the-alternative-debug-window)
- User variable priority rules - [documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/#user-provided-variables)
- Secret Storage - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/secrets-store/)
- Run multiple kinds of unit tests using fan-in-fan-out parallel pipeline - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/fan-in-fan-out) 


### March 2020

- Removal of the Codefresh registry - [documentation]({{site.baseurl}}/docs/docker-registries/cfcr-deprecation/)
- Helm quick start guide for Helm 3  - [documentation]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/)
- Deployment example for Helm 3  - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/helm/)
- Helm 3 release dashboard - [documentation]({{site.baseurl}}/docs/new-helm/helm-releases-management/#choosing-between-helm-2-and-helm-3-releases)
- Helm 3 recommended labels - [documentation]({{site.baseurl}}/docs/new-helm/helm-releases-management/#viewing-details-and-history-from-a-helm-release)
- Environment board now supports Helm 3 - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)
- Promotion board now supports Helm 3 - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/)
- New pipeline Helm step - [documentation]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/#examples)
- Variables available for Helm pipelines - [documentation]({{site.baseurl}}/docs/new-helm/helm-releases-management/#overriding-the-default-helm-actions)
- Both Helm 2 and Helm 3 clusters can be used at the same time
- Installing the Codefresh runner behind proxy - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/#installing-behind-a-proxy)
- Using Vault secrets in the Pipeline - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/vault-secrets-in-the-pipeline/)
- Deploy to a VM using FTP - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/transferring-php-ftp)
- Deploy to Tomcat using SCP - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/deploy-to-tomcat-via-scp)
- Decryption with Mozilla SOPS - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/decryption-with-mozilla-sops)

### February 2020

- Beta Support for Helm 3 - [documentation]({{site.baseurl}}/docs/new-helm/helm3/)
- Use GitHub Actions as Codefresh pipeline steps - [documentation]({{site.baseurl}}/docs/integrations/github-actions/)
- Publish a JAR to Artifactory/Nexus - [documentation]({{site.baseurl}}/docs/learn-by-example/java/publish-jar/)
- New [dashboard](https://g.codefresh.io/builds) for builds - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/monitoring-pipelines/)
  *  The git-event name is now included
  *  Event-specific additional information is now included
  *  The trigger name is now included
  *  Filtering by trigger-type (git, cron, registry, helm, manual) is now available
  *  Filtering by git-event type is now available
  *  Cleanup and removal of unneeded information
- Payment screen improvements
  * Clearer error messages for failed payments
  * Clearer messages for confirmation/error dialogs
  * New in-app notifications for plan upgrades and downgrades
  * New in-app notifications for subscription payment issues 
- New UX flow for the signup process
- Updated OneLogin SSO support - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-onelogin/)
- Published Codefresh Platform IPs - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#prerequisites)
- Installing the Codefresh Runner in AWS - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/#installing-on-aws)
- Amazon ECS/Fargate deployment example - [documentation]({{site.baseurl}}/docs/deploy-your-containers/amazon-ecs/)

### January 2020

- New deployment environment dashboard - [documentation]({{site.baseurl}}/docs/codefresh-yaml/deployment-environments)
- Support for Azure Storage in test reports - [documentation]({{site.baseurl}}/docs/testing/test-reports/#connecting-azure-storage)
- Promoting Docker images - [documentation]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#promoting-docker-images)
- Using Dockerhub personal access tokens - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/)
- Updated Azure SSO instructions - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-azure/)
- Codefresh Runner requirements - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/#system-requirements)

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
- Matrix builds and implicit parallel steps - [documentation]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/#implicit-parallel-steps)
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
- macOS and iOS builds closed Alpha - [documentation]({{site.baseurl}}/docs/incubation/osx-ios-builds/)


### July 2019

- New custom step creation process - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/#creating-your-own-step)
- Approval steps now have timeouts - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/#automatic-approvalsrejections)
- Approval steps now have access control - [documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/#approval-restrictions)
- Concurrency limits on pipelines - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings)
- Termination settings on pipelines - [documentation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings)
- API keys now have different access scopes - [documentation]({{site.baseurl}}/docs/integrations/codefresh-api/#access-scopes)




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
  - reorganized Helm docs, including samples on how package charts and push to registry: [Create Helm artifacts using Codefresh pipeline]({{site.baseurl}}/docs/new-helm/create-helm-artifacts-using-codefresh-pipeline/)
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
 - We added integration with main self-hosted GIT providers to our PRO plan. You can now use Codefresh with your repositories from:
   - GitHub enterprise
   - Bitbucket Enterprise
   - GitLab enterprise















