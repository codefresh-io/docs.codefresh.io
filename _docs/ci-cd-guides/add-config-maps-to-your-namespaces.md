---
title: "Adding config maps to namespaces"
description: "Manage Kubernetes Config Maps with Codefresh"
group: ci-cd-guides
redirect_from:
  - /docs/deploy-to-kubernetes/add-config-maps-to-your-namespaces/
  - /docs/add-config-maps-to-your-namespaces/
toc: true
---
Many applications require configuration with files, environment variables, and command line arguments. It makes applications portable and easily manageable. While this makes for easy configuration, it can become very hard to support tons of config files for different environments and hundreds of microservices. 

Kubernetes provides an elegant and very convenient way for application configuration, using *configuration maps*. You can find more details about config maps at [https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/){:target="_blank"}. 

You can manage all your cluster configuration using Codefresh. 

## View existing config maps

1. In the Codefresh UI, from the Ops section in the sidebar, select [**Kubernetes Services**](https://g.codefresh.io/kubernetes/services/){:target="\_blank"}.
1. Switch to list view.

{% include 
image.html 
lightbox="true" 
file="/images/guides/config-maps/change-view.png" 
url="/images/guides/config-maps/change-view.png" 
alt="Change View" 
caption="Change View" 
max-width="50%" 
%}

{:start="3"}
1. Select a namespace and hover over it. 
1. Click the **Settings** icon which appears at the end of the row.  
  A list of all config maps within this namespace are displayed, including date of creation and number of configuration variables inside these maps.



## Add a new config map

1. From the list of config maps, click **Create a New Config Map**.

{% include image.html
lightbox="true"
file="/images/guides/config-maps/manage-maps-namespace.png"
url="/images/guides/config-maps/manage-maps-namespace.png"
alt="Create a new config map in namespace" 
caption="Create a new config map in namespace" 
max-width="40%"
%}

{:start="2"}
1. In the Add a New Config Map form, enter a **Name**, add variables, as described in [Managing variables in your config maps](#managing-variables-in-config-maps), and then click **Create**.

{% include image.html
lightbox="true"
file="/images/guides/config-maps/new-config-map-settings.png"
url="/images/guides/config-maps/new-config-map-settings.png"
alt="Define settings for new config map" 
caption="Define settings for new config map" 
max-width="40%"
%}

### Managing variables in config maps
There are three options to add variables to config maps:
1. Add a single variable at a time
1. Add multiple variables by copying and pasting from text or file
1. Import a set of variables from an existing config map


#### Add a single variable to config map

This is the easiest way to add a variable to the config map. This method is very useful to quickly create a small configmap with 1-2 variables:
1. Enter Key name and the Key value
1. Click **Add Variable**.

{% include image.html
lightbox="true"
file="/images/guides/config-maps/add-new-single-variable.png"
url="/images/guides/config-maps/add-new-single-variable.png"
alt="Add single variable at a time to config map" 
caption="Add single variable at a time to config map" 
max-width="40%"
%}


#### Import variables from text/file
If you already have configuration variables in a `*.property` file, you can easily import it to your configmap.

**Import from text**:  


1. Click **Import from text**.
1. Copy text from file and paste it within the text area in the required format. 
1. Click **Apply**.

{% include image.html
lightbox="true"
file="/images/guides/config-maps/import-variables-from-text.png"
url="/images/guides/config-maps/import-variables-from-text.png."
alt="Add multiple variables from text or file to config map" 
caption="Add multiple variables from text or file to config map" 
max-width="40%"
%}

**Import from file**:  

1. Click **Import from file**.
1. Select the file from your computer, and click **Open**.


#### Copy variables from existing config map

You can easily copy the variables from an existing config map file, and use it in other namespaces.

1. Click **Copy from Existing Config Map**.
1. Select the **Cluster** and **Namespace** from which to copy the configmap.
1. Select the configmap from the list, and click **Select**.

{% include image.html
lightbox="true"
file="/images/guides/config-maps/select-cluster-namespace.png"
url="/images/guides/config-maps/select-cluster-namespace.png"
alt="Copy variables from existing config map"
caption="Copy variables from existing config map"
max-width="40%"
%}

### Edit/remove variables in config maps
You can easily edit or remove variables in your config maps.

1. Select the config map with the variables to modify or remove. 
1. Click the **Edit** (pencil) icon.
1. Add new variables, as described in [Managing variables in your config maps](#managing-variables-in-config-maps).

{% include image.html
lightbox="true"
file="/images/guides/config-maps/edit-remove-config-map-variables.png"
url="/images/guides/config-maps/edit-remove-config-map-variables.png"
alt="Edit/remove variables in config maps"
caption="Edit/remove variables in config maps"
max-width="40%"
%}

To remove a config map, click on "remove" icon in the selected row. After your confirmation, the configmap will be removed.

## Related articles
[Connect to your Kubernetes cluster]({{site.baseurl}}/docs/integrations/add-kubernetes-cluster/)  
[Manage your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Deploy to Kubernetes - quick start]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)  
