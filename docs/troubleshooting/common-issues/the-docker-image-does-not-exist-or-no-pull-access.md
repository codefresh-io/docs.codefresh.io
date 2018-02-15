---
layout: docs
title: "The docker image does not exist or no pull access"
description: ""
group: troubleshooting
sub_group: common-issues
permalink: /:path/the-docker-image-does-not-exist-or-no-pull-access/
redirect_from:
  - /docs/the-docker-image-does-not-exist-or-no-pull-access
  - /docs/the-docker-image-does-not-exist-or-no-pull-access
toc: true
---
When your workflow's process failed with the similar error message: 

      [SYSTEM] Error: Failed to pull base image: OWNER/REPO:TAG; caused by Error: (HTTP code 404) no such image - no such image: OWNER/REPO:TAG: No such image: codefreshdemo/demochat:feature_test

{% include 
image.html 
lightbox="true" 
file="/images/6bf6f0c-codefresh_image_not_found.png" 
url="/images/6bf6f0c-codefresh_image_not_found.png"
alt="codefresh_image_not_found.png" 
max-width="40%"
%}

1. If this docker image was created in Codefresh and hasn't been pushed to docker registry. Go to the tab `Images` and check the tag and name of this image.
2. If this docker image was pushed to docker registry. Go to the Integration page and check that you integrated with this docker registry.
