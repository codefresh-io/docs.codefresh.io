---
layout: docs
title: "Helm Charts and repositories"
description: ""
group: new-helm
permalink: /:path/add-helm-repository/
redirect_from:
  - /docs/add-helm-repository
  - /docs/new-helm/
  - /docs/add-helm-repository/
toc: true
---
The "Helm Charts" page allows you to integrate with Helm repositories and Helm charts.

## Adding a Helm repository
By default, we show you charts from the [official Helm repository](https://github.com/kubernetes/charts){:target="_blank"} but you can easily add your own:

In the "Helm Charts" page, click on the "Add Repository" button on the top right.

{% include 
image.html 
lightbox="true" 
file="/images/1b9743d-4e0d943-Screen_Shot_2017-12-11_at_12.50.38_PM.png" 
url="/images/1b9743d-4e0d943-Screen_Shot_2017-12-11_at_12.50.38_PM.png"
alt="4e0d943-Screen_Shot_2017-12-11_at_12.50.38_PM.png" 
max-width="30%"
caption="Add Repository button" 
%}

In the dialog that opened, name your repository, and specify it's location.
The location should be publicly accessible, and should not include a specific link to `index.yaml`
Finally, click on Save.

{% include 
image.html 
lightbox="true" 
file="/images/56ca919-add-helm-repo.png" 
url="/images/56ca919-add-helm-repo.png"
alt="add-helm-repo.png" 
max-width="30%"
caption="Add Repository button" 
%}

That's it!
You will now see you r charts on the Helm Charts page.

## Install chart from your Helm repository
In the "Helm Charts" page, locate the chart you would like to install, and click on the Install button

{% include 
image.html 
lightbox="true" 
file="/images/4e0d943-Screen_Shot_2017-12-11_at_12.50.38_PM.png" 
url="/images/4e0d943-Screen_Shot_2017-12-11_at_12.50.38_PM.png"
alt="Screen Shot 2017-12-11 at 12.50.38 PM.png" 
max-width="30%"
caption="Helm charts view" 
%}

In the dialog that opened:
- Name your release and choose a version of the chart to install.
- Select a Kubernetes cluster and namespace to install to. 
  - This should be pre-configured in the Kubernetes Integration, see [here]({{ site.baseurl }}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) 
- Select the values file to install the chart with. Open the Values drop down, and select "Add new context of type: YAML". Insert your values YAML here, and save. The YAML will be saved for future usage so in the future you can simply select it from the drop down.
- Optionally, you can override some values by adding them in the "Override set variables section"

{% include 
image.html 
lightbox="true" 
file="/images/36e5a16-Screen_Shot_2018-01-14_at_15.38.47.png" 
url="/images/36e5a16-Screen_Shot_2018-01-14_at_15.38.47.png"
alt="Screen Shot 2018-01-14 at 15.38.47.png" 
max-width="30%"
caption="Installing a chart" 
%}

Finally click on Install. You can observe the newly installed release on the "Helm Releases" page
