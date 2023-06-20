---
title: "Pipelines Changelog: January to December 2020"
description: "Changelog for Pipelines 2020 (Classic)"
---


## December 2020
- Get Code Coverage Reports with Coveralls - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/coveralls-testing/)
- Codefresh will now use the default branch (e.g. `main`) instead of assuming `master`. This applies to GitHub, GitLab, and Bitbucket - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/)
- App-Proxy now supports GitLab - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/#app-proxy-installation)
- Helm promotion pipelines can be overridden in the GUI  - [documentation]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/#creating-a-custom-helm-board)
- Internal Registry mirror for the Codefresh runner - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner//#configure-internal-registry-mirror)
- Production and staging deployments guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/environment-deployments/)
- Escaping YAML in pipelines - [documentation]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#escaping-strings)
- GitOps dashboard now shows affected services for each release - [documentation]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/#working-with-the-gitops-dashboard)
- Time based filters in build view - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#applying-filters-on-the-build-view)

## November 2020
- Pushing Images to the Digital Ocean Container Registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/digital-ocean-container-registry)
- Getting Code Coverage Reports with Codecov - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/codecov-testing/)
- Integrating SonarQube Analysis into your Pipelines - [documentation]({{site.baseurl}}/docs/testing/sonarqube-integration/)
- GitOps deployments - [documentation]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
- Global volume mounts in the Codefresh runner - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/#custom-volume-mounts)
- Global environment variables in the Codefresh runner - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/#custom-global-environment-variables)

## October 2020
- Using Google for SSO - [documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-google/)
- Setting-up Helm Triggers in your Codefresh pipeline with the Codefresh UI - [documentation]({{site.baseurl}}/docs/pipelines/triggers/helm-triggers/)
- Using the GitHub Container registry as Docker registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/github-container-registry/)
- Simplified Git operations with the App Proxy for the Codefresh runner - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/#app-proxy-installation)
- Upgrade Codefresh on-prem - [documentation]({{site.baseurl}}/docs/installation/codefresh-on-prem-upgrade/)

## September 2020
- Security timeout - [documentation]({{site.baseurl}}/docs/administration/account-user-management/access-control/#security-timeout)
- Preserve pipeline volume after approval - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#keeping-the-shared-volume-after-an-approval)
- DockerHub rate limit issue - [documentation]({{site.baseurl}}/docs/kb/articles/dockerhub-rate-limit/)

## August 2020
- Pipeline/step hooks - [documentation]({{site.baseurl}}/docs/pipelines/hooks)
- Pipeline templates - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#using-pipeline-templates)
- Pipeline definition restrictions - [documentation]({{site.baseurl}}/docs/administration/access-control/#pipeline-definition-restrictions)
- Concurrency limits per branch - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#policies)
- Custom pipeline variables for Helm promotion - [documentation]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/#promoting-helm-releases-with-the-ui)

## July 2020
- Building apps guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/packaging-compilation/)
- Creating Docker images guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/)
- Pull requests guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/)
- Microservice guide - [documentation]({{site.baseurl}}/docs/ci-cd-guides/microservices/)
- Using GitHub packages as Docker registry - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/github-packages/)
- Check if a variable exists - [documentation]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/#execute-steps-according-to-the-presence-of-a-variable)

## June 2020
- New Codefresh Runner installation - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/)
- Using multiple Registry integrations with the same domain - [documentation]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain)
- Multiple Dockerhub integrations - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/other-registries/)
- Global Docker registry prefix/repository - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/#using-an-optional-repository-prefix)
- Integration with the GitHub App mechanism - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#github-app)
- Caching Registry selection - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/#internal-caching-registry)
- Example with Rust/Cargo - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/rust/)

## May 2020
- Masking encrypted variables in logs - [documentation]({{site.baseurl}}/docs/pipelines/variables/#masking-variables-in-logs)
- Restrict Codefresh to specific namespace - [documentation]({{site.baseurl}}/docs/integrations/kubernetes/#restrict-codefresh-access-to-a-specific-namespace)
- Deploy with Kustomize - [documentation]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-with-kustomize/)
- Installing the Codefresh Runner on a multi AZ GKE cluster - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/)
- Masking encrypted variables in logs - [documentation]({{site.baseurl}}/docs/pipelines/variables/#masking-variables-in-logs)

## April 2020
- Helm release text message - [documentation]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/#showing-an-upgrade-message)
- Integration with Google Cloud Build - [documentation]({{site.baseurl}}/docs/integrations/gcloud-builder/)
- Deploy to Heroku - [documentation]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-to-heroku/)
- Scala: Hello World (updated) - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/scala-hello-world/)
- New variable `CF_BRANCH_TAG_NORMALIZED_LOWER_CASE` - [documentation]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables)
- Trigger a Kubernetes Deployment from a Dockerhub Push Event - [documentation]({{site.baseurl}}/docs/example-catalog/cd-examples/trigger-a-k8s-deployment-from-docker-registry/)
- Uploading or Downloading from a Google Storage Bucket - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/uploading-or-downloading-from-gs/)
- Use GitHub Actions no longer requires a registry - [documentation]({{site.baseurl}}/docs/integrations/github-actions/#how-it-works)
- Alternative debugging console - [documentation]({{site.baseurl}}/docs/pipelines/debugging-pipelines/#using-the-alternative-debug-window)
- User variable priority rules - [documentation]({{site.baseurl}}/docs/pipelines/variables/#user-provided-variables)
- Secret Storage - [documentation]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/)
- Run multiple kinds of unit tests using fan-in-fan-out parallel pipeline - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/fan-in-fan-out/)

## March 2020
- Removal of the Codefresh registry 
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

## February 2020
- Use GitHub Actions as Codefresh pipeline steps - [documentation]({{site.baseurl}}/docs/integrations/github-actions/)
- Publish a JAR to Artifactory/Nexus - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/publish-jar/)
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
- Updated OneLogin SSO support - [documentation]({{site.baseurl}}/docs/single-sign-on/saml/saml-onelogin/)
- Published Codefresh Platform IPs - [documentation]({{site.baseurl}}/docs/integrations/kubernetes/#prerequisites)
- Installing the Codefresh Runner in AWS - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/#installing-on-aws)
- Amazon ECS/Fargate deployment example - [documentation]({{site.baseurl}}/docs/integrations/amazon-web-services/)

## January 2020
- New deployment environment dashboard - [documentation]({{site.baseurl}}/docs/pipelines/deployment-environments)
- Support for Azure Storage in test reports - [documentation]({{site.baseurl}}/docs/testing/test-reports/#connecting-azure-storage)
- Promoting Docker images - [documentation]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#promoting-docker-images)
- Using Dockerhub personal access tokens - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/docker-hub/)
- Updated Azure SSO instructions - [documentation]({{site.baseurl}}/docs/single-sign-on/oidc/oidc-azure/)
- Codefresh Runner requirements - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/)