---
title: "Pipelines Changelog: January to December 2019"
description: "Changelog for Pipelines 2019 (Classic)"
---

## December 2019
- Output parameters in plugins - [documentation]({{site.baseurl}}/docs/pipelines/steps/#example-with-output-parameters)
- Preload a DB with test data before integration tests - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/populate-a-database-with-existing-data/)
- Using templates in custom pipeline steps - [documentation]({{site.baseurl}}/docs/pipelines/steps/#example-with-step-templating)

## November 2019
- Digital Ocean cluster integration - [documentation]({{site.baseurl}}/docs/integrations/kubernetes/#adding-a-digital-ocean-cluster)
- Build caching guide - [documentation]({{site.baseurl}}/docs/pipelines/pipeline-caching/)
- Versioning for plugins - [documentation]({{site.baseurl}}/docs/pipelines/steps/#versioning-of-typed-steps)
- Step example with input parameters - [documentation]({{site.baseurl}}/docs/pipelines/steps/#example-with-input-parameters)
- Example with C and make - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/c-make/)
- Example with C++ and cmake - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/cpp-cmake/)
- Example with C# and .NET core - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/dotnet/)

## October 2019
- Debugging pipelines with breakpoints - [documentation]({{site.baseurl}}/docs/pipelines/debugging-pipelines/)
- Matrix builds and implicit parallel steps - [documentation]({{site.baseurl}}/docs/pipelines/advanced-workflows/#implicit-parallel-steps)
- New Build view filters - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#creating-build-views)
- Deployments with Packer - [documentation]({{site.baseurl}}/docs/example-catalog/cd-examples/packer-gcloud/)
- Calling child pipelines - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/call-child-pipelines/)

## September 2019
- Unit testing guide - [documentation]({{site.baseurl}}/docs/testing/unit-tests)
- Unit test example - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/run-unit-tests/)
- Integration testing guide - [documentation]({{site.baseurl}}/docs/testing/integration-tests/)
- Integration test example - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/run-integration-tests/)
- Redis Integration test example - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-redis/)
- MongoDB Integration test example - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mongo/)
- MySQL Integration test example - [documentation]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mysql/)
- PostgreSQL Integration test example - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-postgres/)
- Explicit External Resources - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#external-resources)
- Kubernetes connection issues - [documentation]({{site.baseurl}}/docs/kb/articles/forbidden-cluster-resources/)
<!-- - Codefresh F.A.Q. - [documentation]({{site.baseurl}}/docs/getting-started/faq/)  -->

