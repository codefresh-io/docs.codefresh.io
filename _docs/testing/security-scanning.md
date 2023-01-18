---
title: "Security scanning"
description: "Scan for vulnerabilities with Codefresh pipelines"
group: testing
redirect_from:
  - /docs/testing/security-scanning/
toc: true
---

Codefresh can integrate with any security scanning platform that scans source code or Docker images for vulnerabilities.

The integration can happen via a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) as long as the scanning solution offers any of the following:

* A Docker image with the scanner
* A CLI that can be packaged in a Docker image
* An API

Since all security solutions offer an API, Codefresh can essentially use any scanning solution via that interface.


## Existing security integrations

Codefresh already offers Docker images for the following security platforms:

* [Anchore](https://codefresh.io/steps/step/anchore){:target="\_blank"}
* [Aqua Security](https://codefresh.io/steps/step/aqua){:target="\_blank"}
* [Clair](https://codefresh.io/steps/step/paclair){:target="\_blank"}
* [Twistlock](https://codefresh.io/steps/step/twistlock){:target="\_blank"}
* [WhiteSource](https://codefresh.io/steps/step/whitesource){:target="\_blank"}

You can find more integrations as they are added in the [plugin directory](https://codefresh.io/steps/){:target="\_blank"}.


## Security scanning strategies

Because you can insert a scanning step anywhere in your pipeline, you have great flexibility on when to start a security scan.  
Common strategies are:
1. Scanning the source code before being packaged in a container
1. Scanning a container before being stored in a registry
1. Scanning a container before being deployed to production
1. A combination of the above


Here is an example pipeline that scans a Docker image:  
* With [Aqua](https://www.aquasec.com/){:target="\_blank"} after being pushed to the [default Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/#the-default-registry)
* Before it is promoted to the [external Azure Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/azure-docker-registry/){:target="\_blank"}.

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/aqua-scan.png" 
url="/images/testing/security-scanning/aqua-scan.png" 
alt="Scanning a Helm release with Aqua" 
caption="Scanning a Helm release with Aqua" 
max-width="100%" 
%}


Here's the full pipeline definition:

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

The security scanning step is inserted after building the Docker image, but before promoting the image to the Azure Docker registry.


## Viewing security reports

The easiest way to view security reports is to visit the portal/dashboard of the security platform that you are using.

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/snyk-test-report.png" 
url="/images/testing/security-scanning/snyk-test-report.png" 
alt="Snyk Security Analysis" 
caption="Snyk Security Analysis" 
max-width="60%" 
%}

You can also attach Analysis Reports to Codefresh builds using the [test reporting feature]({{site.baseurl}}/docs/testing/test-reports/).

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

In this example, we attach the Clair Scan report to the build created:

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/security-test-results.png" 
url="/images/testing/security-scanning/security-test-results.png" 
alt="Attaching scanning results to a build" 
caption="Attaching scanning results to a build" 
max-width="100%" 
%}

To view the full report, click **Test Report**:

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/clair-scan.png" 
url="/images/testing/security-scanning/clair-scan.png" 
alt="Clair security scan" 
caption="Clair security scan" 
max-width="60%" 
%}


## Security annotations

Security scan results are also a perfect candidate for [extra metadata]({{site.baseurl}}/docs/docker-registries/metadata-annotations/) to add to your Docker images.

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/security-annotations.png" 
url="/images/testing/security-scanning/security-annotations.png" 
alt="Security annotations" 
caption="Security annotations" 
max-width="80%" 
%}

You can add any metadata such as the number of issues for each category or even the URL the full report. This allows you to easily correlate docker images in Codefresh and security results of your scanning platform.

## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Pipeline steps]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating test reports]({{site.baseurl}}/docs/testing/test-reports/)  
[Advanced workflows in pipelines]({{site.baseurl}}/docs/pipelines/advanced-workflows/)  
