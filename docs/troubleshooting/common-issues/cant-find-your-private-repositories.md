---
layout: docs
title: "Can't find your private repositories"
description: ""
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/cant-find-your-private-repositories
  - /docs/cant-find-your-private-repositories
toc: true
---
***Problem***: I want to add a private repository to Codefresh, but can't find it in the repository list.

{% include 
image.html 
lightbox="true" 
file="/images/63cb340-2016-09-29_11-43-43.png" 
url="/images/63cb340-2016-09-29_11-43-43.png"
alt="2016-09-29_11-43-43.png" 
max-width="40%"
%}

***Reason***: There are two potential reasons that you can't find your private repository:

1. You have the basic, free Open Source plan. You can only build public repositories on this plan.
2. You haven’t granted Codefresh permission to access private repositories.

***Solution to Problem 1:*** 
  * Go to **`Account Management`** &#8594; **`Billing`** &#8594; select your trial/paid plan.
  * If you haven’t activated your free trial, you can click **[TRIAL](https://codefresh.io/pricing/)** to begin a 30-day trial period for a plan that includes private repositories.

{% include 
image.html 
lightbox="true" 
file="/images/cb2e80a-Screen_Shot_2016-11-02_at_16.25.30.png" 
url="/images/cb2e80a-Screen_Shot_2016-11-02_at_16.25.30.png"
alt="Screen Shot 2016-11-02 at 16.25.30.png" 
max-width="40%"
%}
  
***Solution to Problem 2:***

Go to **`User Settings`** &#8594; and select the **`Allow access to private repositories`** option.

**Note:** Some providers are redirected to the provider’s permission page.

{% include 
image.html 
lightbox="true" 
file="/images/78ccb8a-2016-09-29_12-17-04.png" 
url="/images/78ccb8a-2016-09-29_12-17-04.png"
alt="2016-09-29_12-17-04.png" 
max-width="40%"
%}
