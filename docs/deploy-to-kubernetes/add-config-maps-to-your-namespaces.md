---
layout: docs
title: "Add config maps to your namespaces"
description: ""
group: deploy-to-kubernetes
redirect_from:
  - /docs/add-config-maps-to-your-namespaces
toc: true
---
Many applications require configuration with files, environment variables, command line arguments. It makes applications portable and easy manageable. It's pretty easy to configure application with this way. But it can become very hard to support a tons of config files for different environments and hundreds of microservices. 

Kubernetes provides elegant and very convenient way for applications configuration. This is config maps. You can find more details about it here [https://kubernetes-v1-4.github.io/docs/user-guide/configmap/](https://kubernetes-v1-4.github.io/docs/user-guide/configmap/){:target="_blank"}. 

You can manage all your cluster configuration using Codefresh. This article will explain you how to do it.

## Watch existing config maps
In order to access the list of existing config maps, open Kubernetes Services page and switch to list view.

Select a namespace and hover mouse pointer on it. Click the gear button which appears at the end of the row. You will see list of all config maps inside this namespace, including date of creation and number of configuration variables inside these maps

{% include image.html
lightbox="true"
file="/images/65b5f4b-Screen_Shot_2017-10-08_at_9.10.09_AM.png"
url="/images/65b5f4b-Screen_Shot_2017-10-08_at_9.10.09_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.09 AM.png"
max-width="40%"
%}

## Add a new config map
To add a new config map for selected namespace, open list of all config maps and click "Create a New Config Map" button.

{% include image.html
lightbox="true"
file="/images/e1650e2-Screen_Shot_2017-10-08_at_9.10.15_AM.png"
url="/images/e1650e2-Screen_Shot_2017-10-08_at_9.10.15_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.15 AM.png"
max-width="40%"
%}

In config map form that will open, enter a name, add variables and click "Create" button.

{% include image.html
lightbox="true"
file="/images/108add4-Screen_Shot_2017-10-08_at_9.10.22_AM.png"
url="/images/108add4-Screen_Shot_2017-10-08_at_9.10.22_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.22 AM.png"
max-width="40%"
%}

## You can add variables to your config maps in several ways:

{:.text-secondary}
### Add single variable in config map
This is the easiest way to add variable inside config map. It's very useful when you want quickly create a small configmap with 1-2 variables inside. 
- enter key name
- enter key value
- click "ADD VARIABLE"

{% include image.html
lightbox="true"
file="/images/48cda66-Screen_Shot_2017-10-08_at_9.10.29_AM.png"
url="/images/108add4-Screen_Shot_2017-10-08_at_9.10.22_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.29 AM.png"
max-width="40%"
%}

{:.text-secondary}
### Import variables from text / file
If you already have configuration variables inside *.property file you can easily import it inside your configmap.

To import from text:
- click "IMPORT FROM TEXT"
- copy text from file and insert inside text area 
- click apply

{% include image.html
lightbox="true"
file="/images/40b1c06-Screen_Shot_2017-10-08_at_9.10.39_AM.png"
url="/images/40b1c06-Screen_Shot_2017-10-08_at_9.10.39_AM.png"
alt="Screen Shot 2017-10-08 at 9.10.39 AM.png"
max-width="40%"
%}

To import from file:
- click "IMPORT FROM FILE"
- select file from your computer and click open button

{:.text-secondary}
### Copy from existing config map

You can easily copy previously created config map file and use it in other namespaces using the following steps:
- click "COPY FROM EXISTING CONFIG MAP"
- select cluster and namespace which contains configmap that you want to copy
- find this configmap inside the list and click "SELECT" button

{% include image.html
lightbox="true"
file="/images/181f2d4-Screen_Shot_2017-10-08_at_9.11.03_AM.png"
url="/images/181f2d4-Screen_Shot_2017-10-08_at_9.11.03_AM.png"
alt="Screen Shot 2017-10-08 at 9.11.03 AM.png"
max-width="40%"
%}

## Edit / remove config maps
You can easily edit / remove variables for each you your config maps.

- Select config map 
- Click on pencil icon 
- You can add new variables using the same instructions as in "add new config map" section

{% include image.html
lightbox="true"
file="/images/1fb1529-Screen_Shot_2017-10-08_at_9.22.27_AM.png"
url="/images/1fb1529-Screen_Shot_2017-10-08_at_9.22.27_AM.png"
alt="Screen Shot 2017-10-08 at 9.22.27 AM.png"
max-width="40%"
%}

To remove config map, click on "remove" icon in the selected row. After your confirmation configmap will be removed.