## August 2019
- Sidecar services in pipelines - [documentation]({{site.baseurl}}/docs/pipelines/service-containers/)
- Personal Git providers are deprecated - [documentation]({{site.baseurl}}/docs/kb/articles/personal-git-deprecation/)
- Migrate from Jenkins to Codefresh - [documentation]({{site.baseurl}}/docs/integrations/jenkins-integration/#migrating-from-jenkins-to-codefresh)
- macOS and iOS builds closed Alpha - [documentation]({{site.baseurl}}/docs/incubation/osx-ios-builds/)

## July 2019
- New custom step creation process - [documentation]({{site.baseurl}}/docs/pipelines/steps/#creating-your-own-step)
- Approval steps now have timeouts - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#automatic-approvalsrejections)
- Approval steps now have access control - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/#approval-restrictions)
- Concurrency limits on pipelines - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings)
- Termination settings on pipelines - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings)
- API keys now have different access scopes - [documentation]({{site.baseurl}}/docs/integrations/codefresh-api/#access-scopes)

## June 2019
- Added `CI=true` environment variable - [documentation]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables)
- Buildkit support - [documentation]({{site.baseurl}}/docs/pipelines/steps/build/#buildkit-support)
- Security scanning - [documentation]({{site.baseurl}}/docs/testing/security-scanning/)
- Root pipeline anchors - [documentation]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#using-yaml-anchors-to-avoid-repetition)
- Building Android Apps - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/android/)
- Deployment to Nomad clusters - [documentation]({{site.baseurl}}/docs/example-catalog/cd-examples/nomad/)
- Editing of annotations - [documentation]({{site.baseurl}}/docs/pipelines/annotations/#viewingediting-annotations)


## May 2019
- Triggers can now be enabled/disabled - [documentation]({{site.baseurl}}/docs/pipelines/triggers/#disabling-triggers)
- New GitHub PR variables - [documentation]({{site.baseurl}}/docs/pipelines/variables/#github-pull-request-variables)
- Inline Dockerfiles in build steps - [documentation]({{site.baseurl}}/docs/pipelines/steps/build/#inline-dockerfile)
- LDAP SSO support (Enterprise) - [documentation]({{site.baseurl}}/docs/single-sign-on/ldap/)
- SAML SSO support (Enterprise) - [documentation]({{site.baseurl}}/docs/single-sign-on/saml/)
- Audit logs (Enterprise) - [documentation]({{site.baseurl}}/docs/administration/account-user-management/audit/)
- Checking out code with Subversion, HG, Perforce etc. - [documentation]({{site.baseurl}}/docs/example-catalog/ci-examples/non-git-checkout/)
- Migrating to explicit git clone steps - [documentation]({{site.baseurl}}docs/pipelines/steps/git-clone/)
- Custom annotations on projects, pipelines, builds - [documentation]({{site.baseurl}}/docs/pipelines/annotations/)
- Deployments with Pulumi - [documentation]({{site.baseurl}}/docs/example-catalog/cd-examples/pulumi/)
- Deployments with Terraform - [documentation]({{site.baseurl}}/docs/example-catalog/cd-examples/terraform/)
- Codefresh Runner installation - [documentation]({{site.baseurl}}/docs/installation/codefresh-runner/)
- Multiple Dockerhub integrations - [documentation]({{site.baseurl}}/docs/integrations/docker-registries/)

## April 2019
- New project/pipeline view - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/)
- Git clone steps are now required - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/)
- Simple Kubernetes templates - [documentation]({{site.baseurl}}/docs/ci-cd-guides/kubernetes-templating/)

## March 2019
- Helm best practices - [documentation]({{site.baseurl}}/docs/ci-cd-guides/helm-best-practices/)
- Pushing images in parallel with multiple tags - [documentation]({{site.baseurl}}/docs/pipelines/steps/push/#examples)
- Integration with Azure DevOps Repositories - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#azure-devops)
- OAuth2 Connections for supported git providers - [documentation]({{site.baseurl}}/docs/integrations/git-providers/#adding-more-git-providers-to-your-codefresh-account)
- Pipeline ABAC (Enterprise) - [documentation]({{site.baseurl}}/docs/administration/account-user-management/access-control/)

## February 2019

- Access Control (Enterprise) - [documentation]({{site.baseurl}}/docs/administration/account-user-management/access-control/)
- Accessing the shared volume in compositions - [documentation]({{site.baseurl}}/docs/pipelines/steps/composition/#accesing-your-project-folder-from-a-composition)
- Reuse Git integration in custom clone step - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/#reuse-a-git-token-from-codefresh-integrations)
- Run custom Kubectl commands - [documentation]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/)
- Reading Image metadata - [documentation]({{site.baseurl}}/docs/pipelines/docker-image-metadata/)
- Codefresh build agent - [documentation]({{site.baseurl}}/docs/installation/behind-the-firewall/)

## January 2019
- Manual approval step - [documentation]({{site.baseurl}}/docs/pipelines/steps/approval/)
- Shared configuration - [documentation]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/)
- Running pipelines locally - [documentation]({{site.baseurl}}/docs/pipelines/running-pipelines-locally/)
- Installation options (Enterprise) - [documentation]({{site.baseurl}}/docs/installation/installation-options/)
- Custom volumes for freestyle steps - [documentation]({{site.baseurl}}/docs/pipelines/steps/freestyle/#custom-volumes)
- Helm Environment Promotion boards (Enterprise) - [documentation]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/)
- Pipeline resource metrics - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-pipeline-metrics)
