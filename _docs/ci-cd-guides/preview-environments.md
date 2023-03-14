---
title: "Previewing dynamic environments"
description: "Deploy pull requests to cluster namespaces"
group: ci-cd-guides
redirect_from:
  - /v1.0/docs/use-snyk-cli-for-your-nodejs-project/
toc: true
---


In addition to deploying to [predefined environments]({{site.baseurl}}/docs/ci-cd-guides/environment-deployments/), for each pull request (PR), you may also need to deploy to dynamic environments, which are temporary, testing environments. For these types of environments, it is best to dynamically create an environment when a PR is created, and tear it down when the same PR is closed.


{% include image.html
lightbox="true"
file="/images/guides/preview-environments/dynamic-environments.png"
url="/images/guides/preview-environments/dynamic-environments.png"
alt="Dynamic Test environments"
caption="Dynamic Test environments"
max-width="90%"
%}

Each developer works in isolation to test their features. This pattern contrasts with the traditional way of reusing static preexisting environments.

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

There are many options to create temporary environments with Kubernetes. 

* Namespaces for each PR  
  The simplest option is to use different namespaces, one for each PR. So, a PR with name `fix-db-query` is deployed to a namespace called `fix-db-query`, and a PR with name `JIRA-1434`, is deployed to a namespace called `JIRA-1434` and so on.

* Expose the environment URL  
  The second option is to expose the environment URL so that developers and testers can actually preview the application
deployment either manually or via automated tests.  
  The two major approaches here are with host-based and path-based URLs:
  * For host-based URLs, the test environments are named `pr1.example.com`, `pr2.example.com` and so on
  * For path-based URLs, the test environments are named `example.com/pr1`, `example.com/pr2` and so on

  Both approaches have advantages and disadvantages. Path-based URLs are easier to set up, but may not work with all applications,  as they change the web context. Host-based URLs are more robust but need extra DNS configuration for the full effect. 

  In Kubernetes clusters, you can set up types of URLs via [an Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/){:target="\_blank"}.

## Example application

