---
title: "Security Scanning"
description: "How to scan for vulnerabilities with Codefresh pipelines"
group: testing
toc: true
---

Codefresh can integrate with any security scanning platform that scans source code or Docker images for vulnerabilities.

The integration can happen via a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) as long as the scanning solution offers any of :

* A Docker image with the scanner
* A CLI (that can be packaged in a Docker image)
* An API

Since all security solutions offer an API, Codefresh can essentially use any scanning solution via that interface.


## Existing security integrations

Codefresh already offers Docker images for the following security platforms:

1. [Anchore](https://codefresh.io/steps/step/anchore-plugin)
1. [Aqua Security](https://codefresh.io/steps/step/cfstep-aqua)
1. [Clair](https://codefresh.io/steps/step/cfstep-paclair)
1. [Twistlock](https://codefresh.io/steps/step/cf-twistlock)


You can find more integrations as they are being added in the [plugin directory](https://codefresh.io/steps/).


## Security scanning strategies

Because you can insert a scanning step anywhere in your pipeline, you have great flexibility on when a security scan is happening. Common strategies are:

1. Scanning the source code before being packaged in a Container
1. Scanning a container before it is being stored to a registry
1. Scanning a container before being deployed to production
1. A Combination of the above

Here is an example pipeline that scans a Docker image with [Aqua]https://www.aquasec.com/ after being pushed to the [internal Codefresh registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) but before being promoted to the [external Azure Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/azure-docker-registry/).

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/aqua-scan.png" 
url="/images/testing/security-scanning/aqua-scan.png" 
alt="Scanning a Helm release with Aqua" 
caption="Scanning a Helm release with Aqua" 
max-width="100%" 
%}


This is the full pipeline definition:

`codefresh.yml`
{% highlight yaml %}
{% raw %}

version: '1.0'
stages:
  - prepare
  - build
  - test
  - push 
  - deploy
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    stage: prepare
  build:
    title: "Building Docker Image"
    type: "build"
    image_name: "${{CF_ACCOUNT}}/${{CF_REPO_NAME}}"
    tag: ${{CF_REVISION}}
    dockerfile: "Dockerfile"
    stage: "build"  
  AquaSecurityScan:
    title: 'Aqua Private scan'
    image: codefresh/cfstep-aqua
    stage: test
    environment:
      - 'AQUA_HOST=${{AQUA_HOST}}'
      - 'AQUA_PASSWORD=${{AQUA_PASSWORD}}'
      - 'AQUA_USERNAME=${{AQUA_USERNAME}}'
      - IMAGE=${{CF_ACCOUNT}}/${{CF_REPO_NAME}}
      - TAG=${{CF_REVISION}}
      - REGISTRY=codefresh
  push:
    title: "Pushing image to Azure registry"
    type: "push"
    stage: push
    image_name: "${{CF_ACCOUNT}}/${{CF_REPO_NAME}}"
    registry: "myazureregistry"
    candidate: "${{build}}"
    tags:
      - "${{CF_BRANCH_TAG_NORMALIZED}}"
      - "${{CF_REVISION}}"
      - "${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}"    

  createpullsecret:
    title: "Allowing cluster to pull Docker images"
    image: codefresh/cli
    stage: "deploy"  
    commands:
    - codefresh generate image-pull-secret --cluster 'mydemok8scluster' --registry myazureregistry 
  deploy:
    image: codefresh/cfstep-helm:2.12.0
    stage: deploy
    environment:
      - CHART_REF=deploy/helm/colors
      - RELEASE_NAME=color-coded
      - KUBE_CONTEXT=mydemok8scluster
      - CUSTOM_service.type=LoadBalancer
      - CUSTOM_deployment[0].track=release
      - CUSTOM_deployment[0].image.repository=registry3435454.azurecr.io/${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}
      - CUSTOM_deployment[0].image.tag="${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}"
      - CUSTOM_deployment[0].image.version="${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}"
      - CUSTOM_deployment[0].image.pullSecret=codefresh-generated-registry3435454.azurecr.io-myazureregistry-default
{% endraw %}
{% endhighlight %}

The security scanning step is inserted after building the Docker image but before promoting the image to the Azure Docker registry.


## Viewing Security reports

The easiest way to view security reports is to visit the portal/dashboard of the security platform that you are using

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/snyk-test-report.png" 
url="/images/testing/security-scanning/snyk-test-report.png" 
alt="Snyk Security Analysis" 
caption="Snyk Security Analysis" 
max-width="60%" 
%}

It is also possible however to attach Analysis Reports on Codefresh builds by using the [test reporting feature]({{site.baseurl}}/docs/testing/test-reports/).

{% highlight yaml %}
{% raw %}
  ArchiveClairReport:
  title: Upload Clair Report
  image: codefresh/cf-docker-test-reporting
  environment:
    - REPORT_DIR=reports
    - REPORT_INDEX_FILE=clair-scan.html
{% endraw %}
{% endhighlight %}

Here we attach the Clair Scan report to the build that created. 


{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/security-test-results.png" 
url="/images/testing/security-scanning/security-test-results.png" 
alt="Attaching scanning results to a build" 
caption="Attaching scanning results to a build" 
max-width="100%" 
%}

You can then click on the *Test Report* button and view the full report:

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/clair-scan.png" 
url="/images/testing/security-scanning/clair-scan.png" 
alt="Clair security scan" 
caption="Clair security scan" 
max-width="60%" 
%}


## Security annotations

Security scan results are also a perfect candidate for adding [extra metadata]({{site.baseurl}}/docs/docker-registries/metadata-annotations/) to your Docker images.

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/security-annotations.png" 
url="/images/testing/security-scanning/security-annotations.png" 
alt="Security annotations" 
caption="Security annotations" 
max-width="80%" 
%}

You can add any metadata such as the number of issues for each category or even the URL the full report. This allows you easily correlate docker images in Codefresh and security results of your scanning platform.

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Test reporting]({{site.baseurl}}/docs/testing/test-reports/)
* [Advanced workflows]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)
