---
layout: docs
title: "Whats New In Codefresh?"
description: ""
group: whats-new
redirect_from:
  - /docs/whats-new
  - /docs/whats-new/
toc: true
---
### Helm Improvements (January 2018)
- Chart install: 
  - can now specify release name (useful for installing same chart multiple times)
  - can now add values file that is reusable for next installs
  - can now override individual values
- Release details:
  - can now delete a release, with advanced options
  - can now test a release
  - can rollback to previous release
  - can visually see differences between releases
- Misc:
  - UI and bug fixes
  - reorganised Helm docs, including samples on how package charts and push to registry: [Create Helm artifacts using Codefresh pipeline]({{ site.baseurl }}/docs/new-helm/create-helm-artifacts-using-codefresh-pipeline/)
  
### Parallel execution of pipelines (January 2018)
Using our new cli, you can now execute many pipelines in parallel with different configurations for each

### Codefresh CLI (January 2018)
Pre-release of our brand new CLI at [https://github.com/codefresh-io/cli](https://github.com/codefresh-io/cli) 

### Add Helm repositories (January 2017)
You can now add your own Helm repositories to the Helm Charts page

### Shared configurations (December 2017)
Mange your configurations in a centralised place, and inject them into pipelines as needed. supports secrets as well

### Helm releases (December 2017)
Real time dashboard of the Helm releases in your connected Kubernetes cluster. Supports rollback to a previous release

### Helm charts (December 2017)
Connect to helm charts repositories, and install them on your connected kubernetes cluster

### Edit your Codefresh YAML inline (October 2017)
Apply changes to your pipeline and test it without committing to the source code for each change.

### Share your Codefresh YAML across pipelines (October 2017)
If you are using the same YAML file for multiple pipelines, use this option to update it in single place when needed to be applied for all pipelines.

### Personalize your image management annotations (October 2017)
Enrich your images with custom metadata which perfectly fits your flow and image management process.

### Create and share Kubernetes Config maps between namespaces (October 2017)
Easily manage your cluster configuration using Codefresh by creating, importing and sharing Config maps between your Kubernetes namespaces and clusters.

### Trigger Codefresh pipelines from external tools (October 2017)
If you want to trigger Codefresh pipelines from other tool, use our pipeline hook to build, test and deploy from any command line / script / 3rd party.

### Test connectivity of your Kubernetes cluster (October 2017)
Test your cluster Credentials and connectivity in one click.

### Native support for self hosted Git providers (October 2017)
We added integration with main self hosted GIT providers to our PRO plan. You can now use Codefresh with your repos from:
* Github enterprise
* Bitbucket Enterprise
* Gitlab enterprise.
