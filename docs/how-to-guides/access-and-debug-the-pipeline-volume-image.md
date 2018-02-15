---
layout: docs
title: "Access and debug the pipeline volume image"
description: ""
group: how-to-guides
redirect_from:
  - /docs/access-the-pipeline-volume-image
  - /docs/access-the-pipeline-volume-image
toc: true
old_url: /docs/access-the-pipeline-volume-image
---
Each of our pipelines uses a dedicated volume image. This volume allows us to speed up the build process. If the need arises you can access that volume to help you debug your build process.

## Where can I see the volumes?
Navigate to the **Images** view, and switch the toggle

{% include image.html 
lightbox="true" 
file="/images/33a8af0-toggle.png" 
url="/images/33a8af0-toggle.png"
alt="toggle.png"
max-width="40%"
%}

## Accessing a volume image
There are a few ways to access the volume image.

{:.text-secondary}
### Promoting

After you promote an image, you can pull it locally and debug it with your own tools.

Simply press the **Promote** icon from the **Images** view

{% include image.html 
lightbox="true" 
file="/images/bf235fa-promote.png" 
url="/images/bf235fa-promote.png"
alt="promote.png"
max-width="40%"
%}

{:.text-secondary}
### Using a composition.

{:start="1"}
1. Copy your volume image name

{% include image.html 
lightbox="true" 
file="/images/9c0b1c8-copy.png" 
url="/images/9c0b1c8-copy.png"
alt="copy.png"
max-width="40%"
%}

steps 2-4 can be ignored if you already have a terminal composition.

{:start="2"}
2. Create a new composition from the **Compositions** view

{% include image.html 
lightbox="true" 
file="/images/3a2be7b-create.png" 
url="/images/3a2be7b-create.png"
alt="create.png"
max-width="40%"
%}

{:start="3"}
3. Select to create a composition from a template

{% include image.html 
lightbox="true" 
file="/images/8a6c727-templates.png" 
url="/images/8a6c727-templates.png"
alt="templates.png"
max-width="40%"
%}

{:start="4"}
4. Choose the **Terminal** template

{% include image.html 
lightbox="true" 
file="/images/69ad3e3-terminal.png" 
url="/images/69ad3e3-terminal.png"
alt="terminal.png"
max-width="40%"
%}

{:start="5"}
5. Add environment variables

The terminal composition needs some environment variables in order to expose the volume files.

* `IMAGE_NAME` - The name from step 1.
* `IMAGE_TAG` - all volumes have "volume" tag, and you can use it.
* `FOLDER` - the path to the volume files. (will always be: *`/cf-volume`*).

Optional (but recommended):

* `USERNAME` - user for terminal (default is "user").
* `PASSWORD` - password for terminal (default is "pass").

{% include image.html 
lightbox="true" 
file="/images/9fc80f6-env_var.png" 
url="/images/9fc80f6-env_var.png"
alt="env var.png"
max-width="40%"
%}

{{site.data.callout.callout_info}}
##### NOTE

You can use the "Terminal" composition for any image you wish, not just a volume image. 
{{site.data.callout.end}}

{:start="6"}
6. Launch your composition and open the app.

{% include image.html 
lightbox="true" 
file="/images/685c979-launch2.png" 
url="/images/685c979-launch2.png"
alt="launch2.png"
max-width="40%"
%}

{% include image.html 
lightbox="true" 
file="/images/87c36a2-open-app.png" 
url="/images/87c36a2-open-app.png"
alt="open-app.png"
max-width="40%"
%}

And now you can start exploring your image.

{% include image.html 
lightbox="true" 
file="/images/4722827-terminal.png" 
url="/images/4722827-terminal.png"
alt="terminal.png"
max-width="40%"
%}
