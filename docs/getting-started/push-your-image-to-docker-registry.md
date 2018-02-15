---
layout: docs
title: "Push Your Image to Docker Registry"
excerpt: ""
description: ""
excerpt: ""
group: getting-started
redirect_from:
  - /docs/push-to-registry
toc: true
old_url: /docs/push-to-registry
was_hidden: true
---
With Codefresh, you can automatically push your build images to your Docker registry.

You select this option when you configure your service.

{{site.data.callout.callout_info}}
What's a Docker registry? Learn more at the [Docker Documentation Center](https://docs.docker.com/registry/){:target="_blank"} 
{{site.data.callout.end}}

## 1. Access Your Service

{:.text-secondary}
### **Procedure**:

{:start="1"}
1. Click the **Services** view icon to display the service you created.
 
{:start="2"}
2. Click the **Gear** icon on the service profile.

{% include image.html 
lightbox="true" 
file="/images/a59e344-2016-09-29_1224.png" 
url="/images/a59e344-2016-09-29_1224.png"
alt="2016-09-29_1224.png"
max-width="40%"
caption="Services view (click image to enlarge)" 
%}

### **Result**:
You are directed to the **Pipelines** tab of the **Services** view.

## 2. Name Your Image

{:text-secondary}
### **Procedure**:

{:start="1"}
1. Navigate to the Build and Unit Test section.

{:start="2"}
2. In the **Image Name** text box, type a name for your image.

{{site.data.callout.callout_warning}}
Notice that the name you define is important and you should provide a name that will be accepted by your Docker registry. 
{{site.data.callout.end}}

{% include image.html 
lightbox="true" 
file="/images/69e5ee8-Screen_Shot_2016-09-29_at_12.35.44_PM.png" 
url="/images/69e5ee8-Screen_Shot_2016-09-29_at_12.35.44_PM.png"
alt="Screen Shot 2016-09-29 at 12.35.44 PM.png"
max-width="40%"
caption="Define the image name (click image to enlarge)" 
%}

## 3. Configure Your Registry Settings
Scroll to the Push to Docker registry section.
If you haven't configured your Docker Hub registry credentials you are prompted to do so.

{% include image.html 
lightbox="true" 
file="/images/8dc84a9-2016-09-29_1227.png" 
url="/images/8dc84a9-2016-09-29_1227.png"
alt="2016-09-29_1227.png"
max-width="40%"
caption="Navigate to Integration page (click image to enlarge)" 
%}

On the integration page, enter your Docker Hub credentials and click **SAVE**.
Now, navigate back to your service's configuration page.

{% include image.html 
lightbox="true" 
file="/images/3459a25-Screen_Shot_2016-09-29_at_12.36.45_PM.png" 
url="/images/3459a25-Screen_Shot_2016-09-29_at_12.36.45_PM.png"
alt="Screen Shot 2016-09-29 at 12.36.45 PM.png"
max-width="40%"
caption="Setting credentials (click image to enlarge)" 
%}

{{site.data.callout.callout_info}}
Want to push your image to a different registry? Check out our [Docker Registry integration documentation]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/) 
{{site.data.callout.end}}

## 4. Enable Automatic Push to Your Registry

{:.text-secondary}
### **Procedure**:

{:start="1}
1. Scroll to the Push to Docker Registry section and click on the **Docker** icon.

{:start="2}
2. On the bottom of the service configuration page, click the **SAVE** button.

{% include image.html 
lightbox="true" 
file="/images/6cae216-Screen_Shot_2016-09-29_at_12.32.14_PM.png" 
url="/images/6cae216-Screen_Shot_2016-09-29_at_12.32.14_PM.png"
alt="Screen Shot 2016-09-29 at 12.32.14 PM.png"
max-width="40%"
caption="Automatic push enabled (click image to enlarge)" 
%}

## 5. Trigger a New Build
To trigger a new build, click the **BUILD** button.
When your image builds, it is automatically pushed to your defined registry.

{% include image.html 
lightbox="true" 
file="/images/50ce3dc-2016-09-29_1229.png" 
url="/images/50ce3dc-2016-09-29_1229.png"
alt="2016-09-29_1229.png"
max-width="40%"
caption="Trigger a new build (click image to enlarge)" 
%}
