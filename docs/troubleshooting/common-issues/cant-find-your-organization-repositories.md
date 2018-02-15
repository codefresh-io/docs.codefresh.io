---
layout: docs
title: "Can't find your organization repositories"
description: ""
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/cant-find-your-organization-repos
  - /docs/cant-find-your-organization-repos
toc: true
---
***Problem***: I want to add a repository that belongs to one of my Github organizations, but can't find it in the repository list.

{% include 
image.html 
lightbox="true" 
file="/images/88ec329-Screen_Shot_2016-09-29_at_3.13.51_PM.png" 
url="/images/88ec329-Screen_Shot_2016-09-29_at_3.13.51_PM.png"
alt="Screen Shot 2016-09-29 at 3.13.51 PM.png" 
max-width="40%"
caption="Pick a repository empty list(click image to enlarge)"
%}

## 1. Navigate to your Github user settings page

{:start="1"}
1. Log in to Github using your credentials.

{:start="1"}
2. Navigate to your **Settings** page.

{% include 
image.html 
lightbox="true" 
file="/images/415b5cf-2016-09-29_1530.png" 
url="/images/415b5cf-2016-09-29_1530.png"
alt="2016-09-29_1530.png" 
max-width="40%"
caption="Github user menu (click image to enlarge)"
%}

## 2. Navigate to your Authorized applications
In your **Personal settings** view, click **Authorized applications**.

{% include 
image.html 
lightbox="true" 
file="/images/e259e11-2016-09-29_1535.png" 
url="/images/e259e11-2016-09-29_1535.png"
alt="2016-09-29_1535.png" 
max-width="40%"
caption="Personal settings (click image to enlarge)"
%}

## 3. Select the Codefresh application
Locate and click the Codefresh authorized application.

{% include 
image.html 
lightbox="true" 
file="/images/800315e-2016-09-29_1537.png" 
url="/images/800315e-2016-09-29_1537.png"
alt="2016-09-29_1537.png" 
max-width="40%"
caption="Authorized applications (click image to enlarge)"
%}

## 4. Grant Codefresh access to your organization
In the Organization access section find your organization.

{:.text-secondary}
### I'm Not an Organization Administrator?
If you do not have Admin privileges for your organization, click **Request access**, to request the necessary privileges from your administrator.

{% include 
image.html 
lightbox="true" 
file="/images/28c3267-2016-09-29_1539.png" 
url="/images/28c3267-2016-09-29_1539.png"
alt="2016-09-29_1539.png" 
max-width="40%"
caption="Request access (click image to enlarge)"
%}

{% include 
image.html 
lightbox="true" 
file="/images/45e8c2b-2016-09-29_1542.png" 
url="/images/45e8c2b-2016-09-29_1542.png"
alt="2016-09-29_1542.png" 
max-width="40%"
caption="Access requested (click image to enlarge)"
%}

{:.text-secondary}
### I'm an Organization Administrator###
If you are an organization administrator, click **Grant access**.
You can always have the option to revoke access.

{% include 
image.html 
lightbox="true" 
file="/images/e5b5e2a-2016-09-29_1546.png" 
url="/images/e5b5e2a-2016-09-29_1546.png"
alt="2016-09-29_1542.png" 
max-width="40%"
caption="Grant access (click image to enlarge)"
%}

{% include 
image.html 
lightbox="true" 
file="/images/2b55c86-2016-09-29_1547.png" 
url="/images/2b55c86-2016-09-29_1547.png"
alt="2016-09-29_1547.png" 
max-width="40%"
caption="Access granted (click image to enlarge)"
%}
