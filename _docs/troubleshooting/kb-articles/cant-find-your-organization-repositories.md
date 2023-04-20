---
title: "Can't find your organization repositories"
description: "Issues with adding Git triggers"
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: true
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Issue

Unable to find the GitHub organization to with the repository to which to add a [git trigger]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/).

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/cannot-find-repo.png" 
url="/images/troubleshooting/cannot-find-repo.png"
alt="Repository not found" 
max-width="60%"
caption="Repository not found"
%}

### Solution

1. Navigate to your GitHub user settings page:
    1. Log in to GitHub using your credentials.
    1. Navigate to your *Settings* page.

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/github-user-menu.png" 
url="/images/troubleshooting/github-user-menu.png"
alt="GitHub user menu" 
max-width="40%"
caption="GitHub user menu"
%}

{:start="2"}
1. Navigate to your Authorized applications:  
  In your *Personal settings* view, click *Authorized applications*.

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/personal-settings.png" 
url="/images/troubleshooting/personal-settings.png"
alt="Personal settings" 
max-width="40%"
caption="Personal settings"
%}

{:start="3"}
1. Locate and click the Codefresh authorized application.

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/authorized-applications.png" 
url="/images/troubleshooting/authorized-applications.png"
alt="Authorized applications" 
max-width="40%"
caption="Authorized applications"
%}

{:start="4"}
1. In the Organization access section find your organization.
1. If you _do not have Admin privileges for your organization_, click **Request access**, to request the necessary privileges from your administrator.

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/request-access-to-codefresh-app.png" 
url="/images/troubleshooting/request-access-to-codefresh-app.png"
alt="Request access" 
max-width="40%"
caption="Request access"
%}

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/access-requested.png" 
url="/images/troubleshooting/access-requested.png"
alt="Access requested" 
max-width="40%"
caption="Access requested"
%}

{:start="6"}
1. If _you are an organization administrator_, click **Grant access**.  
    You always have the option to revoke access.

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/non-admin-grant-access.png" 
url="/images/troubleshooting/non-admin-grant-access.png"
alt="Grant access" 
max-width="40%"
caption="Grant access"
%}

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/non-admin-access-granted.png" 
url="/images/troubleshooting/non-admin-access-granted.png"
alt="Access granted" 
max-width="40%"
caption="Access granted"
%}

## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)