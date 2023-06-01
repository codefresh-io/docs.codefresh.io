---
title: "Piplelines Changelog: January to November 2021"
description: "Changelog and Release Notes for Pipelines (Classic)"
---




## November 2021
- Use shared_host_network attribute to access containers via loalhost - [documentation]({{site.baseurl}}/docs/pipelines/service-containers/#accessing-containers-via-localhost)
- Builds run locally are tagged as **Local** on the Builds page
- Cross-region support for Amazom ECR integrations with the `region` attribute - [documentation]({{site.baseurl}}/docs/pipelines/steps/build/#fields)
- Option to add Helm charts as part of Helm environment definition - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/#defining-clustersnamespaces-for-each-environment)
- Option to filter Helm board by charts defined in Helm environment - [documentation]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/#editing-your-helm-boards)  

## October 2021
- Monorepo triggers for Azure DevOps repositories - [documentation]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#monorepo-support-modified-files)
- ABAC for Git Contexts - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#abac-for-git-contexts)
- Hybrid Runner Debug Timeout Duration - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#debug-timeout-duration)

## September 2021
- Custom plugins can be used in hooks - [documentation]({{site.baseurl}}/docs/pipelines/hooks/#limitations-of-pipelinestep-hooks)
- Variables can now be used in hooks - [documentation]({{site.baseurl}}/docs/pipelines/hooks/#limitations-of-pipelinestep-hooks)
- New `CF_STEP_NAME` variable - [documentation]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables)
- Update Runner for GCE Disks - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#docker-cache-support-for-gke)

## August 2021
- Using AWS Service Account for ECR Integration - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/#setting-up-ecr-integration---service-account)
- Approval steps now have an extra confirmation - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/)
- Using Bitnami Sealed Secrets with GitOps - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/gitops-secrets/)
- App proxy is now available for Bitbucket server - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy)
- Public Marketplace Registry - [documentation]({{site.baseurl}}/docs/administration/pipeline-settings/#advanced-pipeline-options)
- Google Artifact Registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/google-artifact-registry)
- Pipeline Execution Context - [documentation]({{site.baseurl}}/docs/administration/account-user-management/pipeline-execution-context/)
- Fallback Registry for Docker Integrations - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/#fallback-registry)

## July 2021
- New platform IP addresses - [documentation]({{site.baseurl}}/docs/administration/platform-ip-addresses/)

## June 2021
- Pending Approval Timeout - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#fields)
- OneLogin SAML Setup - [documentation]({{site.baseurl}}/docs/single-sign-on/saml/saml-onelogin)

## May 2021
- Installing Codefresh Runner with Helm - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#installing-codefresh-runner-with-helm)
- Codecov Integration - [documentation]({{site.baseurl}}/docs/integrations/codecov-integration/)
- Dynamic preview environments - [documentation]({{site.baseurl}}/docs/ci-cd-guides/preview-environments/)
- Tag policy for transforming a Docker tag in lowercase or not  - [documentation]({{site.baseurl}}/docs/pipelines/steps/build/#fields)
- Support for App-of-app patterns in the GitOps dashboard- [documentation]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/#using-the-app-of-apps-pattern)

## April 2021
- Jira integration with Atlassian Open DevOps- [documentation]({{site.baseurl}}/docs/integrations/jira/)
- Canary deployments with Argo Rollouts - [documentation]({{site.baseurl}}/docs/ci-cd-guides/progressive-delivery/#canary-deployment-with-metrics-evaluation)
- Support SLAs - [documentation]({{site.baseurl}}/docs/terms-and-privacy-policy/sla/#support-specific-information)

## March 2021
- Native Support for Hashicorp Vault Secrets - [documentation]({{site.baseurl}}/docs/integrations/hashicorp-vault)
- Blue/Green deployments with Argo Rollouts - [documentation]({{site.baseurl}}/docs/ci-cd-guides/progressive-delivery/#blue-green-deployments)
- The [Modified Files filter]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#monorepo-support-modified-files) will now work on triggers triggered by Pull Request events. Notice: this might cause unexpected behavior if you have a trigger that is triggered by both Pull Request and Commit events with a Modified Files filter set. Previously the Modified Files filter would be ignored for Pull Request events. If you need different filters for Pull Requests and Commit events, we recommend you separate the trigger.
- Codefresh Runner on Rancher RKE 2.X - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#installing-on-rancher-rke-2x)
- Access service containers via localhost - [documentation]({{site.baseurl}}/docs/pipelines/service-containers/#accessing-containers-via-localhost)

## February 2021
- Concurrency Behavior for Pending Builds - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#define-concurrency-limits)
- Jira Integration - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/sending-the-notification-to-jira/)
- SLA Details - [documentation]({{site.baseurl}}/docs/terms-and-privacy-policy/sla/)
- Autoscaling Recommendations for Codefresh On-prem - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#app-cluster-autoscaling)
- Hide Inaccessible Clusters in the Kubernetes Dashboard - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#accessing-the-kubernetes-dashboard)
- Define Access for non-admins in Helm Repositories and Shared Config - [documentation]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/#level-of-access)
- Okta Auto-Sync of Teams - [documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-okta/#syncing-of-teams-after-initial-sso-setup)
- Global Pipeline Settings Screen - [documentation]({{site.baseurl}}/docs/administration/pipeline-settings)
- Helm 2 Support discontinued

## January 2021
- Using external secrets in Codefresh GUI - [documentation]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/#using-secrets-in-the-codefresh-gui)
- Using external secrets in Github, Gitlab and Bitbucket server integration - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#using-external-secrets-for-the-token)
- Using external secrets in shared configuration - [documentation]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/#using-external-secrets-as-values)
- Using external secrets in cloud storage integration - [documentation]({{site.baseurl}}/docs/testing/test-reports/#connecting-an-s3-bucket)
- Get Code Coverage Reports with Codacy - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/codacy-testing)
- Git clone now supports a proxy connection - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/#using-git-behind-a-proxy)
- Support for other container runtimes (containerd, cri-o) in the Runner - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#prerequisites)
- Giving visibility of your account to Codefresh support personnel is now explicit - [documentation]({{site.baseurl}}/docs/administration/user-settings/#enable-access-for-support-personnel)
- New paging mechanism for builds/images that might break custom integrations - [documentation]({{site.baseurl}}/docs/kb/articles/paging-issues-builds-images/)
- Note for Okta sync - [documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-okta/#how-okta-syncing-works)
- cf_export limitations - [documentation]({{site.baseurl}}/docs/kb/articles/cf-export-limitations/)
- Default SSO provider - [documentation]({{site.baseurl}}/docs/single-sign-on/team-sync/#set-a-default-sso-provider-for-account)
- Codefresh runner now has a dry run option - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#inspecting-the-manifests-before-they-are-installed)
- Connect to Azure Kubernetes with a service principal - [documentation]({{site.baseurl}}//#adding-an-aks-cluster-with-a-service-principal)
- Connect to an Azure Helm repository with a service principal - [documentation]({{site.baseurl}}/docs/integrations/helm/#private-helm-repository---azure-with-service-principal)