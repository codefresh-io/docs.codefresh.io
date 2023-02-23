---
title: "Changelog for Codefresh pipelines?"
description: "Changelog of new features and bug fixes"
group: whats-new
redirect_from:
  - /docs/whats-new/
toc: true
---
### January 2023

#### Features and enhancements
- Git clone step supports shallow clone - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/#fields)

### December 2022

#### Features and enhancements
- Track actual disk usage for build in the Disk Usage chart  - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-pipeline-metrics)
- Concurrency limit for pipelines increased to 30 - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#policies)



#### Bug fixes
- Runtime monitor fails to start on upgrading EKS (Elastic Cloud Kubernetes) to 1.21.
- Examples missing from the "Workflow" step catalog.

### November 2022

#### Features and enhancements
- Set disk space for a pipeline build volume - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#runtime)
- Support for latest Kubernetes cluster version 1.24 - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#prerequisites)


#### Bug fixes
- Workflow API returns 500 Internal Server Error.
- Helm releases not updated by refresh period.
- Get annotations request causes `cf-api` endpoints to restart.

### October 2022

#### Features and enhancements

- View/download logs for build or build steps as text, in addition to HTML - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewingdownloading-logs-for-builds-and-build-steps)
- View variables used in pipeline builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-variables-in-pipeline-builds)
- New option to trigger by PR comments from _any_ user - [documentation]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#pull-requests-from-comments)
- macOS/iOS builds are now available for the SaaS platform 


#### Bug fixes

- Selecting Cron trigger when cloning a pipeline, clones the pipeline without the Cron trigger. 
- Unable to delete clusters in a runtime even with Admin privileges.
- When creating or editing Helm boards, Promote pipeline selected reverts to Default Pipelines on save.
- Rollback status not updated in the UI after successful completion. 
- Failed test report step deletes artifacts instead of retry.  
- `get team users` command does not return User IDs.
- Repo (Origin Repo and Branch) links from the Builds or Build Details pages to GitHub Enterprise go instead to GitHub.  
- Email does not match error during sign-in to Azure with Corporate SSO when already authenticated.
- Authentication required error when pushing images to ACR (Azure Container Registry) using Service Principal credentials.
- Inconsistent results for Test Connection in ACR integration.
- Search results for pipelines in the Pipeline page include _all_ pipelines.
- (On-premises) LDAP login failure after upgrade to latest release.
- (On-premises) Release version either not visible in Codefresh UI, or does not reflect actual version.




### September 2022

