---
title: "Examples"
description: ""
group: yaml-examples
redirect_from:
  - /docs/examples-v01/
toc: true
---
Codefresh enables you to define the steps of your pipeline in a [YAML file]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/). By default, the file is named ```codefresh.yml```, and is located in the root directory of the repository.

## Build/Package

- [Build an Image with the Dockerfile in Root Directory]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-dockerfile-in-root-directory/)
- [Build an Image by Specifying the Dockerfile Location]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-specify-dockerfile-location)
- [Build an Image from a Different Git Repository]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-from-a-different-git-repository)
- [Build and Push an Image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image)
- [Build an Image With Build Arguments]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-with-build-arguments)
- [Shared volumes between builds]({{site.baseurl}}/docs/yaml-examples/examples/shared-volumes-between-builds)
- [Clone private repository using freestyle step]({{site.baseurl}}/docs/yaml-examples/examples/git-clone-private-repository-using-freestyle-step)
- [Get Short SHA ID and Use it in a CI Process]({{site.baseurl}}/docs/yaml-examples/examples/get-short-sha-id-and-use-it-in-a-ci-process)


## Testing

- [Run Unit Tests]({{site.baseurl}}/docs/yaml-examples/examples/run-unit-tests) 
- [Run Unit Tests with Composition]({{site.baseurl}}/docs/yaml-examples/examples/run-unit-tests-with-composition) 
- [Run Integration Tests]({{site.baseurl}}/docs/yaml-examples/examples/run-integration-tests) 
- [Shared volumes of service from composition step for other yml steps]({{site.baseurl}}/docs/yaml-examples/examples/shared-volumes-of-service-from-composition-step-for-other-yml-steps)
- [Launch Composition]({{site.baseurl}}/docs/yaml-examples/examples/launch-composition) 
- [Launching a composition and defining a service environment variables using a file]({{site.baseurl}}/docs/yaml-examples/examples/launching-a-composition-and-defining-a-service-environment-variables-using-a-file) 
- [Populate a database with existing data]({{site.baseurl}}/docs/yaml-examples/examples/populate-a-database-with-existing-data) 

## Deployment

- [Use kubectl as part of Freestyle step]({{site.baseurl}}/docs/yaml-examples/examples/use-kubectl-as-part-of-freestyle-step) 

## Notifications

- [Sending the notification to Slack]({{site.baseurl}}/docs/yaml-examples/examples/sending-the-notification-to-slack)
