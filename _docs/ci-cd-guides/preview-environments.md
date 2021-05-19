---
title: "Preview Environments"
description: "Deploy Pull Requests to cluster namespaces"
group: ci-cd-guides
toc: true
---

In the [previous guide]({{site.baseurl}}/docs/ci-cd-guides/environment-deployments/) we have seen how you can handle deployments to predefined environments (QA/Staging/production).

Another type of environments that you should manage is dynamic temporary environments for each pull request. For this type
of environments it is best if you create dynamically an environment when a Pull Request is created and tear it down when the Pull Request is closed.

{% include image.html
lightbox="true"
file="/images/guides/preview-environments/dynamic-environments.png"
url="/images/guides/preview-environments/dynamic-environments.png"
alt="Dynamic Test environments"
caption="Dynamic Test environments"
max-width="90%"
%}

This way each developer is working in isolation and can test their feature on its own. This pattern comes in contrast with  the traditional way of reusing static preexisting environments.

{% include image.html 
lightbox="true"
file="/images/guides/preview-environments/static-environments.png"
url="/images/guides/preview-environments/static-environments.png"
alt="Traditional static environments"
caption="Traditional static environments"
max-width="90%"
%}

With Kubernetes you don't need to book and release specific test environments any more. Testing environments should
be handled in a transient way.

## Preview environments with Kubernetes

There are many ways to create temporary environments with Kubernetes, but the simplest one is to use
different namespaces, one for each pull request. So a pull request with name `fix-db-query` will
be deployed to a namespace called `fix-db-query`, a pull request with name `JIRA-1434` will be deployed to a namespace called 
`JIRA-1434` and so on.

The second aspect is exposing the environment URL so that developers and testers can actually preview the application
deployment either manually or via automated tests.

The two major approaches here are with host-based URLs or path based URLs.

* In host based urls, the test environments are named `pr1.example.com`, `pr2.example.com` and so on
* with path based URLs, the test environments are named `example.com/pr1` , `example.com/pr2` and so on

Both approaches have advantages and disadvantages. Path based URLs are easier to setup but may not work 
with all applications (since they change the web context). Host based URLs are more robust but need extra
DNS configuration for the full effect

In Kubernetes clusters, both ways can be setup via [an Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/).

## The example application

The application we will use can be found at [https://github.com/codefresh-contrib/unlimited-test-environments-source-code](https://github.com/codefresh-contrib/unlimited-test-environments-source-code). It is a standard Java/Spring boot application with the following characteristics.

* It has [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) that can be targeted at any host/port. We will use those tests as smoke test that will verify the preview environment after it is deployed
* It comes bundled in [a Helm chart](https://github.com/codefresh-contrib/unlimited-test-environments-manifests)
* It has an ingress configuration ready for path based URLs

We are using [the Ambassador gateway](https://www.getambassador.io/) as an ingress for this example, but you can use any other compliant Kubernetes Ingress.

Here is [ingress manifest](https://github.com/codefresh-contrib/unlimited-test-environments-manifests/blob/main/simple-java-app/templates/ingress.yaml)

```yaml
kind: Ingress
apiVersion: extensions/v1beta1
metadata:
  name: "simple-java-app-ing"
  annotations:
    kubernetes.io/ingress.class: {{ .Values.ingress.class }}

spec:
  rules:
    - http:
        paths:
          - path: {{ .Values.ingress.path }}
            backend:
              serviceName: simple-service
              servicePort: 80
```

The path of the application is configurable and can be set at deploy time.

## Creating preview environments for each pull request

Each time a Pull Request is created we want to perform the following tasks:

1. Compile the application and run unit tests
1. Run security scans, quality checks and everything else we need to decided if the Pull request is valid
1. Create a namespace with the same name as the pull request branch. Deploy the pull Request and expose it as a URL
that has the same name as the branch as well
1. Notify the developere that deployment has finished by commenting on the Pull Request
1. Run Smoke tests against the temporary environment

Here is an example pipeline that does all these tasks

{% include image.html 
lightbox="true"
file="/images/guides/preview-environments/pull-request-preview-pipeline.png"
url="/images/guides/preview-environments/pull-request-preview-pipeline.png"
alt="Pull Request preview pipeline"
caption="Pull Request preview pipeline"
max-width="100%"
%}


## Cleaning up temporary environments


## What to read next

* [How Codefresh pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
* [Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)





