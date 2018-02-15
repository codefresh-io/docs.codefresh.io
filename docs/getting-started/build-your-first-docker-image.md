---
layout: docs
title: "Build Your First Docker Image"
excerpt: "Create your first Docker image by adding a service to Codefresh. A service includes a repository and a [**Dockerfile**](https://www.docker.com/) or [**codefresh.yml**](doc:what-is-the-codefresh-yaml). Otherwise if you don't have Dockerfile or codefresh.yml in your repository you can use the codefresh templates."
description: ""
group: getting-started
redirect_from:
  - /docs/build-your-image
toc: true
old_url: /docs/build-your-image
was_hidden: true
---
To build your first Docker image, the first step is to add a service to Codefresh. The service consists of a service's repository and a Dockerfile or codefresh.yml.

{{site.data.callout.callout_info}}
What's a Dockerfile? Learn more at the [Docker Documentation Center](https://docs.docker.com/engine/reference/builder/).

What's a codefresh.yml? Learn more at the [Introduction Codefresh YAML](doc:what-is-the-codefresh-yaml) 
{{site.data.callout.end}}

## 1. Add a service
To start building your first Docker image, you need to add a service.

{:.text-secondary}
### **Procedure**:

* Click __ADD SERVICE__.  

{% include image.html 
lightbox="true" 
file="/images/3c3d052-codefresh_add_your_first_service.png" 
url="/images/3c3d052-codefresh_add_your_first_service.png"
alt="codefresh_add_your_first_service"
max-width="40%"
caption="Add a service (click image to enlarge)" 
%}

## 2. Select a repository
Add the repository for the service you're adding

{:.text-secondary}
### **Procedure**:

{:start="1"}
1. In the search box, type the name of the repository.

{% include image.html 
lightbox="true" 
file="/images/dab7fbb-codefresh_new_wizard_1.png" 
url="/images/dab7fbb-codefresh_new_wizard_1.png"
alt="codefresh_new_wizard_1"
max-width="40%"
%}

{{site.data.callout.callout_info}}
##### Don't see your private repositories?

Try the following:
* Started your free trial, so you can add private repositories.
* If the free trial finished you can upgrade your account or contact us to extend the free trial.
* [Visit our Troubleshooting Center](doc:introduction-3) 
{{site.data.callout.end}}

{{site.data.callout.callout_info}}
##### Can't find your repository?

Try the **ADD BY URL** option.
{{site.data.callout.end}}

{% include image.html 
lightbox="true" 
file="/images/ae0653e-codefresh_add_by_url.png" 
url="/images/ae0653e-codefresh_add_by_url.png"
alt="codefresh_add_by_url"
max-width="40%"
%}

{:start="2"}
2. From the drop-down menu, select a branch for the first build.

{:start="3"}
3. Click **NEXT**.

## 3. Select the build method
On this screen you can choose one of the build methods: codefresh.yml, Dockerfile or Codefresh template.

{:.text-secondary} 
### **Procedure**:
Click **SELECT** for chosen build method.

{% include image.html 
lightbox="true" 
file="/images/e61459b-codefresh_new_wizard_2.png" 
url="/images/e61459b-codefresh_new_wizard_2.png"
alt="codefresh_new_wizard_2"
max-width="40%"
%}

* [**Codefresh.yml build method**](doc:build-your-first-docker-image-new#section-31-codefreshyml-build-method)
* [**Dockerfile build method**](doc:build-your-first-docker-image-new#section-32-dockerfile-build-method)
* [**Template build method**](doc:build-your-first-docker-image-new#section-33-template-build-method)

## 3.1 Codefresh.yml build method

If you chose the codefresh.yml build method, you need to do the following on this screen:

{:.text-secondary}
### **Procedure**:

{:start="1"}
1. Enter the path to codefresh.yml
By default, Codefresh searches for your codefresh.yml at the root level of your repository, by the name *codefresh.yml*. In case that your codefresh.yml is in sub-directory, provide the path as well (*./foo/bar/codefresh.yml*).

{:start="2"}
2. Click **NEXT**

{{site.data.callout.callout_info}}
More information about codefresh.yml you can read [**here**](doc:doc:what-is-the-codefresh-yaml). Also you can look at the [__list of codefresh.yml examples__](doc:examples-v01) 
{{site.data.callout.end}}

{% include image.html 
lightbox="true" 
file="/images/28bca0b-codefresh_wizard_build_method_1.png" 
url="/images/28bca0b-codefresh_wizard_build_method_1.png"
alt="codefresh_wizard_build_method_1"
max-width="40%"
%}

## 3.2 Dockerfile build method

If you chose the Dockerfile build method, you need to do the following on this screen:

{:.text-secondary}
### **Procedure**:

{:start="1"}
1. Enter the path to Dockerfile
By default, Codefresh searches for your Dockerfile at the root level of your repository, by the name *Dockerfile*. In case that your Dockerfile is in sub-directory, provide the path as well (*./foo/bar/Dockerfile*).

{:start="2"}
2. Enter the path to build context 
Build context is where we can find your Dockerfile as well as running commands. Your Dockerfile must be relative to this directory.

{:start="3"}
3. Enter image name

{:start="4"}
4. Click **NEXT**

{% include image.html 
lightbox="true" 
file="/images/444e9e2-codefresh_wizard_dockerfile_method.png" 
url="/images/444e9e2-codefresh_wizard_dockerfile_method.png"
alt="codefresh_wizard_dockerfile_method"
max-width="40%"
%}

## 3.3 Template build method

If your repository doesn't include a Dockerfile, that's okay, you can use one of our predefined Dockerfiles!

{:.text-secondary}
### **Procedure**:

{:start="1"}
1. Choose the necessary platform

{:start="2"}
2. Click **NEXT**

{% include image.html 
lightbox="true" 
file="/images/257b98f-codefresh_wizard_template_method.png" 
url="/images/257b98f-codefresh_wizard_template_method.png"
alt="codefresh_wizard_template_method"
max-width="40%"
%}

## 4. Review Your Dockerfile or codefresh.yml

After you add a Dockerfile/codefresh.yml, Codefresh displays the Dockerfile/codefresh.yml contents.

Review the Dockerfile/codefresh.yml, and when you're done, click **Create**.

{% include image.html 
lightbox="true" 
file="/images/69a5511-codefresh_wizard_review_screen.png" 
url="/images/69a5511-codefresh_wizard_review_screen.png"
alt="codefresh_wizard_review_screen"
max-width="40%"
caption="Review Dockerfile (click image to enlarge)"
%}

## 5. Build your Docker Image

GREAT! Now that you added your service to Codefresh, you're ready to build your Docker image. 

* Click **BUILD**.

{% include image.html 
lightbox="true" 
file="/images/9c2a3a3-codefresh_new_wizard_4_1.png" 
url="/images/9c2a3a3-codefresh_new_wizard_4_1.png"
alt="codefresh_new_wizard_4_1"
max-width="40%"
%}
