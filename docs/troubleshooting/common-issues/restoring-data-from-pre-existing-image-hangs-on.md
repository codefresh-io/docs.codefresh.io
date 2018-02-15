---
layout: docs
title: "Restoring data from pre-existing image hangs on"
description: ""
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/restoring-data-from-pre-existing-image-hangs-on
  - /docs/restoring-data-from-pre-existing-image-hangs-on
toc: true
---
One of the best strengths of Codefresh is the ability to work on a single file system between different builds. In order to provide this capability, Codefresh will make sure to provision a volume per pipeline and to restore it upon starting a new build. 

In case the first step seems to hang for a significant amount of time when restoring the data, this might suggest that your volume size is very big. Sometimes the only solution would be to delete that volume and start from scratch.

{% include 
image.html 
lightbox="true" 
file="/images/365bcdb-example.png" 
url="/images/365bcdb-example.png"
alt="example.png" 
max-width="40%"
%}

In order to do that, you can choose the option to reset your pipeline volume when the build wizard pops up, under the advanced section.

{% include 
image.html 
lightbox="true" 
file="/images/02384f5-reset_volume.png" 
url="/images/02384f5-reset_volume.png"
alt="reset volume.png" 
max-width="40%"
%}

{{site.data.callout.callout_info}}
Reseting the pipeline volume may cause your build to take longer than usual.
{{site.data.callout.end}}
