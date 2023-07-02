---
title: "Can't find private repositories"
description: ""
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: true
categories: [Pieplines, Settings]
support-reviewed: 2023-04-18 LG
---

## Issue

I want to add a private repository to Codefresh but can't find it in the repository list.

{% include
image.html
lightbox="true"
file="/images/troubleshooting/private-repos.png"
url="/images/troubleshooting/private-repos.png"
alt="Adding private repositories"
caption="Adding private repositories"
max-width="60%"
%}

## Possible cause

This means that you haven’t granted Codefresh permission to access private repositories.

## Solution

Click the link on the right that says "private repositories".

You can also enable the same thing from the user settings page:

{% include
image.html
lightbox="true"
file="/images/troubleshooting/allow-private-repositories.png"
url="/images/troubleshooting/allow-private-repositories.png"
alt="Allow private repositories"
caption="Allow private repositories"
max-width="70%"
%}

> Some Git providers redirect you to the provider’s permission page.

## Related articles

[Troubleshooting common issues]({{site.baseurl}}/docs/kb/common-issues/)
