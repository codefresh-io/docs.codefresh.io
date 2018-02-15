---
layout: docs
title: "No Dockerfile found"
description: ""
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/no-dockerfile-found
  - /docs/no-dockerfile-found
toc: true
---
***Problem:*** When I tried to build a repository, I received this error message: “Repository does not contain a Dockerfile. Please check the pipeline configuration”.

{% include 
image.html 
lightbox="true" 
file="/images/92c8d50-2016-09-29_12-29-10.png" 
url="/images/92c8d50-2016-09-29_12-29-10.png"
alt="2016-09-29_12-29-10.png" 
max-width="40%"
caption="This error indicates that the repository doesn’t have a Dockerfile in it or the path for the Dockerfile was incorrect."
%}

***Solution:*** There are two ways to address this error:

{:start="1"}
1. Add a Dockerfile to the repository, or verify that you configured the correct path to the Dockerfile. 
   
   To configure the Dockerfile path in the pipeline configuration, navigate to **`Repositories`** &#8594; **`Your Repository`** &#8594; **`Pipelines`**.

{% include 
image.html 
lightbox="true" 
file="/images/3c8f08e-2016-09-29_12-57-55.png" 
url="/images/3c8f08e-2016-09-29_12-57-55.png"
alt="2016-09-29_12-57-55.png" 
max-width="40%"
%}

{:start="2"}
2. Use a pre-configured Codefresh Dockerfile template from the template selector on the Pipeline view. Navigate to **`Repositories`** &#8594; **`Your Repository`** &#8594; **`Pipelines`**.

{% include 
image.html 
lightbox="true" 
file="/images/6b035ff-2016-09-29_13-03-58.png" 
url="/images/6b035ff-2016-09-29_13-03-58.png"
alt="2016-09-29_13-03-58.png" 
max-width="40%"
%}
