---
title: "Windows: The container operating system does not match the host operating system."
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

You receive an error in your Windows instance with the following information:

`The container operating system does not match the host operating system.`

## Details

Windows docker images are only compatible with the corresponding release version of the host OS.

Ensure that the image version used corresponds to the the node Windows release. For example:

`FROM mcr.microsoft.com/dotnet/framework/sdk:4.8-windowsservercore-ltsc2019` is version 1809.

`FROM mcr.microsoft.com/dotnet/framework/sdk:4.8-windowsservercore-1909` is version 1909.

Please reach out to the support team if you're unsure which Windows release you're using.

>_Notes_
>
>Windows support is currently in Beta status so this article is subject to rapid change.
