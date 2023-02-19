---
title: "Add config maps to your namespaces"
description: "How to use manage Kubernetes Config Maps with Codefresh"
group: deploy-to-kubernetes
redirect_from:
  - /docs/add-config-maps-to-your-namespaces/
toc: true
---
Many applications require configuration with files, environment variables and command line arguments. It makes applications portable and easily manageable. It's pretty easy to configure an application with this way. But it can become very hard to support tons of config files for different environments and hundreds of microservices. 

Kubernetes provides an elegant and very convenient way for application configuration. This way is by using *configuration maps*. You can find more details about config maps at [https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/){:target="_blank"}. 

You can manage all your cluster configuration using Codefresh. This article will explain you how to do it.

## View existing config maps
In order to access the list of existing config maps, open the Kubernetes Services page and switch to list view.

Select a namespace and hover your mouse pointer on it. Click the gear button which appears at the end of the row. You will see a list of all config maps inside this namespace, including date of creation and number of configuration variables inside these maps.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes/config-maps/change-view.png" 
url="/images/kubernetes/config-maps/change-view.png" 
alt="Change View" 
caption="Change View" 
max-width="50%" 
%}

## Add a new config map
To add a new config map for the selected namespace, open the list of all config maps and click "Create a New Config Map" button.

{% include image.html
lightbox="true"
file="/images/e1650e2-Screen_Shot_2017-10-08_at_9.10.15_AM.png"
url="/images/e1650e2-Screen_Shot_2017-10-08_at_9.10.15_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.15 AM.png"
max-width="40%"
%}

In the config map form that will open, enter a name, add variables and click the "Create" button.

{% include image.html
lightbox="true"
file="/images/108add4-Screen_Shot_2017-10-08_at_9.10.22_AM.png"
url="/images/108add4-Screen_Shot_2017-10-08_at_9.10.22_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.22 AM.png"
max-width="40%"
%}

## You can add variables to your config maps in several ways:

{:.text-secondary}
### Add a single variable in config map

This is the easiest way to add a variable inside the config map (It's very useful when you want to quickly create a small configmap with 1-2 variables inside):
1. Enter key name
1. Enter key value
1. Click "ADD VARIABLE"

{% include image.html
lightbox="true"
file="/images/48cda66-Screen_Shot_2017-10-08_at_9.10.29_AM.png"
url="/images/108add4-Screen_Shot_2017-10-08_at_9.10.22_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.29 AM.png"
max-width="40%"
%}

{:.text-secondary}
### Import variables from text / file
If you already have configuration variables inside a `*.property` file you can easily import it inside your configmap.

To import from text:
1. Click "IMPORT FROM TEXT"
1. Copy text from file and insert inside text area 
1. Click apply

{% include image.html
lightbox="true"
file="/images/40b1c06-Screen_Shot_2017-10-08_at_9.10.39_AM.png"
url="/images/40b1c06-Screen_Shot_2017-10-08_at_9.10.39_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.39 AM.png"
max-width="40%"
%}

To import from file:
1. Click "IMPORT FROM FILE"
1. Select file from your computer and click open button

{:.text-secondary}
### Copy from existing config map

You can easily copy a previously created config map file and use it in other namespaces using the following steps:

1. Click "COPY FROM EXISTING CONFIG MAP"
1. Select cluster and namespace which contains configmap that you want to copy
1. Find this configmap inside the list and click "SELECT" button

{% include image.html
lightbox="true"
file="/images/181f2d4-Screen_Shot_2017-10-08_at_9.11.03_AM.png"
url="/images/181f2d4-Screen_Shot_2017-10-08_at_9.11.03_AM.png"
alt="Screen Shot 2017-10-08 at 9.11.03 AM.png"
max-width="40%"
%}

## Edit / remove config maps
You can easily edit / remove variables for each of your config maps.

1. Select a config map 
1. Click on pencil icon 
1. You can add new variables using the same instructions as in "add new config map" section

{% include image.html
lightbox="true"
file="/images/1fb1529-Screen_Shot_2017-10-08_at_9.22.27_AM.png"
url="/images/1fb1529-Screen_Shot_2017-10-08_at_9.22.27_AM.png"
alt="Screen Shot 2017-10-08 at 9.22.27 AM.png"
max-width="40%"
%}

To remove a config map, click on "remove" icon in the selected row. After your confirmation, the configmap will be removed.

## What to read next

- [Connect to your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
- [Manage your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
- [Deploy to Kubernetes - quick start]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)