You can find the application we will use at [https://github.com/codefresh-contrib/unlimited-test-environments-source-code](https://github.com/codefresh-contrib/unlimited-test-environments-source-code){:target="\_blank"}.  
It is a standard Java/Spring boot application, that includes the following characteristics:

* It has [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) that can be targeted at any host/port. We will use those tests as smoke test that will verify the preview environment after it is deployed
* It comes bundled in a [Helm chart](https://github.com/codefresh-contrib/unlimited-test-environments-manifests){:target="\_blank"}
* It has an ingress configuration ready for path-based URLs

We are using the [Ambassador gateway](https://www.getambassador.io/){:target="\_blank"} as an ingress for this example, but you can use any Kubernetes-compliant ingress.

Here is the [ingress manifest](https://github.com/codefresh-contrib/unlimited-test-environments-manifests/blob/main/simple-java-app/templates/ingress.yaml){:target="\_blank"}.

{% highlight yaml %}
{% raw %}
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
{% endraw %}
{% endhighlight %}

The path of the application is configurable and can be set at deploy time.

## Creating preview environments for each PR

Each time a PR is created, we want to perform the following tasks:

1. Compile the application and run unit tests.
1. Run security scans, quality checks, and everything else we need to decide if the PR is valid.
1. Create a namespace with the same name as the PR branch. Deploy the PR and expose it as a URL that has the same name as the branch.

Here is an example pipeline that does all these tasks:

{% include image.html
lightbox="true"
file="/images/guides/preview-environments/pull-request-preview-pipeline.png"
url="/images/guides/preview-environments/pull-request-preview-pipeline.png"
alt="Pull Request preview pipeline"
caption="Pull Request preview pipeline"
max-width="100%"
%}

This pipeline has the following steps:  

1. A [clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) to fetch the source code of the application.
1. A [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) that runs Maven for compilation and unit tests.
1. A [build step]({{site.baseurl}}/docs/pipelines/steps/build/) to create the Docker image of the application.
1. A step that scans the source code for security issues with [Snyk](https://snyk.io/){:target="\_blank"}.
1. A step that scans the container image [for security issues]({{site.baseurl}}/docs/testing/security-scanning/) with [trivy](https://github.com/aquasecurity/trivy){:target="\_blank"}.
1. A step that runs [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) by launching the app in a [service container]({{site.baseurl}}/docs/pipelines/service-containers/).
1. A step for [Sonar analysis]({{site.baseurl}}/docs/testing/sonarqube-integration/).
1. A step that clones [a second Git repository](https://github.com/codefresh-contrib/unlimited-test-environments-manifests){:target="\_blank"} with the [Helm chart]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/) of the application.
1. A step that deploys the source code to a new namespace.
1. A step that [adds a comment on the PR](https://codefresh.io/steps/step/kostis-codefresh%2Fgithub-pr-comment){:target="\_blank"} with the URL of the temporary environment.
1. A step that runs smoke tests against the temporary test environment.

Note that the integration tests and security scans are just examples of what you can do before the PR is deployed. You can insert your own steps that check the content of a PR.

Here is the complete YAML definition:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "prepare"
  - "verify"
  - "deploy"

steps:
  main_clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefresh-contrib/unlimited-test-environments-source-code"
    revision: "${{CF_REVISION}}"
    stage: "prepare"

  run_unit_tests:
    title: Compile/Unit test
    stage: prepare
    image: 'maven:3.5.2-jdk-8-alpine'
    commands:
      - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository package   
  build_app_image:
    title: Building Docker Image
    type: build
    stage: prepare
    image_name: kostiscodefresh/spring-actuator-sample-app
    working_directory: ./
    tag: '${{CF_BRANCH}}'
    dockerfile: Dockerfile
  scan_code:
    title: Source security scan
    stage: verify
    image: 'snyk/snyk-cli:maven-3.6.3_java11'
    commands:
      - snyk monitor       
  scan_image:
    title: Container security scan
    stage: verify
    image: 'aquasec/trivy'
    commands:
      - trivy image docker.io/kostiscodefresh/spring-actuator-sample-app:${{CF_BRANCH}}
  run_integration_tests:
    title: Integration tests
    stage: verify
    image: maven:3.5.2-jdk-8-alpine
    commands:
     - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository verify -Dserver.host=http://my-spring-app -Dsonar.organization=kostis-codefresh-github
    services:
      composition:
        my-spring-app:
          image: '${{build_app_image}}'
          ports:
            - 8080
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: byrnedo/alpine-curl
        commands:
          - "curl http://my-spring-app:8080/"
  sonar_scan:
    title: Sonar Scan
    stage: verify
    image: 'maven:3.8.1-jdk-11-slim'
    commands:
      - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository sonar:sonar -Dsonar.login=${{SONAR_TOKEN}} -Dsonar.host.url=https://sonarcloud.io -Dsonar.organization=kostis-codefresh-github
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefresh-contrib/unlimited-test-environments-manifests"
    revision: main
    stage: "deploy"
  deploy:
    title: Deploying Helm Chart
    type: helm
    stage: deploy
    working_directory: ./unlimited-test-environments-manifests
    arguments:
      action: install
      chart_name: simple-java-app
      release_name: my-spring-app
      helm_version: 3.2.4
      kube_context: myawscluster
      namespace: ${{CF_BRANCH_TAG_NORMALIZED}}
      cmd_ps: '--create-namespace --wait --timeout 5m'
      custom_values:
        - 'image_tag=${{CF_BRANCH_TAG_NORMALIZED}}'
        - 'replicaCount=3'
        - 'ingress_path=/${{CF_BRANCH_TAG_NORMALIZED}}/'
  add_pr_comment:
    title: Adding comment on PR
    stage: deploy
    type: kostis-codefresh/github-pr-comment
    fail_fast: false
    arguments:
      PR_COMMENT_TEXT: "[CI] Staging environment is at https://kostis.sales-dev.codefresh.io/${{CF_BRANCH_TAG_NORMALIZED}}/"
      GIT_PROVIDER_NAME: 'github-1'
  run_smoke_tests:
    title: Smoke tests
    stage: deploy
    image: maven:3.5.2-jdk-8-alpine
    working_directory: "${{main_clone}}"
    fail_fast: false
    commands:
     - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository verify -Dserver.host=https://kostis.sales-dev.codefresh.io/${{CF_BRANCH_TAG_NORMALIZED}}/  -Dserver.port=443
{% endraw %}
{% endhighlight %}

The end result of the pipeline is a deployment to the path that has the same name as the PR branch. For
example, if my branch is named `demo`, then a `demo` namespace is created on the cluster and the application
is exposed on the `/demo/` context:

{% include image.html
lightbox="true"
file="/images/guides/preview-environments/demo-path.png"
url="/images/guides/preview-environments/demo-path.png"
alt="Temporary environment"
caption="Temporary environment"
max-width="100%"
%}

The environment is also mentioned as a comment in the PR UI in GitHub:

{% include image.html
lightbox="true"
file="/images/guides/preview-environments/pull-request-comment.png"
url="/images/guides/preview-environments/pull-request-comment.png"
alt="Pull Request comment"
caption="Pull Request comment"
max-width="100%"
%}

As explained in [Pull Requests and branches guide]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/), we want to make this pipeline applicable only
to a PR-open event and PR-sync events that capture commits on an existing pull request.

{% include image.html 
lightbox="true"
file="/images/guides/preview-environments/pr-events.png"
url="/images/guides/preview-environments/pr-events.png"
alt="Git events for a Pull Request preview pipeline"
caption="Git events for a Pull Request preview pipeline"
max-width="100%"
%}

Therefore, you need to set up your [Git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) with the same options selected as shown in the picture above.

## Cleaning up temporary environments

Creating temporary environments is very convenient for developers, but can be very costly for your infrastructure if you use a cloud
provider for your cluster. For cost reasons and better resource utilization, it is best to destroy temporary environments that are no longer used.

While you can run a batch job that automatically deletes old temporary environments, the optimal approach is to delete them as soon as the respective PR is closed.

We can do that with a very simple pipeline that has only one step:

{% include image.html 
lightbox="true"
file="/images/guides/preview-environments/pull-request-closed-pipeline.png"
url="/images/guides/preview-environments/pull-request-closed-pipeline.png"
alt="Pipeline when a Pull Request is closed"
caption="Pipeline when a Pull Request is closed"
max-width="100%"
%}

Here is the pipeline definition:

 `codefresh-close.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  delete_app:
    title: Delete app
    type: helm
    arguments:
      action: auth
      helm_version: 3.2.4
      kube_context: myawscluster
      namespace: ${{CF_BRANCH_TAG_NORMALIZED}}
      commands:
            - helm delete my-spring-app --namespace ${{CF_BRANCH_TAG_NORMALIZED}}
            - kubectl delete namespace ${{CF_BRANCH_TAG_NORMALIZED}}
{% endraw %}
{% endhighlight %}

The pipeline just uninstalls the Helm release for that namespace, and then deletes the namespace itself.

To have this pipeline run only when a PR is closed, here are the triggers to select:

{% include image.html 
lightbox="true"
file="/images/guides/preview-environments/close-events.png"
url="/images/guides/preview-environments/close-events.png"
alt="Git events for a Pull Request close pipeline"
caption="Git events for a Pull Request close pipeline"
max-width="100%"
%}

With this setup, the pipeline runs when the PR is closed, regardless of whether it was merged or not (which is exactly what you want as in both cases the test environment is not needed anymore).

## Viewing all environments in the Codefresh UI

You can combine the pipeline above with any Codefresh UI dashboard if you want to see all your temporary environments in a single view.

For more information, see:  
* [Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)
* [Helm promotion dashboard]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/)
* [GitOps dashboard]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/#working-with-the-gitops-dashboard)



## Related articles
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Docker registry integrations for pipelines]({{site.baseurl}}/docs/integrations/docker-registries/)  