#### Features and enhancements
- Pause pipeline execution for account - [documentation]({{site.baseurl}}/docs/administration/pipeline-settings/#pause-pipeline-executions)
- Traceability from child to parent builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#build-details)
- On-premises: `x-hub-signature-256`support for GitHub AE - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#enable-x-hub-signature-256-signature-for-github-ae)
- On-premises: Admins can selectively enable SSO providers for user accounts - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#selectively-enable-sso-providers)
- LDAP login with username and password, with email required only for first time sign-in
- For pipeline triggers/runs with Bitbucket Server, branch selection is supported via pagination or search



#### Bug fixes
- Validation error when entering username with period for new user account.
- Filtering pipelines by Tags returns incorrect results when user has read access to a subset of pipelines.

### July-August 2022

#### Features and enhancements
- New setting for Pipeline Concurrency: 0 (maintenance mode) - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#policies)
- Email notifications for successful and failed builds disabled by default for new users - [documentation]({{site.baseurl}}/docs/administration/user-settings/#email-notifications-for-builds)
- Codefresh Classic integration with Codefresh Hosted GitOps - [documentation]({{site.baseurl}}/docs/integrations/codefresh-hosted-gitops/)
- On-premises: New release of Codefresh Classic: v.1.2.12 (July 20, 2022) - [documentation]({{site.baseurl}}/docs/installation/codefresh-on-prem-upgrade/)
- Hosted runtime clusters upgraded to Kubernetes 1.22

#### Bug fixes
- Codefresh Classic On-premises: Fixed critical vulnerabilities as of July 2022.
- Resending email invitations results in "Problem sending invite" error.
- Audit search for triggers returns error with no search results (Audit Triggers > Search).
- Pipeline concurrency limit ignored periodically.
- "<" replaced by "&lt;" when creating inline YAML for pipeline via Terraform. 
- Step Variables are not resolved in Hooks.

### May 2022
- Datadog integration - [documentation]({{site.baseurl}}/docs/integrations/datadog)

### April 2022
- (On-premises only) Backward compatibility for infrastructure services - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#backward-compatibility-for-infrastructure-services)
- (On-premises only) High-Availability with active-passive clusters - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#high-availability-ha-with-active-passive-clusters)


### March 2022
- Support for Kubernetes 1.21 - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#prerequisites)
- Environment definition enhancements - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/#creating-an-environment)
- RBAC support for shared configuration - [documentation]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/)
- Cross-account push for Amazon ECR - [documentation]({{site.baseurl}}/docs/pipelines/steps/push/#fields)
- (On-premises only) Retention policy for Codefresh builds - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#retention-policy-for-codefresh-builds)
- Automated termination for 'Delayed' builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#applying-filters-on-the-build-view)


### January 2022
- Store test results using MinIO objects - [documentation]({{site.baseurl}}/docs/testing/test-reports/#connecting-minio-storage)
- Variables defined in `cf_export` override ones at the pipeline level - [documentation]({{site.baseurl}}/docs/pipelines/variables/#using-cf_export-command)
- Base URL for Codecov integrations - [documentation]({{site.baseurl}}/docs/integrations/codecov-integration)

## 2021

### November 2021
- Use shared_host_network attribute to access containers via loalhost - [documentation]({{site.baseurl}}/docs/pipelines/service-containers/#accessing-containers-via-localhost)
- Builds run locally are tagged as **Local** on the Builds page 
- Cross-region support for Amazom ECR integrations with the `region` attribute - [documentation]({{site.baseurl}}/docs/pipelines/steps/build/#fields)
- Option to add Helm charts as part of Helm environment definition - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/#defining-clustersnamespaces-for-each-environment)
- Option to filter Helm board by charts defined in Helm environment - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/#editing-your-helm-boards)  

### October 2021

- Monorepo triggers for Azure DevOps repositories - [documentation]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#monorepo-support-modified-files)
- ABAC for Git Contexts - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#abac-for-git-contexts)
- Hybrid Runner Debug Timeout Duration - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#debug-timeout-duration)

### September 2021

- Custom plugins can be used in hooks - [documentation]({{site.baseurl}}/docs/pipelines/hooks/#limitations-of-pipelinestep-hooks)
- Variables can now be used in hooks - [documentation]({{site.baseurl}}/docs/pipelines/hooks/#limitations-of-pipelinestep-hooks)
- New `CF_STEP_NAME` variable - [documentation]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables)
- Update Runner for GCE Disks - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#docker-cache-support-for-gke)

### August 2021

- Using AWS Service Account for ECR Integration - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/#setting-up-ecr-integration---service-account)
- Approval steps now have an extra confirmation - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/)
- Using Bitnami Sealed Secrets with GitOps - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/gitops-secrets/)
- App proxy is now available for Bitbucket server - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy)
- Public Marketplace Registry - [documentation]({{site.baseurl}}/docs/administration/pipeline-settings/#advanced-pipeline-options)
- Google Artifact Registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/google-artifact-registry)
- Pipeline Execution Context - [documentation]({{site.baseurl}}/docs/administration/account-user-management/pipeline-execution-context/)
- Fallback Registry for Docker Integrations - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/#fallback-registry)

### July 2021

- New platform IP addresses - [documentation]({{site.baseurl}}/docs/administration/platform-ip-addresses/)

### June 2021

- Pending Approval Timeout - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#fields)
- OneLogin SAML Setup - [documentation]({{site.baseurl}}/docs/single-sign-on/saml/saml-onelogin)

### May 2021

- Installing Codefresh Runner with Helm - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#installing-codefresh-runner-with-helm)
- Codecov Integration - [documentation]({{site.baseurl}}/docs/integrations/codecov-integration/)
- Dynamic preview environments - [documentation]({{site.baseurl}}/docs/ci-cd-guides/preview-environments/)
- Tag policy for transforming a Docker tag in lowercase or not  - [documentation]({{site.baseurl}}/docs/pipelines/steps/build/#fields)
- Support for App-of-app patterns in the GitOps dashboard- [documentation]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/#using-the-app-of-apps-pattern)

### April 2021

- Jira integration with Atlassian Open DevOps- [documentation]({{site.baseurl}}/docs/integrations/jira/)
- Canary deployments with Argo Rollouts - [documentation]({{site.baseurl}}/docs/ci-cd-guides/progressive-delivery/#canary-deployment-with-metrics-evaluation)
- Support SLAs - [documentation]({{site.baseurl}}/docs/terms-and-privacy-policy/sla/#support-specific-information)

### March 2021

- Native Support for Hashicorp Vault Secrets - [documentation]({{site.baseurl}}/docs/integrations/hashicorp-vault)
- Blue/Green deployments with Argo Rollouts - [documentation]({{site.baseurl}}/docs/ci-cd-guides/progressive-delivery/#blue-green-deployments)
- The [Modified Files filter]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#monorepo-support-modified-files) will now work on triggers triggered by Pull Request events. Notice: this might cause unexpected behavior if you have a trigger that is triggered by both Pull Request and Commit events with a Modified Files filter set. Previously the Modified Files filter would be ignored for Pull Request events. If you need different filters for Pull Requests and Commit events, we recommend you separate the trigger.
- Codefresh Runner on Rancher RKE 2.X - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#installing-on-rancher-rke-2x)
- Access service containers via localhost - [documentation]({{site.baseurl}}/docs/pipelines/service-containers/#accessing-containers-via-localhost)

### February 2021

- Concurrency Behavior for Pending Builds - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#define-concurrency-limits)
- Jira Integration - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/sending-the-notification-to-jira/)
- SLA Details - [documentation]({{site.baseurl}}/docs/terms-and-privacy-policy/sla/)
- Autoscaling Recommendations for Codefresh On-prem - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#app-cluster-autoscaling)
- Hide Inaccessible Clusters in the Kubernetes Dashboard - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#accessing-the-kubernetes-dashboard)
- Define Access for non-admins in Helm Repositories and Shared Config - [documentation]({{site.baseurl}}/docs/pipelines/shared-configuration/#level-of-access)
- Okta Auto-Sync of Teams - [documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-okta/#syncing-of-teams-after-initial-sso-setup)
- Global Pipeline Settings Screen - [documentation]({{site.baseurl}}/docs/administration/pipeline-settings)
- Helm 2 Support discontinued 

### January 2021

- Using external secrets in Codefresh GUI - [documentation]({{site.baseurl}}/docs/pipelines/configuration/secrets-store//#using-secrets-in-the-codefresh-gui)
- Using external secrets in Github, Gitlab and Bitbucket server integration - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#using-external-secrets-for-the-token)
- Using external secrets in shared configuration - [documentation]({{site.baseurl}}/docs/pipelines/shared-configuration/#using-external-secrets-as-values)
- Using external secrets in cloud storage integration - [documentation]({{site.baseurl}}/docs/testing/test-reports/#connecting-an-s3-bucket)
- Get Code Coverage Reports with Codacy - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/codacy-testing)
- Git clone now supports a proxy connection - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/#using-git-behind-a-proxy)
- Support for other container runtimes (containerd, cri-o) in the Runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#prerequisites)
- Giving visibility of your account to Codefresh support personnel is now explicit - [documentation]({{site.baseurl}}/docs/administration/user-settings/#enable-access-for-support-personnel)
- New paging mechanism for builds/images that might break custom integrations - [documentation]({{site.baseurl}}/docs/troubleshooting/common-issues/paging-issues-builds-images/)
- Note for Okta sync - [documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-okta/#how-okta-syncing-works)
- cf_export limitations - [documentation]({{site.baseurl}}/docs/troubleshooting/common-issues/cf-export-limitations/)
- Default SSO provider - [documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#setting-a-default-provider)
- Codefresh runner now has a dry run option - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#inspecting-the-manifests-before-they-are-installed)
- Connect to Azure Kubernetes with a service principal - [documentation]({{site.baseurl}}//#adding-an-aks-cluster-with-a-service-principal)
- Connect to an Azure Helm repository with a service principal - [documentation]({{site.baseurl}}/docs/integrations/helm/#private-helm-repository---azure-with-service-principal)

## 2020

### December 2020

- Get Code Coverage Reports with Coveralls - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/coveralls-testing)
- Codefresh will now use the default branch (e.g. `main`) instead of assuming `master`. This applies to GitHub, GitLab, and Bitbucket - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/)
- App-Proxy now supports GitLab - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy)
- Helm promotion pipelines can be overridden in the GUI  - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/#creating-your-own-helm-board)
- Internal Registry mirror for the Codefresh runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#internal-registry-mirror)
- Production and staging deployments guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/environment-deployments/)
- Escaping YAML in pipelines - [documentation]({{site.baseurl}}/docs/pipelines/what-is-the-pipelines/#escaping-strings)
- GitOps dashboard now shows affected services for each release - [documentation]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/#working-with-the-gitops-dashboard)
- Time based filters in build view - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#applying-filters-on-the-build-view)

### November 2020

- Pushing Images to the Digital Ocean Container Registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/digital-ocean-container-registry)
- Getting Code Coverage Reports with Codecov - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/codecov-testing)
- Integrating SonarQube Analysis into your Pipelines - [documentation]({{site.baseurl}}/docs/testing/sonarqube-integration/)
- GitOps deployments - [documentation]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
- Global volume mounts in the Codefresh runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#custom-volume-mounts)
- Global environment variables in the Codefresh runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#custom-global-environment-variables)
- The Codefresh UI was upgraded to Angular 10. Check the details for supported browsers at our [FAQ]({{site.baseurl}}/docs/getting-started/faq/#user-interface) section.

### October 2020

- Using Google for SSO - [documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-google/)
- Setting-up Helm Triggers in your Codefresh pipeline with the Codefresh UI - [documentation]({{site.baseurl}}/docs/pipelines/triggers/helm-triggers/)
- Using the GitHub Container registry as Docker registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/github-container-registry/)
- Simplified Git operations with the App Proxy for the Codefresh runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy)
- Upgrade Codefresh on-prem - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#upgrade-the-codefresh-platform)

### September 2020

- Security timeout - [documentation]({{site.baseurl}}/docs/administration/access-control/#security-timeout)
- Preserve pipeline volume after approval - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#keeping-the-shared-volume-after-an-approval)
- DockerHub rate limit issue - [documentation]({{site.baseurl}}/docs/troubleshooting/common-issues/dockerhub-rate-limit/)

### August 2020

- Pipeline/step hooks - [documentation]({{site.baseurl}}/docs/pipelines/hooks)
- Pipeline templates - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#using-pipeline-templates)
- Pipeline definition restrictions - [documentation]({{site.baseurl}}/docs/administration/access-control/#pipeline-definition-restrictions)
- Concurrency limits per branch - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#policies)
- Custom pipeline variables for Helm promotion - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/#promoting-helm-releases-with-the-gui)

### July 2020

- Building apps guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/packaging-compilation/)
- Creating Docker images guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/)
- Pull requests guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/)
- Microservice guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/microservices/)
- Using GitHub packages as Docker registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/github-packages/)
- Check if a variable exists - [documentation]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/#execute-steps-according-to-the-presence-of-a-variable)

### June 2020

- New Codefresh Runner installation - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/)
- Using multiple Registry integrations with the same domain - [documentation]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain)
- Multiple Dockerhub integrations - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/#adding-more-dockerhub-integrations)
- Global Docker registry prefix/repository - [documentation]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#pushing-images-with-an-optional-prefix)
- Integration with the GitHub App mechanism - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#github-app)
- Caching Registry selection - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/#the-caching-registry)
- Example with Rust/Cargo - [documentation]({{site.baseurl}}/docs/learn-by-example/rust/)

### May 2020

- Masking encrypted variables in logs - [documentation]({{site.baseurl}}/docs/pipelines/variables/#masking-variables-in-logs)
- Restrict Codefresh to specific namespace - [documentation]({{site.baseurl}}/docs/integrations/kubernetes/#restrict-codefresh-access-to-a-specific-namespace)
- Deploy with Kustomize - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/deploy-with-kustomize)
- Installing the Codefresh Runner on a multi AZ GKE cluster - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/#using-multiple-availability-zones)
- Masking encrypted variables in logs - [documentation]({{site.baseurl}}/docs/pipelines/variables/#masking-variables-in-logs)

### April 2020

- Helm release text message - [documentation]({{site.baseurl}}/docs/new-helm/helm-releases-management/#showing-an-upgrade-message)
- Integration with Google Cloud Build - [documentation]({{site.baseurl}}/docs/integrations/gcloud-builder/)
- Deploy to Heroku - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/deploy-to-heroku/)
- Scala: Hello World (updated) - [documentation]({{site.baseurl}}/docs/learn-by-example/scala/scala-hello-world/)
- New variable `CF_BRANCH_TAG_NORMALIZED_LOWER_CASE` - [documentation]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables)
- Trigger a Kubernetes Deployment from a Dockerhub Push Event - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/trigger-a-k8s-deployment-from-docker-registry/)
- Uploading or Downloading from a Google Storage Bucket - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/uploading-or-downloading-from-gs/)
- Use GitHub Actions no longer requires a registry - [documentation]({{site.baseurl}}/docs/integrations/github-actions/#how-it-works)
- Alternative debugging console - [documentation]({{site.baseurl}}/docs/pipelines/debugging-pipelines/#using-the-alternative-debug-window)
- User variable priority rules - [documentation]({{site.baseurl}}/docs/pipelines/variables/#user-provided-variables)
- Secret Storage - [documentation]({{site.baseurl}}/docs/pipelines/secrets-store/)
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
- New [dashboard](https://g.codefresh.io/builds) for builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)
  - The git-event name is now included
  - Event-specific additional information is now included
  - The trigger name is now included
  - Filtering by trigger-type (git, cron, registry, helm, manual) is now available
  - Filtering by git-event type is now available
  - Cleanup and removal of unneeded information
- Payment screen improvements
  - Clearer error messages for failed payments
  - Clearer messages for confirmation/error dialogs
  - New in-app notifications for plan upgrades and downgrades
  - New in-app notifications for subscription payment issues
- New UX flow for the signup process
- Updated OneLogin SSO support - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-onelogin/)
- Published Codefresh Platform IPs - [documentation]({{site.baseurl}}/docs/integrations/kubernetes/#prerequisites)
- Installing the Codefresh Runner in AWS - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/#installing-on-aws)
- Amazon ECS/Fargate deployment example - [documentation]({{site.baseurl}}/docs/deploy-your-containers/amazon-ecs/)

### January 2020

- New deployment environment dashboard - [documentation]({{site.baseurl}}/docs/pipelines/deployment-environments)
- Support for Azure Storage in test reports - [documentation]({{site.baseurl}}/docs/testing/test-reports/#connecting-azure-storage)
- Promoting Docker images - [documentation]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#promoting-docker-images)
- Using Dockerhub personal access tokens - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/)
- Updated Azure SSO instructions - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-azure/)
- Codefresh Runner requirements - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/#system-requirements)

## 2019

### December 2019

- Output parameters in plugins - [documentation]({{site.baseurl}}/docs/pipelines/steps/#example-with-output-parameters)
- Preload a DB with test data before integration tests - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/populate-a-database-with-existing-data/)
- Using templates in custom pipeline steps - [documentation]({{site.baseurl}}/docs/pipelines/steps/#example-with-step-templating)

### November 2019

- Digital Ocean cluster integration - [documentation]({{site.baseurl}}/docs/integrations/kubernetes/#adding-a-digital-ocean-cluster)
- Build caching guide - [documentation]({{site.baseurl}}/docs/pipelines/pipeline-caching/)
- Versioning for plugins - [documentation]({{site.baseurl}}/docs/pipelines/steps/#versioning-of-typed-steps)
- Step example with input parameters - [documentation]({{site.baseurl}}/docs/pipelines/steps/#example-with-input-parameters)
- Example with C and make - [documentation]({{site.baseurl}}/docs/learn-by-example/cc/c-make/)
- Example with C++ and cmake - [documentation]({{site.baseurl}}/docs/learn-by-example/cc/cpp-cmake/)
- Example with C# and .NET core - [documentation]({{site.baseurl}}/docs/learn-by-example/dotnet/)

### October 2019

- Debugging pipelines with breakpoints - [documentation]({{site.baseurl}}/docs/pipelines/debugging-pipelines/)
- Matrix builds and implicit parallel steps - [documentation]({{site.baseurl}}/docs/pipelines/advanced-workflows/#implicit-parallel-steps)
- New Build view filters - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#creating-build-views)
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
- Explicit External Resources - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#external-resources)
- Kubernetes connection issues - [documentation]({{site.baseurl}}/docs/troubleshooting/common-issues/forbidden-cluster-resources/)
- Codefresh F.A.Q. - [documentation]({{site.baseurl}}/docs/getting-started/faq/)

### August 2019

- Sidecar services in pipelines - [documentation]({{site.baseurl}}/docs/pipelines/service-containers/)
- Personal Git providers are deprecated - [documentation]({{site.baseurl}}/docs/troubleshooting/personal-git-deprecation/)
- Migrate from Jenkins to Codefresh - [documentation]({{site.baseurl}}/docs/integrations/jenkins-integration/#migrating-from-jenkins-to-codefresh)
- macOS and iOS builds closed Alpha - [documentation]({{site.baseurl}}/docs/incubation/osx-ios-builds/)

### July 2019

- New custom step creation process - [documentation]({{site.baseurl}}/docs/pipelines/steps/#creating-your-own-step)
- Approval steps now have timeouts - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#automatic-approvalsrejections)
- Approval steps now have access control - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#approval-restrictions)
- Concurrency limits on pipelines - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings)
- Termination settings on pipelines - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings)
- API keys now have different access scopes - [documentation]({{site.baseurl}}/docs/integrations/codefresh-api/#access-scopes)

### June 2019

- Added `CI=true` environment variable - [documentation]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables)
- Buildkit support - [documentation]({{site.baseurl}}/docs/pipelines/steps/build/#buildkit-support)
- Security scanning - [documentation]({{site.baseurl}}/docs/testing/security-scanning/)
- Root pipeline anchors - [documentation]({{site.baseurl}}/docs/pipelines/what-is-the-pipelines/#using-yaml-anchors-to-avoid-repetition)
- Building Android Apps - [documentation]({{site.baseurl}}/docs/learn-by-example/mobile/android/)
- Deployment to Nomad clusters - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/nomad/)
- Editing of annotations - [documentation]({{site.baseurl}}/docs/pipelines/annotations/#viewingediting-annotations)

### May 2019

- Triggers can now be enabled/disabled - [documentation]({{site.baseurl}}/docs/pipelines/triggers/#disabling-triggers)
- New GitHub PR variables - [documentation]({{site.baseurl}}/docs/pipelines/variables/#github-pull-request-variables)
- Inline Dockerfiles in build steps - [documentation]({{site.baseurl}}/docs/pipelines/steps/build/#inline-dockerfile)
- LDAP SSO support (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-ldap/)
- SAML SSO support (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-saml2/#setting-up-saml-integration)
- Audit logs (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/audit-logs/)
- Checking out code with Subversion, HG, Perforce etc. - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/non-git-checkout/)
- Migrating to explicit git clone steps - [documentation]({{site.baseurl}}/docs/troubleshooting/git-step-migration/)
- Custom annotations on projects, pipelines, builds - [documentation]({{site.baseurl}}/docs/pipelines/annotations/)
- Deployments with Pulumi - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/pulumi/)
- Deployments with Terraform - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/terraform/)
- Codefresh Runner installation - [documentation]({{site.baseurl}}/docs/enterprise/codefresh-runner/)
- Multiple Dockerhub integrations - [documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/#adding-more-dockerhub-integrations)

### April 2019

- New project/pipeline view - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/)
- Git clone steps are now required - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/)
- Simple Kubernetes templates - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/)

### March 2019

- Helm best practices - [documentation]({{site.baseurl}}/docs/new-helm/helm-best-practices/)
- Pushing images in parallel with multiple tags - [documentation]({{site.baseurl}}/docs/pipelines/steps/push/#examples)
- Integration with Azure DevOps Repositories - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#azure-devops)
- OAuth2 Connections for supported git providers - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#adding-more-git-providers-to-your-codefresh-account)
- Pipeline ABAC (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/access-control/#marking-pipelines-with-policy-attributes)

### February 2019

- Access Control (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/access-control/)
- Accessing the shared volume in compositions - [documentation]({{site.baseurl}}/docs/pipelines/steps/composition/#accesing-your-project-folder-from-a-composition)
- Reuse Git integration in custom clone step - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/#reuse-a-git-token-from-codefresh-integrations)
- Run custom Kubectl commands - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/)
- Reading Image metadata - [documentation]({{site.baseurl}}/docs/docker-registries/metadata-annotations/#using-custom-metadata-in-codefresh-pipelines)
- Codefresh build agent - [documentation]({{site.baseurl}}/docs/enterprise/behind-the-firewall/)

### January 2019

- Manual approval step - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/)
- Shared configuration - [documentation]({{site.baseurl}}/docs/pipelines/shared-configuration/)
- Running pipelines locally - [documentation]({{site.baseurl}}/docs/pipelines/running-pipelines-locally/)
- Installation options (Enterprise) - [documentation]({{site.baseurl}}/docs/enterprise/installation-security)
- Custom volumes for freestyle steps - [documentation]({{site.baseurl}}/docs/pipelines/steps/freestyle/#custom-volumes)
- Helm Environment Promotion boards (Enterprise) - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion)
- Pipeline resource metrics - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-pipeline-metrics)

## 2018

### December 2018

- Restart pipeline from failed steps - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#restarting-the-pipeline)
- New variable for labels of a pull request - [documentation]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables)
- YAML validation without the GUI - [documentation]({{site.baseurl}}/docs/pipelines/what-is-the-pipelines/#yaml-validation)
- Run builds from external forks - [documentation]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#support-for-building-pull-requests-from-forks)
- Google Marketplace Integration - [documentation]({{site.baseurl}}/docs/integrations/google-marketplace/)
- Added OneLogin SSO support - [documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-onelogin/)
- Multiple test reports from a single pipeline - [documentation]({{site.baseurl}}/docs/pipelines/test-reports/#creating-multiple-reports)
- Historical data in Allure test reports are now available
- Inline YAML editor can now expand/collapse code blocks - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#writing-codefresh-yml-in-the-gui)

### November 2018

- Integrated test reports - [documentation]({{site.baseurl}}/docs/pipelines/test-reports/)
- Retry individual pipeline steps - [documentation]({{site.baseurl}}/docs/pipelines/what-is-the-pipelines/#retrying-a-step)
- Trigger integration with Azure Events - [documentation]({{site.baseurl}}/docs/pipelines/triggers/azure-triggers/)

### October 2018

- Parallel steps and advanced pipeline workflows - [documentation]({{site.baseurl}}/docs/pipelines/advanced-workflows/)
- New integration for Azure Helm repositories - [documentation]({{site.baseurl}}/docs/new-helm/add-helm-repository/#private-repository---azure)
- Trigger integration with Quay Events - [documentation]({{site.baseurl}}/docs/pipelines/triggers/quay-triggers/)
- Trigger integration with Artifactory Events - [documentation]({{site.baseurl}}/docs/pipelines/triggers/jfrog-triggers/)
- Public build logs for open source projects - [documentation]({{site.baseurl}}/docs/pipelines/build-status/#public-build-logs)

### September 2018

- New ability to group steps into pipeline steps - [documentation]({{site.baseurl}}/docs/pipelines/stages/)
- New dedicated *Pipelines* view for pipelines not linked to GIT repositories - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-creation-modes)
- New redesigned Logs view with persistent header and icons for steps
- ARM build support (alpha) - [documentation]({{site.baseurl}}/docs/incubation/arm-support/)
- New pipeline variables for GitHub releases - [documentation]({{site.baseurl}}/docs/pipelines/variables/#github-release-variables)

### August 2018

- Native Integration with Azure Kubernetes Service - [documentation]({{site.baseurl}}/docs/integrations/kubernetes/#adding-an-aks-cluster)
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
  - reorganized Helm docs, including samples on how package charts and push to registry: [Create Helm artifacts using Codefresh pipeline]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)
  - Pre-release of our brand new CLI at [https://github.com/codefresh-io/cli](https://github.com/codefresh-io/cli)
  - Using our new cli, you can now execute many pipelines in parallel with different configurations for each.

## 2017

### December 2017

- Manage your configurations in a centralized place and inject them into pipelines as needed. supports secrets as well.
- Real time dashboard of the Helm releases in your connected Kubernetes cluster. Supports rollback to a previous release.
- Connect to helm charts repositories, and install them on your connected Kubernetes cluster.

### October 2017

- Apply changes to your pipeline and test it without committing to the source code for each change.
- Share your Codefresh YAML across pipelines. If you are using the same YAML file for multiple pipelines, use this option to update it in single place when needed to be applied for all pipelines.
- Enrich your images with custom metadata which perfectly fits your flow and image management process.
- Easily manage your cluster configuration using Codefresh by creating, importing and sharing Config maps between your Kubernetes namespaces and clusters.
- If you want to trigger Codefresh pipelines from other tool, use our pipeline hook to build, test and deploy from any command line / script / 3rd party.
- Test your cluster Credentials and connectivity in one click.
- We added integration with main self-hosted GIT providers to our PRO plan. You can now use Codefresh with your repositories from:
  - GitHub enterprise
  - Bitbucket Enterprise
  - GitLab enterprise
