---
title: "Create a project for pipeline"
description: ""
group: quick-start
toc: true
---

Codefresh pipelines are grouped under projects. Think of a project as a folder or directory that groups related pipelines. For example, all pipleines that package/deploy the different microservices for an application.
You can define any name for the  project, the most common example being the name of the application that the pipelines  

### Where are you



### Before you beigin

* [Connect a Docker registry to Codefresh]({{site.baseurl}}/docs/quick-start/create-docker-registry-integration)

### How to
1. In the Codefresh UI, in the sidebar, from Pipelines, select **Projects**.
1. On the top-right, click **New Project**.
1. Enter the **Project Name**. For example, `my-first-project`.
1. Leave the **Project Tags** empty for the quick start.
1. Select any **Icon** you want. The icon is prefixed to the project name in the Projects page.
1. Click **Create**.  

{% include image.html 
	lightbox="true" 
	file="/images/quick-start/quick-start-ci/create-ci-project.png" 
	url="/images/quick-start/quick-start-ci/create-ci-project.png" 
	alt="Create project for pipeline"
	caption="Create project for pipeline" 
	max-width="70%" 
%}

You now have a new project and can create your first pipeline.


### Continue with






